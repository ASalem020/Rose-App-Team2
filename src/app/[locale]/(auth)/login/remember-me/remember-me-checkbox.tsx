'use client';

import { useTranslations } from 'next-intl';

type RememberMeProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
};

export default function RememberMeCheckbox({
  checked,
  onChange,
}: RememberMeProps) {
  // Use login page translations instead of common
  const t = useTranslations('pages.login');

  return (
    // Remember me checkbox label
    <label className="flex cursor-pointer items-center gap-2 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="sr-only"
      />

      {/* Custom checkbox UI */}
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-md border border-maroon-700 ${
          checked ? 'bg-maroon-700' : 'bg-transparent'
        }`}
      >
        {checked && (
          // Checkmark when checkbox is checked
          <span className="text-xs text-white">✓</span>
        )}
      </span>

      {/* Translated label text */}
      {t('rememberMe')}
    </label>
  );
}
