import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dashboard, Products, Product, Profile } from '../screens';
import { colors } from '../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AppStack = createNativeStackNavigator();
const Navigation = () => {
    const insets = useSafeAreaInsets();

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
                name="app/product"
                component={Product}
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
        </AppStack.Navigator>
    );
}

export default Navigation;
