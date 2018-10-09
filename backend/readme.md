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
- Babel CLI (npm install -g babel-cli)

# Design & Implementation

## API

API offered by server is based on GraphQL https://graphql.org. GraphQL is a query language for APIs and a runtime for fulfilling those queries with data. All queries or mutations are served via single API endpoint /graphql.

Backend server is based on Graphql-Yoga library which uses express (https://www.npmjs.com/package/express) in the background. The MongoDB example of Graphql-Yoga (see https://github.com/prisma/graphql-yoga/tree/master/examples/mongodb) was taken as a starter to backend implementation.

Schema file of graphql can be found at [src/graphql/schema.graphql] (https://github.com/keijohyttinen/ad-campaign-full-stack/blob/master/backend/src/graphql/schema.graphql).
Keep it inline with front-end, which is currently duplicate located under app's react native project.

At the time being only query interface supported but placeholder implementation for mutations also exist.

## Images

Images are stored into MondoDB with GridFS. Express server is configured to listen /images endpoint for client to download image by name. Server implementation fetches image stream by name from MondoDB with the help of a promisified library called gridfs-promise, and return image in a stream to the client. The downside of the DB based solution is that load of image downloads goes via API nodes and database. The better approach for serving the images would be use of AWS S3 or GCP Storage and inform URL of images via API. 

## Configuration

Configuration is stored in config folder. Defaults are in default.json and production configuration can be configured in production.json.

## Logging

Logging is based on winston library that offers file transports for errors and info logs but also console debug logs in a non-production configuration.

## Unit tests

Unit tests are implemented by using mocha test framework and decided not to mock MondoDB to see as early as possible integration issues with MongoDB. Also it would be somewhat extra work and cumbersome to write mocks even with help of some mock library especially when docker enables easy and fast setup for MongoDB instance running at localhost. Basically, from developer point of view, the verification of the backend change can be still done easily and fast even if mongoDB dependency exist. Benefit of requiring mondoDB for unit tests is that there is no need to do further dedicated middle-integration tests for a backend change with mongoDB after unit tests - but developer can focus on system integration tests between client and backend which covers database. Therefore decided to require MongoDB with docker-compose for passing unit tests succesfully.
