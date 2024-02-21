import { useEffect, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskInput, { Masks } from "react-native-mask-input";
import Checkbox from "expo-checkbox";
import { CountryPicker } from "react-native-country-codes-picker";
import { useMutation } from "@tanstack/react-query";
import CountryFlag from "react-native-country-flag";

import { Ionicons, Feather, Octicons } from "@expo/vector-icons";

import { queryClient, sendRequest } from "../util/http";

import Button from "../components/Button";

import Colors from "../constants/colors";
import Styles from "../constants/styles";
import Strings, { deviceLang, deviceRegion } from "../util/strings";
import { setToken } from "../store/auth";
import { getCountryDial, getLocation } from "../util/location";
import countries from "../data/countries.json";

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
    sendResetPasswordCode: {
        title: Strings.resetPassword,
        buttonTitle: Strings.sendCode,
        image: resetPasswordIllustration,
        phone: true,
        notHaveAnAccount: true,
        iRemember: true,
    },
    checkResetPasswordCode: {
        title: Strings.resetPassword,
        buttonTitle: Strings.reset,
        image: resetPasswordIllustration,
        newPassword: true,
        notHaveAnAccount: true,
        iRemember: true,
        resetPasswordCode: true,
    },
    checkConfirmCode: {
        title: Strings.confirmAccount,
        buttonTitle: Strings.confirm,
        image: verifiedIllustration,
        haveAnAccount: true,
        confirmCode: true,
    },
};

