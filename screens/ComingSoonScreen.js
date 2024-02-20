import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

import ScreenContainer from "../components/ScreenContainer";
import Strings from "../util/strings";
import AppHeader from "../components/AppHeader";

import constructionIllustration from "../assets/illustrations/construction.png";

const { width, height } = Dimensions.get("window");

const releaseDate = new Date("2024-5-15").getTime();
const daysLeft = Math.ceil((releaseDate - Date.now()) / (1000 * 60 * 60 * 24));

export default function ComingSoon() {
    return (
        <ScreenContainer scrollEnabled={false}>
            <AppHeader />
            <View style={styles.container}>
                <Text style={styles.title}>{Strings.comingSoon}!</Text>
                <Image
                    source={constructionIllustration}
                    resizeMode='contain'
                    style={styles.illustration}
                />
                <Text style={styles.text}>{Strings.comingSoonMessage}</Text>
                <View style={styles.countdown}>
                    <Text
                        style={[styles.countdownText, styles.countdownNumber]}
                    >
                        {daysLeft}
                    </Text>
                    <View style={styles.countdownInnerWrapper}>
                        <Text
                            style={[
                                styles.countdownText,
                                styles.countdownInnerText,
                            ]}
                        >
                            {Strings.days}
                        </Text>
                        <Text
                            style={[
                                styles.countdownText,
                                styles.countdownInnerText,
                                styles.countdownInnerTextSecond,
                            ]}
                        >
                            {Strings.left}
                        </Text>
                    </View>
                </View>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        gap: 40,
    },
    title: {
        fontFamily: "poppins-bold",
        fontSize: 28,
    },
    illustration: {
        width: width * 0.8,
        height: width * 0.5,
    },
    text: {
        fontFamily: "poppins-",
        textAlign: "center",
    },
    countdown: {},
    countdownText: {
        fontFamily: "poppins-bold",
        textTransform: "uppercase",
        position: "absolute",
    },
    countdownNumber: {
        fontSize: 64,
        top: -26,
        right: 0,
        color: "#f56808",
    },
    countdownInnerWrapper: {},
    countdownInnerText: {
        top: -14,
        fontSize: 30,
    },
    countdownInnerTextSecond: {
        top: 12,
    },
});
