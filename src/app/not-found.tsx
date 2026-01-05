import React from "react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'sans-serif',
            textAlign: 'center'
        }}>
            <h1 style={{ fontSize: '4rem', fontWeight: 'bold', margin: 0 }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Page Not Found</h2>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
                Could not find the requested resource.
            </p>
            <Link
                href="/"
                style={{
                    color: '#0070f3',
                    textDecoration: 'underline'
                }}
            >
                Return Home
            </Link>
        </div>
    );
}
