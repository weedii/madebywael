import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as HotToaster } from "react-hot-toast";
import AuthProvider from "@/components/auth/session-provider";
import { AutoLoadingProvider } from "@/contexts/auto-loading-context";
import { AutoLoader } from "@/components/common/auto-loader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Made by Wael | Software Engineer",
  description: "Personal website and portfolio of Wael, a software engineer",
  icons: {
    icon: [
      { url: "/wa.ico", sizes: "any" },
      { url: "/wa.png", type: "image/png" },
    ],
    apple: [{ url: "/wa.png", type: "image/png" }],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <AutoLoadingProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AutoLoader />
              {children}
              <Toaster />
              <HotToaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: "hsl(var(--card))",
                    color: "hsl(var(--card-foreground))",
                    border: "1px solid hsl(var(--border))",
                  },
                }}
              />
            </ThemeProvider>
          </AutoLoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
