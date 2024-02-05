import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";
import { checkAuth } from "./store/auth";

import Navigation from "./Navigation";
import AuthFormScreen from "./screens/AuthFormScreen";

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());

    const [fontsLoaded] = useFonts({
        "poppins-": require("./assets/fonts/Poppins-Regular.ttf"),
        "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
        "montserrat-": require("./assets/fonts/Montserrat-Regular.ttf"),
        "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    });

    if (!fontsLoaded) return null;

    const onAuth = () => {
        setIsAuthenticated(true);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <StatusBar style='auto' />
            {isAuthenticated ? (
                <Navigation />
            ) : (
                <AuthFormScreen onAuth={onAuth} />
            )}
        </QueryClientProvider>
    );
}
