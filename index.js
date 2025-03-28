/**
 * @format
 */

import { Alert, AppRegistry, Linking } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
