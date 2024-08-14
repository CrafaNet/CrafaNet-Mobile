import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Image, Dimensions, Pressable } from "react-native";
import PagerView from "react-native-pager-view";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

import welcomeImage1 from "../assets/welcome/welcome1.png";
import welcomeImage2 from "../assets/welcome/welcome2.png";
import welcomeImage3 from "../assets/welcome/welcome3.png";
import splashImage from "../assets/splash.png";

import Colors from "../constants/color";
import Sizes from "../constants/sizes";
import strings from "../util/strings";

const ww = Dimensions.get("window").width;

const Button = ({ children, style, mode = "text", onPress, disabled, isLoading, secondaryIconSide = "right" }) => {
    const styles = styleModes[mode];
    const isSecondary = mode === "secondary";

    const buttonOnPress = () => {
        if (disabled || isLoading) return;
        if (onPress) onPress();
    };

    return (
        <Pressable onPress={buttonOnPress} style={[styles.container, disabled && styles.disabled, style]}>
            <LinearGradient
                colors={
                    disabled
                        ? mode === "primary"
                            ? gradientColorModes.primaryDisabled
                            : gradientColorModes.disabled
                        : gradientColorModes[mode]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            >
                {isSecondary && secondaryIconSide === "left" && (
                    <AntDesign
                        style={{ transform: [{ rotate: "180deg" }] }}
                        name='rightcircle'
                        size={14}
                        color='white'
                    />
                )}
                {!isLoading && <Text style={styles.text}>{children}</Text>}
                {isSecondary && secondaryIconSide === "right" && (
                    <AntDesign name='rightcircle' size={14} color='white' />
                )}
            </LinearGradient>
        </Pressable>
    );
};

const gradientColorModes = {
    primary: Colors.mainLinearGradient,
    secondary: [Colors.secondary500, Colors.secondary500],
    text: ["transparent", "transparent"],
    gray: ["#ddd", "#ddd"],
    disabled: ["#555", "#555"],
    primaryDisabled: ["#555", "#888"],
};

const styleModes = {
    primary: StyleSheet.create({
        container: {
            height: 44,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            overflow: "hidden",
        },
        gradient: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
        text: {
            color: "white",
            fontSize: 18,
            textTransform: "uppercase",
            fontWeight: "bold",
        },
    }),
    secondary: StyleSheet.create({
        container: {
            alignSelf: "baseline",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 999,
            overflow: "hidden",
        },
        gradient: {
            width: "100%",
            paddingHorizontal: 4,
            paddingVertical: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
        },
        text: {
            fontSize: Sizes.textSmall,
            color: "white",
            fontWeight: "bold",
        },
    }),
    text: StyleSheet.create({
        container: {
            margin: 4,
        },
        gradient: {},
        text: {
            color: Colors.coloredText,
            fontWeight: "bold",
        },
    }),
    gray: StyleSheet.create({
        container: {
            height: 44,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            overflow: "hidden",
        },
        gradient: {
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
        text: {
            color: "#222",
            fontSize: 18,
            textTransform: "uppercase",
            fontWeight: "bold",
        },
    }),
};

export default function WelcomeScreen({ navigation }) {
    const [showSplash, setShowSplash] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const pagerViewRef = useRef(null);
    const images = [welcomeImage1, welcomeImage2, welcomeImage3];

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000); // 3 saniye splash ekranı

        return () => clearTimeout(timer);
    }, []);

    const pageChangeHandler = (e) => setActiveIndex(e.nativeEvent.position);

    const pageMargin = -(ww * 0.3);

    const nextPressHandler = () => {
        if (pagerViewRef.current) {
            pagerViewRef.current.setPage(activeIndex + 1);
        }
    };

    const onSeenWelcome = () => {
        navigation.navigate('SignUp'); // SignUp ekranına yönlendirir
    };

    if (showSplash) {
        return (
            <View style={styles.splashContainer}>
                <Image source={splashImage} style={styles.splashImage} resizeMode='cover' />
            </View>
        );
    }

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
                >
                    {images.map((item, index) => {
                        const inactiveStyle = index !== activeIndex && styles.inactivePage;
                        return (
                            <View style={[styles.page, inactiveStyle]} key={index}>
                                <Image source={item} style={[styles.image, { height: 480 }]} resizeMode='contain' />
                            </View>
                        );
                    })}
                </PagerView>
            </View>

            <View style={styles.detailsContainer}>
                <View>
                    <Text style={[styles.text, styles.title]}>{strings[`welcomeScreenTitle${activeIndex}`]}</Text>
                    <Text style={styles.text}>{strings[`welcomeScreenText${activeIndex}`]}</Text>
                </View>
                <View style={styles.actions}>
                    {activeIndex === images.length - 1 ? (
                        <Button style={styles.button} mode='primary' onPress={onSeenWelcome}>
                            {strings.startNow}
                        </Button>
                    ) : (
                        <Button style={styles.button} mode='primary' onPress={nextPressHandler}>
                            {strings.next}
                        </Button>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#42176E',
    },
    splashImage: {
        width: '100%',
        height: '100%',
    },
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
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 2,
        color: "#87419b"
    },
    title: {
        fontWeight: "bold",
        fontSize: 22,
        color: "#792b8f",
    },
});
