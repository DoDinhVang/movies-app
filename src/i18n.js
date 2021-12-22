import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './translation/en/translationEN.json'
import translationVi from './translation/vi/translationVi.json'

const resources = {
    en: {
        translation: translationEN
    },
    vi: {
        translation: translationVi
    }
}

i18n
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        resources,
        fallbackLng: 'vi',
        debug: true,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });


export default i18n;