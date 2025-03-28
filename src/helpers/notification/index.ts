import { useEffect } from "react";
import { Alert, Linking, Platform } from "react-native";
import notifee, { EventType } from '@notifee/react-native';
import { useFirebaseMessaging } from "../../hooks/usePushNotifications";
import { useNavigation } from "@react-navigation/native";

export const useNotification = () => {
    const navigation = useNavigation();
    const { token, permissionStatus, requestPermission, refreshToken } = useFirebaseMessaging();

    useEffect(() => {
        if (Platform.OS === "android") {
            const setupMessaging = async () => {
                if (permissionStatus === 'unknown') {
                    const granted = await requestPermission();
                    if (granted) {
                        await refreshToken();
                    } else {
                        Alert.alert(
                            'Push Notifications',
                            'We need your permission to send you important updates. You can enable notifications in your device settings.',
                            [{ text: 'OK' }],
                        );
                    }
                }
            };

            setupMessaging();

            const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
                
                switch (type) {
                    case EventType.DISMISSED:
                        console.log('User dismissed notification', detail.notification);
                        break;
                    case EventType.PRESS:
                        console.log('User pressed notification', detail);
                        Linking.openURL(`nativelink://${detail.notification?.data?.screen}`)
                        break;
                    case EventType.ACTION_PRESS:
                        break;
                    case EventType.APP_BLOCKED:
                        break;
                    case EventType.CHANNEL_BLOCKED:
                        break;
                    case EventType.CHANNEL_GROUP_BLOCKED:
                        break;
                    case EventType.DELIVERED:
                        break;
                    case EventType.FG_ALREADY_EXIST:
                        break;
                    case EventType.TRIGGER_NOTIFICATION_CREATED:
                        break;
                    case EventType.UNKNOWN:
                        break;
                }
            });

            return () => unsubscribe();
        }
    }, [permissionStatus, requestPermission, refreshToken]);

    return { token }
}