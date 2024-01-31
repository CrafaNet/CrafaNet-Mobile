import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setItem(key, value) {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error("Error saving item:", key);
    }
}

export async function getItem(key) {
    try {
        await AsyncStorage.getItem(key);
    } catch (error) {
        console.error("Error getting item:", key);
    }
}

export async function removeItem(key) {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing item:", key);
    }
}
