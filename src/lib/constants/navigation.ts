import {
  Home,
  Gift,
  LayoutGrid,
  PartyPopper,
  Phone,
  Info,
  LucideIcon,
} from 'lucide-react';

export interface NavLink {
  href: string;
  labelKey: string;
  icon: LucideIcon;
  active?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/', labelKey: 'home', icon: Home, active: true },
  { href: '/products', labelKey: 'products', icon: Gift },
  {
    href: '/categories',
    labelKey: 'categories',
    icon: LayoutGrid,
  },
  {
    href: '/occasions',
    labelKey: 'occasions',
    icon: PartyPopper,
  },
  { href: '/contact', labelKey: 'contact', icon: Phone },
  { href: '/about', labelKey: 'about', icon: Info },
];

export interface FooterLink {
  labelKey: string;
  href: string;
}

export const FOOTER_LINKS: FooterLink[] = [
  { labelKey: 'home', href: '/' },
  { labelKey: 'products', href: '/products' },
  { labelKey: 'categories', href: '/categories' },
  { labelKey: 'occasions', href: '/occasions' },
  { labelKey: 'contact', href: '/contact' },
  { labelKey: 'about', href: '/about' },
  { labelKey: 'terms', href: '/terms' },
  { labelKey: 'privacy', href: '/privacy' },
  { labelKey: 'faqs', href: '/faqs' },
];
