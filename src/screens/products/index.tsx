import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Typography from '../../components/typography';
import BottomTab from '../../components/bottomtab';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/linking';

interface INotification {
    id: string;
    title: string;
    description: string;
    image: string;
    date: string;
    isRead: boolean;
}

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "app/products">;

const Products = () => {
    const navigation = useNavigation<NavigationProps>();
    const [notifications, setNotifications] = useState<INotification[]>([]);

    useEffect(() => {
        (async () => {
            const getNotifications = await EncryptedStorage.getItem("Notification");
            if (getNotifications) {
                const data: INotification[] = JSON.parse(getNotifications);
                setNotifications(data || []);
            } else {
                setNotifications([]);
            }
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Typography variant="MediumTextRegular">Notifications</Typography>

            {/* Notifications List */}
            <FlatList
                data={notifications}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.notificationItem, item.isRead ? styles.read : styles.unread]}
                        onPress={() => navigation.navigate("app/product", { _product: item.id })}
                    >
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.date}>{new Date(item.date).toDateString()}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContainer}
                keyExtractor={(item) => item.id}
            />

            <BottomTab />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listContainer: {
        paddingHorizontal: 16,
    },
    notificationItem: {
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    date: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    unread: {
        backgroundColor: '#e3f2fd',
    },
    read: {
        backgroundColor: '#e0e0e0',
    },
});

export default Products;
