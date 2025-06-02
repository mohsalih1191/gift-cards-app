import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import arTranslations from './locales/ar.json';

const resources = {
  en: { translation: enTranslations },
  ar: { translation: arTranslations }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: {
      useSuspense: true,
    },
  });

// This function handles setting the document dir attribute for RTL support
export const setLanguageDirection = (language: string) => {
  const direction = language === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = direction;
  document.documentElement.lang = language;
};

// Set initial direction
setLanguageDirection(i18n.language);

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  setLanguageDirection(lng);
  localStorage.setItem('language', lng);
});

export default i18n;