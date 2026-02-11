import { useTranslations } from 'next-intl';
import HeaderComponent from './_components/header-components';
import SideBarAccount from './_components/sidebar-account';

export default function layout({
  children,
}: {
  children: React.ReactNode;
}) {

  // ^ translations
  const t = useTranslations('pages.profile');

  return (
    <div className="my-7 container mx-auto">
      {/* title */}
      <HeaderComponent title={t('title')} />
      <div className="container mx-auto grid h-screen grid-cols-4 gap-9">
      {/* sidebar */}
        <div className="col-span-1 bg-white">
          <SideBarAccount />
        </div>

        {/* content */}
        <div className="col-span-3 bg-white">
          {children}
        </div>

      </div>
    </div>
  );
}
