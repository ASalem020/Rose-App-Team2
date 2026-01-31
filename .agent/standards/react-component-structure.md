# React Component Structure Standard

This document defines the standard ordering for organizing code within React components.

## Component Structure Order

All React components should follow this exact ordering. **Only include sections that are applicable** - do not add empty sections with "N/A".

### Translation

- `useTranslations()` from next-intl
- `useLocale()` from next-intl
- Any other translation-related hooks

```typescript
// Translation
const t = useTranslations();
const locale = useLocale();
```

### Navigation

- `useRouter()` from next/navigation
- `usePathname()` from next/navigation
- `useSearchParams()` from next/navigation
- Custom navigation hooks

```typescript
// Navigation
const router = useRouter();
const pathname = usePathname();
```

### State

- All `useState()` hooks
- State management hooks

```typescript
// State
const [count, setCount] = useState(0);
const [isOpen, setIsOpen] = useState(false);
```

### Ref

- All `useRef()` hooks
- Ref-related declarations

```typescript
// Ref
const inputRef = useRef<HTMLInputElement>(null);
const containerRef = useRef<HTMLDivElement>(null);
```

### Context

- All `useContext()` hooks
- Custom context hooks

```typescript
// Context
const { user } = useAuth();
const theme = useTheme();
```

### Query

- React Query `useQuery()` hooks
- Data fetching queries

```typescript
// Query
const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});
```

### Mutation

- React Query `useMutation()` hooks
- Data mutation operations

```typescript
// Mutation
const { mutate: createUser, isPending } = useMutation({
  mutationFn: createUserAction,
});
```

### Hooks

- Custom hooks
- `useCallback()` for memoized functions
- `useMemo()` for memoized values
- Other utility hooks

```typescript
// Hooks
const memoizedValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

const handleClick = useCallback(() => {
  // handler logic
}, [dependency]);
```

### Form & Validation

- `useForm()` from react-hook-form
- Form-related state and validation

```typescript
// Form & Validation
const form = useForm<FormFields>({
  defaultValues: {
    email: '',
  },
  resolver: zodResolver(schema),
});
```

### Variables

- Computed values
- Derived state
- Constants based on state/props

```typescript
// Variables
const isDisabled = isLoading || !isValid;
const totalPrice = items.reduce(
  (sum, item) => sum + item.price,
  0,
);
```

### Functions

- Event handlers
- Helper functions
- Callback functions (not memoized with useCallback)

```typescript
// Functions
const handleSubmit = (data: FormData) => {
  // submit logic
};

const handleDelete = (id: string) => {
  // delete logic
};
```

### Effects

- All `useEffect()` hooks
- Side effects and lifecycle logic

```typescript
// Effects
useEffect(() => {
  // effect logic
  return () => {
    // cleanup
  };
}, [dependencies]);
```

## Important Rules

1. **Only include applicable sections** - Do not add sections with "N/A" comments
2. **Maintain the order** - Sections that exist should follow the order listed above
3. **No numbering** - Use simple section names without numbers
4. **Group related items** - Keep related logic within each section together
5. **Add descriptive comments** - For complex logic within sections

## Example Component

```typescript
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';

interface MyComponentProps {
  id: string;
}

export default function MyComponent({ id }: MyComponentProps) {
  // Translation
  const t = useTranslations();

  // Navigation
  const router = useRouter();

  // State
  const [count, setCount] = useState(0);

  // Query
  const { data } = useQuery({ queryKey: ['item', id] });

  // Mutation
  const { mutate } = useMutation({ mutationFn: updateItem });

  // Hooks
  const memoizedValue = useMemo(() => data?.value, [data]);

  // Form & Validation
  const form = useForm();

  // Variables
  const isDisabled = count === 0;

  // Functions
  const handleClick = () => {
    setCount(count + 1);
  };

  // Effects
  useEffect(() => {
    console.log('Component mounted');
  }, []);

  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

## Minimal Example (Only Applicable Sections)

```typescript
'use client';

import { useState } from 'react';

export default function SimpleComponent() {
  // State
  const [count, setCount] = useState(0);

  // Functions
  const increment = () => setCount(count + 1);

  return <button onClick={increment}>{count}</button>;
}
```

## Benefits

1. **Consistency** - All components follow the same structure
2. **Readability** - Easy to find specific types of logic
3. **Maintainability** - Clear organization makes updates easier
4. **Onboarding** - New developers can quickly understand component structure
5. **Code Reviews** - Easier to spot issues and inconsistencies
6. **Clean Code** - No unnecessary empty sections cluttering the code

---

**Last Updated:** 2026-01-23
**Version:** 1.1.0
