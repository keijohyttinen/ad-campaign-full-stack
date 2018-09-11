import { GraphQLServer } from 'graphql-yoga';

import morgan from 'morgan';
import { startDB, models, initDB } from './db';
import resolvers from './graphql/resolvers';
import logger from './util/logger';

const config = require('config');

const dbConfig = config.get('Campaign.dbConfig');
const serverConfig = config.get('Campaign.serverConfig');

const serverStartupPromise = startDB({
  user: 'system',
  pwd: 'keijo1234',
  db: dbConfig.name,
  url: `${dbConfig.host}:${dbConfig.port}`,
}).then(database => initDB().then(() => Promise.resolve(database))).then((database) => {
  const context = {
    models,
    database,
  };

  const Server = new GraphQLServer({
    typeDefs: `${__dirname}/graphql/schema.graphql`,
    resolvers,
    context,
  });

  // Server options
  const opts = {
    port: serverConfig.port,
    endpoint: '/graphql',
  };

  Server.express.use(morgan('common', { stream: logger.stream }));

  return Server.start(opts)
    .then(() => {
      logger.info(`Server is running on http://${dbConfig.host}:${opts.port}`);
      return Server;
    });
});

module.exports = serverStartupPromise;
