---
description: Unified React component structure and commenting standards for consistent, maintainable code
---

# React Component Structure & Commenting Standards

This document defines the **standard structure and commenting conventions** for all React components in this project. Following these standards ensures consistency, readability, and maintainability.

---

## 📋 General Principles

### **When to Comment:**

✅ **DO Comment:**

- Complex business logic
- Non-obvious solutions or workarounds
- API integrations and data structures
- Important state management
- Component sections (organize code)
- Public functions and components
- Regex patterns or complex algorithms

❌ **DON'T Comment:**

- Obvious code (e.g., `// Set name to John`)
- Self-explanatory variable names
- Simple getters/setters
- Code that can be made clearer by refactoring

> **"Good code is self-documenting. Comments explain the why, not the what."**

---

## 📦 Import Best Practices

### **Use Named Imports, Not Namespace Imports**

✅ **DO: Import only what you need**

```typescript
// ✅ CORRECT - Named imports
import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
```

❌ **DON'T: Use namespace imports**

```typescript
// ❌ WRONG - Namespace import
import * as React from 'react';

// Then using: React.useState(), React.useEffect()
```

### **Why Named Imports?**

✅ **Better Tree-Shaking** - Unused imports are removed from bundle  
✅ **Explicit Dependencies** - Clear what's being used  
✅ **Smaller Bundle Size** - Only import what you need  
✅ **Better IDE Support** - Autocomplete and type hints  
✅ **Cleaner Code** - No `React.` prefix everywhere

### **Examples:**

```typescript
// ✅ GOOD
import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

const [count, setCount] = useState(0);
useEffect(() => {}, []);
const memoized = useMemo(() => {}, []);

// ❌ BAD
import * as React from 'react';

const [count, setCount] = React.useState(0);
React.useEffect(() => {}, []);
const memoized = React.useMemo(() => {}, []);
```

---

## 🎨 Styling Standards

### **Use `cn` for Conditional Classes**

**ALWAYS** use the `cn` utility function from `@/lib/utils/tailwind-merge` for conditional class names. Avoid template literals for complex logic.

```tsx
// ✅ CORRECT - Using cn utility
import { cn } from '@/lib/utils/tailwind-merge';

export function MyComponent({
  isActive,
}: {
  isActive: boolean;
}) {
  return (
    <div
      className={cn(
        'base-classes p-4 transition-colors',
        isActive
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-900',
        !isActive && 'hover:bg-gray-200',
      )}
    >
      Content
    </div>
  );
}

// ❌ WRONG - Using template literals for logic
export function MyComponent({
  isActive,
}: {
  isActive: boolean;
}) {
  return (
    <div
      className={`base-classes p-4 transition-colors ${
        isActive
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-900'
      } ${!isActive ? 'hover:bg-gray-200' : ''}`}
    >
      Content
    </div>
  );
}
```

---

## 🏗️ Component Structure Order

All React components **MUST** follow this exact ordering. **Only include sections that are applicable** - do not add empty sections.

### **Standard Section Order:**

1. **Imports** - All import statements
2. **Types** - Interfaces and type definitions
3. **Component** - Component declaration with JSDoc
4. **Translation** - next-intl hooks
5. **Navigation** - Next.js navigation hooks
6. **State** - useState hooks
7. **Ref** - useRef hooks
8. **Context** - useContext hooks
9. **Query** - React Query useQuery hooks
10. **Mutation** - React Query useMutation hooks
11. **Hooks** - Custom hooks, useMemo, useCallback
12. **Form & Validation** - react-hook-form
13. **Variables** - Computed values and derived state
14. **Helper Functions** - Utility functions
15. **Handlers** - Event handlers
16. **Effects** - useEffect hooks
17. **Render** - Return statement (optional comment)

---

## 📝 Section Comment Format

Use this format for section comments:

```typescript
// Section Name
```

**For shorter files, use simplified format:**

```typescript
// Section Name
```

---

## 🎯 Complete Component Template

