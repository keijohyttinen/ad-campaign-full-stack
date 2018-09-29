/** @format */
import "@babel/polyfill";
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import Main from './src/view/main';

AppRegistry.registerComponent(appName, () => Main);