export default function AuthFormScreen() {
    // const [location, setLocation] = useState(null);
    const [countryCode, setCountryCode] = useState(deviceRegion);
    const [countryDial, setCountryDial] = useState(
        getCountryDial(deviceRegion)
    );
    const [mode, setMode] = useState("login");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [tacChecked, setTacChecked] = useState(false);
    const [showCountrySelector, setShowCountrySelector] = useState(false);
    const [resetPasswordCode, setResetPasswordCode] = useState("");
    const [confirmCode, setConfirmCode] = useState("");

    const isPhone = countryDial && phone;
    const validInputs =
        (mode === "login" && isPhone && password) ||
        (mode === "register" && name && isPhone && password && tacChecked) ||
        (mode === "sendResetPasswordCode" && isPhone) ||
        (mode === "checkResetPasswordCode" && isPhone && resetPasswordCode) ||
        (mode === "checkConfirmCode" && confirmCode);

    const mutation = useMutation({
        mutationFn: (data) => {
            return sendRequest({ api: `/user/${mode}`, data });
        },
        onSuccess: (response) => {
            if (response.status !== 200) return;
            if (["login", "checkConfirmCode"].includes(mode)) {
                const token = response?.data?.token;
                if (!token) return;
                setToken(token);
                queryClient.invalidateQueries({
                    queryKey: ["isAuthenticated"],
                });
            } else if (mode === "register") {
                setMode("checkConfirmCode");
            } else if (mode === "sendResetPasswordCode") {
                setMode("checkResetPasswordCode");
            } else if (mode === "checkResetPasswordCode") {
                setMode("login");
            }
        },
    });

    const submitButtonPressHandler = () => {
        if (!validInputs) return;
        const data = {
            name,
            phone: countryDial + phone,
            password,
            newPassword: password,
            confirmCode,
            resetPasswordCode,
        };
        mutation.mutate(data);
    };

    // useEffect(() => {
    //     setLocation(getLocation()?._j);
    // }, []);

    // useEffect(() => {
    //     console.log(location);
    //     const coords = location?.coords;
    //     if (coords) setCountryCode(getCountry(coords)?.address?.country_code);
    // }, [location]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.select({ android: "height", ios: "padding" })}
        >
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
                                returnKeyType='done'
                            />
                        </View>
                    )}
                    {modes[mode].phone && (
                        <>
                            <CountryPicker
                                showOnly={countries.map((item) => item.code)}
                                style={styles.countryCodePicker}
                                show={showCountrySelector}
                                onBackdropPress={() =>
                                    setShowCountrySelector(false)
                                }
                                pickerButtonOnPress={(item) => {
                                    setCountryCode(item?.code?.toLowerCase());
                                    setCountryDial(item.dial_code);
                                    setShowCountrySelector(false);
                                }}
                                lang={deviceLang}
                            />
                            <View style={styles.phoneInputContainer}>
                                <Pressable
                                    style={styles.countryCodePickerButton}
                                    onPress={() => {
                                        setShowCountrySelector(true);
                                    }}
                                >
                                    {countryCode || countryDial ? (
                                        <>
                                            <CountryFlag
                                                style={styles.countryFlag}
                                                isoCode={countryCode}
                                                size={14}
                                            />
                                            <Text>{countryDial}</Text>
                                        </>
                                    ) : (
                                        <Feather
                                            name='flag'
                                            size={18}
                                            color='#0006'
                                        />
                                    )}
                                </Pressable>
                                <View
                                    style={[
                                        styles.inputContainer,
                                        styles.phoneTextInputContainer,
                                    ]}
                                >
                                    <Feather
                                        name='phone'
                                        size={20}
                                        color='black'
                                        style={[
                                            styles.inputIcon,
                                            {
                                                display: phone
                                                    ? "none"
                                                    : "flex",
                                            },
                                        ]}
                                    />
                                    <MaskInput
                                        style={Styles.textInput}
                                        value={phone}
                                        placeholder={`       ${Strings.phoneNumber}`}
                                        keyboardType='phone-pad'
                                        onChangeText={(_, unmasked) => {
                                            setPhone(unmasked);
                                        }}
                                        mask={Masks.USA_PHONE}
                                        returnKeyType='done'
                                    />
                                </View>
                            </View>
                        </>
                    )}
                    {modes[mode].resetPasswordCode && (
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name='barcode-outline'
                                size={20}
                                color='black'
                                style={[
                                    styles.inputIcon,
                                    {
                                        display: resetPasswordCode
                                            ? "none"
                                            : "flex",
                                    },
                                ]}
                            />
                            <TextInput
                                style={Styles.textInput}
                                value={resetPasswordCode}
                                placeholder={`       ${Strings.resetCode}`}
                                onChangeText={setResetPasswordCode}
                                keyboardType='numeric'
                                returnKeyType='done'
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
                                returnKeyType='done'
                            />
                            <Pressable
                                onPress={() =>
                                    setPasswordVisible((prev) => !prev)
                                }
                                style={[
                                    styles.inputIcon,
                                    { left: "auto", right: 10 },
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
                                returnKeyType='done'
                            />
                        </View>
                    )}
                    {modes[mode].forgotPassword && (
                        <Button
                            mode='text'
                            style={styles.forgotPassword}
                            onPress={() => setMode("sendResetPasswordCode")}
                        >
                            {Strings.forgotPassword}
                        </Button>
                    )}
                    {modes[mode].terms && (
                        <View style={styles.tacContainer}>
                            <Checkbox
                                style={styles.checkbox}
                                value={tacChecked}
                                onValueChange={() =>
                                    setTacChecked((prev) => !prev)
                                }
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
                                <Text style={styles.tacText}>
                                    {Strings.login}
                                </Text>
                            </Pressable>
                        </View>
                    )}
                    <Button
                        mode='primary'
                        style={styles.confirmButton}
                        onPress={submitButtonPressHandler}
                        disabled={!validInputs}
                    >
                        {modes[mode].buttonTitle}
                    </Button>
                    {modes[mode].notHaveAnAccount && (
                        <>
                            <Text style={[styles.text, { marginTop: 18 }]}>
                                {Strings.youDontHaveAnAccount}
                            </Text>
                            <Button
                                mode='text'
                                onPress={() => setMode("register")}
                            >
                                {Strings.createNewAccount}
                            </Button>
                        </>
                    )}
                    {modes[mode].haveAnAccount && (
                        <>
                            <Text style={[styles.text, { marginTop: 18 }]}>
                                {Strings.youDontHaveAnAccount}
                            </Text>
                            <Button
                                mode='text'
                                onPress={() => setMode("login")}
                            >
                                {Strings.loginNow}
                            </Button>
                        </>
                    )}
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
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
        paddingHorizontal: 60,
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
    countryCodePicker: {
        modal: {
            height: "70%",
        },
    },
    countryCodePickerButton: {
        width: "28%",
        borderWidth: 1,
        borderColor: "#0004",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
    },
    countryFlag: {
        borderRadius: 2,
    },
    phoneInputContainer: {
        flexDirection: "row",
        gap: 6,
        marginVertical: 8,
    },
    phoneTextInputContainer: {
        flex: 1,
        marginVertical: 0,
    },
});
