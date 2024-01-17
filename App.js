import { StatusBar } from "expo-status-bar";

import Navigation from "./Navigation";
import AuthFormScreen from "./screens/AuthFormScreen";

export default function App() {
    const isAuthenticated = false;

    return (
        <>
            <StatusBar style='auto' />
            {isAuthenticated ? <Navigation /> : <AuthFormScreen />}
        </>
    );
}
