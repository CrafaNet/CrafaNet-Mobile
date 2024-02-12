import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
} from "react-native";

import ScreenContainer from "../../components/ScreenContainer";
import AppHeader from "../../components/AppHeader";

import Strings from "../../util/strings";
import Colors from "../../constants/colors";
import Sizes from "../../constants/sizes";

import vrClass from "../../assets/images/vr_class.png";

const DUMMY_EVENTS = [
    "Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit amet.",
    "Lorem ipsum dolor sit amet.",
];

import DUMMY_THUMBNAIL from "../../assets/images/welcome2.png";
import { LinearGradient } from "expo-linear-gradient";
const DUMMY_VIDEOS = Array.from({ length: 12 }, (_, i) => i);

export default function ClassScreen({ route, navigation }) {
    const { course } = route.params || {};

    const thumbnailPressHandler = () => {
        navigation.navigate("VideoScreen", { course });
    };

    return (
        <ScreenContainer>
            <AppHeader />
            <Text style={styles.title}>{course.name}</Text>
            <Text style={styles.description}>
                {Strings.DUMMY_CLASS_DESCRIPTION}
            </Text>
            <LinearGradient
                style={styles.lessonBanner}
                colors={styles.lessonBannerGradientColors}
            >
                <Image
                    source={vrClass}
                    style={styles.lessonBannerImage}
                    resizeMode='cover'
                />
                <View style={styles.bannerTextContainer}>
                    <Text style={styles.bannerText}>
                        Introduction To Finance
                    </Text>
                    <Text style={styles.bannerText}>Friday 17:00 - 19:00</Text>
                </View>
            </LinearGradient>
            <Text style={styles.subTitle}>{Strings.pastWorkshops}</Text>
            <FlatList
                data={DUMMY_VIDEOS}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Pressable
                        style={styles.thumbnail}
                        onPress={thumbnailPressHandler}
                    >
                        <Image
                            style={styles.thumbnailImg}
                            source={DUMMY_THUMBNAIL}
                            resizeMode='cover'
                        />
                        <Text style={styles.videoTitle}>VIDEO_TITLE_HERE</Text>
                    </Pressable>
                )}
                numColumns={2}
                scrollEnabled={false}
                columnWrapperStyle={styles.columnWrapperStyle}
            />
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "poppins-bold",
        fontSize: 24,
        borderBottomWidth: 2,
        borderBottomColor: Colors.secondary500,
        alignSelf: "baseline",
    },
    subTitle: {
        fontFamily: "poppins-bold",
        fontSize: 18,
        borderBottomWidth: 2,
        borderBottomColor: Colors.secondary500,
        alignSelf: "baseline",
        marginVertical: 20,
    },
    description: {
        fontFamily: "poppins-",
        fontSize: Sizes.textSmall,
    },
    lessonBanner: {
        height: 120,
        justifyContent: "flex-end",
        marginTop: 10,
    },
    lessonBannerImage: {
        width: "100%",
        height: "100%",
        position: "absolute",
        opacity: 0.4,
    },
    bannerTextContainer: {
        padding: 6,
    },
    bannerText: {
        fontFamily: "poppins-bold",
        fontSize: Sizes.textSmall,
        color: "white",
    },
    columnWrapperStyle: {
        justifyContent: "space-between",
    },
    thumbnail: {
        height: 100,
        width: "48%",
        marginBottom: 32,
    },
    thumbnailImg: {
        width: "100%",
        height: "100%",
    },
    videoTitle: {
        fontSize: Sizes.textSmall,
        fontFamily: "poppins-",
    },
    lessonBannerGradientColors: ["#9aa8bb", "#bbb4bd", "#2236ef"],
});
