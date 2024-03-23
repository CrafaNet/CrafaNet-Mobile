import { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { CreditCardInput } from "react-native-credit-card-input";

import Button from "../components/Button";

import Strings from "../util/strings";
import { sendRequest } from "../util/http";

export default function CreditCard({ navigation, route, api, data, price, onSuccess, onSettled }) {
    const cardInputRef = useRef(null);
    const [form, setForm] = useState({});
    const [activeInputIndex, setActiveInputIndex] = useState(0);
    const inputFieldsList = ["number", "expiry", "cvc", "name"];

    const mutation = useMutation({
        mutationFn: (mutationData) => {
            // on production, uncomment the following line
            // return sendRequest({ api, data: mutationData });
        },
        onSuccess,
        onSettled,
    });

    const submitHandler = () => {
        const values = form.values;
        // on production, uncomment the following line
        // if (!form.valid) return;
        const [month, year] = form.values.expiry.split("/");
        mutation.mutate({
            name: form.values.name,
            cardNumber: form.values.number,
            cvc: form.values.cvc,
            month,
            year,
            ...data,
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
        <View style={styles.container}>
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
                <Button mode='secondary' secondaryIconSide='left' onPress={prevButtonHandler}>
                    {Strings.prev.toUpperCase()}
                </Button>
                <Button mode='secondary' onPress={nextButtonHandler}>
                    {Strings.next.toUpperCase()}
                </Button>
            </View>
            <Button mode='primary' onPress={submitHandler} style={styles.confirmButton}>
                {`${Strings.confirmPayment} (${price} €/mo)`}
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    nextPrevContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        paddingHorizontal: 10,
    },
    confirmButton: {
        marginVertical: 20,
    },
});
