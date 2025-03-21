import React from 'react';
import ErrorBoundary from './provider/errorboundary';
import SafeareaProvider from './provider/safeareaprovider';
import StoreProvider from './provider/storeprovider';
import NavigationProvider from './provider/navigation';
import Navigation from './navigation';

const App = () => {
    
    return (
        <ErrorBoundary>
            <StoreProvider>
                <SafeareaProvider>
                    <NavigationProvider>
                        <Navigation />
                    </NavigationProvider>
                </SafeareaProvider>
            </StoreProvider>
        </ErrorBoundary>
    );
}

export default App;
