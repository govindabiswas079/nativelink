import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/linking';

type RouteProps = RouteProp<RootStackParamList, "app/product">;

const Product = () => {
    const route = useRoute<RouteProps>();
    const productData =  {
        title: "Sample Product",
        description: "This is a sample product description.",
        price: "$199.99",
        date: new Date().toDateString()
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{productData.title}</Text>
            <Text style={styles.description}>{productData.description}</Text>
            <Text style={styles.price}>{productData.price}</Text>
            <Text style={styles.date}>Date: {productData.date}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8
    },
    description: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
        marginBottom: 8
    },
    date: {
        fontSize: 14,
        color: '#888'
    }
});

export default Product;
