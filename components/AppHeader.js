import { StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons, AntDesign } from "@expo/vector-icons";

import Colors from "../constants/colors";

export default function AppHeader() {
    const navigation = useNavigation();
    const hasBackBtn = navigation.getState().index !== 0;
    const iconSize = 26;

    return (
        <View style={styles.container}>
            <View style={styles.headerRight}>
                {hasBackBtn && (
                    <Pressable
                        style={styles.backBtn}
                        onPress={navigation.goBack}
                    >
                        <AntDesign
                            name='left'
                            size={24}
                            color={Colors.primary500}
                        />
                    </Pressable>
                )}
                <Text style={styles.title}>CrafaNet</Text>
            </View>
            <View style={styles.headerLeft}>
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
    },
    headerLeft: {
        flexDirection: "row",
        gap: 10,
    },
});
