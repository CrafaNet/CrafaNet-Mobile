import { Image, StyleSheet, Text, View } from "react-native";

import ScreenContainer from "../../components/ScreenContainer";
import AppHeader from "../../components/AppHeader";
import Button from "../../components/Button";

import Strings from "../../util/strings";

import classAssetIllustration from "../../assets/illustrations/classAsset.png";

export default function JoinClassScreen({ route }) {
    const { item } = route.params || {};

    return (
        <ScreenContainer>
            <AppHeader />
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.title}>{Strings.applyNow}!</Text>
                </View>

                <Text style={styles.description}>
                    {Strings.DUMMY_CLASS_DESCRIPTION}
                </Text>
                <Image
                    style={styles.image}
                    source={classAssetIllustration}
                    resizeMode='contain'
                />
                <Button mode='primary'>{Strings.joinClass}</Button>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingTop: 40,
        paddingBottom: 80,
    },
    title: {
        fontFamily: "poppins-bold",
        fontSize: 24,
    },
    image: {
        width: "90%",
        alignSelf: "center",
    },
});
