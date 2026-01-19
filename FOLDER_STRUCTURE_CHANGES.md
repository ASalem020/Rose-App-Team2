# Folder Structure Changes

> **Date:** January 18, 2026  
> **Project:** Rose App

This document outlines all the folder structure changes made to organize the project better.

---

## Summary of Changes

### 1. Route Groups Created

We implemented **route groups** to separate layouts for different parts of the application:

| Route Group | Purpose              | Has Header/Footer |
| ----------- | -------------------- | ----------------- |
| `(main)`    | Main public pages    | ✅ Yes            |
| `(auth)`    | Authentication pages | ❌ No             |

---

### 2. Layout Components

Created reusable layout components in `src/components/layout/`:

```
src/components/layout/
├── index.ts              # Barrel exports
├── main-layout.tsx       # Layout with Header + Footer
└── auth-layout.tsx       # Minimal layout (no Header/Footer)
```

#### Usage:

```tsx
// In (main)/layout.tsx
import { MainLayout } from '@/components/layout';
export default function Layout({ children }) {
  return <MainLayout>{children}</MainLayout>;
}

// In (auth)/layout.tsx
import { AuthLayout } from '@/components/layout';
export default function Layout({ children }) {
  return <AuthLayout>{children}</AuthLayout>;
}
```

---

### 3. Providers Consolidation

**Before (Duplicated Structure):**

```
src/components/providers/
├── index.tsx
├── components/
│   ├── query-provider.tsx  ← DUPLICATE
│   └── theme-provider.tsx  ← DUPLICATE
└── app/
    ├── index.tsx
    └── components/
        ├── query-provider.tsx  ← DUPLICATE
        └── theme-provider.tsx  ← DUPLICATE
```

**After (Clean Structure):**

```
src/components/providers/
├── index.tsx           # Unified Providers component
├── query-provider.tsx  # Single QueryProvider
└── theme-provider.tsx  # Single ThemeProvider
```

#### The Providers Component:

```tsx
// src/components/providers/index.tsx
export function Providers({ children, messages, locale }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <NextIntlClientProvider
          messages={messages}
          locale={locale}
        >
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
```

---

### 4. App Folder Structure

**Before:**

```
src/app/
├── _components/           # Components at app root
│   ├── about.tsx
│   ├── companies.tsx
│   ├── gallery.tsx
│   └── testimonials/
├── [locale]/
│   ├── layout.tsx
│   ├── page.tsx           # Home page at root
│   ├── (auth)/
│   │   ├── forgot-password/
│   │   ├── login/
│   │   └── register/
│   └── (home)/            # Empty route group
└── layout.tsx
```

**After:**

```
src/app/
├── [locale]/
│   ├── layout.tsx         # Root locale layout with Providers
│   ├── error.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── (main)/            # Main pages with Header/Footer
│   │   ├── layout.tsx     # Uses MainLayout
│   │   ├── page.tsx       # Home page
│   │   └── _components/   # Home page Components moved here
│   │       ├── about.tsx
│   │       ├── companies.tsx
│   │       ├── gallery.tsx
│   │       └── testimonials/
│   ├── (auth)/            # Auth pages without Header/Footer
│   │   ├── layout.tsx     # Uses AuthLayout
│   │   ├── forgot-password/
│   │   │   └── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   └── messages/          # Dev/utility page
└── layout.tsx             # Root layout (globals.css only)
```

---

### 5. Files Created

| File                                               | Description                 |
| -------------------------------------------------- | --------------------------- |
| `src/components/layout/index.ts`                   | Barrel exports for layouts  |
| `src/components/layout/main-layout.tsx`            | Layout with Header + Footer |
| `src/components/layout/auth-layout.tsx`            | Minimal layout              |
| `src/app/[locale]/(main)/layout.tsx`               | Main route group layout     |
| `src/app/[locale]/(auth)/layout.tsx`               | Auth route group layout     |
| `src/app/[locale]/(auth)/login/page.tsx`           | Login page                  |
| `src/app/[locale]/(auth)/register/page.tsx`        | Register page               |
| `src/app/[locale]/(auth)/forgot-password/page.tsx` | Forgot password page        |

---

### 6. Files Deleted

| File/Folder                            | Reason                         |
| -------------------------------------- | ------------------------------ |
| `src/components/providers/app/`        | Duplicate providers removed    |
| `src/components/providers/components/` | Duplicate components removed   |
| `src/app/_components/`                 | Moved to `(main)/_components/` |
| `src/app/[locale]/(home)/`             | Replaced by `(main)/`          |

---

### 7. Files Modified

| File                                            | Changes                                          |
| ----------------------------------------------- | ------------------------------------------------ |
| `src/components/providers/index.tsx`            | Unified all providers, added `locale` prop       |
| `src/app/[locale]/layout.tsx`                   | Simplified to use single `<Providers>` component |
| `src/app/[locale]/(main)/page.tsx`              | Updated imports to use relative paths            |
| `src/app/[locale]/(main)/_components/about.tsx` | Fixed import to use `@/` alias                   |
| `src/components/shared/toggle-lang.tsx`         | Converted to dropdown menu                       |

---

## URL Routing

### Main Pages (with Header/Footer)

| URL   | File              |
| ----- | ----------------- |
| `/en` | `(main)/page.tsx` |
| `/ar` | `(main)/page.tsx` |

### Auth Pages (without Header/Footer)

| URL                   | File                              |
| --------------------- | --------------------------------- |
| `/en/login`           | `(auth)/login/page.tsx`           |
| `/en/register`        | `(auth)/register/page.tsx`        |
| `/en/forgot-password` | `(auth)/forgot-password/page.tsx` |

---

## How to Add New Pages

### Adding a Main Page (with Header/Footer)

```bash
# Create folder and page
mkdir src/app/[locale]/(main)/your-page
touch src/app/[locale]/(main)/your-page/page.tsx
```

### Adding an Auth Page (without Header/Footer)

```bash
# Create folder and page
mkdir src/app/[locale]/(auth)/your-page
touch src/app/[locale]/(auth)/your-page/page.tsx
```

---

## Import Aliases

Use these aliases for imports:

| Alias                    | Path                        |
| ------------------------ | --------------------------- |
| `@/components/`          | `src/components/`           |
| `@/components/ui/`       | `src/components/ui/`        |
| `@/components/shared/`   | `src/components/shared/`    |
| `@/components/layout`    | `src/components/layout/`    |
| `@/components/providers` | `src/components/providers/` |

---
