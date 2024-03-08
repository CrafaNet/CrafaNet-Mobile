import { StyleSheet, View, TextInput } from "react-native";

import {
    Ionicons,
    Feather,
    Octicons,
    Fontisto,
    Entypo,
} from "@expo/vector-icons";

import Styles from "../constants/styles";
import Strings from "../util/strings";

const iconPacks = {
    ionicons: Ionicons,
    feather: Feather,
    octicons: Octicons,
    fontisto: Fontisto,
    entypo: Entypo,
};

export default function FormInput({
    value,
    onChangeText,
    keyboardType = "default",
    placeholderKey,
    iconPack,
    iconName,
    defaultValue,
}) {
    const Icon = iconPacks[iconPack];

    return (
        <View style={styles.inputContainer}>
            <Icon
                name={iconName}
                size={20}
                color='black'
                style={[styles.inputIcon, { display: value ? "none" : "flex" }]}
            />
            <TextInput
                style={Styles.textInput}
                value={value}
                placeholder={`       ${Strings[placeholderKey] || ""}`}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                returnKeyType='done'
                defaultValue={defaultValue}
            />
        </View>
    );
}

const styles = StyleSheet.create({
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
});
