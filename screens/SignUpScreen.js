import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskInput, { Masks } from "react-native-mask-input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { showMessage, hideMessage } from "react-native-flash-message";
import { useNavigation, CommonActions } from '@react-navigation/native';

import { Ionicons, Feather, Octicons } from "@expo/vector-icons";
import { sendRequest } from "../util/http";

import Button from "../components/Buton";
import FormInput from "../components/FormInput";

import Colors from "../constants/color";
import Styles from "../constants/styles";
import Strings from "../util/strings";
import { login } from "../store/auth";

const loginIllustration = require("../assets/white-banner.png");
const registerIllustration = require("../assets/white-banner.png");
const resetPasswordIllustration = require("../assets/white-banner.png");
const verifiedIllustration = require("../assets/white-banner.png");

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
        nextMode: "checkConfirmCode",
    },
    sendResetPasswordCode: {
        title: Strings.resetPassword,
        buttonTitle: Strings.sendCode,
        image: resetPasswordIllustration,
        phone: true,
        notHaveAnAccount: true,
        iRemember: true,
        nextMode: "checkResetPasswordCode",
    },
    checkResetPasswordCode: {
        title: Strings.resetPassword,
        buttonTitle: Strings.reset,
        image: resetPasswordIllustration,
        newPassword: true,
        notHaveAnAccount: true,
        iRemember: true,
        resetPasswordCode: true,
        nextMode: "login",
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
    //ülke ,kod seçimi için tr ve 90 olarak düzenlendi.
    const [countryCode, setCountryCode] = useState("tr");
    const [countryDial, setCountryDial] = useState("90");
    const [mode, setMode] = useState("register");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [resetPasswordCode, setResetPasswordCode] = useState("");
    const [confirmCode, setConfirmCode] = useState("");
    const navigation = useNavigation();
    //Sadece  Türkiye olarak ayarlandı.
    useEffect(() => {
        setCountryCode("tr");
        setCountryDial("+90");
    }, []);

    const isPhone = countryDial && phone;
    const validInputs =
        (mode === "login" && isPhone && password) ||
        (mode === "register" && name && isPhone && password) ||
        (mode === "sendResetPasswordCode" && isPhone) ||
        (mode === "checkResetPasswordCode" && isPhone && resetPasswordCode) ||
        (mode === "checkConfirmCode" && confirmCode);


    const mutation = useMutation({
        mutationFn: (data) => {
            hideMessage();
            return sendRequest({ api: `/user/${mode}`, data });
        },
        onSuccess: (response) => {
            console.log("Response onSuccess:", response);
            if (response.status !== 200) return;
            if (mode === "login" || mode === "checkConfirmCode") {
                const token = response?.data?.token;
                if (!token) return;
                login(token);
                const message = Strings[response.message] || Strings.success;
                showMessage({ message, type: "success" });

                // HomeTabs ekranına yönlendirme
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'HomeTabs' }],
                    })
                );
            }
            const nextMode = modes[mode].nextMode;
            if (nextMode) setMode(nextMode);
        },
        onSettled: (response) => {
            console.log("Response onSettled:", response);
            if (response.status === 200) return;
            const fallbackMsg = `${Strings.responseMessageFallback} ${response.status}`;
            const message = Strings[response.message] || fallbackMsg;
            showMessage({ message, type: "danger" });
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


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ android: "height", ios: "padding" })}>
            <LinearGradient colors={Colors.mainLinearGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.background}>
                <View style={styles.imageContainer}>
                    <Image source={modes[mode].image} resizeMode='contain' style={styles.image} />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>{modes[mode].title}</Text>
                    {modes[mode].name && (
                        <FormInput
                            value={name}
                            onChangeText={setName}
                            placeholderKey='name'
                            iconPack='ionicons'
                            iconName='person-circle-outline'
                        />
                    )}
                    {modes[mode].phone && (
                        <View style={styles.phoneInputContainer}>
                            <View style={styles.countryCodePickerButton}>
                                <Text>{countryDial}</Text>
                            </View>
                            <View style={[styles.inputContainer, styles.phoneTextInputContainer]}>
                                <Feather
                                    name='phone'
                                    size={20}
                                    color='black'
                                    style={[
                                        styles.inputIcon,
                                        {
                                            display: phone ? "none" : "flex",
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
                                    maxLength={14}
                                />
                            </View>
                        </View>
                    )}
                    {modes[mode].resetPasswordCode && (
                        <FormInput
                            value={resetPasswordCode}
                            onChangeText={setResetPasswordCode}
                            placeholderKey='resetCode'
                            keyboardType='numeric'
                            iconPack='ionicons'
                            iconName='barcode-outline'
                        />
                    )}
                    {(modes[mode].password || modes[mode].newPassword) && (
                        <View style={styles.inputContainer}>
                            <Ionicons
                                name='lock-closed-outline'
                                size={20}
                                color='black'
                                style={[styles.inputIcon, { display: password ? "none" : "flex" }]}
                            />
                            <TextInput
                                style={Styles.textInput}
                                value={password}
                                placeholder={`       ${modes[mode].newPassword ? Strings.newPassword : Strings.password}`}
                                onChangeText={setPassword}
                                secureTextEntry={!passwordVisible}
                                returnKeyType='done'
                            />
                            <Pressable
                                onPress={() => setPasswordVisible((prev) => !prev)}
                                style={[styles.inputIcon, { left: "auto", right: 10 }]}
                            >
                                <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={20} color='black' />
                            </Pressable>
                        </View>
                    )}
                    {modes[mode].confirmCode && (
                        <FormInput
                            value={confirmCode}
                            onChangeText={setConfirmCode}
                            placeholderKey='confirmCode'
                            keyboardType='numeric'
                            iconPack='octicons'
                            iconName='verified'
                        />
                    )}
                    {modes[mode].forgotPassword && (
                        <Button mode='text' style={styles.forgotPassword} onPress={() => setMode("sendResetPasswordCode")}>
                            {Strings.forgotPassword}
                        </Button>
                    )}
                    {modes[mode].terms && (
                        <View style={styles.tacContainer}>
                            <Text style={[styles.text, styles.tacText]}>{Strings.byClickingYouAgree} </Text>
                            <Pressable>
                                <Text style={[styles.tacText, styles.tacPressableText]}>{Strings.termsAndConditions}</Text>
                            </Pressable>
                        </View>
                    )}
                    {modes[mode].iRemember && (
                        <View style={styles.iRememberContainer}>
                            <Text>{Strings.iRememberMyPassword} </Text>
                            <Pressable onPress={() => setMode("login")}>
                                <Text style={styles.inlineButton}>{Strings.login}</Text>
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
                            <Text style={[styles.text, { marginTop: 18 }]}>{Strings.youDontHaveAnAccount}</Text>
                            <Button mode='text' onPress={() => setMode("register")}>
                                {Strings.createNewAccount}
                            </Button>
                        </>
                    )}
                    {modes[mode].haveAnAccount && (
                        <>
                            <Text style={[styles.text, { marginTop: 18 }]}>{Strings.youHaveAnAccount}</Text>
                            <Button mode='text' onPress={() => setMode("login")}>
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
        width: "85%",
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
        fontWeight: "bold",
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
        fontWeight: "bold",
    },
    tacContainer: {
        alignItems: "center",
        marginTop: 12,
        marginBottom: 20,
        width: "100%",
    },
    tacText: {
        fontSize: 10,
        textAlign: "center",
    },
    tacPressableText: {
        color: Colors.coloredText,
        textTransform: "capitalize",
    },
    countryCodePickerButton: {
        width: "28%",
        borderBottomWidth: 1,
        borderColor: "#0004",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
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
    iRememberContainer: {
        flexDirection: "row",
        marginTop: 12,
        marginBottom: 20,
    },
    inlineButton: {
        color: Colors.coloredText,
        textTransform: "capitalize",
    },
});
