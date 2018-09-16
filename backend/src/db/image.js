import fs from 'fs';
import Promise from 'bluebird';
import logger from '../util/logger';

const Grid = require('gridfs-stream');

let imageGfs;
class ImageGfs {
  constructor() {
    this.grid = null;
  }

  initDbConnection(deps) {
    return deps.mongoose.createConnection(deps.url).then((conn) => {
      this.grid = Grid(conn.db, deps.mongoose.mongo);
    });
  }
}

function init(deps) {
  imageGfs = new ImageGfs();
  return imageGfs.initDbConnection(deps);
}

function write(fileSourcePath, filename, contentType) {
  return new Promise((resolve, reject) => {
    const writestream = imageGfs.grid.createWriteStream({
      filename,
      content_type: contentType,
      // root: 'images',
    });
    fs.createReadStream(fileSourcePath)
      .pipe(writestream)
      .on('error', (err) => {
        reject(err);
      })
      .on('close', (file) => {
        logger.debug(`Filename ${file.filename} added into DB `);
        resolve(writestream);
      });
  });
}

function readStreamByFilename(filename) {
  return imageGfs.grid.createReadStream({
    filename,
    root: 'images',
  });
}

function readStreamById(objectId) {
  return imageGfs.grid.createReadStream({
    _id: objectId,
    root: 'images',
  });
}

function remove(options) {
  return new Promise((resolve, reject) => {
    imageGfs.grid.remove(options, (err) => {
      if (err) reject(err);
      resolve(options);
    });
  });
}

function exist(options) {
  return new Promise((resolve, reject) => {
    imageGfs.grid.exist(options, (err, found) => {
      if (err) reject(err);
      resolve(found);
    });
  });
}


module.exports.init = init;
module.exports.readStreamById = readStreamById;
module.exports.readStreamByFilename = readStreamByFilename;
module.exports.remove = remove;
module.exports.write = write;
module.exports.exist = exist;
