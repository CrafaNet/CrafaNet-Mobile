import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

import Colors from "../constants/colors";
import Sizes from "../constants/sizes";

export default function Button({ children, style, mode = "text", onPress }) {
    const styles = styleModes[mode];
    const isSecondary = mode === "secondary";

    return (
        <Pressable onPress={onPress} style={[styles.container, style]}>
            <LinearGradient
                colors={gradientColorModes[mode]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            >
                <Text style={styles.text}>{children}</Text>
                {isSecondary && (
                    <AntDesign name='rightcircle' size={14} color='white' />
                )}
            </LinearGradient>
        </Pressable>
    );
}
const gradientColorModes = {
    primary: Colors.mainLinearGradient,
    secondary: [Colors.secondary500, Colors.secondary500],
    text: ["transparent", "transparent"],
};

const styleModes = {
    primary: StyleSheet.create({
        container: {
            height: 44,
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
            textTransform: "uppercase",
            fontFamily: "poppins-bold",
        },
    }),
    secondary: StyleSheet.create({
        container: {
            alignSelf: "baseline",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 999,
            overflow: "hidden",
        },
        gradient: {
            width: "100%",
            paddingHorizontal: 4,
            paddingVertical: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
        },
        text: {
            fontSize: Sizes.textSmall,
            color: "white",
            fontFamily: "poppins-bold",
        },
    }),
    text: StyleSheet.create({
        container: {
            margin: 4,
        },
        gradient: {},
        text: {
            color: Colors.coloredText,
            fontFamily: "poppins-",
        },
    }),
};
