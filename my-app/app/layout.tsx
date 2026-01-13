// app/layout.tsx
import './globals.css'; // Tailwind or global styles
import type { ReactNode } from 'react';
import { Metadata } from 'next';

// Optional: Add site metadata
export const metadata: Metadata = {
  title: 'My Next.js App',
  description: 'This is a Next.js 13+ App Router project',
  viewport: 'width=device-width, initial-scale=1',
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* You can add fonts, icons, analytics scripts here */}
      </head>
      <body className="antialiased bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        {/* Optional Navbar */}
        <header>
          <nav className="w-full bg-white shadow-md p-4">
            <h1 className="text-xl font-bold">My Next.js App</h1>
          </nav>
        </header>

        {/* Main content */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4">
          {children}
        </main>

        {/* Optional Footer */}
        <footer className="w-full bg-white shadow-inner p-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} My Company. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
