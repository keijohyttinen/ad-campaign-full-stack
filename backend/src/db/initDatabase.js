import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import _ from 'underscore';
import logger from '../util/logger';

const config = require('config');

const srvConfig = config.get('Campaign.serverConfig');

function getResourcePath(...resourcePaths) {
  return resourcePaths.reduce((prefix, ending) => path.join(prefix, ending));
}

function saveImages(dependencies, pf) {
  const imagePath = getResourcePath(srvConfig.fillDatabase.imagePath, pf.creatives.image);
  if (!fs.existsSync(imagePath)) {
    throw new Error(`Image does not exist ${imagePath}`);
  }
  return dependencies.images.exist({ filename: pf.creatives.image })
    .then((found) => {
      if (!found) {
        const contentType = imagePath.split('.').pop();
        return dependencies.images.write(imagePath, pf.creatives.image, `image/${contentType}`);
      }
      logger.debug(`Filename '${pf.creatives.image}' exists already in DB`);
      return Promise.resolve(`Filename '${pf.creatives.image}' exists already in DB`);
    });
}

function addNewItems(dependencies) {
  const campaigns = JSON.parse(fs.readFileSync(getResourcePath(srvConfig.fillDatabase.dataPath)));
  return Promise.each(campaigns, (campaign) => {
    const dbItem = new dependencies.models.Campaign(campaign);
    return dbItem.save().tap(() => {
      logger.debug(`Added campaign: ${campaign.name}`);
    }).then(() => Promise.each(_.values(campaign.platforms), pf => saveImages(dependencies, pf)));
  });
}

export default function initDatabase(dependencies) {
  return dependencies.images.init(dependencies)
    .then(() => {
      // For testing purposes fill database with some test content
      if (srvConfig.fillDatabase.enabled) {
        let dropPromise = Promise.resolve();
        if (srvConfig.fillDatabase.dropDatabasePriorToFill) {
          logger.debug('Clean database for Campaigns');
          dropPromise = dependencies.models.Campaign.deleteMany({}).then(() => {
            logger.debug('Cleaned up campaigns');
          });
        }
        return dropPromise.then(() => addNewItems(dependencies));
      }
      return Promise.resolve();
    });
}
