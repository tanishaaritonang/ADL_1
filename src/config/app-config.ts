import type { LocalePrefixMode } from 'next-intl/routing';

const localePrefix: LocalePrefixMode = 'as-needed';

// App configuration
export const AppConfig = {
  name: 'Nextjs Starter',
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix,
};

export const Localizations = {
  defaultLocale: 'en',
  supportedLocales: {
    en: 'en',
    fr: 'fr',
  },
};
