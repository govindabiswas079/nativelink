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
