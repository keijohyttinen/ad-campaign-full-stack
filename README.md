
# Ad Campaign Full Stack

## Quick start for testing full stack in development

Install dependencies, start mondoDB and backend server in localhost
```
cd backend; yarn install
cd backend; docker-compose up   #open MondoDB in a terminal
cd backend; yarn dev            #open Graphql server in a terminal
```
Install dependencies and start react native app
```
cd app; yarn install
cd app; react-native link
cd app; yarn start              #open server in a terminal
```

# Requirements for System Concept

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

# Style guide

Airbnb javascript style guide followed in this project (https://github.com/airbnb/javascript).
Both sub-projects app and backend are using eslint configuration as part of yarn. Auto correction feature based on eslint rules were utilized in Visual Code editor with a plugin.

# Code Style Principles

ES6 features enabled with Babel 7.

# Dependency management

Dependencies are managed with Yarn, which biggest benefit over npm is that with help of lock file it can guarantee exactly same versions of the dependencies are loaded when installed dependencies from the scratch.
