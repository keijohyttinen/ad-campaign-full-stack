
# Ad Campaign Full Stack

Full stack application with React Native front.end and Nodejs/MongoDB backend.
Development was done in Mac OS (10.13.6) environment and only iOS simulator builds were done during the development.

## Quick start for testing full stack in development

Install dependencies, start mondoDB and backend server in localhost
```
cd backend;
 yarn install
 docker-compose up   #open MondoDB in a terminal
 yarn dev            #open Graphql server in a terminal
```
[See backend instructions in backend/README.md](https://github.com/keijohyttinen/ad-campaign-full-stack/blob/master/backend/readme.md)

Install dependencies and start react native app
```
cd app;
 yarn install
 react-native link
 yarn run relay        #generate relay files
 yarn ios              #build & open iOS simulator
```
[See app instructions in app/README.md](https://github.com/keijohyttinen/ad-campaign-full-stack/blob/master/app/README.md)

# High Level Requirements

Requirements for backend
- Docker
- Yarn  
- Nodejs
- Graphql
- Mongoose/MongoDB

Requirements for app
- Relay Modern
- Graphql
- React Native

Mac:
- Xcode 9.4.1

# Baseline and Starter Kit used

The implementation was started with a started kit available at https://github.com/luiscript/facebook-arsenal

# Style guide

Airbnb javascript style guide followed in this project (https://github.com/airbnb/javascript).
Both sub-projects app and backend are using eslint configuration as part of yarn. Auto correction feature based on eslint rules were utilized in Visual Code editor with a plugin.

# Source Code

Javascript ES6 features enabled with Babel 7.

# Dependency management

Dependencies are managed with Yarn, which biggest benefit over npm is that with help of lock file it can guarantee exactly same versions of the dependencies are loaded when installed dependencies from the scratch.
