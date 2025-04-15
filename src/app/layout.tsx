import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar, Footer } from "@/components/layout";
import { AuthProvider } from "@/components/auth/AuthProvider";
import ThumbmarkScript from "@/components/analytics/ThumbmarkScript";
import AnalyticsWrapper from "@/components/analytics/AnalyticsWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Texas Elite Gutters & Exteriors",
  description:
    "Professional gutter installation and gutter services in San Antonio and Converse, TX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThumbmarkScript />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <AnalyticsWrapper />
        </AuthProvider>
      </body>
    </html>
  );
}
