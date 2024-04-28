import { StyleSheet, Text, View, Image } from "react-native";
import useBottomModal from "../hooks/useBottomModal";
import { Feather } from "@expo/vector-icons";

import ScreenContainer from "../components/ScreenContainer";
import AppHeader from "../components/AppHeader";
import Button from "../components/Button";
import CreditCard from "../components/CreditCard";

import Strings from "../util/strings";

import classAsset10Illustration from "../assets/cartons/idea.png";

export default function UpgradeToVipScreen({ navigation }) {
    const [BottomModal, showBottomModal] = useBottomModal();

    return (
        <ScreenContainer>
            <AppHeader />
            <View style={styles.container}> 
                <Text style={styles.title}>{Strings.upgradeToVipMember}!</Text>
                <Text style={styles.text}>{Strings.upgradeToVipMemberDescription}</Text>
                <Image style={styles.image} source={classAsset10Illustration} resizeMode='contain' />

                <View style={styles.listContainer}>
                    <Text style={styles.listItem}>
                        <Feather name='check' size={18} color='black' />
                        {Strings.upgradeToVipMemberListItem0}
                    </Text>
                    <Text style={styles.listItem}>
                        <Feather name='check' size={18} color='black' />
                        {Strings.upgradeToVipMemberListItem1}
                    </Text>
                    <Text style={styles.listItem}>
                        <Feather name='check' size={18} color='black' />
                        {Strings.upgradeToVipMemberListItem2}
                    </Text>
                </View>
                <Button mode='primary' onPress={() => showBottomModal()}>
                    {Strings.getPremiumForDolar}
                </Button>
                <BottomModal snapPoints={["60%", "90%"]}>
                    <CreditCard
                        api=''
                        data={{}}
                        price={10}
                        onSuccess={() => {
                            const message = Strings.congratulationsYouBecameVIP;
                            showMessage({ message, type: "success" });
                            navigation.navigate("CommunityHome");
                        }}
                        onSettled={() => {
                            navigation.navigate("CommunityHome");
                        }}
                    />
                </BottomModal>
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        paddingTop: 20,
        paddingBottom: 60,
        paddingHorizontal: 0,
    },
    title: {
        fontFamily: "poppins-bold",
        fontSize: 20,
    },
    text: {
        fontFamily: "poppins-",
    },
    image: {
        width: "50%",
        alignSelf: "center",
        marginTop: -100,
        marginBottom: -100
    },
    listContainer: {
        gap: 10,
        marginBottom: 40,
    },
    listItem: {
        fontFamily: "poppins-",
    },
});
