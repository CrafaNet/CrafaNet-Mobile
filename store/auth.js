import { setItem, getItem, removeItem } from "./async-storage";
import { queryClient } from "../util/http";

// helper functions for managing token and authentication

export async function setToken(token) {
    try {
        await setItem("token", token);
        return true;
    } catch (error) {
        console.error("Error setting token:", error);
        return null;
    }
}

export async function getToken() {
    try {
        const token = await getItem("token");
        return token;
    } catch (error) {
        console.error("Error getting token:", error);
        return null;
    }
}

export async function removeToken() {
    try {
        await removeItem("token");
        return true;
    } catch (error) {
        console.error("Error removing token:", error);
        return null;
    }
}

export async function checkToken() {
    try {
        const token = await getToken();
        return !!token;
    } catch (error) {
        console.error("Error checking token:", error);
        return null;
    }
}

export async function checkAuth() {
    try {
        // this function is in fact here to check the authentication through an api
        // yet, at the current stage, there is no api for this
        const isAuthenticated = await checkToken();
        return isAuthenticated;
    } catch (error) {
        console.error("Error checking authentication:", error);
        return null;
    }
}

export function login(token) {
    try {
        setToken(token);
        queryClient.invalidateQueries({ queryKey: ["isAuthenticated"] });
        return true;
    } catch (error) {
        console.error("Error logging in:", error);
        return null;
    }
}

export function logout() {
    try {
        removeToken();
        queryClient.invalidateQueries({ queryKey: ["isAuthenticated"] });
        return true;
    } catch (error) {
        console.error("Error logging out:", error);
        return null;
    }
}
