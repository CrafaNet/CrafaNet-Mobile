import { Pressable, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

import Colors from "../constants/color";
import Sizes from "../constants/sizes";

export default function Button({
    children,
    style,
    mode = "text",
    onPress,
    disabled,
    isLoading,
    secondaryIconSide = "right",
}) {
    const styles = styleModes[mode];
    const isSecondary = mode === "secondary";

    const buttonOnPress = () => {
        if (disabled || isLoading) return;
        onPress();
    };

    return (
        <Pressable
            onPress={buttonOnPress}
            style={[styles.container, disabled && styles.disabled, style]}
        >
            <LinearGradient
                colors={
                    disabled
                        ? mode === "primary"
                            ? gradientColorModes.primaryDisabled
                            : gradientColorModes.disabled
                        : gradientColorModes[mode]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            >
                {isLoading && mode === "primary" && (
                    <ActivityIndicator size="small" color="#fff" />
                )}
                {isSecondary && secondaryIconSide === "left" && (
                    <AntDesign
                        style={{ transform: [{ rotate: "180deg" }] }}
                        name='rightcircle'
                        size={14}
                        color='white'
                    />
                )}
                {!isLoading && <Text style={styles.text}>{children}</Text>}
                {isSecondary && secondaryIconSide === "right" && (
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
    gray: ["#ddd", "#ddd"],
    disabled: ["#555", "#555"],
    primaryDisabled: ["#555", "#888"],
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
            fontWeight: "bold",
        },
    }),
    text: StyleSheet.create({
        container: {
            margin: 4,
        },
        gradient: {},
        text: {
            color: Colors.coloredText,
            fontWeight: "bold",
        },
    }),
    gray: StyleSheet.create({
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
            color: "#222",
            fontSize: 18,
            textTransform: "uppercase",
            fontWeight: "bold",
        },
    }),
};
