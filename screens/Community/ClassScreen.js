import { FlatList, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ScreenContainer from "../../components/ScreenContainer";
import AppHeader from "../../components/AppHeader";
import Button from "../../components/Button";

import Strings from "../../util/strings";
import Colors from "../../constants/colors";

const DUMMY_EVENTS = [
    "Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit amet.",
];

export default function ClassScreen({ route, navigation }) {
    const { course } = route.params || {};

    const watchVideosButtonPressHandler = () => {
        navigation.navigate("ClassVideosScreen", { course });
    };

    return (
        <ScreenContainer>
            <AppHeader />
            <Text style={styles.title}>{course.name}</Text>
            <Text style={styles.text}>{Strings.DUMMY_CLASS_DESCRIPTION}</Text>
            <Button mode='secondary' onPress={watchVideosButtonPressHandler}>
                {Strings.watchVideos}
            </Button>
            <Text style={styles.subTitle}>{Strings.currentEvents}</Text>
            <FlatList
                style={styles.eventList}
                data={DUMMY_EVENTS}
                keyExtractor={(item) => Math.random()}
                renderItem={({ item }) => (
                    <Text style={styles.text}>
                        <Ionicons
                            name='megaphone-outline'
                            size={16}
                            color='black'
                        />{" "}
                        {item}
                    </Text>
                )}
                scrollEnabled={false}
            />
            <Text style={styles.subTitle}>{Strings.digitalClass}</Text>
            <Text style={styles.text}>
                Subject: Introduction To Finance Time: 17:00 - 19:00
            </Text>
            <Button mode='secondary'>{Strings.joinLiveClass}</Button>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "poppins-bold",
        fontSize: 24,
    },
    subTitle: {
        fontFamily: "poppins-bold",
        fontSize: 18,
        borderBottomWidth: 2,
        borderBottomColor: Colors.secondary500,
        alignSelf: "baseline",
        marginVertical: 20,
    },
    text: {
        fontFamily: "poppins-",
    },
    eventList: {
        flexGrow: 0,
    },
});
