# Component Documentation

This document provides a comprehensive guide on how to use the components in this project, including their variants, props, and usage conditions.

## UI Components (`src/components/ui`)

### Button

A highly customizable button component with various styles and states.

**Variants:**

- `default`: The primary button style (maroon/primary color).
- `secondary`: A subtle background style.
- `outline`: Border with transparent background.
- `subtle`: Border with a very light background.
- `ghost`: Transparent background with hover effect.
- `destructive`: Red background for dangerous actions.

**Sizes:**

- `default`: Standard height and padding.
- `sm`: Small height for compact UI.
- `lg`: Large height for prominence.
- `icon`: Square button for icons.

**Props:**

- `loading` (boolean): Shows a spinner and disables the button.
- `asChild` (boolean): Uses Radix Slot to allow passing a custom component (like a Link).
- `disabled` (boolean): Standard HTML disabled state.

**Usage:**

```tsx
<Button variant="default" size="lg" loading={isLoading}>
  Click Me
</Button>
```

---

### Badge

Small labels for status or categorization.

**Variants:**

- `default`: Primary color background.
- `secondary`: Secondary color background.
- `subtle`: Light gray background.

**Usage:**

```tsx
<Badge variant="secondary">New</Badge>
```

---

### Input

Versatile text input supporting multiple variants like search, password, and file upload.

**Variants:**

- `default`: Standard text input.
- `text`: Specifically styled for pre-filled text.
- `search`: Includes a search icon.
- `password`: Includes a visibility toggle.
- `upload`: A custom-styled file upload input.

**Props:**

- `error` (boolean): Applies error styling (red border).
- `onReview` (function): Specifically for the `upload` variant, adds a "Review" button.
- `text` (string): Sets the `defaultValue`.

**Usage:**

```tsx
<Input variant="search" placeholder="Search..." />
<Input type="password" placeholder="Enter password" />
<Input variant="upload" type="file" onReview={() => showPreview()} />
```

---

### Textarea

Multi-line text input with consistent styling.

**Variants:**

- `default`: Standard multi-line input.

**Props:**

- `text` (string): Sets the `defaultValue`.

**Usage:**

```tsx
<Textarea placeholder="Enter your message" />
```

---

### Phone Input

A specialized input for international phone numbers with country selection.

**Usage:**

```tsx
<PhoneInput
  defaultCountry="EG"
  placeholder="Phone number"
  error={hasError}
/>
```

---

### Input OTP

One-time password input component.

**Usage:**

```tsx
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    {/* ... */}
  </InputOTPGroup>
</InputOTP>
```

---

### Select

Standard dropdown selection menu for choosing from a list of options.

**Usage:**

```tsx
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
    <SelectItem value="2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

---

### Dialog (Modal)

An overlay that focuses the user's attention on a specific task or information.

**Usage:**

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>
        Description here.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

---

### Popover

A small overlay for displaying contextual information or settings.

**Usage:**

```tsx
<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Content goes here.</PopoverContent>
</Popover>
```

---

### Command Palette

A searchable list of actions or items.

**Usage:**

```tsx
<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem>Action 1</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

---

### Scroll Area

Custom-styled scrollable container for consistent cross-browser experience.

**Usage:**

```tsx
<ScrollArea className="h-40">
  {/* Long content here */}
</ScrollArea>
```

---

### Breadcrumb

Navigation aid that shows the user's location in the hierarchy.

**Usage:**

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Current Page</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

---

### Pagination

Component for navigating through multiple pages of content.

**Usage:**

```tsx
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

---

## Shared Components (`src/components/shared`)

### LabeledInput

A wrapper that combines a Label and an Input for better accessibility and layout.

**Props:**

- `label` (string): The label text.
- `labelClassName` (string): Custom classes for the label.
- `containerClassName` (string): Custom classes for the wrapper div.
- All props from the `Input` component.

**Usage:**

```tsx
<LabeledInput
  label="Email Address"
  placeholder="you@example.com"
  error={!!errors.email}
/>
```

---

### AccountDropdown

A specialized dropdown for user accounts, typically found in the header.

---

### ThemeToggle

A button to switch between light and dark modes.

---

### Header & Footer

Global layout components for navigation and site information.
