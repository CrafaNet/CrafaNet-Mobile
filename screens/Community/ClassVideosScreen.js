import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    Pressable,
} from "react-native";

import ScreenContainer from "../../components/ScreenContainer";
import AppHeader from "../../components/AppHeader";

import Strings from "../../util/strings";
import Sizes from "../../constants/sizes";
import Colors from "../../constants/colors";

import DUMMY_THUMBNAIL from "../../assets/illustrations/welcome2.png";
const DUMMY_VIDEOS = Array.from({ length: 12 }, (_, i) => i);

export default function ClassVideosScreen({ route, navigation }) {
    const { course } = route.params || {};

    const thumbnailPressHandler = () => {
        navigation.navigate("VideoScreen", { course });
    };

    return (
        <ScreenContainer>
            <AppHeader />
            <Text style={styles.title}>
                {course.name} {Strings.videos}
            </Text>
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
        fontSize: Sizes.titleLarge,
        borderBottomWidth: 4,
        borderBottomColor: Colors.primary500,
        alignSelf: "baseline",
        marginBottom: 24,
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
});
