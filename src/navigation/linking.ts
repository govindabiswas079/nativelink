import { Linking } from 'react-native';
import { LinkingOptions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';


const NAVIGATION_IDS: string[] = ['customer/dashboard', 'transaction/history', 'loan/schemes', 'loan/repay', 'loan/renew', 'user/profile', 'loan/calculator', 'customer/support',];
function buildDeepLinkFromNotificationData(data: any): string | null {
    const navigationId = data?.navigationId;
    if (!NAVIGATION_IDS.includes(navigationId)) {
        return null;
    }
    if (navigationId === 'home') {
        return 'app://nativelink.app/home';
    }
    if (navigationId === 'settings') {
        return 'app://nativelink.app/settings';
    }
    const postId = data?.postId;
    if (typeof postId === 'string') {
        return `app://nativelink.app/post/${postId}`
    }
    return null
}

export type RootStackParamList = {
    ["app/dashboard"]: undefined,
    ["app/products"]: undefined,
    ["app/product"]: { _product: string },
    ["user/profile"]: undefined,
};

export const linking: LinkingOptions<RootStackParamList> = {
    prefixes: ['nativelink://'],
    config: {
        screens: {
            ["app/dashboard"]: { path: "app/dashboard", },
            ["app/products"]: { path: "app/products", },
            ["app/product"]: { path: "app/product/:_product", },
            ["user/profile"]: { path: "user/profile", },

        }
    },


    // async getInitialURL() {
    //   const url = await Linking.getInitialURL();
    //   if (typeof url === 'string') {
    //     return url;
    //   }
    //   //getInitialNotification: When the application is opened from a quit state.
    //   const message = await messaging().getInitialNotification();
    //   const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    //   if (typeof deeplinkURL === 'string') {
    //     return deeplinkURL;
    //   }
    // },
    // subscribe(listener: (url: string) => void) {
    //   const onReceiveURL = ({ url }: { url: string }) => listener(url);

    //   // Listen to incoming links from deep linking
    //   const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    //   //onNotificationOpenedApp: When the application is running, but in the background.
    //   const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
    //     console.log("remoteMessage", remoteMessage)
    //     const url = buildDeepLinkFromNotificationData(remoteMessage.data)
    //     if (typeof url === 'string') {
    //       listener(url)
    //     }
    //   });

    //   return () => {
    //     linkingSubscription.remove();
    //     unsubscribe();
    //   };
    // },
}