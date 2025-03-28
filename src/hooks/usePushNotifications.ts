import { useState, useEffect, useCallback } from 'react';
import { Linking, Platform } from 'react-native';
import messaging, { FirebaseMessagingTypes, } from '@react-native-firebase/messaging';
import notifee, { EventType, AndroidImportance, AndroidStyle } from '@notifee/react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

type PermissionStatus = 'granted' | 'denied' | 'unknown';

interface UseFirebaseMessagingReturn {
  token: string | null;
  permissionStatus: PermissionStatus;
  requestPermission: () => Promise<boolean>;
  refreshToken: () => Promise<void>;
}

export const useFirebaseMessaging = (): UseFirebaseMessagingReturn => {
  const [token, setToken] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus>('unknown');

  const requestPermission = useCallback(async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      setPermissionStatus(enabled ? 'granted' : 'denied');
      return enabled;
    } catch (error) {
      console.error('Failed to request permission', error);
      setPermissionStatus('denied');
      return false;
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const freshToken = await messaging().getToken();
      setToken(freshToken);
    } catch (error) {
      console.error('Failed to get FCM token', error);
    }
  }, []);

  const createDefaultChannel = useCallback(async () => {
    if (Platform.OS === 'android') {
      try {
        const channelId = await notifee.createChannel({
          id: 'default_channel',
          name: 'Default Channel',
          importance: AndroidImportance.HIGH,
        });
        console.log('Default channel created:', channelId);
      } catch (error) {
        console.error('Failed to create default channel:', error);
      }
    }
  }, []);

  const displayNotification = useCallback(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {

    try {
      const channelId = await notifee.createChannel({
        id: 'default_channel',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        sound: 'default',
      });

      const notificationId = await notifee.displayNotification({
        title: remoteMessage?.notification?.title as string || remoteMessage?.data?.title as string,
        body: remoteMessage?.notification?.body as string || remoteMessage?.data?.body as string,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'default',
            launchActivity: "default"
          },
          style: {
            type: AndroidStyle.BIGTEXT,
            text: "text",
            title: remoteMessage?.data?.title as string,
            summary: remoteMessage?.data?.body as string,
            // picture: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
          },
          sound: 'default',
          actions: [],
        },
        data: remoteMessage?.data,
        ios: {
          sound: 'default',
          attachments: []
        },
      });
      console.log('Notification displayed with ID:', notificationId);
    } catch (error) {
      console.error('Failed to display notification:', error);
    }
  },
    [],
  );

  useEffect(() => {
    const initializeMessaging = async () => {
      await createDefaultChannel();
      await requestPermission();
      if (permissionStatus === 'granted') {
        await refreshToken();
      }
    };

    initializeMessaging();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("remoteMessage", JSON.stringify(remoteMessage?.notification?.title))
      const data = {
        id: remoteMessage?.messageId || "",
        title: remoteMessage?.notification?.title || remoteMessage?.data?.title,
        description: remoteMessage?.notification?.body || remoteMessage?.data?.body,
        image: remoteMessage?.notification?.image || remoteMessage?.data?.image,
        date: new Date(),
        isRead: false,
      }

      const getNotifications = await EncryptedStorage.getItem("Notification")
      if (getNotifications) {
        const notifications = JSON.parse(getNotifications)
        EncryptedStorage.setItem("Notification", JSON.stringify(
          [
            ...notifications,
            data
          ]
        ))
      } else {
        EncryptedStorage.setItem("Notification", JSON.stringify([data]))
      }
      await displayNotification(remoteMessage);
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log("remoteMessage", JSON.stringify(remoteMessage))
      const data = {
        id: remoteMessage?.messageId || "",
        title: remoteMessage?.notification?.title || remoteMessage?.data?.title,
        description: remoteMessage?.notification?.body || remoteMessage?.data?.body,
        image: remoteMessage?.notification?.image || remoteMessage?.data?.image,
        date: new Date(),
        isRead: false,
      }
      const getNotifications = await EncryptedStorage.getItem("Notification")
      if (getNotifications) {
        const notifications = JSON.parse(getNotifications)
        EncryptedStorage.setItem("Notification", JSON.stringify(
          [
            ...notifications,
            data
          ]
        ))
      } else {
        EncryptedStorage.setItem("Notification", JSON.stringify([data]))
      }

      console.log('Background message received:', remoteMessage);
      await displayNotification(remoteMessage);
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
        }
      });

    const unsubscribeTokenRefresh = messaging().onTokenRefresh(newToken => {
      setToken(newToken);
    });

    // Handle notification when app is completely killed and opened via notification click
    async function checkInitialNotification() {
      const initialNotification = await notifee.getInitialNotification();
      if (initialNotification) {
        console.log('App opened from killed state:', initialNotification);
        const screen = initialNotification.notification?.data?.screen;
        if (screen) {
          Linking.openURL(`nativelink://${screen}`)
        }
      }
    }

    checkInitialNotification();

    // Set up Notifee background event handler
    notifee.onBackgroundEvent(async ({ type, detail }) => {
      const { notification, pressAction } = detail;
      console.log('Background event: =>', detail);
      switch (type) {
        case EventType.PRESS:
          Linking.openURL(`nativelink://${detail.notification?.data?.screen}`)
          console.log('User pressed the notification:', detail);

          break;
        case EventType.ACTION_PRESS:
          console.log('User pressed an action:', detail.pressAction?.id);
          break;
      }
    });

    return () => {
      unsubscribe();
      unsubscribeTokenRefresh();
    };
  }, [
    requestPermission,
    refreshToken,
    permissionStatus,
    createDefaultChannel,
    displayNotification,
  ]);

  return {
    token,
    permissionStatus,
    requestPermission,
    refreshToken,
  };
};