'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  Pagination,
  PaginationContent,
  PaginationDoublePrevious,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { AccountDropdown } from '@/components/shared/account-dropdown';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { PhoneInput } from '@/components/ui/phone-input';
import { Label } from '@/components/ui/label';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import Image from 'next/image';

/**
 * ShowcaseItem Helper
 * Displays a component in Light and Dark mode side-by-side.
 */
function ShowcaseItem({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Light Mode Column */}
        <div className="group relative flex flex-col gap-4 rounded-2xl border bg-white p-8 shadow-sm transition-all hover:border-zinc-300">
          <div className="absolute right-4 top-4 flex items-center gap-1.5 opacity-30 transition-opacity group-hover:opacity-100">
            <span className="h-2 w-2 rounded-full bg-zinc-200"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
              Light
            </span>
          </div>
          <div className={className}>{children}</div>
        </div>
        {/* Dark Mode Column */}
        <div className="dark group relative flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-background p-8 shadow-sm transition-all hover:border-zinc-700">
          <div className="absolute right-4 top-4 flex items-center gap-1.5 opacity-30 transition-opacity group-hover:opacity-100">
            <span className="h-2 w-2 rounded-full bg-softPink-500"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              Dark
            </span>
          </div>
          <div className={className}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const reviewImage =
    '/logo/bb70dbdbb3472a27ffcc4d3baeb8eaceb3873b18.png';

  return (
    <div className="flex min-h-screen w-full flex-col gap-24 bg-zinc-50/30 p-6 font-sans dark:bg-zinc-950 md:p-12 lg:p-20">
      {/* Dynamic Header */}
      <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter text-zinc-900 dark:text-white">
            Component{' '}
            <span className="text-maroon-600 dark:text-softPink-400">
              Lab
            </span>
          </h1>
          <p className="max-w-2xl px-1 text-lg text-zinc-500 dark:text-zinc-400">
            Visual playground for the Rose App design
            system. Toggle themes globally or compare
            side-by-side.
          </p>
        </div>
        <div className="flex items-center gap-4 self-start rounded-2xl border bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Current Theme
            </span>
            <span className="text-sm font-bold">
              Interactive Switch
            </span>
          </div>
          <div className="mx-1 h-10 w-px bg-zinc-100 dark:bg-zinc-800"></div>
          <ThemeToggle />
        </div>
      </header>

      <div className="grid gap-32">
        {/* INTERACTIVE ACTIONS */}
        <section className="space-y-12">
          <div className="space-y-4">
            <h2 className="flex items-center gap-3 text-3xl font-black text-zinc-900 dark:text-white">
              <span className="h-2 w-8 rounded-full bg-maroon-600 dark:bg-softPink-400"></span>
              Interactive Actions
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Buttons, dropdowns, and triggers that drive
              user engagement.
            </p>
          </div>

          <div className="grid gap-12">
            <ShowcaseItem
              title="Button Core"
              description="Primary action buttons with loading/disabled states."
              className="flex flex-wrap items-center gap-4"
            >
              <Button variant="default">
                Primary Action
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Delete</Button>
              <Button loading>Loading</Button>
            </ShowcaseItem>

            <ShowcaseItem
              title="Button Styles"
              description="Ghost, subtle, and outline variants for secondary actions."
              className="flex flex-wrap items-center gap-4"
            >
              <Button variant="outline">Outline</Button>
              <Button variant="subtle">Subtle</Button>
              <Button variant="ghost">Ghost Click</Button>
              <Button size="icon" variant="outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </Button>
            </ShowcaseItem>

            <ShowcaseItem
              title="Navigation & Identity"
              description="Global header components like account menus and toggles."
              className="flex flex-wrap items-center gap-8"
            >
              <AccountDropdown />
              <ThemeToggle />
            </ShowcaseItem>
          </div>
        </section>

        {/* DATA COLLECTION */}
        <section className="space-y-12">
          <div className="space-y-4">
            <h2 className="flex items-center gap-3 text-3xl font-black text-zinc-900 dark:text-white">
              <span className="h-2 w-8 rounded-full bg-maroon-600 dark:bg-softPink-400"></span>
              Data Collection
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Input fields, select menus, and complex form
              elements.
            </p>
          </div>

          <div className="grid gap-12">
            <ShowcaseItem
              title="Unified Inputs"
              description="Explicit pairing of Label and Input components for accessible data entry."
            >
              <div className="grid w-full max-w-md gap-8">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="display-name">
                    Display Name
                  </Label>
                  <Input
                    id="display-name"
                    placeholder="e.g. Alex Rose"
                  />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="email-address" error>
                    Email Address
                  </Label>
                  <Input
                    id="email-address"
                    placeholder="alex@rose.app"
                    error
                  />
                </div>
              </div>
            </ShowcaseItem>

            <ShowcaseItem
              title="Validation & Verification"
              description="Specialized inputs for phone numbers and one-time passwords."
            >
              <div className="grid w-full max-w-md gap-10">
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                    Mobile Number
                  </p>
                  <PhoneInput
                    defaultCountry="EG"
                    placeholder="Phone number"
                  />
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                    Security Code
                  </p>
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      {[0, 1, 2, 3, 4, 5].map(i => (
                        <InputOTPSlot key={i} index={i} />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            </ShowcaseItem>

            <ShowcaseItem
              title="Advanced Selection"
              description="Custom select dropdowns and searchable command palettes."
            >
              <div className="grid w-full max-w-md gap-8">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Project Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">
                      Web Application
                    </SelectItem>
                    <SelectItem value="mobile">
                      Mobile App
                    </SelectItem>
                    <SelectItem value="branding">
                      Branding
                    </SelectItem>
                  </SelectContent>
                </Select>
                <div className="rounded-xl border bg-zinc-50/50 p-2 dark:bg-zinc-900/50">
                  <Command className="rounded-lg border-none">
                    <CommandInput placeholder="Search settings..." />
                    <CommandList className="max-h-[120px]">
                      <CommandEmpty>
                        No results.
                      </CommandEmpty>
                      <CommandGroup heading="General">
                        <CommandItem>
                          Profile Center
                        </CommandItem>
                        <CommandItem>
                          Subscription
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>
              </div>
            </ShowcaseItem>

            <ShowcaseItem
              title="Rich Content"
              description="Textareas and file uploads with review support."
            >
              <div className="grid w-full max-w-md gap-8">
                <Textarea
                  placeholder="Describe your vision..."
                  className="min-h-[120px]"
                />
                <Input
                  variant="upload"
                  type="file"
                  onReview={() => setIsReviewOpen(true)}
                />
              </div>
            </ShowcaseItem>
          </div>
        </section>

        {/* FEEDBACK & OVERLAYS */}
        <section className="space-y-12">
          <div className="space-y-4">
            <h2 className="flex items-center gap-3 text-3xl font-black text-zinc-900 dark:text-white">
              <span className="h-2 w-8 rounded-full bg-maroon-600 dark:bg-softPink-400"></span>
              Feedback & Overlays
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Contextual information, warnings, and complex
              modal flows.
            </p>
          </div>

          <div className="grid gap-12">
            <ShowcaseItem
              title="Modals"
              description="Dialogs for critical confirmation or focused tasks."
              className="flex gap-4"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    Launch Dialog
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>System Update</DialogTitle>
                    <DialogDescription>
                      New features are available. Would you
                      like to refresh now?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="mt-6 flex justify-end gap-3">
                    <Button variant="secondary">
                      Later
                    </Button>
                    <Button>Update Now</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    Open Popover
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 border-none p-6 shadow-2xl">
                  <div className="space-y-3">
                    <h4 className="text-lg font-black">
                      Pro Tips
                    </h4>
                    <p className="text-sm leading-relaxed text-zinc-200">
                      You can use CMD+K to quickly open the
                      command palette from anywhere.
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </ShowcaseItem>

            <ShowcaseItem
              title="System Toasts"
              description="Non-intrusive feedback messages using the Sonner library."
              className="flex flex-wrap gap-3"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  toast.success('Data saved successfully.')
                }
              >
                Success
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  toast.error('Connection timeout.')
                }
              >
                Error
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  toast.info('A new comment was added.')
                }
              >
                Info
              </Button>
            </ShowcaseItem>
          </div>
        </section>

        {/* NAVIGATION & STATUS */}
        <section className="space-y-12">
          <div className="space-y-4">
            <h2 className="flex items-center gap-3 text-3xl font-black text-zinc-900 dark:text-white">
              <span className="h-2 w-8 rounded-full bg-maroon-600 dark:bg-softPink-400"></span>
              Navigation & Status
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Helping users find their way and understanding
              system state.
            </p>
          </div>

          <div className="grid gap-12">
            <ShowcaseItem
              title="Wayfinding"
              description="Breadcrumbs and pagination for multi-page flows."
            >
              <div className="w-full max-w-xl space-y-10">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">
                        Rose
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">
                        Admin
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        Dashboard
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationDoublePrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </ShowcaseItem>

            <ShowcaseItem
              title="Status Indicators"
              description="Badges for categorization and state labeling."
            >
              <div className="flex flex-wrap gap-3">
                <Badge>Active</Badge>
                <Badge variant="secondary">Pending</Badge>
                <Badge variant="subtle">Archived</Badge>
              </div>
            </ShowcaseItem>

            <ShowcaseItem
              title="Scrolling Containers"
              description="The ScrollArea provides consistent, theme-aware scrollbars for long lists."
            >
              <ScrollArea className="h-[140px] w-full max-w-md rounded-2xl border bg-zinc-50/50 p-6 shadow-inner dark:bg-zinc-900/50">
                <div className="space-y-4">
                  <p className="text-sm font-black uppercase tracking-tighter text-zinc-200">
                    Content Stream
                  </p>
                  <div className="space-y-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-200">
                    <p>
                      Modern web development requires
                      attention to detail. Every pixel
                      matters when creating premium
                      experiences.
                    </p>
                    <p>
                      By providing custom scrollbars, we
                      ensure that the UI stays elegant even
                      when dealing with dense information.
                    </p>
                    <p>
                      The ScrollArea leverages Radix UI
                      primitives for world-class
                      accessibility and reliability across
                      all devices.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </ShowcaseItem>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="mt-20 border-t pt-10 text-center">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-400">
          Rose App Design System By Salem
        </p>
      </footer>

      {/* Review Dialog */}
      <Dialog
        open={isReviewOpen}
        onOpenChange={setIsReviewOpen}
      >
        <DialogContent className="overflow-hidden border-none bg-transparent p-0 shadow-none sm:max-w-xl">
          <DialogTitle className="sr-only">
            Image Review
          </DialogTitle>
          <div className="relative aspect-video w-full">
            <Image
              src={reviewImage}
              fill
              alt="Review"
              className="rounded-3xl object-contain"
            />
          </div>
          <div className="flex justify-center p-6">
            <Button
              variant="subtle"
              onClick={() => setIsReviewOpen(false)}
              className="rounded-full px-10"
            >
              Close Review
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
