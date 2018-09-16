import { GraphQLServer } from 'graphql-yoga';
import morgan from 'morgan';
import {
  startDB,
} from './db';
import resolvers from './graphql/resolvers';
import logger from './util/logger';

// const GridFSPromise = require('gridfs-promise');
// const imagesGridFs = new GridFSPromise.GridFSPromise('images');

const config = require('config');

const dbConfig = config.get('Campaign.dbConfig');
const serverConfig = config.get('Campaign.serverConfig');

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
  Server.express.get('/images', (req, res) => dependencies.images.read({ filename: req.params.name }).then((item) => {
    item.once('error', err => res.status(400).end(err)).pipe(res);
  }).catch(err => res.status(500).end(err)));

  return Server.start(opts)
    .then(() => {
      logger.info(`Server is running on http://${dbConfig.host}:${opts.port}`);
      return Server;
    });
});

module.exports = serverStartupPromise;
