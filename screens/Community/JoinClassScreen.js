import { StyleSheet, Text, View } from "react-native";

import ScreenContainer from "../../components/ScreenContainer";
import AppHeader from "../../components/AppHeader";

export default function JoinClassScreen({ route }) {
    const { item } = route.params || {};

    return (
        <ScreenContainer>
            <AppHeader hasBack />
            <Text>{item.name}</Text>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({});
