import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import ScreenContainer from "../../../components/ScreenContainer";
import AppHeader from "../../../components/AppHeader";

import { Feather } from "@expo/vector-icons";

import defaultProfileImage from "../../../assets/images/defaultProfileImg.jpg";
import Colors from "../../../constants/colors";
import Sizes from "../../../constants/sizes";

import diamond from "../../../assets/achievements/diamond.png";
import novice from "../../../assets/achievements/novice.png";
import openWay from "../../../assets/achievements/openWay.png";
import winner from "../../../assets/achievements/winner.png";
import wizard from "../../../assets/achievements/wizard.png";
import zeus from "../../../assets/achievements/zeus.png";

export default function Bio() {
    return (
        <View style={styles.container}>
            <View style={styles.profileImageContainer}>
                <Image
                    source={defaultProfileImage}
                    style={styles.profileImage}
                />
                <Pressable style={styles.editProfileBtn}>
                    <Feather name='edit-2' size={12} color='white' />
                </Pressable>
            </View>
            <View style={styles.bioTextContainer}>
                <Text style={styles.userName}>User Name Here</Text>
                <View style={styles.rankContainer}>
                    <Image source={diamond} style={styles.rankIcon} />
                    <Text style={styles.userRank}>Novice Crafa</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    profileImageContainer: {
        width: 60,
        height: 60,
        position: "relative",
    },
    profileImage: {
        width: 60,
        height: 60,
    },
    editProfileBtn: {
        position: "absolute",
        backgroundColor: Colors.primary500,
        borderRadius: 999,
        padding: 6,
        bottom: 0,
        right: 0,
    },
    bioTextContainer: {
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    userName: {
        color: Colors.primary600,
        fontFamily: "poppins-bold",
        fontSize: Sizes.textSmall,
    },
    userRank: {
        color: Colors.primary600,
        fontFamily: "poppins-",
        fontSize: Sizes.textExtraSmall,
    },
    rankContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    rankIcon: {
        width: 14,
        height: 14,
    },
});
