import { useNavigation, useRoute } from '@react-navigation/native';
import React, { Fragment } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { navigateTo } from '../../helpers/appnavigation';
import { Alert, Pressable, View } from 'react-native';
import { colors } from '../../theme/colors';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/linking';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "app/dashboard">
const BottomTab = () => {
    const route = useRoute();
    const navigation = useNavigation<NavigationProps>();
    const insets = useSafeAreaInsets();



    return (
        <View style={{ height: 60, backgroundColor: colors.grey[300], display: "flex", flexDirection: "row", paddingHorizontal: 20, alignItems: "center", justifyContent: "space-between", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
            <Pressable onPress={() => { navigation.navigate("app/dashboard") }} style={{ height: 60, width: 60, alignItems: "center", justifyContent: "center", }}>
                <MaterialCommunityIcons name='view-dashboard' size={22} color={route.name === "app/dashboard" ? colors.primary.main : colors.grey[900]} />
            </Pressable>
            <Pressable onPress={() => { navigation.navigate("app/products") }} style={{ height: 60, width: 60, alignItems: "center", justifyContent: "center", }}>
                <Ionicons name='notifications' size={22} color={route.name === "app/products" ? colors.primary.main : colors.grey[900]} />
            </Pressable>
            <Pressable onPress={() => { navigation.navigate("user/profile") }} style={{ height: 60, width: 60, alignItems: "center", justifyContent: "center", }}>
                <FontAwesome name='user-o' size={22} color={route.name === "user/profile" ? colors.primary.main : colors.grey[900]} />
            </Pressable>
        </View>
    );
}

export default BottomTab;
