import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/theme/theme-provider";
import { detectLanguage } from "@/lang/server";
import { I18nProvider } from "@/lang/client";
import "@/styles/globals.css";
import "@/styles/content.css";
import "katex/dist/katex.min.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "chatchat",
  description: "Opinionated OpenAI API client.",
  icons: {
    apple: "/apple-touch-icon.png",
    icon: "/favicon.ico",
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lng = await detectLanguage();
  return (
    <I18nProvider language={lng}>
      <html lang={lng}>
        <body
          className={cn("min-h-screen bg-background font-sans antialiased overflow-x-hidden", inter.variable)}
          suppressHydrationWarning>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </I18nProvider>
  );
}
