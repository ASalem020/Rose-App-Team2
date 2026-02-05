"use client";

import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function ResetAllFilters() {
    // ^ 1 Router and Pathname
    const router = useRouter();
    const pathname = usePathname();

    return (
        // ^ 2 Reset All Button
        <Button
            onClick={() => router.push(pathname)}
            className="bg-maroon-100/50 text-maroon-600 w-full rounded-md h-11 hover:bg-maroon-100 flex items-center justify-center gap-3 text-lg"
        >
            <RotateCcw />
            Reset All
        </Button>
    );
}
