import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "New Run": "New Run",
      Info: "Info",
      "Create New Run": "Create New Run",
      Save: "Save",
    },
  },
  es: {
    translation: {
      "New Run": "Nueva Corrida",
    },
  },
};

const language = window.localStorage.getItem("language") || "en-us";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: language,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
