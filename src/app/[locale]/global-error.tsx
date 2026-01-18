"use client";

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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'sans-serif',
            padding: '2rem',
            textAlign: 'center'
        }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong!</h1>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
                {error.message || "An unexpected error occurred."}
            </p>
            <button
                onClick={() => reset()}
                style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1rem'
                }}
            >
                Try again
            </button>
        </div>
    );
}
