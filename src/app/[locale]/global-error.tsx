"use client";

import { NextIntlClientProvider } from "next-intl";
import React, { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <NextIntlClientProvider>
            <html>
                <body>
                    <div className="flex flex-col items-center justify-center h-screen font-sans p-8 text-center">
                        <h1 className="text-2xl mb-4">Something went wrong!</h1>
                        <p className="text-gray-600 mb-8">
                            {error.message || "An unexpected error occurred."}
                        </p>
                        <button
                            onClick={() => reset()}
                            className="px-4 py-2 bg-blue-600 text-white border-none rounded cursor-pointer text-base"
                        >
                            Try again
                        </button>
                    </div>
                </body>
            </html>
        </NextIntlClientProvider>
    );
}
