import { useState, useRef } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import PagerView from "react-native-pager-view";

import Button from "../components/Button";
import Strings from "../util/strings";

import welcomeImage1 from "../assets/images/welcome1.png";
import welcomeImage2 from "../assets/images/welcome2.png";
import welcomeImage3 from "../assets/images/welcome3.png";

const ww = Dimensions.get("window").width;

export default function WelcomeScreen({ onSeenWelcome }) {
    const pagerViewRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const images = [welcomeImage1, welcomeImage2, welcomeImage3];

    const pageChangeHandler = (e) => setActiveIndex(e.nativeEvent.position);

    const pageMargin = -(ww * 0.3);

    const nextPressHandler = () => {
        setActiveIndex((prev) => {
            const next = Math.min(prev + 1, images.length - 1);
            pagerViewRef.current.setPage(next);
            return next;
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.showcaseContainer}>
                <PagerView
                    ref={pagerViewRef}
                    style={styles.viewPager}
                    initialPage={0}
                    pageMargin={pageMargin}
                    offscreenPageLimit={3}
                    onPageSelected={pageChangeHandler}
                    tvParallaxTiltAngle={45}
                >
                    {images.map((item, index) => {
                        const inactiveStyle = index !== activeIndex && styles.inactivePage;
                        return (
                            <View style={[styles.page, inactiveStyle]} key={index}>
                                <Image source={item} style={styles.image} resizeMode='contain' height={480} />
                            </View>
                        );
                    })}
                </PagerView>
            </View>

            <View style={styles.detailsContainer}>
                <View>
                    <Text style={[styles.text, styles.title]}>{Strings[`welcomeScreenTitle${activeIndex}`]}</Text>
                    <Text style={styles.text}>{Strings[`welcomeScreenText${activeIndex}`]}</Text>
                </View>
                <View style={styles.actions}>
                    {activeIndex === images.length - 1 ? (
                        <Button style={styles.button} mode='primary' onPress={onSeenWelcome}>
                            {Strings.startNow}
                        </Button>
                    ) : (
                        <Button style={styles.button} mode='primary' onPress={nextPressHandler}>
                            {Strings.next}
                        </Button>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 80,
    },
    showcaseContainer: {
        flex: 1,
    },
    viewPager: {
        flex: 1,
    },
    page: {
        alignItems: "center",
        justifyContent: "center",
    },
    inactivePage: {
        transform: [{ scale: 0.8 }],
    },
    image: {
        width: "70%",
    },
    detailsContainer: {
        paddingHorizontal: 20,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    button: {
        width: "50%",
        marginTop: 20,
        marginBottom: 10,
    },
    text: {
        fontFamily: "poppins-bold",
        textAlign: "center",
        marginBottom: 2,
        color: "#87419b"
    },
    title: {
        fontFamily: "poppins-bold",
        fontSize: 22,
        color: "#792b8f",
    },
});
