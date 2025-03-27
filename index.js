/**
 * @format
 */

import { Alert, AppRegistry, Linking } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import notifee, { EventType } from '@notifee/react-native';

// Handle Notifee background event
notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    // Send a local notification to verify the event is triggered
    await notifee.displayNotification({
        title: 'Background Event Triggered',
        body: `Event Type: ${type}`,
        android: {
            channelId: 'default_channel',
            importance: 4,
        },
    });
    
    console.log('🔴 Background event triggered:', type, notification, pressAction);

    switch (type) {
        case EventType.PRESS:
            console.log('🌐 Opening deep link:', "nativelink://app/product/12345");
            Linking.openURL("nativelink://app/product/12345");
            break;
        case EventType.ACTION_PRESS:
            console.log('✅ User pressed an action:', detail.pressAction?.id);
            break;
    }
});

AppRegistry.registerComponent(appName, () => App);
