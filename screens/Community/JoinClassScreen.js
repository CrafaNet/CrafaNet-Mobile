import { Image, StyleSheet, Text, View } from "react-native";
import useBottomModal from "../../hooks/useBottomModal";

import ScreenContainer from "../../components/ScreenContainer";
import AppHeader from "../../components/AppHeader";
import Button from "../../components/Button";
import CreditCard from "../../components/CreditCard";

import Strings from "../../util/strings";
import { queryClient } from "../../util/http";

import classAssetIllustration from "../../assets/illustrations/classAsset.png";

export default function JoinClassScreen({ route, navigation }) {
    const [BottomModal, showBottomModal] = useBottomModal();
    const { course } = route.params || {};

    const user = queryClient.getQueryData(["user"]);

    return (
        <ScreenContainer>
            <AppHeader />
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{course.name}</Text>
                    <Text style={styles.title}>{Strings.applyNow}!</Text>
                </View>

                <Text style={styles.description}>{Strings.DUMMY_CLASS_DESCRIPTION}</Text>
                <Image style={styles.image} source={classAssetIllustration} resizeMode='contain' />
                <Button mode='primary' onPress={showBottomModal}>
                    {`${Strings.joinClass} (${course.price} €/mo)`}
                </Button>
            </View>
            <BottomModal snapPoints={["60%", "90%"]}>
                <CreditCard
                    api='/comunity/joinComunity'
                    data={{ userID: user._id, comunityID: course._id }}
                    price={course.price}
                    onSuccess={(response) => {
                        const message = Strings.successfullyJoined;
                        showMessage({ message, type: "success" });
                        navigation.pop();
                        navigation.pop();
                        navigation.navigate("ClassScreen", { course });
                    }}
                    onSettled={() => {
                        // on production, delete this onSettled function completely
                        navigation.pop();
                        navigation.pop();
                        navigation.navigate("ClassScreen", { course });
                    }}
                />
            </BottomModal>
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
