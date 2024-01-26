import { StyleSheet, Text, View } from "react-native";

import ScreenContainer from "../../components/ScreenContainer";
import AppHeader from "../../components/AppHeader";

export default function VideoScreen() {
    return (
        <ScreenContainer>
            <AppHeader />
            <Text>VideoScreen</Text>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({});
