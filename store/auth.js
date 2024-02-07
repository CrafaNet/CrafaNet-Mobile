import { setItem, getItem, removeItem } from "./async-storage";

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
        const isAuthenticated = await checkToken();
        return isAuthenticated;
    } catch (error) {
        console.error("Error checking authentication:", error);
        return null;
    }
}
