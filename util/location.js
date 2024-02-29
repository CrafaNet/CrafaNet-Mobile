import * as Location from "expo-location";
import countries from "../data/countries.json";

export async function getLocation() {
    try {
        // asks for permission to acces the location
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;
        // gets the location info of the user
        const location = await Location.getCurrentPositionAsync({});
        return location;
    } catch (err) {
        return;
    }
}

export async function getCountry({ latitude, longitude }) {
    if (!longitude || !latitude) return;
    try {
        // utilizes an api to find the country of the user by latitude and longitude
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (err) {
        return;
    }
}

export function getCountryDial(countryCode) {
    // gives the dial code of the country by the country code
    // e.g: countryCode = "tr" returns "+90"
    const country = countries.find(
        (item) => item.code.toLowerCase() === countryCode.toLowerCase()
    );
    return country?.dial_code || "";
}

export function getCountryCodeByDial(countryDial) {
    // gives the country code of the country by the dial code
    // e.g: countryCode = "tr" returns "+90"
    const country = countries.find(
        (item) => item.dial_code.toLowerCase() === countryDial.toLowerCase()
    );
    return country?.code || "";
}
