import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../../../constants/colors";
import Sizes from "../../../constants/sizes";

import diamond from "../../../assets/achievements/diamond.png";
import novice from "../../../assets/achievements/novice.png";
import openWay from "../../../assets/achievements/openWay.png";
import winner from "../../../assets/achievements/winner.png";
import wizard from "../../../assets/achievements/wizard.png";
import zeus from "../../../assets/achievements/zeus.png";

const DUMMY_ACHIEVEMENTS = [diamond, novice, openWay, winner, wizard, zeus];

export default function Showcase() {
    return (
        <LinearGradient
            style={styles.container}
            colors={Colors.mainLinearGradient}
        >
            <FlatList
                contentContainerStyle={styles.list}
                data={DUMMY_ACHIEVEMENTS}
                keyExtractor={(_, index) => index}
                renderItem={({ item }) => (
                    <Image source={item} style={styles.achievementListItem} />
                )}
                horizontal
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        height: 60,
        borderRadius: 8,
    },
    list: {
        alignItems: "center",
        padding: 8,
        gap: 10,
    },
    achievementListItem: {
        width: 40,
        height: 40,
    },
});
