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
    ActionSheetIOS,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskInput, { Masks } from "react-native-mask-input";
import { CountryPicker } from "react-native-country-codes-picker";
import { useMutation, useQuery } from "@tanstack/react-query";
import CountryFlag from "react-native-country-flag";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Picker } from "@react-native-picker/picker";

import { Ionicons, Feather, Octicons } from "@expo/vector-icons";

import { queryClient, sendRequest } from "../../util/http";
import { getBasePhoneNumber, getDialCodeFromPhone } from "../../util/helpers";

import Button from "../../components/Button";
import FormInput from "../../components/FormInput";

import Colors from "../../constants/colors";
import Styles from "../../constants/styles";
import Strings, { deviceLang, deviceRegion } from "../../util/strings";
import { getCountryCodeByDial, getCountryDial } from "../../util/location";
import countries from "../../data/countries.json";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const loginIllustration = require("../../assets/illustrations/login.png");
const registerIllustration = require("../../assets/illustrations/register.png");
const resetPasswordIllustration = require("../../assets/illustrations/resetPassword.png");
const verifiedIllustration = require("../../assets/illustrations/verified.png");

export default function UpdateUserScreen() {
    const { data: userData } = useQuery({
        queryKey: ["userData"],
        queryFn: () => {
            const api = "/user/sendUserInfo";
            const token = queryClient.getQueryData(["token"]);
            return sendRequest({ api, token });
        },
    });

    const phoneData = userData?.data?.phone;
    const countryDialData =
        getDialCodeFromPhone(phoneData) || getCountryDial(deviceRegion);
    const countryCodeData =
        getCountryCodeByDial(countryDialData) || getCountryDial(deviceRegion);

    const [countryDial, setCountryDial] = useState(countryDialData);
    const [countryCode, setCountryCode] = useState(countryCodeData);
    const [name, setName] = useState(userData?.data?.name || "");
    const [phone, setPhone] = useState(getBasePhoneNumber(phoneData) || "");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [language, setLanguage] = useState("");
    const [country, setCountry] = useState("");
    // const [password, setPassword] = useState("");
    // const [passwordVisible, setPasswordVisible] = useState(false);
    const [showCountrySelector, setShowCountrySelector] = useState(true);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState({
        date: new Date(),
        string: "",
    });

    useEffect(() => {
        setShowCountrySelector(false);
    }, []);

    const mutation = useMutation({
        mutationFn: (data) => {
            hideMessage();
            const token = queryClient.getQueryData(["token"]);
            return sendRequest({ api: `/user/updateUserInfo`, data, token });
        },
        onSuccess: (response) => {
            const message = Strings[response.message];
            showMessage({ message, type: "success" });
        },
        onSettled: (response) => {
            if (response.status === 200) return;
            const fallbackMsg = `${Strings.responseMessageFallback} ${response.status}`;
            const message = Strings[response.message] || fallbackMsg;
            showMessage({ message, type: "danger" });
        },
    });

    if (!userData) return null;

    const actionSheetIosHandler = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ["Cancel", Strings.male, Strings.female],
                cancelButtonIndex: 0,
                userInterfaceStyle: "light",
            },
            (buttonIndex) => {
                if (buttonIndex === 0);
                else if (buttonIndex === 1) setGender("male");
                else if (buttonIndex === 2) setGender("female");
            }
        );
    };

    const submitButtonPressHandler = () => {
        const data = {
            name,
            phone: countryDial + phone,
            // password,
            email,
            birthDate: dateOfBirth.string,
            gender,
        };
        mutation.mutate(data);
    };

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
                {/* <View style={styles.imageContainer}>
                    <Image
                        source={image}
                        resizeMode='contain'
                        style={styles.image}
                    />
                </View> */}
                <View style={styles.formContainer}>
                    <Text style={styles.title}>
                        {Strings.updateUserScreenTitle}
                    </Text>
                    <FormInput
                        value={name}
                        onChangeText={setName}
                        placeholderKey='name'
                        iconPack='ionicons'
                        iconName='person-circle-outline'
                    />
                    <CountryPicker
                        showOnly={countries.map((item) => item.code)}
                        style={styles.countryCodePicker}
                        show={showCountrySelector}
                        onBackdropPress={() => setShowCountrySelector(false)}
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
                                <Feather name='flag' size={18} color='#0006' />
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
                    <FormInput
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                        placeholderKey='email'
                        iconPack='fontisto'
                        iconName='email'
                    />
                    {/* <View style={styles.inputContainer}>
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
                            placeholder={`       ${Strings.password}`}
                            onChangeText={setPassword}
                            secureTextEntry={!passwordVisible}
                            returnKeyType='done'
                        />
                        <Pressable
                            onPress={() => setPasswordVisible((prev) => !prev)}
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
                    </View> */}
                    {showDatePicker && (
                        <RNDateTimePicker
                            mode='date'
                            value={dateOfBirth.date}
                            onChange={(_, date) => {
                                const string = date.toISOString().split("T")[0];
                                setDateOfBirth({ date, string });
                                setShowDatePicker(false);
                            }}
                        />
                    )}
                    <Pressable
                        style={styles.inputContainer}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Feather
                            name='calendar'
                            size={20}
                            color='black'
                            style={[
                                styles.inputIcon,
                                {
                                    display: dateOfBirth.string
                                        ? "none"
                                        : "flex",
                                },
                            ]}
                        />
                        <TextInput
                            style={Styles.textInput}
                            value={dateOfBirth.string}
                            placeholder={`       ${Strings.dateOfBirth}`}
                            onChangeText={setDateOfBirth}
                            returnKeyType='done'
                            readOnly
                        />
                    </Pressable>
                    {Platform.select({
                        android: (
                            <View style={styles.androidPickerWrapper}>
                                <Picker
                                    style={{ width: "100%" }}
                                    selectedValue={gender}
                                    onValueChange={(item) => setGender(item)}
                                >
                                    <Picker.Item
                                        label={Strings.gender}
                                        value='-1'
                                    />
                                    <Picker.Item
                                        label={Strings.male}
                                        value='m'
                                    />
                                    <Picker.Item
                                        label={Strings.female}
                                        value='f'
                                    />
                                </Picker>
                            </View>
                        ),
                        ios: (
                            <Pressable
                                style={styles.inputContainer}
                                onPress={actionSheetIosHandler}
                            >
                                <Octicons
                                    name='check'
                                    size={20}
                                    color='black'
                                    style={[
                                        styles.inputIcon,
                                        {
                                            display: gender ? "none" : "flex",
                                        },
                                    ]}
                                />
                                <TextInput
                                    style={Styles.textInput}
                                    value={gender}
                                    placeholder={`       ${Strings.gender}`}
                                    onChangeText={setGender}
                                    returnKeyType='done'
                                    readOnly
                                />
                            </Pressable>
                        ),
                    })}

                    <Button
                        mode='primary'
                        style={styles.confirmButton}
                        onPress={submitButtonPressHandler}
                        // disabled={!isValid}
                        isLoading={mutation.isPending}
                    >
                        {Strings.update}
                    </Button>
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
        paddingBottom: 80,
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
    countryCodePicker: {
        modal: {
            height: "70%",
        },
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
    iRememberContainer: {
        flexDirection: "row",
        marginTop: 12,
        marginBottom: 20,
    },
    inlineButton: {
        color: Colors.coloredText,
        textTransform: "capitalize",
    },
    androidPickerWrapper: {
        width: "100%",
        borderBottomWidth: 1,
        borderColor: "#0004",
        marginBottom: 20,
    },
});
