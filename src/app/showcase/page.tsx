'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { PhoneInput } from '@/components/ui/phone-input';
import { AccountDropdown } from '@/components/shared/account-dropdown';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';

export default function ShowcasePage() {
  return (
    <div className="dark min-h-screen bg-[#09090b] font-sans text-white">
      <div className="mx-auto max-w-6xl space-y-20 p-10">
        <header>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Design System Components
          </h1>
          <p className="mt-2 text-zinc-400">
            A comprehensive overview of all UI components in
            their various states.
          </p>
        </header>

        {/* Inputs Section */}
        <section className="space-y-10">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h2 className="text-2xl font-semibold">
              Inputs & Form Fields
            </h2>
          </div>

          <div className="grid grid-cols-5 gap-8">
            {/* Table Header */}
            <header className="contents text-sm font-medium text-zinc-500">
              <div />
              <div>Default</div>
              <div>Hover / Focus</div>
              <div>Error</div>
              <div>Disabled</div>
            </header>

            {/* Row: Standard Text Input */}
            <div className="self-center text-sm font-medium text-zinc-400">
              Text Input
            </div>
            <InputCol>
              <Input placeholder="Placeholder" />
            </InputCol>
            <InputCol>
              <Input
                placeholder="Focus"
                className="border-maroon-600 ring-4 ring-maroon-100 dark:ring-softPink-900/20"
              />
            </InputCol>
            <InputCol error>
              <Input placeholder="Error" error />
            </InputCol>
            <InputCol>
              <Input placeholder="Disabled" disabled />
            </InputCol>

            {/* Row: Text with Value */}
            <div className="self-center text-sm font-medium text-zinc-400">
              Pre-filled
            </div>
            <InputCol>
              <Input defaultValue="Input text" />
            </InputCol>
            <InputCol>
              <Input
                defaultValue="Input text"
                className="border-maroon-600"
              />
            </InputCol>
            <InputCol error>
              <Input defaultValue="Input text" error />
            </InputCol>
            <InputCol>
              <Input defaultValue="Input text" disabled />
            </InputCol>

            {/* Row: Search */}
            <div className="self-center text-sm font-medium text-zinc-400">
              Search
            </div>
            <InputCol>
              <Input
                variant="search"
                placeholder="Search..."
              />
            </InputCol>
            <InputCol>
              <Input
                variant="search"
                placeholder="Search..."
                className="border-maroon-600"
              />
            </InputCol>
            <InputCol error>
              <Input
                variant="search"
                placeholder="Search..."
                error
              />
            </InputCol>
            <InputCol>
              <Input
                variant="search"
                placeholder="Search..."
                disabled
              />
            </InputCol>

            {/* Row: Select */}
            <div className="self-center text-sm font-medium text-zinc-400">
              Select
            </div>
            <InputCol>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">
                    Option 1
                  </SelectItem>
                  <SelectItem value="2">
                    Option 2
                  </SelectItem>
                </SelectContent>
              </Select>
            </InputCol>
            <InputCol>
              <Select>
                <SelectTrigger className="border-maroon-600">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">
                    Option 1
                  </SelectItem>
                </SelectContent>
              </Select>
            </InputCol>
            <InputCol error>
              <Select>
                <SelectTrigger className="border-red-500">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent />
              </Select>
            </InputCol>
            <InputCol>
              <Select disabled>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent />
              </Select>
            </InputCol>

            {/* Row: File Upload */}
            <div className="self-center text-sm font-medium text-zinc-400">
              File Upload
            </div>
            <InputCol>
              <Input variant="upload" type="file" />
            </InputCol>
            <InputCol>
              <Input
                variant="upload"
                type="file"
                className="border-maroon-600"
              />
            </InputCol>
            <InputCol error>
              <Input variant="upload" type="file" error />
            </InputCol>
            <InputCol>
              <Input
                variant="upload"
                type="file"
                disabled
              />
            </InputCol>

            {/* Row: Phone Input */}
            <div className="self-center text-sm font-medium text-zinc-400">
              Phone Input
            </div>
            <InputCol>
              <PhoneInput
                defaultCountry="EG"
                placeholder="Phone number"
              />
            </InputCol>
            <InputCol>
              <PhoneInput
                defaultCountry="EG"
                placeholder="Focus"
                className="border-maroon-600"
              />
            </InputCol>
            <InputCol error>
              <PhoneInput
                defaultCountry="EG"
                placeholder="Error"
                error
              />
            </InputCol>
            <InputCol>
              <PhoneInput
                defaultCountry="EG"
                placeholder="Disabled"
                disabled
              />
            </InputCol>

            {/* Row: Input OTP */}
            <div className="self-center text-sm font-medium text-zinc-400">
              OTP
            </div>
            <InputCol>
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </InputCol>
            <InputCol>
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  <InputOTPSlot
                    index={0}
                    className="border-maroon-600"
                  />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </InputCol>
            <InputCol error>
              <InputOTP maxLength={6} error>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </InputCol>
            <InputCol>
              <InputOTP maxLength={6} disabled>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </InputCol>

            {/* Row: Password */}
            <div className="self-center text-sm font-medium text-zinc-400">
              Password
            </div>
            <InputCol>
              <Input
                type="password"
                placeholder="********"
              />
            </InputCol>
            <InputCol>
              <Input
                type="password"
                placeholder="********"
                className="border-maroon-600"
              />
            </InputCol>
            <InputCol error>
              <Input
                type="password"
                placeholder="********"
                error
              />
            </InputCol>
            <InputCol>
              <Input
                type="password"
                placeholder="********"
                disabled
              />
            </InputCol>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="space-y-10">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h2 className="text-2xl font-semibold">
              Buttons
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-8">
            <div className="text-sm font-medium text-zinc-500">
              Variant
            </div>
            <div className="text-sm font-medium text-zinc-500">
              Default
            </div>
            <div className="text-sm font-medium text-zinc-500">
              Disabled
            </div>
            <div className="text-sm font-medium text-zinc-500">
              Loading
            </div>

            <ButtonRow label="Default" variant="default" />
            <ButtonRow
              label="Secondary"
              variant="secondary"
            />
            <ButtonRow label="Outline" variant="outline" />
            <ButtonRow label="Subtle" variant="subtle" />
            <ButtonRow label="Ghost" variant="ghost" />
            <ButtonRow
              label="Destructive"
              variant="destructive"
            />
          </div>
        </section>

        {/* Other Components */}
        <section className="space-y-10">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <h2 className="text-2xl font-semibold">
              Other Components
            </h2>
          </div>
          <div className="flex items-start gap-10">
            <div className="space-y-4">
              <Label>Dropdown Menu</Label>
              <AccountDropdown />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function InputCol({
  label,
  error,
  children,
}: {
  label?: string;
  error?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label error={error}>{label || 'Label'}</Label>
      {children}
    </div>
  );
}

function ButtonRow({
  label,
  variant,
}: {
  label: string;
  variant:
    | 'default'
    | 'secondary'
    | 'outline'
    | 'subtle'
    | 'ghost'
    | 'destructive';
}) {
  return (
    <>
      <div className="self-center text-sm font-medium text-zinc-400">
        {label}
      </div>
      <Button variant={variant}>Button</Button>
      <Button variant={variant} disabled>
        Button
      </Button>
      <Button variant={variant} loading>
        Button
      </Button>
    </>
  );
}
