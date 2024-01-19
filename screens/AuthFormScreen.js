import { useState, useRef, useEffect } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { formatWithMask, Masks } from "react-native-mask-input";
import Checkbox from "expo-checkbox";
import { CountryPicker } from "react-native-country-codes-picker";

import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

import Button from "../components/Button";

import Colors from "../constants/colors";
import Styles from "../constants/styles";
import Strings from "../util/strings";

const loginIllustration = require("../assets/illustrations/login.png");
const registerIllustration = require("../assets/illustrations/register.png");
const resetPasswordIllustration = require("../assets/illustrations/resetPassword.png");
const verifiedIllustration = require("../assets/illustrations/verified.png");

const modes = {
    login: {
        title: Strings.login,
        buttonTitle: Strings.connect,
        image: loginIllustration,
        phone: true,
        password: true,
        forgotPassword: true,
        notHaveAnAccount: true,
    },
    register: {
        title: Strings.register,
        buttonTitle: Strings.joinUs,
        image: registerIllustration,
        name: true,
        phone: true,
        password: true,
        terms: true,
        haveAnAccount: true,
    },
    resetPassword: {
        title: Strings.resetPassword,
        buttonTitle: Strings.sendCode,
        image: resetPasswordIllustration,
        phone: true,
        notHaveAnAccount: true,
        iRemember: true,
    },
    resetPasswordCode: {
        title: Strings.resetPassword,
        buttonTitle: Strings.reset,
        image: resetPasswordIllustration,
        newPassword: true,
        notHaveAnAccount: true,
        iRemember: true,
        resetCode: true,
    },
    confirmAccount: {
        title: Strings.confirmAccount,
        buttonTitle: Strings.confirm,
        image: verifiedIllustration,
        haveAnAccount: true,
        confirmCode: true,
    },
};

