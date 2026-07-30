import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wikkie — Video Editor & Storyteller",
  description:
    "Wikkie is a video editor crafting cinematic event highlights, talking-head content, and motion graphics. Where every frame speaks and every cut flows.",
  keywords: [
    "Wikkie",
    "video editor",
    "event highlights",
    "talking head editing",
    "motion graphics",
    "cinematic editing",
    "portfolio",
  ],
  authors: [{ name: "Wikkie" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Wikkie — Video Editor & Storyteller",
    description:
      "Crafting visual stories with precision — where every frame speaks, every cut flows, and every story finds its rhythm.",
    siteName: "Wikkie",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wikkie — Video Editor & Storyteller",
    description:
      "Crafting visual stories with precision — where every frame speaks, every cut flows, and every story finds its rhythm.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster richColors position="bottom-right" />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
