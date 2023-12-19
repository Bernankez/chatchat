import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/theme/theme-provider";
import { detectLanguage } from "@/lang/server";
import { I18nProvider } from "@/lang/client";
import "@/styles/globals.css";
import "@/styles/content.css";
import "katex/dist/katex.min.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "chatchat",
  description: "Opinionated OpenAI API client.",
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
          </ThemeProvider>
        </body>
      </html>
    </I18nProvider>
  );
}
