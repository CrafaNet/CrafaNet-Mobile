import { getLocales } from "expo-localization";
const locales = {
    en: require("../locales/en.json"),
};

const deviceLang = getLocales()[0].languageCode;
const defaultLang = "en";

const strings = locales[deviceLang] || locales[defaultLang];
export default strings;
