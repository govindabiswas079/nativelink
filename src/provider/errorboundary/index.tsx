import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import Typography from '../../components/typography';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error: ', error, errorInfo);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return (
                <View style={{ flex: 1, backgroundColor: colors.grey[200], justifyContent: "center", alignItems: "center" }}>
                    <Typography>Something went wrong.</Typography>
                </View>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
