import { useRef } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Feather } from "@expo/vector-icons";

import ScreenContainer from "../components/ScreenContainer";
import AppHeader from "../components/AppHeader";
import Button from "../components/Button";
import CreditCard from "../components/CreditCard";

import Strings from "../util/strings";

import classAsset10Illustration from "../assets/illustrations/classAsset10.png";

export default function UpgradeToVipScreen({ navigation }) {
    const bottomSheetModalRef = useRef(null);

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
                <Button mode='primary' onPress={() => bottomSheetModalRef.current?.present()}>
                    {Strings.upgradeNow}
                </Button>
                <BottomSheetModal ref={bottomSheetModalRef} index={0} snapPoints={["60%", "90%"]}>
                    <CreditCard
                        api=''
                        data={{}}
                        price={0}
                        onSuccess={() => {
                            const message = Strings.congratulationsYouBecameVIP;
                            showMessage({ message, type: "success" });
                            navigation.navigate("CommunityHome");
                        }}
                        onSettled={() => {
                            navigation.navigate("CommunityHome");
                        }}
                    />
                </BottomSheetModal>
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
        paddingHorizontal: 10,
    },
    title: {
        fontFamily: "poppins-bold",
        fontSize: 24,
    },
    text: {
        fontFamily: "poppins-",
    },
    image: {
        width: "90%",
        alignSelf: "center",
    },
    listContainer: {
        gap: 10,
        marginBottom: 40,
    },
    listItem: {
        fontFamily: "poppins-",
    },
});
