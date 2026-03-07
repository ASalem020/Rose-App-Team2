import { DashboardLink } from '../_types/dashboard-link';

export const dashboardLinks: DashboardLink[] = [
  {
    icon: 'layout-dashboard',
    'translation-key': 'overview',
    href: '/dashboard',
  },
  {
    icon: 'clipboard-list',
    'translation-key': 'categories',
    href: '/dashboard/categories',
  },
  {
    icon: 'calender-heart',
    'translation-key': 'occasions',
    href: '/dashboard/occasion',
  },
  {
    icon: 'package',
    'translation-key': 'products',
    href: '/dashboard/products',
  },
];
