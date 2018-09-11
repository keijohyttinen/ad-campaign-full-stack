import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';
import logger from '../util/logger';

const config = require('config');

const serverConfig = config.get('Campaign.serverConfig');

function addNewItems(models) {
  const campaigns = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', serverConfig.fillDatabase.dataPath)));
  return Promise.each(campaigns, (campaign) => {
    const dbItem = new models.Campaign(campaign);
    return dbItem.save().then(() => {
      logger.debug(`Added campaign: ${campaign.name}`);
    });
  });
}

export default function initDatabase(models) {
  return () => {
    if (serverConfig.fillDatabase.enabled) {
      let dropPromise = Promise.resolve();
      if (serverConfig.fillDatabase.dropDatabasePriorToFill) {
        logger.debug('Clean database for Campaigns');
        dropPromise = models.Campaign.deleteMany({}).then(() => {
          logger.debug('Cleaned up campaigns');
        });
        // For whole db drop:
        // db.connection.dropDatabase();
      }
      return dropPromise.then(() => addNewItems(models));
    }
    return Promise.resolve();
  };
}
