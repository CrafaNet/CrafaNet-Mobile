import { setItem, getItem, removeItem } from "./async-storage";

export function setToken(token) {
    setItem("token", token);
}

export function getToken() {
    return getItem("token");
}

export function removeToken() {
    removeItem("token");
}

export function checkToken() {
    return !!getToken();
}

export function checkAuth() {}