export default function AuthFormScreen() {
    const phoneRef = useRef(null);
    const [mode, setMode] = useState("confirmAccount");
    const [name, setName] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneValue, setPhoneValue] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [tacChecked, setTacChecked] = useState(false);
    const [showCountrySelector, setShowCountrySelector] = useState(false);
    const [resetCode, setResetCode] = useState("");
    const [confirmCode, setConfirmCode] = useState("");

    const phoneNumberOnChangeTextHandler = (text = "") => {
        text = text.slice(countryCode.length).trim();
        const formatWithMaskConfig = { text, mask: Masks.USA_PHONE };
        const { masked, unmasked } = formatWithMask(formatWithMaskConfig);
        setPhone(unmasked);
        setPhoneValue(
            countryCode || phone ? `${countryCode || ""} ${masked}` : ""
        );
    };

    useEffect(() => {
        phoneNumberOnChangeTextHandler(phoneRef?.current?.value);
    }, [countryCode]);

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
                {modes[mode].name && (
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name='person-circle-outline'
                            size={20}
                            color='black'
                            style={[
                                styles.inputIcon,
                                { display: name ? "none" : "flex" },
                            ]}
                        />
                        <TextInput
                            style={Styles.textInput}
                            value={name}
                            placeholder={`       ${Strings.name}`}
                            onChangeText={setName}
                        />
                    </View>
                )}
                {modes[mode].phone && (
                    <>
                        <CountryPicker
                            style={styles.countryCodePicker}
                            show={showCountrySelector}
                            pickerButtonOnPress={(item) => {
                                setCountryCode(item.dial_code);
                                setShowCountrySelector(false);
                                phoneRef.current.focus();
                            }}
                        />
                        <View style={styles.inputContainer}>
                            <Feather
                                name='phone'
                                size={20}
                                color='black'
                                style={[
                                    styles.inputIcon,
                                    {
                                        display:
                                            countryCode || phone
                                                ? "none"
                                                : "flex",
                                    },
                                ]}
                            />
                            <TextInput
                                ref={phoneRef}
                                style={Styles.textInput}
                                value={phoneValue}
                                placeholder={`       ${Strings.phoneNumber}`}
                                onChangeText={phoneNumberOnChangeTextHandler}
                                keyboardType='numeric'
                                onPressIn={() => setShowCountrySelector(true)}
                            />
                        </View>
                    </>
                )}
                {modes[mode].resetCode && (
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name='barcode-outline'
                            size={20}
                            color='black'
                            style={[
                                styles.inputIcon,
                                { display: resetCode ? "none" : "flex" },
                            ]}
                        />
                        <TextInput
                            style={Styles.textInput}
                            value={resetCode}
                            placeholder={`       ${Strings.resetCode}`}
                            onChangeText={setResetCode}
                            keyboardType='numeric'
                        />
                    </View>
                )}
                {(modes[mode].password || modes[mode].newPassword) && (
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name='lock-closed-outline'
                            size={20}
                            color='black'
                            style={[
                                styles.inputIcon,
                                { display: password ? "none" : "flex" },
                            ]}
                        />
                        <TextInput
                            style={Styles.textInput}
                            value={password}
                            placeholder={`       ${
                                modes[mode].newPassword
                                    ? Strings.newPassword
                                    : Strings.password
                            }`}
                            onChangeText={setPassword}
                            secureTextEntry={!passwordVisible}
                        />
                        <Pressable
                            onPress={() => setPasswordVisible((prev) => !prev)}
                            style={[
                                styles.inputIcon,
                                { left: "initial", right: 10 },
                            ]}
                        >
                            <Ionicons
                                name={passwordVisible ? "eye-off" : "eye"}
                                size={20}
                                color='black'
                            />
                        </Pressable>
                    </View>
                )}
                {modes[mode].confirmCode && (
                    <View style={styles.inputContainer}>
                        <Octicons
                            name='verified'
                            size={20}
                            color='black'
                            style={[
                                styles.inputIcon,
                                { display: confirmCode ? "none" : "flex" },
                            ]}
                        />
                        <TextInput
                            style={Styles.textInput}
                            value={confirmCode}
                            placeholder={`       ${Strings.confirmCode}`}
                            onChangeText={setConfirmCode}
                            keyboardType='numeric'
                        />
                    </View>
                )}
                {modes[mode].forgotPassword && (
                    <Button
                        mode='text'
                        style={styles.forgotPassword}
                        onPress={() => setMode("resetPassword")}
                    >
                        {Strings.forgotPassword}
                    </Button>
                )}
                {modes[mode].terms && (
                    <View style={styles.tacContainer}>
                        <Checkbox
                            style={styles.checkbox}
                            value={tacChecked}
                            onValueChange={() => setTacChecked((prev) => !prev)}
                        />
                        <Text>{Strings.iAgreeToThe} </Text>
                        <Pressable>
                            <Text style={styles.tacText}>
                                {Strings.termsAndConditions}
                            </Text>
                        </Pressable>
                    </View>
                )}
                {modes[mode].iRemember && (
                    <View style={styles.tacContainer}>
                        <Text>{Strings.iRememberMyPassword} </Text>
                        <Pressable onPress={() => setMode("login")}>
                            <Text style={styles.tacText}>{Strings.login}</Text>
                        </Pressable>
                    </View>
                )}
                <Button mode='primary' style={styles.confirmButton}>
                    {modes[mode].buttonTitle}
                </Button>
                {modes[mode].notHaveAnAccount && (
                    <>
                        <Text style={[styles.text, { marginTop: 18 }]}>
                            {Strings.youDontHaveAnAccount}
                        </Text>
                        <Button mode='text' onPress={() => setMode("register")}>
                            {Strings.createNewAccount}
                        </Button>
                    </>
                )}
                {modes[mode].haveAnAccount && (
                    <>
                        <Text style={[styles.text, { marginTop: 18 }]}>
                            {Strings.youDontHaveAnAccount}
                        </Text>
                        <Button mode='text' onPress={() => setMode("login")}>
                            {Strings.loginNow}
                        </Button>
                    </>
                )}
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
        paddingVertical: 30,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontFamily: "poppins-bold",
        color: Colors.coloredText,
        marginBottom: 10,
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
    inputContainer: {
        width: "100%",
        marginVertical: 8,
    },
    inputIcon: {
        position: "absolute",
        top: 8,
        left: 8,
        opacity: 0.5,
    },
    text: {
        fontFamily: "poppins-",
    },
    tacContainer: {
        flexDirection: "row",
        marginTop: 12,
        marginBottom: 20,
    },
    checkbox: {
        aspectRatio: 1,
        marginRight: 10,
    },
    tacText: {
        color: Colors.coloredText,
        textTransform: "capitalize",
    },
    countryCodePicker: {},
});