```typescript
'use client';


// Imports


import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils/tailwind-merge';


// Types


interface MyComponentProps {
  userId: string;
  onSubmit?: (data: FormData) => void;
}

interface FormData {
  email: string;
  name: string;
}


// Component


/**
 * MyComponent - Brief description of component purpose
 *
 * Features:
 * - Feature 1
 * - Feature 2
 * - Feature 3
 *
 * @param userId - User ID for data fetching
 * @param onSubmit - Optional callback when form is submitted
 */
export default function MyComponent({ userId, onSubmit }: MyComponentProps) {

  // Translation


  const t = useTranslations();
  const locale = useLocale();


  // Navigation


  const router = useRouter();
  const pathname = usePathname();


  // State


  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);


  // Ref


  const inputRef = useRef<HTMLInputElement>(null);


  // Context


  const { user } = useAuth();
  const theme = useTheme();


  // Query


  const { data: userData, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });


  // Mutation


  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateUserAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', userId] });
    },
  });


  // Hooks


  // Memoize expensive calculations
  const memoizedValue = useMemo(() => {
    return expensiveCalculation(userData);
  }, [userData]);

  // Memoize callback functions
  const handleCallback = useCallback(() => {
    // Callback logic
  }, [dependency]);


  // Form & Validation


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
    },
  });


  // Variables


  const isDisabled = isLoading || isPending;
  const totalItems = userData?.items.length ?? 0;


  // Helper Functions


  /**
   * Extract ID from URL
   * TODO: Implement when dynamic routing is ready
   */
  const getIdFromUrl = (): string => {
    // Helper logic
    return 'temp-id';
  };


  // Handlers


  const handleClick = () => {
    setCount(count + 1);
  };

  const handleFormSubmit = (data: FormData) => {
    // Validate and submit form
    updateUser(data);
    onSubmit?.(data);
  };


  // Effects


  // Fetch data when userId changes
  useEffect(() => {
    if (userId) {
      fetchData(userId);
    }
  }, [userId]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);


  // Render


  return (
    <div className={cn("container mx-auto", isOpen && "opacity-50")}>
      {/* Header Section */}
      <header>
        <h1>{t('title')}</h1>
      </header>

      {/* Form Section */}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Label htmlFor="email">Email</Label>
        <Input id="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}

        <Button type="submit" disabled={isDisabled}>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
```

---

## 📦 Minimal Component Example

For simple components, only include applicable sections:

```typescript
'use client';


// Imports


import { useState } from 'react';
import { Button } from '@/components/ui/button';


// Component


// Counter - Simple counter component
export default function Counter() {
  // State
  const [count, setCount] = useState(0);

  // Handlers
  const increment = () => setCount(count + 1);

  return (
    <Button onClick={increment}>
      Count: {count}
    </Button>
  );
}
```

---

## 🎨 JSDoc Comment Format

### **Component Documentation:**

```typescript
/**
 * ComponentName - Brief one-line description
 *
 * Detailed description if needed. Explain what the component does,
 * its main purpose, and any important behavior.
 *
 * Features:
 * - Feature 1
 * - Feature 2
 * - Feature 3
 *
 * @param propName - Description of the prop
 * @param anotherProp - Description of another prop
 * @returns Description of what is returned (optional)
 */
```

### **Function Documentation:**

```typescript
/**
 * functionName - Brief description
 *
 * @param param1 - Description
 * @param param2 - Description
 * @returns Description of return value
 */
const functionName = (
  param1: string,
  param2: number,
): ReturnType => {
  // Function logic
};
```

---

## 📁 File-Specific Examples

### **Client Component (Full Example)**

