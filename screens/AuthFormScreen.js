import { useState } from "react";
import { Image, StyleSheet, Text, View, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskInput, { Masks } from "react-native-mask-input";

import { Ionicons } from "@expo/vector-icons";

import Button from "../components/Button";

import Colors from "../constants/colors";
import Styles from "../constants/styles";
import Strings from "../util/strings";

const modes = {
    login: {
        title: Strings.login,
        image: require("../assets/illustrations/login.png"),
    },
};

export default function AuthFormScreen() {
    const [mode, setMode] = useState("login");
    const [phone, setPhone] = useState("");

    return (
        <LinearGradient
            colors={Colors.mainLinearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.background}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={modes[mode].image}
                    resizeMode='contain'
                    style={styles.image}
                />
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.title}>{modes[mode].title}</Text>
                <MaskInput
                    style={Styles.textInput}
                    value={phone}
                    onChangeText={(_, unmasked) => setPhone(unmasked)}
                    mask={Masks.USA_PHONE}
                    showObfuscatedValue={true}
                />
                <TextInput style={Styles.textInput} />

                <Button mode='text' style={styles.forgotPassword}>
                    {Strings.forgotPassword}
                </Button>
                <Button mode='primary' style={styles.confirmButton}>
                    {Strings.connect}
                </Button>
                <Text style={{ marginTop: 18 }}>
                    {Strings.youDontHaveAnAccount}
                </Text>
                <Button mode='text'>{Strings.createNewAccount}</Button>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "76%",
    },
    formContainer: {
        backgroundColor: "white",
        marginTop: "auto",
        paddingHorizontal: 68,
        paddingVertical: 40,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.coloredText,
        marginBottom: 20,
        textTransform: "uppercase",
    },
    forgotPassword: {
        alignSelf: "flex-end",
        marginBottom: 10,
    },
    confirmButton: {
        width: "100%",
        height: 44,
    },
});
