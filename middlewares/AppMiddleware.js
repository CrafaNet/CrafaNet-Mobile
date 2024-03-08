import { useQuery } from "@tanstack/react-query";
import FlashMessage from "react-native-flash-message"; // docs: https://www.npmjs.com/package/react-native-flash-message
import Constants from "expo-constants";

import { checkAuth } from "./../store/auth";
import { getItem, setItem } from "./../store/async-storage";
import { queryClient } from "../util/http";

import Navigation from "./../Navigation";
import AuthFormScreen from "./../screens/AuthFormScreen";
import WelcomeScreen from "./../screens/WelcomeScreen";

export default function AppMiddleware() {
    // useQuery here might seem unnecessary
    // but it is used to make use of its invalidateQuery and isLoading feature
    const { data: isAuthenticated, isLoading: isIsAuthenticatedLoading } =
        useQuery({
            queryKey: ["isAuthenticated"],
            queryFn: checkAuth,
        });

    // welcome screen seen information is stored on the device
    const { data: seenWelcome, isLoading: isSeenWelcomeLoading } = useQuery({
        queryKey: ["seenWelcome"],
        queryFn: () => getItem("seenWelcome"),
    });

    // if seen, welcome screen will not be shown again to the user
    const onSeenWelcome = () => {
        setItem("seenWelcome", "true");
        queryClient.invalidateQueries({ queryKey: ["seenWelcome"] });
    };

    const navJsx = <Navigation />;
    const authFormJsx = <AuthFormScreen />;
    const welcomeJsx = <WelcomeScreen onSeenWelcome={onSeenWelcome} />;

    if (isIsAuthenticatedLoading || isSeenWelcomeLoading) return;

    // content to be shown is decided according to the authentication and seen wolcome screen conditions
    let content = isAuthenticated ? navJsx : authFormJsx;
    if (!seenWelcome) content = welcomeJsx;

    // FlashMessage docs link is provided above in this file
    return (
        <>
            {content}
            <FlashMessage {...flashMessageConfig} />
        </>
    );
}

const flashMessageConfig = {
    position: "top",
    duration: 10000,
    statusBarHeight: Constants.statusBarHeight,
    floating: true,
    icon: "auto",
};
