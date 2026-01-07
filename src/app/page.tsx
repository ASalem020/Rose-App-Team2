'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-20 bg-background font-sans">
      {/* buttons div */}
      <div className="flex">
        {/* Buttons Div light */}
        <div className="flex flex-col gap-2 p-10">
          <Button variant={'default'} className="">
            Button
          </Button>
          <Button variant={'secondary'} className="">
            Button
          </Button>
          <Button variant={'outline'} className="">
            Button
          </Button>
          <Button variant={'subtle'} className="">
            Button
          </Button>
          <Button variant={'ghost'} className="">
            Button
          </Button>

          <Button
            variant={'destructive'}
            className="border"
          >
            Button
          </Button>
        </div>
        {/* Buttons Div Dark */}
        <div className="dark flex flex-col gap-2 bg-background p-10">
          <Button variant={'default'} className="">
            Button
          </Button>
          <Button variant={'secondary'} className="">
            Button
          </Button>
          <Button variant={'outline'} className="">
            Button
          </Button>
          <Button variant={'subtle'} className="">
            Button
          </Button>
          <Button variant={'ghost'} className="">
            Button
          </Button>

          <Button variant={'destructive'}>Button</Button>
        </div>
      </div>
      {/* Inputs Div */}
      <div className="flex gap-2">
        {/* Inputs Div Light */}
        <div className="flex w-1/2 flex-col gap-4 p-10">
          <Input placeholder="Enter your name" />
          <Input variant="search" placeholder="Search..." />
          <Input variant="upload" type="file" />
          <Input
            type="file"
            onReview={() => alert('Reviewing files...')}
          />
          <Input type="password" />
          <Input variant="default" type="text" />
        </div>
        {/* Inputs Div Dark */}
        <div className="dark flex w-1/2 flex-col gap-4 bg-background p-10">
          <Input placeholder="Enter your name" />
          <Input variant="search" placeholder="Search..." />
          <Input variant="upload" type="file" />
          <Input variant="upload" type="file" />
          <Input type="password" />
          <Input variant="default" type="text" />
        </div>
      </div>
    </div>
  );
}
