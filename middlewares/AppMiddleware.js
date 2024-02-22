import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { checkAuth } from "./../store/auth";
import { getItem, setItem } from "./../store/async-storage";

import Navigation from "./../Navigation";
import AuthFormScreen from "./../screens/AuthFormScreen";
import WelcomeScreen from "./../screens/WelcomeScreen";

export default function AppMiddleware() {
    const [seenWelcome, setSeenWelcome] = useState();

    // useQuery here might seem unnecessary
    // but it is used to make use of its invalidateQuery feature
    const { data: isAuthenticated } = useQuery({
        queryKey: ["isAuthenticated"],
        queryFn: checkAuth,
    });

    // welcome screen seen information is stored on the device
    useEffect(async () => {
        const result = await getItem("seenWelcome");
        setSeenWelcome(result);
    }, []);

    // if seen, welcome screen will not be shown again to the user
    const onSeenWelcome = () => {
        setItem("seenWelcome", "true");
        setSeenWelcome(true);
    };

    const navJsx = <Navigation />;
    const authFormJsx = <AuthFormScreen />;
    const welcomeJsx = <WelcomeScreen onSeenWelcome={onSeenWelcome} />;

    // content to be shown is decided according to the authentication and seen wolcome screen conditions
    let content = isAuthenticated ? navJsx : authFormJsx;
    if (!seenWelcome) content = welcomeJsx;

    return <>{content}</>;
}
