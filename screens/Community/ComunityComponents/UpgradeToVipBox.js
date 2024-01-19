import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, Image } from "react-native";

import Colors from "../../../constants/colors";
import Strings from "../../../util/strings";
import Sizes from "../../../constants/sizes";

const vipIllustration = require("../../../assets/illustrations/vip.png");

export default function UpgradeToVipBox() {
    return (
        <LinearGradient
            colors={Colors.mainLinearGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
        >
            <View style={styles.textContainer}>
                <Text style={styles.title}>{Strings.upgradeToVip}</Text>
                <Text style={styles.text}>
                    {Strings.becomeAVipMemberToGetYourPrivateClassNow}
                </Text>
            </View>
            <Image
                source={vipIllustration}
                resizeMode='contain'
                style={styles.image}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        position: "relative",
        marginTop: 20,
        padding: 24,
        borderRadius: 14,
    },
    textContainer: {
        width: "60%",
        gap: 4,
    },
    image: {
        width: "40%",
        height: "194%",
        position: "absolute",
        bottom: 0,
        right: 10,
    },
    title: {
        color: "white",
        fontFamily: "poppins-bold",
        fontSize: Sizes.titleMedium,
    },
    text: {
        color: "white",
        fontFamily: "poppins-",
        fontSize: Sizes.textSmall,
    },
});
