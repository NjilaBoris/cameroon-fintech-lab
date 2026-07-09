import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Nav";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CAMEROON FINTECH LAB",
  description: "A platform for fintech enthusiasts, developers, and innovators in Cameroon to collaborate, learn, and build the future of financial technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, bricolageGrotesque.className, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col bg-[#F9F9F9]">
        <Navbar/>
        {children}</body>
    </html>
  );
}
