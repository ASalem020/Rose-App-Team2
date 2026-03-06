'use client';


// Imports


import { useTranslations } from 'next-intl';

import ChangePasswordForm from '@/components/features/account/change-password-form';


// Page


/**
 * Dashboard account change-password page (/dashboard/account/change-password)
 *
 * Renders the shared ChangePasswordForm with the profileSettingsPath prop so
 * an inline "Profile Settings" back-link appears at the bottom (no sidebar here).
 */
export default function DashboardChangePasswordPage() {

  // Translation


  const t = useTranslations('pages.profile');


  // Render


  return (
    <div className="space-y-6">

      {/* Page heading */}
      <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">
        {t('change-password')}
      </h1>

      {/* Form — passes profileSettingsPath so the back-link appears */}
      <ChangePasswordForm profileSettingsPath="/dashboard/account/profile" />

    </div>
  );
}
