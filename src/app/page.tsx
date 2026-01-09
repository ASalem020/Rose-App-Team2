'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Pagination,
  PaginationContent,
  PaginationDoubleNext,
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

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-20 bg-background p-10 font-sans">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Design System Showcase
        </h1>
      </div>

      {/* buttons div */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Buttons</h2>
        <div className="flex">
          {/* Buttons Div light */}
          <div className="flex flex-col gap-2 rounded-l-xl border p-10">
            <Button variant={'default'}>Default</Button>
            <Button variant={'secondary'}>Secondary</Button>
            <Button variant={'outline'}>Outline</Button>
            <Button variant={'subtle'}>Subtle</Button>
            <Button variant={'ghost'}>Ghost</Button>
            <Button
              variant={'destructive'}
              className="border"
            >
              Destructive
            </Button>
          </div>
          {/* Buttons Div Dark */}
          <div className="dark flex flex-col gap-2 rounded-r-xl border border-l-0 bg-background p-10">
            <Button variant={'default'}>Default</Button>
            <Button variant={'secondary'}>Secondary</Button>
            <Button variant={'outline'}>Outline</Button>
            <Button variant={'subtle'}>Subtle</Button>
            <Button variant={'ghost'}>Ghost</Button>
            <Button variant={'destructive'}>
              Destructive
            </Button>
          </div>
        </div>
      </section>

      {/* Dropdowns */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Dropdowns</h2>
        <div className="flex gap-4">
          <div className="rounded-xl border p-10">
            <AccountDropdown />
          </div>
          <div className="dark rounded-xl border bg-background p-10">
            <AccountDropdown />
          </div>
        </div>
      </section>

      {/* Inputs Div */}
      <section className="space-y-8">
        <h2 className="text-xl font-semibold">
          Inputs & Forms
        </h2>
        <div className="grid gap-8 rounded-xl border p-10">
          {/* Default Input */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              Default Input
            </h3>
            <p className="text-sm text-muted-foreground">
              Standard text input field.
            </p>
            <code className="rounded bg-muted p-1 text-xs">
              {'<Input placeholder="..." />'}
            </code>
            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
              <div className="space-y-2 rounded-lg border bg-background p-4">
                <p className="text-xs text-muted-foreground">
                  Light Mode
                </p>
                <Input placeholder="Default Input" />
              </div>
              <div className="dark space-y-2 rounded-lg border bg-background p-4">
                <p className="text-xs text-white">
                  Dark Mode
                </p>
                <Input placeholder="Default Input" />
              </div>
            </div>
          </div>

          {/* Input with Error */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              Input with Error
            </h3>
            <p className="text-sm text-muted-foreground">
              Input state indicating a validation error.
            </p>
            <code className="rounded bg-muted p-1 text-xs">
              {'<Input error placeholder="..." />'}
            </code>
            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
              <div className="space-y-2 rounded-lg border bg-background p-4">
                <Label error>Error Label</Label>
                <Input error placeholder="Invalid input" />
                <p className="text-xs text-red-600">
                  Error message
                </p>
              </div>
              <div className="dark space-y-2 rounded-lg border bg-background p-4">
                <Label error>Error Label</Label>
                <Input error placeholder="Invalid input" />
                <p className="text-xs text-red-500">
                  Error message
                </p>
              </div>
            </div>
          </div>

          {/* Search Input */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              Search Input
            </h3>
            <p className="text-sm text-muted-foreground">
              Input with a search icon prefix.
            </p>
            <code className="rounded bg-muted p-1 text-xs">
              {'<Input variant="search" ... />'}
            </code>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="rounded-lg border bg-background p-4">
                <Input
                  variant="search"
                  placeholder="Search..."
                />
              </div>

              <div className="dark rounded-lg border bg-background p-4">
                <Input
                  variant="search"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>

          {/* Upload Input */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              File Upload
            </h3>
            <p className="text-sm text-muted-foreground">
              Custom file input styling.
            </p>
            <code className="rounded bg-muted p-1 text-xs">
              {'<Input variant="upload" type="file" />'}
            </code>
            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
              <div className="space-y-4 rounded-lg border bg-background p-4">
                <Input variant="upload" type="file" />
                <Input
                  variant="upload"
                  type="file"
                  onReview={() => alert('Review')}
                />
                <Input
                  variant="upload"
                  type="file"
                  disabled
                />
              </div>
              <div className="dark space-y-4 rounded-lg border bg-background p-4">
                <Input variant="upload" type="file" />
                <Input
                  variant="upload"
                  type="file"
                  onReview={() => alert('Review')}
                />
                <Input
                  variant="upload"
                  type="file"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              Password Input
            </h3>
            <p className="text-sm text-muted-foreground">
              Input with a password visibility toggle.
            </p>
            <code className="rounded bg-muted p-1 text-xs">
              {'<Input type="password" ... />'}
            </code>
            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
              <div className="rounded-lg border bg-background p-4">
                <Input
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="dark rounded-lg border bg-background p-4">
                <Input
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          {/* Text/Pre-filled Input */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              Text Variant
            </h3>
            <p className="text-sm text-muted-foreground">
              Input initialized with specific text style.
            </p>
            <code className="rounded bg-muted p-1 text-xs">
              {'<Input variant="text" text="..." />'}
            </code>
            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
              <div className="rounded-lg border bg-background p-4">
                <Input
                  variant="text"
                  text="Pre-filled text"
                />
              </div>
              <div className="dark rounded-lg border bg-background p-4">
                <Input
                  variant="text"
                  text="Pre-filled text"
                />
              </div>
            </div>
          </div>

          {/* Textarea */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              Textarea
            </h3>
            <p className="text-sm text-muted-foreground">
              Multi-line text input.
            </p>
            <code className="rounded bg-muted p-1 text-xs">
              {'<Textarea placeholder="..." />'}
            </code>
            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
              <div className="rounded-lg border bg-background p-4">
                <Textarea placeholder="Type your message here." />
              </div>
              <div className="dark rounded-lg border bg-background p-4">
                <Textarea placeholder="Type your message here." />
              </div>
            </div>
          </div>

          {/* Input OTP */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              Input OTP
            </h3>
            <p className="text-sm text-muted-foreground">
              One-Time Password input.
            </p>
            <code className="rounded bg-muted p-1 text-xs">
              {'<InputOTP ... />'}
            </code>

            <div className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-2">
              {/* Light */}
              <div className="space-y-4 rounded-lg border bg-background p-4">
                <p className="text-xs font-semibold">
                  Standard
                </p>
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map(
                      (_, i) => (
                        <InputOTPSlot key={i} index={i} />
                      ),
                    )}
                  </InputOTPGroup>
                </InputOTP>

                <p className="text-xs font-semibold">
                  With Error
                </p>
                <InputOTP maxLength={6} error>
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map(
                      (_, i) => (
                        <InputOTPSlot key={i} index={i} />
                      ),
                    )}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {/* Dark */}
              <div className="dark space-y-4 rounded-lg border bg-background p-4 text-white">
                <p className="text-xs font-semibold">
                  Standard
                </p>
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map(
                      (_, i) => (
                        <InputOTPSlot key={i} index={i} />
                      ),
                    )}
                  </InputOTPGroup>
                </InputOTP>

                <p className="text-xs font-semibold">
                  With Error
                </p>
                <InputOTP maxLength={6} error>
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map(
                      (_, i) => (
                        <InputOTPSlot key={i} index={i} />
                      ),
                    )}
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </div>

          {/* Phone Input */}
          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              Phone Input
            </h3>
            <p className="text-sm text-muted-foreground">
              International phone number input.
            </p>
            <code className="rounded bg-muted p-1 text-xs">
              {'<PhoneInput ... />'}
            </code>

            <div className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-2">
              {/* Light */}
              <div className="space-y-4 rounded-lg border bg-background p-4">
                <p className="text-xs font-semibold">
                  Standard
                </p>
                <PhoneInput
                  placeholder="Phone number"
                  defaultCountry="EG"
                />

                <p className="text-xs font-semibold">
                  With Error
                </p>
                <PhoneInput
                  placeholder="Phone number"
                  defaultCountry="EG"
                  error
                />
              </div>

              {/* Dark */}
              <div className="dark space-y-4 rounded-lg border bg-background p-4 text-white">
                <p className="text-xs font-semibold">
                  Standard
                </p>
                <PhoneInput
                  placeholder="Phone number"
                  defaultCountry="EG"
                />

                <p className="text-xs font-semibold">
                  With Error
                </p>
                <PhoneInput
                  placeholder="Phone number"
                  defaultCountry="EG"
                  error
                />
                <PhoneInput
                  placeholder="Phone number"
                  defaultCountry="EG"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Badges Div */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Badges</h2>
        <div className="flex gap-4">
          {/* Light Mode */}
          <div className="flex items-center gap-2 rounded-xl border p-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="subtle">Subtle</Badge>
          </div>
          {/* Dark Mode */}
          <div className="dark flex items-center gap-2 rounded-xl border bg-background p-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="subtle">Subtle</Badge>
          </div>
        </div>
      </section>

      {/* Pagination & Toasts */}
      <section className="w-full">
        <h2 className="text-xl font-semibold">
          Pagination & Toasts
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Pagination */}
          <div className="flex flex-col gap-4 rounded-xl border p-2">
            <h3 className="font-medium">Pagination</h3>
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
                  <PaginationLink href="#">
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">
                    10
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationDoubleNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <div className="dark mt-2 rounded-lg bg-background py-2">
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
                    <PaginationLink href="#">
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">
                      10
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationDoubleNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>

          {/* Toasts */}
          <div className="flex flex-col items-start gap-4 rounded-xl border p-6">
            <h3 className="font-medium">Toasts</h3>
            <Button
              variant="outline"
              onClick={() =>
                toast.success('Successful operation')
              }
            >
              Show Success Toast
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                toast.error('Unsuccessful operation')
              }
            >
              Show Error Toast
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast.info('Informative message')
              }
            >
              Show Info Toast
            </Button>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Breadcrumbs
        </h2>
        <div className="rounded-xl border p-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  Components
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="dark rounded-xl border bg-background p-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  Components
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>
    </div>
  );
}
