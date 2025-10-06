import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import "@nexcraft/forge-react/fallbacks.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "@nexcraft/forge Showcase - AI-Native Component Library",
  description: "Professional showcase of @nexcraft/forge - The FIRST AI-Native component library with built-in AI metadata, design token bridge, and real-time performance monitoring. Experience all 27 components in action.",
  keywords: ["forge", "ai-native", "web-components", "react", "nextjs", "ui-library", "design-system"],
  authors: [{ name: "Ignis Team" }],
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
      <head>
        <Script
          src="https://cdn.jsdelivr.net/npm/@nexcraft/forge@latest/dist/forge.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
