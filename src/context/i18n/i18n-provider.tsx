import { createContext, useContext } from 'react';

import { i18n } from '@/context/i18n/config';

const I18nContext = createContext(i18n);

export function I18nProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nContext.Provider value={i18n}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}