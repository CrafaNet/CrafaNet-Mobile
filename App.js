import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "./util/http";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                    <StatusBar style='auto' />
                    <AppMiddleware />
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </QueryClientProvider>
    );
}
