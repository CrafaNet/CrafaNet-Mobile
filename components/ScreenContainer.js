import { StyleSheet, View, ScrollView } from "react-native";
import Constants from "expo-constants";

export default function ScreenContainer(props) {
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                {...props}
                contentContainerStyle={[
                    styles.scrollView,
                    props.contentContainerStyle,
                ]}
            >
                {props.children}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight,
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 60,
    },
});
