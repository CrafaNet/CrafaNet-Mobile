import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/core";

import Colors from "../../../constants/colors";
import Strings from "../../../util/strings";
import Sizes from "../../../constants/sizes";

const vipIllustration = require("../../../assets/cartons/idea.png");

export default function UpgradeToVipBox() {
    const navigation = useNavigation();

    const onPressHandler = () => navigation.navigate("UpgradeToVipScreen");

    return (
        <Pressable onPress={onPressHandler}>
            <LinearGradient
                colors={Colors.mainLinearGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.container}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{Strings.getPremium}</Text>
                    <Text style={styles.text}>
                        {Strings.becomeAVipMemberToGetYourPrivateClassNow}
                    </Text>
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        source={vipIllustration}
                        resizeMode='contain'
                        style={styles.image}
                    />
                </View>
            </LinearGradient>
        </Pressable>
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
    imageContainer: {
        width: "42%",
        position: "absolute",
        bottom: 0,
        right: 10,
        aspectRatio: 1,
    },
    image: {
        width: "100%",
        height: "100%",
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
