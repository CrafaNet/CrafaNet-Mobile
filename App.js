import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "./util/http";

import AppMiddleware from "./middlewares/AppMiddleware";

export default function App() {
    const [fontsLoaded] = useFonts({
        "poppins-": require("./assets/fonts/Poppins-Regular.ttf"),
        "poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
        "montserrat-": require("./assets/fonts/Montserrat-Regular.ttf"),
        "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    });

    if (!fontsLoaded) return null;

    return (
        <QueryClientProvider client={queryClient}>
            <StatusBar style='auto' />
            <AppMiddleware />
        </QueryClientProvider>
    );
}
