"use client";

import React from "react";

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen flex-col gap-4 font-sans">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
            <p className="text-gray-600">Loading...</p>
        </div>
    );
}
