import React, { useCallback, useEffect } from 'react';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import ErrorBoundary from './provider/errorboundary';
import SafeareaProvider from './provider/safeareaprovider';
import StoreProvider from './provider/storeprovider';
import NavigationProvider from './provider/navigation';
import Navigation from './navigation';
import { Alert, AppState, Linking } from 'react-native';
import notifee, { EventType, AndroidImportance, AndroidStyle } from '@notifee/react-native';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification, { Importance } from "react-native-push-notification";

const App = () => {

    useEffect(() => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },
            onNotification: function (notification) {
                console.log("NOTIFICATION:", notification);
                notification.finish(PushNotificationIOS.FetchResult.NoData);
                if (notification.userInteraction) {
                    console.log("Notification Clicked:", notification);
                    Alert.alert("onNotification click")
                }
            },
            onAction: function (notification) {
                Alert.alert("onAction click")
                console.log("ACTION:", notification.action);
                console.log("NOTIFICATION:", notification);
            },
            onRegistrationError: function (err) {
                console.error(err.message, err);
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
    }, []);

    const displayNotification = useCallback((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        PushNotification.createChannel({
            channelId: "default_channel",
            channelName: 'Default Channel',
            importance: Importance.HIGH,
            vibrate: true,
            playSound: true,
        }, () => { });

        PushNotification.localNotification({
            title: remoteMessage?.notification?.title,
            message: remoteMessage?.notification?.body as string,
            picture: remoteMessage?.notification?.image
        });
    }, []);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('Foreground message received:', remoteMessage);
            await displayNotification(remoteMessage);
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Background message received:', remoteMessage);
            await displayNotification(remoteMessage);
        });

        // Listen when the app is in the background and opened by a notification

    return () => unsubscribe();

        return () => {
            unsubscribe();
        };
    }, []);


    useEffect(() => {
        const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
            if (remoteMessage) {
                Alert.alert(`App opened from background notification: ${JSON.stringify(remoteMessage)}`);
            }
        });
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    Alert.alert(`getInitialNotification ${remoteMessage}`)
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage,
                    );
                }
            });
            return () => unsubscribe()
    }, [])
    return (
        <ErrorBoundary>
            <NavigationProvider>
                <StoreProvider>
                    <SafeareaProvider>
                        <Navigation />
                    </SafeareaProvider>
                </StoreProvider>
            </NavigationProvider>
        </ErrorBoundary>
    );
}

export default App;
