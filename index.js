/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {name as appName} from './app.json';
import { theme } from './src/core/theme';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import messaging from '@react-native-firebase/messaging';

import { ToastProvider } from 'react-native-paper-toast';
import App from './App';

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

export default function Main() {
  return (
  	<SafeAreaProvider initialMetrics={initialWindowMetrics}>
    <PaperProvider theme={theme}>
       <ToastProvider>
        	<App />
        </ToastProvider>
    </PaperProvider>
    </SafeAreaProvider>
  );
}


AppRegistry.registerComponent(appName, () => Main);