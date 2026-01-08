'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { ThemeToggle } from '@/components/shared/theme-toggle';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-20 bg-background p-10 font-sans">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Design System Showcase
        </h1>
        <ThemeToggle />
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

      {/* Inputs Div */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Inputs</h2>
        <div className="flex gap-2">
          {/* Inputs Div Light */}
          <div className="flex w-1/2 flex-col gap-4 rounded-xl border p-10">
            <Input placeholder="Enter your name" />
            <Input
              variant="search"
              placeholder="Search..."
            />
            <Input variant="upload" type="file" />
            <Input
              variant="upload"
              type="file"
              onReview={() => alert('Reviewing files...')}
            />
            <Input type="password" placeholder="Password" />
            <Input
              variant="default"
              type="text"
              placeholder="Default Text"
            />
          </div>
          {/* Inputs Div Dark */}
          <div className="dark flex w-1/2 flex-col gap-4 rounded-xl border bg-background p-10">
            <Input placeholder="Enter your name" />
            <Input
              variant="search"
              placeholder="Search..."
            />
            <Input variant="upload" type="file" />
            <Input
              variant="upload"
              type="file"
              onReview={() => alert('Reviewing files...')}
            />
            <Input type="password" placeholder="Password" />
            <Input
              variant="default"
              type="text"
              placeholder="Default Text"
            />
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
                toast.success('Event has been created', {
                  description:
                    'Sunday, December 03, 2023 at 9:00 AM',
                })
              }
            >
              Show Success Toast
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                toast.error(
                  'Uh oh! Something went wrong.',
                  {
                    description:
                      'There was a problem with your request.',
                  },
                )
              }
            >
              Show Error Toast
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast.info('Event info details', {
                  description:
                    'Here is some information about the event.',
                })
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
      </section>
    </div>
  );
}
