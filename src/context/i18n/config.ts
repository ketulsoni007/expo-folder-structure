import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

import en from '@/context/i18n/locales/en.json';
import gu from '@/context/i18n/locales/gu.json';
import hi from '@/context/i18n/locales/hi.json';

const translations = {
  en,
  hi,
  gu,
};

export const i18n = new I18n(translations);

const deviceLanguage = getLocales()[0]?.languageCode;

i18n.locale = deviceLanguage && deviceLanguage in translations
  ? deviceLanguage
  : 'en';

i18n.enableFallback = true;