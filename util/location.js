import * as Location from "expo-location";
import countries from "../data/countries.json";

export async function getLocation() {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;
        const location = await Location.getCurrentPositionAsync({});
        return location;
    } catch (err) {
        return;
    }
}

export async function getCountry({ latitude, longitude }) {
    if (!longitude || !latitude) return;
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (err) {
        return;
    }
}

export function getCountryDial(countryCode) {
    const country = countries.find(
        (item) => item.code.toLowerCase() === countryCode.toLowerCase()
    );
    return country?.dial_code || "";
}
