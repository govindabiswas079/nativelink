import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard, Products, Product, Profile , } from '../screens';
import { colors } from '../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNotification } from '../helpers/notification';
import { Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';


const AppStack = createNativeStackNavigator();
const Navigation = () => {
    const { token } = useNotification();
    const insets = useSafeAreaInsets();

    console.log("token", token)
    return (
        <AppStack.Navigator
            screenOptions={{
                orientation: "portrait",
                headerShown: false,
                statusBarBackgroundColor: colors.grey[200],
                statusBarStyle: "dark",
                statusBarTranslucent: true,
                animation: "slide_from_right",
                contentStyle: {
                    backgroundColor: colors.grey[200],
                    paddingTop: insets.top,
                }
            }}
        >
            <AppStack.Screen
                name="app/dashboard"
                component={Dashboard}
                options={{
                    animation: "none",
                    gestureEnabled: false,
                }}
            />
            <AppStack.Screen
                name="app/products"
                component={Products}
                options={{
                    animation: "none",
                    gestureEnabled: false,
                }}
            />

            <AppStack.Screen
                name="user/profile"
                component={Profile}
                options={{
                    animation: "none",
                    gestureEnabled: false,
                }}
            />

            <AppStack.Screen
                name="app/product"
                component={Product}
                options={{
                    animation: "slide_from_right",
                }}
            />
            
        </AppStack.Navigator>
    );
}

export default Navigation;
