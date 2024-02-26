import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons, AntDesign } from "@expo/vector-icons";

import Colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";

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
                <LinearGradient
                    colors={["#55fbeb", "#52e722"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.beta}
                >
                    <Text style={styles.betaText}>BETA</Text>
                </LinearGradient>
                {/* delete this linear gradient and its children when out of beta version*/}
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
});
