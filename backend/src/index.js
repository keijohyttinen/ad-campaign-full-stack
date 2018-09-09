import { GraphQLServer } from 'graphql-yoga';

import { startDB, models } from './db';
import resolvers from './graphql/resolvers';
import logger from './util/logger';

const config = require('config');

const dbConfig = config.get('Campaign.dbConfig');

const db = startDB({
  user: 'system',
  pwd: 'keijo1234',
  db: dbConfig.name,
  url: `${dbConfig.host}:${dbConfig.port}`,
});

const context = {
  models,
  db,
};

const Server = new GraphQLServer({
  typeDefs: `${__dirname}/graphql/schema.graphql`,
  resolvers,
  context,
});

// options
const opts = {
  port: dbConfig.port,
  endpoint: '/graphql',
};


logger.debug("Overriding 'Express' logger");
Server.express.use(require('morgan')({ stream: logger.stream }));

Server.start(opts, () => {
  logger.info(`Server is running on http://${dbConfig.host}:${opts.port}`);
});

module.exports = Server;
