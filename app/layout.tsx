import type React from "react";
import type { Metadata } from "next";
import { Inter, Lalezar, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import { ReactQueryProvider } from "@/providers/react-query-providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lalezar = Lalezar({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lalezar",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poppins",
});

const sourceSansPro = localFont({
  src: [
    {
      path: "../public/fonts/Source_Sans_3/static/SourceSans3-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kulkita",
  description: "Stock Management",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${lalezar.variable} font-sans ${sourceSansPro.variable} ${poppins.variable}`}
      >
        <ReactQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster richColors />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
