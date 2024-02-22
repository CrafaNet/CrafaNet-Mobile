import { locale } from "expo-localization";

// register language packages here
// as they are added to locales folder
const locales = {
    en: require("../locales/en.json"),
};

const defaultLang = "en";
const [deviceLang, deviceRegion] = locale.split("-"); // e.g: locale is "en-US" or "tr-TR"

const strings = locales[deviceLang] || locales[defaultLang];

export default strings;
export { deviceLang, deviceRegion };
