import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Video, ResizeMode } from "expo-av";

import { AntDesign, Ionicons } from "@expo/vector-icons";

import ScreenContainer from "../../components/ScreenContainer";
import AppHeader from "../../components/AppHeader";

export default function VideoScreen({ route }) {
    const [status, setStatus] = useState({});

    const { course } = route.params || {};

    return (
        <ScreenContainer>
            <AppHeader />
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.text}>
                        <AntDesign name='home' size={16} color='black' />{" "}
                        {course.name}
                    </Text>
                    <Text style={styles.text}>
                        <Ionicons name='time-outline' size={16} color='black' />{" "}
                        {"17:00 - 18:30"}
                    </Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>
                        <AntDesign name='book' size={16} color='black' />{" "}
                        {"Lesson Name"}
                    </Text>
                </View>
                <Text></Text>
                <Video
                    style={styles.video}
                    source={{
                        uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    onPlaybackStatusUpdate={setStatus}
                />
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    video: {
        width: "100%",
        aspectRatio: 16 / 9,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    text: {
        fontFamily: "poppins-",
    },
});
