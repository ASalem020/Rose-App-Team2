'use client';


// Imports


import { useTranslations } from 'next-intl';

import ProfileForm from '@/components/features/account/profile-form';


// Page


/**
 * Dashboard account profile page (/dashboard/account/profile)
 *
 * Renders the shared ProfileForm with the changePasswordPath prop so an
 * inline "Change Password" link appears at the bottom (no sidebar here).
 */
export default function DashboardProfilePage() {

  // Translation


  const t = useTranslations('pages.profile');


  // Render


  return (
    <div className="space-y-6">

      {/* Page heading */}
      <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">
        {t('title')}
      </h1>

      {/* Form — passes changePasswordPath so the inline link appears */}
      <ProfileForm changePasswordPath="/dashboard/account/change-password" />

    </div>
  );
}
