import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation from './config'
// the translations
// (tip move them in a JSON file and import them)
const resources = translation;
let lang = 'zh-TW';
// if (typeof window !== 'undefined') {
//     if (navigator.language !== 'zh-TW' || navigator.language !== 'en' || navigator.language !== 'zh-CN') {
//         lang = 'zh-TW';
//     } else {
//         lang = navigator.language
//     }
// }

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: lang,

        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;