```typescript
'use client';


// Imports


import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  addReviewSchema,
  AddReviewFormData,
} from '@/lib/validations/review.validation';
import { useAddReview } from '../_hooks/use-add-review';
import { cn } from '@/lib/utils/tailwind-merge';


// Types


interface AddReviewFormProps {
  productId: string;
}


// Component


/**
 * AddReviewForm - Form component for submitting product reviews
 *
 * Features:
 * - Interactive star rating (1-5)
 * - Form validation with Zod
 * - Auto-reset after successful submission
 * - Loading states during API calls
 *
 * @param productId - The ID of the product being reviewed
 */
export default function AddReviewForm({ productId }: AddReviewFormProps) {

  // State


  const [userRating, setUserRating] = useState(0);


  // Mutation


  const { addReview, isPending, isSuccess } = useAddReview();


  // Form & Validation


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<AddReviewFormData>({
    resolver: zodResolver(addReviewSchema),
    defaultValues: {
      product: productId,
      rating: 0,
      title: '',
      comment: '',
    },
  });


  // Effects


  // Update rating in form when user clicks stars
  useEffect(() => {
    setValue('rating', userRating);
  }, [userRating, setValue]);

  // Reset form after successful submission
  useEffect(() => {
    if (isSuccess) {
      reset();
      setUserRating(0);
    }
  }, [isSuccess, reset]);


  // Helper Functions


  /**
   * Extract product ID from URL
   * TODO: Implement when dynamic routing is set up
   */
  const getProductIdFromUrl = (): string => {
    // TODO: Use useParams() when dynamic routing is implemented
    return '6745096c90ab40a0685402fc';
  };


  // Handlers


  const onSubmit = (data: AddReviewFormData) => {
    // Get product ID from URL
    const currentProductId = getProductIdFromUrl();

    // Add product ID to review data
    const reviewData = {
      ...data,
      product: currentProductId,
    };

    addReview(reviewData);
  };


  // Render


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Rating Input */}
      <div className="space-y-2">
        <Label>Your rating: <span className="text-red-500">*</span></Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setUserRating(star)}
            >
              <Star
                className={cn(
                  "h-6 w-6",
                  star <= userRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-zinc-300"
                )}
              />
            </button>
          ))}
        </div>
        {errors.rating && <p className="text-xs text-red-500">{errors.rating.message}</p>}
      </div>

      {/* Title Input */}
      <div className="space-y-2">
        <Label htmlFor="title">Title: <span className="text-red-500">*</span></Label>
        <Input id="title" {...register('title')} placeholder="Give your review a title" />
        {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
      </div>

      {/* Comment Input */}
      <div className="space-y-2">
        <Label htmlFor="comment">Review: <span className="text-red-500">*</span></Label>
        <Textarea id="comment" {...register('comment')} rows={4} />
        {errors.comment && <p className="text-xs text-red-500">{errors.comment.message}</p>}
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? 'Submitting...' : 'Add Review'}
      </Button>
    </form>
  );
}
```

---

### **Server Action**

```typescript
'use server';

// Imports

import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { AddReviewFormData } from '../validations/review.validation';

// Server Action

/**
 * Add Review Server Action
 *
 * API Endpoint: POST /api/v1/reviews
 * Authentication: Required (Bearer token)
 *
 * Request Body:
 * {
 *   product: string,
 *   rating: number (1-5),
 *   title: string,
 *   comment: string
 * }
 *
 * @param fields - Review form data
 * @returns API response or error object
 */
export async function addReviewAction(
  fields: AddReviewFormData,
) {
  // Get session for authentication
  const session = await getServerSession(authOptions);

  // Validate authentication
  if (!session?.accessToken) {
    return {
      error: 'You must be logged in to add a review',
    };
  }

  try {
    // Make API request
    const response = await fetch(
      `${process.env.API_URL}/reviews`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(fields),
      },
    );

    const payload = await response.json();

    // Handle API errors
    if (!response.ok) {
      return {
        error: payload.message || 'Failed to add review',
      };
    }

    return payload;
  } catch {
    // Handle network errors
    return {
      error: 'An error occurred while adding the review',
    };
  }
}
```

---

### **Custom Hook**

```typescript
// Imports

import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { addReviewAction } from '@/lib/actions/review.action';
import { AddReviewFormData } from '@/lib/validations/review.validation';
import { toast } from 'sonner';

// Custom Hook

/**
 * useAddReview - Hook for adding product reviews
 *
 * Features:
 * - Handles API calls via server action
 * - Shows success/error toast notifications
 * - Invalidates product reviews cache on success
 *
 * @returns Mutation object with addReview function and loading state
 */
export const useAddReview = () => {
  const queryClient = useQueryClient();

  const { isPending, error, mutate, isSuccess } =
    useMutation({
      mutationFn: async (fields: AddReviewFormData) => {
        // Call server action
        const payload = await addReviewAction(fields);

        // Handle errors
        if ('error' in payload) {
          throw new Error(payload.error);
        }

        return payload;
      },
      onSuccess: () => {
        // Show success message
        toast.success('Review added successfully!');

        // Invalidate reviews cache
        queryClient.invalidateQueries({
          queryKey: ['product-reviews'],
        });
      },
      onError: (error: Error) => {
        // Show error message
        toast.error(
          error.message || 'Failed to add review',
        );
      },
    });

  return { isPending, error, addReview: mutate, isSuccess };
};
```

---

### **Validation Schema**

