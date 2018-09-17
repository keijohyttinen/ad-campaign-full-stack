import fs from 'fs';
import Promise from 'bluebird';

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
    });
    fs.createReadStream(fileSourcePath)
      .pipe(writestream)
      .on('error', (err) => {
        reject(err);
      })
      .on('close', (file) => {
        resolve(file);
      });
  });
}

function readStreamByFilename(options) {
  return imageGfs.grid.createReadStream({
    filename: options.filename,
  });
}

function readStreamById(options) {
  return imageGfs.grid.createReadStream({
    _id: options.objectId,
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
