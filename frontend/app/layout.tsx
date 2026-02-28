import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrustLance - Secure Freelance Escrow on Stellar",
  description: "Secure freelance payments on Stellar blockchain. Get paid safely with 1% fees, instant settlements, and transparent escrow system.",
  keywords: ["Stellar", "Freelance", "Escrow", "Cryptocurrency", "XLM", "Blockchain"],
  authors: [{ name: "TrustLance Team" }],
  openGraph: {
    title: "TrustLance - Secure Freelance Escrow",
    description: "Secure freelance payments on Stellar blockchain",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
