import { useCallback } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import Navigation from "./Navigation";
import AuthFormScreen from "./screens/AuthFormScreen";

export default function App() {
    const isAuthenticated = true;

    const [fontsLoaded] = useFonts({
        "poppins-": require("./assets/fonts/Poppins-Regular.ttf"),
        "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
    });

    if (!fontsLoaded) return null;

    return (
        <>
            <StatusBar style='auto' />
            {isAuthenticated ? <Navigation /> : <AuthFormScreen />}
        </>
    );
}
