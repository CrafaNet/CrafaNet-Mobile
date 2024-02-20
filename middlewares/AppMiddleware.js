import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { checkAuth } from "./../store/auth";
import { getItem, setItem } from "./../store/async-storage";

import Navigation from "./../Navigation";
import AuthFormScreen from "./../screens/AuthFormScreen";
import WelcomeScreen from "./../screens/WelcomeScreen";

export default function AppMiddleware() {
    const [seenWelcome, setSeenWelcome] = useState();

    const { data: isAuthenticated } = useQuery({
        queryKey: ["isAuthenticated"],
        queryFn: checkAuth,
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await getItem("seenWelcome");
            setSeenWelcome(result);
        };
        fetchData();
    }, []);

    const onSeenWelcome = () => {
        setItem("seenWelcome", "true");
        setSeenWelcome(true);
    };

    const navJsx = <Navigation />;
    const authFormJsx = <AuthFormScreen />;
    const welcomeJsx = <WelcomeScreen onSeenWelcome={onSeenWelcome} />;

    let content = isAuthenticated ? navJsx : authFormJsx;
    if (!seenWelcome) content = welcomeJsx;

    return <>{content}</>;
}
