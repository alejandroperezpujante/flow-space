import "./globals.css";

import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Roboto_Slab } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/lib/theme";

const robotoSlabHeading = Roboto_Slab({subsets:['latin'],variable:'--font-heading'});

const spaceGrotesk = Space_Grotesk({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Blocking theme init script — runs before paint to prevent flash.
// Server-rendered in <head>, hydrated by React (not client-created),
// so React 19 never warns about script tags.
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme')||'system';var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light';}catch(e){}})();`;

export const metadata: Metadata = {
  title: "FlowSpace — Kanban without the noise",
  description:
    "A single-board Kanban for people who think Trello has too many moving parts and a notebook has too few.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", spaceGrotesk.variable, robotoSlabHeading.variable)}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
