import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { hasLocale } from 'next-intl';
import { getFormats } from './formats';

export default getRequestConfig(
  async ({ requestLocale }) => {
    const requestedLocale = await requestLocale;
    const locale = hasLocale(
      routing.locales,
      requestedLocale,
    )
      ? requestedLocale
      : routing.defaultLocale;

    return {
      formats: getFormats(locale),
      locale,
      messages: (await import(`./messages/${locale}.json`))
        .default,
    };
  },
);
