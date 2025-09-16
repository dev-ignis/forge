import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import ThemeToggle from "./ui/ThemeToggle";

export const metadata: Metadata = {
  title: "@nexcraft/forge + Next.js Example",
  description: "Example application demonstrating Forge component integration with Next.js, SSR, and React Hook Form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur z-50">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="font-semibold text-gray-900">@nexcraft/forge</Link>
              <nav className="hidden md:flex items-center gap-4 text-sm text-gray-600">
                <Link href="/ssr-demo" className="hover:text-gray-900">SSR Demo</Link>
                <Link href="/forms-demo" className="hover:text-gray-900">Forms</Link>
                <Link href="/components" className="hover:text-gray-900">Components</Link>
                <Link href="/performance" className="hover:text-gray-900">Performance</Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/dev-ignis/forge"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                GitHub
              </a>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
