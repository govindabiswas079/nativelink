import React, { Fragment } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const SafeareaProvider = ({ children }: { children?: React.ReactNode }) => {

    return (
        <SafeAreaProvider>
            {children}
        </SafeAreaProvider>
    )
}

export default SafeareaProvider