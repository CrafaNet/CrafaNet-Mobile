import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import useBottomModal from "../hooks/useBottomModal";

import { Ionicons, AntDesign, Octicons } from "@expo/vector-icons";

import Button from "./Button";

import { logout } from "../store/auth";

import Colors from "../constants/colors";
import Strings from "../util/strings";
import Sizes from "../constants/sizes";

export default function AppHeader() {
    const [BottomModalMenu, showBottomModalMenu] = useBottomModal();
    const [BottomModalNotifications, showBottomModalNotifications] = useBottomModal();
    const navigation = useNavigation();
    const hasBackBtn = navigation.getState().index !== 0;
    const iconSize = 26;

    return (
        <View style={styles.container}>
            <View style={styles.headerRight}>
                {hasBackBtn && (
                    <Pressable style={styles.backBtn} onPress={navigation.goBack}>
                        <AntDesign name='left' size={24} color={Colors.primary500} />
                    </Pressable>
                )}
                <Text style={styles.title}>CrafaNet</Text>
                 {/*
                <LinearGradient colors={["#78ae82", "#52e722"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.beta}>
                    <Text style={styles.betaText}>BETA</Text>
                </LinearGradient>
                {/* delete this linear gradient and its children when out of beta version*/}
            </View>
            <View style={styles.headerLeft}>
                <Pressable onPress={showBottomModalNotifications}>
                    <Ionicons name='notifications-outline' size={iconSize} color={Colors.primary500} />
                </Pressable>
                <Pressable onPress={showBottomModalMenu}>
                    <Octicons name='arrow-switch' size={iconSize} color={Colors.primary500} />
                </Pressable>
            </View>

            <BottomModalMenu snapPoints={["40%"]}>
                <Button style={styles.logoutButton} mode='primary' onPress={logout}>
                    {Strings.logout}
                </Button>
            </BottomModalMenu>
            <BottomModalNotifications>
                <Text style={styles.bottomSheetTitle}>{Strings.notifications}</Text>
            </BottomModalNotifications>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerRight: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    backBtn: {},
    title: {
        fontFamily: "poppins-bold",
        color: Colors.primary500,
        fontSize: 24,
        marginTop:5
    },
    beta: {
        position: "absolute",
        bottom: -2,
        right: -20,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 4,
    },
    betaText: {
        fontFamily: "poppins-bold",
        color: "#092c3c",
    },
    headerLeft: {
        flexDirection: "row",
        gap: 10,
    },
    logoutButton: { marginTop: "auto" },
    bottomSheetTitle: {
        fontFamily: "poppins-bold",
        fontSize: Sizes.titleLarge,
    },
});
