import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../constants/colors";

export default function Button({ children, style, mode = "text", onPress }) {
    const styles = styleModes[mode];

    return (
        <Pressable onPress={onPress} style={[styles.container, style]}>
            <LinearGradient
                colors={gradientColorModes[mode]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            >
                <Text style={styles.text}>{children}</Text>
            </LinearGradient>
        </Pressable>
    );
}
const gradientColorModes = {
    primary: Colors.mainLinearGradient,
    text: ["transparent", "transparent"],
};

const styleModes = {
    primary: StyleSheet.create({
        container: {
            height: 26,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            overflow: "hidden",
        },
        gradient: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
        text: {
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
            textTransform: "uppercase",
        },
    }),
    text: StyleSheet.create({
        container: {
            margin: 4,
        },
        gradient: {},
        text: {
            color: Colors.coloredText,
        },
    }),
};