```typescript
// Imports

import { z } from 'zod';

// Validation Schema

/**
 * Add Review Validation Schema
 *
 * Validates:
 * - Product ID (required)
 * - Rating (1-5 stars)
 * - Title (min 3 characters)
 * - Comment (min 10 characters)
 */
export const addReviewSchema = z.object({
  // Product ID validation
  product: z.string().min(1, 'Product ID is required'),

  // Rating validation (1-5 stars)
  rating: z
    .number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),

  // Title validation
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters'),

  // Comment validation
  comment: z
    .string()
    .min(10, 'Review must be at least 10 characters'),
});

export type AddReviewFormData = z.infer<
  typeof addReviewSchema
>;
```

---

## 💡 Inline Comment Guidelines

### **Good Inline Comments:**

```typescript
// ✅ Explains WHY
// Debounce search to avoid excessive API calls
const debouncedSearch = useDebouncedValue(searchTerm, 500);

// Update rating in form when user clicks stars
useEffect(() => {
  setValue('rating', userRating);
}, [userRating, setValue]);

// Reset form after successful submission
useEffect(() => {
  if (isSuccess) {
    reset();
  }
}, [isSuccess, reset]);
```

### **Bad Inline Comments:**

```typescript
// ❌ States the obvious
// Set the user rating to 0
const [userRating, setUserRating] = useState(0);

// Call the addReview function
addReview(data);

// Return the component
return <div>...</div>;
```

---

## 🎨 JSX Comments

Use JSX comments to label major sections:

```tsx
return (
  <div>
    {/* Header Section */}
    <header>
      <h1>Title</h1>
    </header>

    {/* Main Content */}
    <main>
      {/* Product List */}
      <div className="products">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Sidebar */}
      <aside>
        <FilterPanel />
      </aside>
    </main>

    {/* Footer Section */}
    <footer>
      <p>© 2024 Company</p>
    </footer>
  </div>
);
```

---

## 📌 TODO Comments

Use TODO comments for future work:

```typescript
// TODO: Add pagination for reviews
// TODO: Implement review editing functionality
// FIXME: Known bug with date formatting
// HACK: Temporary workaround for API issue
// NOTE: Important information about this code
```

---

## ✅ Important Rules

1. **Follow the section order** - Sections must appear in the specified order
2. **Only include applicable sections** - Don't add empty sections
3. **Use consistent comment format** - Use `` for sections
4. **Document complex logic** - Add inline comments for non-obvious code
5. **Keep comments updated** - Update comments when code changes
6. **Remove commented-out code** - Use git history instead
7. **Be concise** - Explain why, not what
8. **Use JSDoc for public APIs** - Document components, functions, and hooks

---

## 🚫 Common Mistakes to Avoid

### **1. Commenting Obvious Code**

```typescript
// ❌ BAD
// Set the name to 'John'
const name = 'John';

// ✅ GOOD - No comment needed
const name = 'John';
```

### **2. Leaving Commented-Out Code**

```typescript
// ❌ BAD
const handleSubmit = () => {
  // const oldWay = doSomething();
  const newWay = doSomethingBetter();
  return newWay;
};

// ✅ GOOD - Remove old code
const handleSubmit = () => {
  const result = doSomethingBetter();
  return result;
};
```

### **3. Wrong Section Order**

```typescript
// ❌ BAD - Wrong order
export default function MyComponent() {
  // Effects (should be later)
  useEffect(() => {}, []);

  // State (should be earlier)
  const [count, setCount] = useState(0);
}

// ✅ GOOD - Correct order
export default function MyComponent() {
  // State
  const [count, setCount] = useState(0);

  // Effects
  useEffect(() => {}, []);
}
```

---

## 📚 Benefits

✅ **Consistency** - All components follow the same structure  
✅ **Readability** - Easy to find specific types of logic  
✅ **Maintainability** - Clear organization makes updates easier  
✅ **Onboarding** - New developers quickly understand structure  
✅ **Code Reviews** - Easier to spot issues and inconsistencies  
✅ **Clean Code** - No unnecessary empty sections  
✅ **Documentation** - Code serves as its own documentation

---

## 📖 Reference Examples

See these files for good examples:

- `src/app/[locale]/(main)/products/_components/add-review-form.tsx`
- `src/lib/actions/review.action.ts`
- `src/app/[locale]/(main)/products/_hooks/use-add-review.ts`
- `src/lib/validations/review.validation.ts`

---

**Last Updated:** 2026-02-02  
**Version:** 2.0.0
