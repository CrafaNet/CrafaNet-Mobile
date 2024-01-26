import { StyleSheet, Text, View, Image } from "react-native";

import ScreenContainer from "../../components/ScreenContainer";
import AppHeader from "../../components/AppHeader";

import Strings from "../../util/strings";
import Colors from "../../constants/colors";

const skillhubIllustration = require("../../assets/illustrations/learnmate.png");
const comingSoonIllustration = require("../../assets/illustrations/comingSoon.png");

export default function LearnMateHomeScreen() {
    return (
        <ScreenContainer contentContainerStyle={{ flex: 1 }}>
            <View style={styles.container}>
                <AppHeader />
                <Text style={styles.title}>{Strings.learnmate}</Text>
                <Image
                    style={styles.image}
                    source={skillhubIllustration}
                    resizeMode='contain'
                />
                <Image source={comingSoonIllustration} resizeMode='contain' />
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    title: {
        fontSize: 36,
        fontFamily: "poppins-bold",
        color: Colors.primary500,
        marginTop: "10%",
    },
    image: {
        height: "58%",
    },
});
