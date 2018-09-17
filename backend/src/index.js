import { GraphQLServer } from 'graphql-yoga';
import morgan from 'morgan';
import Promise from 'bluebird';
import {
  startDB,
} from './db';
import resolvers from './graphql/resolvers';
import logger from './util/logger';

global.Promise = Promise;

const config = require('config');

const dbConfig = config.get('Campaign.dbConfig');
const serverConfig = config.get('Campaign.serverConfig');

function errorResponse(code, msg, err) {
  return {
    error: {
      message: msg,
      code,
      details: err,
    },
  };
}

const serverStartupPromise = startDB({
  user: 'system',
  pwd: 'keijo1234',
  db: dbConfig.name,
  url: `${dbConfig.host}:${dbConfig.port}`,
  mongoOptions: dbConfig.mongoOptions,
}).then((dependencies) => {
  const context = {
    models: dependencies.models,
    db: dependencies.connection,
  };

  const Server = new GraphQLServer({
    typeDefs: `${__dirname}/graphql/schema.graphql`,
    resolvers,
    context,
  });

  // Graphql server options
  const opts = {
    port: serverConfig.port,
    endpoint: '/graphql',
  };

  Server.express.use(morgan('common', { stream: logger.stream }));

  // images fetch endpoint with streaming from MongoDB's GridFS
  Server.express.get('/images/:name', (req, res) => {
    logger.debug(`Request image ${req.params.name}`);
    dependencies.images.exist({ filename: req.params.name }).then((found) => {
      if (!found) {
        res.status(404).json(errorResponse(3, `Could not find image file by name ${req.params.name}`, 'Resource not exist'));
      }
      res.type(req.params.name);
      dependencies.images.readStreamByFilename({ filename: req.params.name })
        .pipe(res)
        .on('error', (err) => {
          res.status(400).json(errorResponse(1, `Failed to stream image ${req.params.name}`, err));
        });
    }).catch((err) => {
      res.status(500).json(errorResponse(2, `Internal error occured when fetching image ${req.params.name}`, err));
    });
  });
  return Server.start(opts)
    .then(() => {
      logger.info(`Server is running on http://${dbConfig.host}:${opts.port}`);
      return Server;
    });
});

module.exports = serverStartupPromise;
