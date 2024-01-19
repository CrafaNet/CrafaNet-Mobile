import { StyleSheet, Text, View } from "react-native";

import UpgradeToVipBox from "./ComunityComponents/UpgradeToVipBox";

import Styles from "../../constants/styles";

export default function CommunityHomeScreen() {
    return (
        <View style={Styles.screenContainer}>
            <UpgradeToVipBox />
        </View>
    );
}

const styles = StyleSheet.create({});
