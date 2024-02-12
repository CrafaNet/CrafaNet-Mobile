import { StyleSheet, View, ScrollView } from "react-native";

export default function ScreenContainer(props) {
    return (
        <View style={styles.container}>
            <ScrollView
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
        paddingTop: 40,
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 60,
    },
});
