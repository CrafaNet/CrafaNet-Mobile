import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TextInput } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Strings from "../../../util/strings";
import Colors from "../../../constants/colors";
import Sizes from "../../../constants/sizes";

export default function SearchBox() {
    return (
        <LinearGradient
            colors={["#cb6ce6", "#481257"]}   //renkler mor olarak güncellendi.
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            <Ionicons
                style={styles.icon}
                name='search'
                size={22}
                color={Colors.primary500}
            />
            <TextInput
                placeholder={`${Strings.subjectClassEtc}`}
                placeholderTextColor='white'
                style={styles.textInput}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        overflow: "hidden",
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginLeft: 8,
        color: "white",
    },
    textInput: {
        flex: 1,
        height: 40,
        padding: 8,
        fontFamily: "poppins-",
    },
});
