## Ad Campaign Backend

### Running locally

- Use `docker-compose up` to setup mongodb.
- Use `yarn test` to run backend unit tests when mongodb is running
- Use `yarn dev` to start the backend server in Developer Mode.

### Building it and Serving it for Production:

- Use `yarn build` to compile it with babel
- Use `yarn serve` to run the backend server.

### Dependencies:

- Graphql-Yoga https://github.com/prisma/graphql-yoga
- MondoDB
- Mongoose https://mongoosejs.com
- Babel
- Nodemon
- gridfs-promise https://github.com/larsdecker/gridfs-promise
- winston https://www.npmjs.com/package/winston
- Mocha 

# Design & Implementation

## API

API offered by server is based on GraphQL https://graphql.org. GraphQL is a query language for APIs and a runtime for fulfilling those queries with data. All queries or mutations are served via single API endpoint /graphql.

Backend server is based on Graphql-Yoga library which uses express (https://www.npmjs.com/package/express) in the background. The MongoDB example of Graphql-Yoga (see https://github.com/prisma/graphql-yoga/tree/master/examples/mongodb) was taken as a starter to backend implementation.

Schema file of graphql can be found at src/schema.graphql

## Images

Images are stored into MondoDB with GridFS. Express server is configured to listen /images endpoint for client to download image by name. Server implementation fetches image stream by name from MondoDB with the help of a promisified library called gridfs-promise, and return image in a stream to the client.

## Configuration

Configuration is stored in config folder. Defaults are in default.json and production configuration can be configured in production.json.

## Logging

Logging is based on winston library that offers file transports for errors and all logs but also console debug logs in a non-production configuration.

## Unit tests

Unit tests are implemented by using mocha test framework and decided not to mock MondoDB to see earlier possible integration issues with MongoDB. Also it would be somewhat extra work and cumbersome to write mocks even with help of some mock library especially when docker enables easy and fast setup for MongoDB instance running at localhost. Therefore it's required to run MongoDB for passing unit tests succesfully.
