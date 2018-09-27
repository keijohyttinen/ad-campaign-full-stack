
## Ad Campaign App

# Make Development build in Mac

`yarn run relay --watch`  <-- compile relay continuously with watch

`react-native run-ios`

# Watch console logs

`react-native log-ios`

# Generate new icons

 - place icon.png to root folder
 - run : `yarn icon`

 See https://github.com/dwmkerr/app-icon

 # Design and Implementation

 Design and implementation is based on Relay Modern GraphQL client framework. Apollo Client was considered as an option but in this time Relay Modern was selected even though Apollo is simpler to learn especially with redux background (see https://www.howtographql.com/react-apollo/0-introduction/). 
 
 Main reason to select Relay Modern was to challenge myself to learn something new. Learning Relay Modern also will bring up chance to be able to compare truly two options and to select better GraphQL client framework depending on the case. It seemed like Relay Modern is highly performance optimized & comes with automated server sync and therefore suitable for bigger projects whereas Apollo client is better for smaller projects as it's easier to use (especially with redux) and learn but on the other hand, does not offer auto server sync, for instance. (source: https://blog.smartlogic.io/comparing-relay-modern-and-apollo-graphql-client-frameworks/)
