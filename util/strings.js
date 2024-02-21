import { locale } from "expo-localization";
const locales = {
    en: require("../locales/en.json"),
};

const defaultLang = "en";
const [deviceLang, deviceRegion] = locale.split("-");

const strings = locales[deviceLang] || locales[defaultLang];

export default strings;
export { deviceLang, deviceRegion };
