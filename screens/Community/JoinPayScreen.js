import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { CreditCardInput } from "react-native-credit-card-input";

import ScreenContainer from "../../components/ScreenContainer";
import Button from "../../components/Button";

import Strings from "../../util/strings";
import { queryClient, sendRequest } from "../../util/http";

export default function JoinPayScreen({ route, navigation }) {
    const cardInputRef = useRef(null);
    const [form, setForm] = useState({});
    const [activeInputIndex, setActiveInputIndex] = useState(0);
    const inputFieldsList = ["number", "expiry", "cvc", "name"];

    const { course } = route.params || {};
    const user = queryClient.getQueryData(["userData"]);

    const mutation = useMutation({
        mutationFn: (data) => {
            return sendRequest({ api: "/comunity/joinComunity", data });
        },
        onSuccess: (response) => {
            const message = "Successfully joined.";
            showMessage({ message, type: "success" });
            navigation.navigate("ClassScreen", { course });
        },
    });

    const submitHandler = () => {
        if (!form.valid) return;
        mutation.mutate({
            userID: user._id,
            comunityID: course._id,
            ...form.values,
        });
    };

    const prevButtonHandler = () => {
        if (activeInputIndex === 0) return;
        setActiveInputIndex((prev) => {
            const newIndex = activeInputIndex - 1;
            cardInputRef.current.focus(inputFieldsList[newIndex]);
            return newIndex;
        });
    };
    const nextButtonHandler = () => {
        if (activeInputIndex === inputFieldsList.length - 1) return;
        setActiveInputIndex((prev) => {
            const newIndex = activeInputIndex + 1;
            cardInputRef.current.focus(inputFieldsList[newIndex]);
            return newIndex;
        });
    };

    return (
        <ScreenContainer>
            <CreditCardInput
                ref={cardInputRef}
                onChange={setForm}
                requiresName
                labels={{
                    number: Strings.cardNumber.toUpperCase(),
                    expiry: Strings.expiry.toUpperCase(),
                    cvc: Strings.cvc.toUpperCase(),
                    name: Strings.name.toUpperCase(),
                }}
            />
            <View style={styles.nextPrevContainer}>
                <Button
                    mode='secondary'
                    secondaryIconSide='left'
                    onPress={prevButtonHandler}
                >
                    {Strings.prev.toUpperCase()}
                </Button>
                <Button mode='secondary' onPress={nextButtonHandler}>
                    {Strings.next.toUpperCase()}
                </Button>
            </View>
            <Button
                mode='primary'
                onPress={submitHandler}
                style={styles.confirmButton}
            >
                {`${Strings.confirmPayment} (${course.price} €/mo)`}
            </Button>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    nextPrevContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        paddingHorizontal: 10,
    },
    confirmButton: {
        marginTop: "auto",
        marginBottom: 20,
    },
});
