
## Ad Campaign App

# Install

``` 
yarn install
react-native link
``` 

# Development build in Mac

``` 
yarn run relay --watch   # compile relay, continuously with watch option
yarn test                # run unit tests
yarn ios                 # run ios react native
``` 

Hin: when using Visual Code with a react native plugin can trigger apps within editor.

## Run with Production Config
``` 
yarn ios-prod            # run ios react native with production config
``` 

# Watch console logs

`react-native log-ios`

# Useful commands

when having weird issues in with React native, suggest to reset tranform cache by
`react-native start --reset-cache`

# Generate new icons

 - place icon.png to root folder
 - run : `yarn icon`

 See https://github.com/dwmkerr/app-icon

 # Design and Implementation

 Design and implementation is based on Relay Modern GraphQL client framework. Apollo Client was considered as an option but in this time Relay Modern was selected even though Apollo seemed to be simpler to learn especially with redux background (see https://www.howtographql.com/react-apollo/0-introduction/). 

 Main reason to select Relay Modern was to challenge myself to learn something new. Learning Relay Modern also will bring up chance to be able to compare truly two options and to select better GraphQL client framework depending on the case. It seemed like Relay Modern is highly performance optimized & comes with automated server sync and therefore suitable for bigger projects whereas Apollo client is better for smaller projects as it's easier to use (especially with redux) and learn but on the other hand, does not offer auto server sync, for instance. (source: https://blog.smartlogic.io/comparing-relay-modern-and-apollo-graphql-client-frameworks/)

## API Schema

Schema file of graphql can be found at [config/schema.graphql] (https://github.com/keijohyttinen/ad-campaign-full-stack/blob/master/app/config/schema.graphql).
Keep it inline with backend schema, which is currently duplicated under backend's nodejs project.

 ## Configurations

 Two config files provides:
 1. Development: `.env`
 2. Production: `.env.prod`

## Date and Time

Date and time is received epoc time in string format due to limitation of big integers in GraphQL API.
Other options to manage date and time are as follows:
1. use big integer format and use custom field in schema of GraphQL API or
2. use ISO date format (string) for date and time

## Testing

Unit tests are implemented with jest and react-test-renderer, which provide only sanity checking for some of the UI components rendering. However, the deeper functionality unit tests are missing at the time being since React native with GraphQL would need more work in test framework side. In TODO list are e.g. mock responses and wait until rendering done with mocked data would be done. For instance, React in web environment offers good tools to make proper unit tests even if using GraphQL, see example https://github.com/zth/relay-modern-flow-jest-example. Similar approach should be taken in React native+GraphQL and actually some actions have been taken already, see https://github.com/thchia/rn-testing-library-example.

Until unit test framework does not provide proper means to verify implementation quickly with good coverage, the developer shall setup backend server API and mongo DB running in localhost. By refreshing javascript modifications in the Simulator, the developer can also get feedback about functionality.

Moreover, the integration tests should be designed as well. It would be optimal if unit tests could be run with mocked data responses but the very same tests + more tests could be run against real backend with pre-defined database content. Interation tests could be run locally by developer and later on also CI automation system could verify the functionalities by running the same tests.
