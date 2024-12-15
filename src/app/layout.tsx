import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "WordWise — Вивчайте іноземні слова легко",
    description: "WordWise — це платформа для вивчення іноземних слів. Організуйте свої слова за темами, тренуйтеся і розвивайте свій словниковий запас щодня. Легко, зручно та ефективно!",
    keywords: "вивчення слів, іноземні мови, тренування слів, WordWise, навчання мов",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <Header />
    <main className="px-4 py-6 sm:px-6 lg:px-8">
        {children}
    </main>
    </body>
    </html>
  );
}
