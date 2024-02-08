import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/http";
import { checkAuth } from "./store/auth";
import { getItem, setItem } from "./store/async-storage";

import Navigation from "./Navigation";
import AuthFormScreen from "./screens/AuthFormScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [seenWelcome, setSeenWelcome] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await checkAuth();
            setIsAuthenticated(result);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getItem("seenWelcome");
            setSeenWelcome(result);
        };
        fetchData();
    }, []);

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

    const onSeenWelcome = () => {
        setItem("seenWelcome", "true");
        setSeenWelcome(true);
    };

    const navJsx = <Navigation />;
    const authFormJsx = <AuthFormScreen onAuth={onAuth} />;
    const welcomeJsx = <WelcomeScreen onSeenWelcome={onSeenWelcome} />;

    let content = isAuthenticated ? navJsx : authFormJsx;
    if (!seenWelcome) content = welcomeJsx;

    return (
        <QueryClientProvider client={queryClient}>
            <StatusBar style='auto' />
            {content}
        </QueryClientProvider>
    );
}
