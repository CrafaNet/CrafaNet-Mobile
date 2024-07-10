import { locale } from "expo-localization";

// register language packages here
// as they are added to locales folder
const locales = {
    en: require("../locales/tr.json"),
};

const defaultLang = "tr";
const [deviceLang, deviceRegion] = locale.split("-"); // e.g: locale is "en-US" or "tr-TR"

const strings = locales[deviceLang] || locales[defaultLang];


export default strings;
export { deviceLang, deviceRegion };