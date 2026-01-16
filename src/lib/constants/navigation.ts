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
  label: string;
  icon: LucideIcon;
  active?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Home', icon: Home, active: true },
  { href: '/products', label: 'Products', icon: Gift },
  {
    href: '/categories',
    label: 'Categories',
    icon: LayoutGrid,
  },
  {
    href: '/occasions',
    label: 'Occasions',
    icon: PartyPopper,
  },
  { href: '/contact', label: 'Contact', icon: Phone },
  { href: '/about', label: 'About', icon: Info },
];

export interface FooterLink {
  label: string;
  href: string;
}

export const FOOTER_LINKS: FooterLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Categories', href: '/categories' },
  { label: 'Occasions', href: '/occasions' },
  { label: 'Contact', href: '/contact' },
  { label: 'About', href: '/about' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'FAQs', href: '/faqs' },
];
