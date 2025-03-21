import { NavigationContainerRef, NavigationContainerEventMap } from '@react-navigation/native';
import { createRef } from 'react';

// Create a navigation reference
export const navigationRef = createRef<NavigationContainerRef<any>>();

// Custom navigation functions

export const navigateTo = (screen: string, params?: any) => {
    navigationRef.current?.navigate(screen, params);
};

export const pushTo = (screen: string, params?: any) => {
    navigationRef.current?.dispatch({
        type: 'NAVIGATE',
        payload: { name: screen, params },
    });
};

export const goBack = () => {
    if (navigationRef.current?.canGoBack()) {
        navigationRef.current.goBack();
    }
};

export const replaceScreen = (screen: string, params?: any) => {
    navigationRef.current?.reset({
        index: 0,
        routes: [{ name: screen, params }],
    });
};

export const resetNavigation = (screen: string, params?: any) => {
    navigationRef.current?.reset({
        index: 0,
        routes: [{ name: screen, params }],
    });
};

export const setScreenParams = (params: any) => {
    navigationRef.current?.setParams(params);
};

export const isScreenFocused = () => {
    return navigationRef.current?.isFocused();
};

export const addNavListener = (event: keyof NavigationContainerEventMap, callback: () => void) => {
    return navigationRef.current?.addListener(event, callback);
};

export const canGoBack = () => {
    return navigationRef.current?.canGoBack();
};
