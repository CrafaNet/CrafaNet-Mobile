import { StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/colors";

export default function AppHeader() {
    const iconSize = 26;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CrafaNet</Text>
            <View style={styles.actions}>
                <Ionicons
                    name='notifications-outline'
                    size={iconSize}
                    color={Colors.primary500}
                />
                <Ionicons
                    name='chatbubble-outline'
                    size={iconSize}
                    color={Colors.primary500}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontFamily: "poppins-bold",
        color: Colors.primary500,
        fontSize: 24,
    },
    actions: {
        flexDirection: "row",
        gap: 10,
    },
});
