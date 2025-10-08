import React from "react";
import type { Metadata } from "next";
// TEMPORARY: Using local copy until tokens.css is published in @nexcraft/forge
import "@/styles/forge-tokens.css"; // Will be: import "@nexcraft/forge/tokens.css";
import "@nexcraft/forge-react/fallbacks.css";
import "./globals.css";
import { AppLayout } from "@/components/layouts/AppLayout";

export const metadata: Metadata = {
  title: "@nexcraft/forge Showcase - AI-Native Component Library",
  description: "Professional showcase of @nexcraft/forge - The FIRST AI-Native component library with built-in AI metadata, design token bridge, and real-time performance monitoring. Experience all 27 components in action.",
  keywords: ["forge", "ai-native", "web-components", "react", "nextjs", "ui-library", "design-system"],
  authors: [{ name: "Ignis Team" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "@nexcraft/forge Showcase",
    description: "The FIRST AI-Native component library with built-in AI metadata and performance monitoring",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
