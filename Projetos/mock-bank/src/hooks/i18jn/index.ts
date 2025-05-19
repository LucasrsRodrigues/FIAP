import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";

import en from "./translations/en";
import pt from "./translations/pt";

const locales = getLocales()

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en
    },
    pt: {
      translation: pt
    },
    'pt-BR': {
      translation: pt
    }
  },
  lng: locales[0].languageTag,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n;
