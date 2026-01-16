import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { hasLocale } from 'next-intl';
import type { NumberFormatOptions } from 'next-intl';

export default getRequestConfig(
  async ({ requestLocale }) => {
    const requestedLocale = await requestLocale;
    const locale = hasLocale(
      routing.locales,
      requestedLocale,
    )
      ? requestedLocale
      : routing.defaultLocale;
    const numberingSystemValue =
      locale === 'ar' ? 'arab' : 'latn';
    const mainCurrencyOptions: NumberFormatOptions = {
      style: 'currency',
      currency: 'EGP',
      numberingSystem: numberingSystemValue,
    };

    return {
      formats: {
        // Numbers & Percent & Price
        number: {
          integer: {
            numberingSystem: numberingSystemValue,
            maximumFractionDigits: 0,
          },
          decimal: {
            numberingSystem: numberingSystemValue,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
          'short-percent': {
            style: 'percent',
            numberingSystem: numberingSystemValue,
            maximumFractionDigits: 0,
          },
          'detailed-price': {
            ...mainCurrencyOptions,
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          },
          'short-price': {
            ...mainCurrencyOptions,
            maximumFractionDigits: 0,
          },
        },
        // Date & Time
        dateTime: {
          'detailed-date': {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
            numberingSystem: numberingSystemValue,
          },
          'detailed-time-date': {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            numberingSystem: numberingSystemValue,
          },
        },
        // Lists
        list: {
          // I write custom word to prevent duplicated name
          'custom-conjunction': {
            type: 'conjunction',
          },
          'custom-disjunction': {
            type: 'disjunction',
          },
        },
      },
      locale,
      messages: (await import(`./messages/${locale}.json`))
        .default,
    };
  },
);
