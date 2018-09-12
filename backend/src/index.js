import { GraphQLServer } from 'graphql-yoga';

import morgan from 'morgan';
import { GridFSPromise } from 'gridfs-promise';
import { startDB, models, initDB } from './db';
import resolvers from './graphql/resolvers';
import logger from './util/logger';

const config = require('config');

const dbConfig = config.get('Campaign.dbConfig');
const serverConfig = config.get('Campaign.serverConfig');

const gridFs = new GridFSPromise('images');

const serverStartupPromise = startDB({
  user: 'system',
  pwd: 'keijo1234',
  db: dbConfig.name,
  url: `${dbConfig.host}:${dbConfig.port}`,
}).then(dbConnection => initDB().return(dbConnection))
  .then((dbConnection) => {
    const context = {
      models,
      dbConnection,
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

    // images endpoint with streaming from MongoDB's GridFS
    gridFs.CONNECTION = dbConnection;
    Server.express.get('/images', (req, res) => gridFs.getFileStream(req.params.name).then((item) => {
      item.once('error', err => res.status(400).end(err)).pipe(res);
    }).catch(err => res.status(500).end(err)));

    return Server.start(opts)
      .then(() => {
        logger.info(`Server is running on http://${dbConfig.host}:${opts.port}`);
        return Server;
      });
  });

module.exports = serverStartupPromise;
