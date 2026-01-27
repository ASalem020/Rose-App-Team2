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
          /**
           * Integer number format configuration.
           * Formats numbers as whole integers with no decimal places.
           * Uses locale-specific numbering system (Arabic numerals for 'ar', Latin for others).
           *
           * @example
           * // Usage: format.number(1234.56, { format: 'integer' })
           * // Output: "1,235" (or "١٬٢٣٥" for Arabic locale)
           */
          integer: {
            numberingSystem: numberingSystemValue,
            maximumFractionDigits: 0,
          },
          /**
           * Decimal number format configuration.
           * Formats numbers with exactly 2 decimal places.
           * Uses locale-specific numbering system (Arabic numerals for 'ar', Latin for others).
           *
           * @example
           * // Usage: format.number(1234.5, { format: 'decimal' })
           * // Output: "1,234.50" (or "١٬٢٣٤٫٥٠" for Arabic locale)
           */
          decimal: {
            numberingSystem: numberingSystemValue,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
          /**
           * Short percent format configuration.
           * Formats numbers as percentages with no decimal places.
           * Uses locale-specific numbering system (Arabic numerals for 'ar', Latin for others).
           *
           * @example
           * // Usage: format.number(0.75, { format: 'short-percent' })
           * // Output: "75%" (or "٧٥٪" for Arabic locale)
           */
          'short-percent': {
            style: 'percent',
            numberingSystem: numberingSystemValue,
            maximumFractionDigits: 0,
          },
          /**
           * Detailed price format configuration.
           * Formats numbers as currency (EGP) with exactly 3 decimal places.
           * Uses locale-specific numbering system (Arabic numerals for 'ar', Latin for others).
           *
           * @example
           * // Usage: format.number(1234.5, { format: 'detailed-price' })
           * // Output: "EGP 1,234.500" (or "١٬٢٣٤٫٥٠٠ ج.م" for Arabic locale)
           */
          'detailed-price': {
            ...mainCurrencyOptions,
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          },
          /**
           * Short price format configuration.
           * Formats numbers as currency (EGP) with no decimal places (rounded to whole numbers).
           * Uses locale-specific numbering system (Arabic numerals for 'ar', Latin for others).
           *
           * @example
           * // Usage: format.number(1234.56, { format: 'short-price' })
           * // Output: "EGP 1,235" (or "١٬٢٣٥ ج.م" for Arabic locale)
           */
          'short-price': {
            ...mainCurrencyOptions,
            maximumFractionDigits: 0,
          },
        },
        // Date & Time
        dateTime: {
          /**
           * Detailed date format configuration.
           * Formats dates with full month name, 2-digit day, and numeric year.
           * Uses locale-specific numbering system (Arabic numerals for 'ar', Latin for others).
           *
           * @example
           * // Usage: format.dateTime(date, { format: 'detailed-date' })
           * // Output: "January 15, 2024" (or localized equivalent)
           */
          'detailed-date': {
            month: 'long',
            day: '2-digit',
            year: 'numeric',
            numberingSystem: numberingSystemValue,
          },
          /**
           * Detailed time and date format configuration.
           * Formats dates with numeric day, short month name, numeric year, and 12-hour time format.
           * Uses locale-specific numbering system (Arabic numerals for 'ar', Latin for others).
           *
           * @example
           * // Usage: format.dateTime(date, { format: 'detailed-time-date' })
           * // Output: "15 Jan 2024, 3:30 PM" (or localized equivalent)
           */
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
          /**
           * Custom conjunction list format configuration.
           * Formats lists using conjunction (and) to join items.
           * Custom name prevents conflicts with default list formats.
           *
           * @example
           * // Usage: format.list(['Apple', 'Banana', 'Orange'], { format: 'custom-conjunction' })
           * // Output: "Apple, Banana, and Orange" (or localized equivalent)
           */
          'custom-conjunction': {
            type: 'conjunction',
          },
          /**
           * Custom disjunction list format configuration.
           * Formats lists using disjunction (or) to join items.
           * Custom name prevents conflicts with default list formats.
           *
           * @example
           * // Usage: format.list(['Red', 'Blue', 'Green'], { format: 'custom-disjunction' })
           * // Output: "Red, Blue, or Green" (or localized equivalent)
           */
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
