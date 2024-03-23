import { StyleSheet, View } from "react-native";

import ScreenContainer from "../../components/ScreenContainer";
import AppHeader from "../../components/AppHeader";
import Bio from "./WorkfolioComponents/Bio";
import Showcase from "./WorkfolioComponents/Showcase";

export default function WorkfolioHomeScreen() {
    return (
        <ScreenContainer>
            <AppHeader />
            <Bio />
            <Showcase />
            <View style={styles.workshops}></View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({});
