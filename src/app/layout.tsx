import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Dive Hard — Epic underwater cinema",
    template: "%s · Dive Hard",
  },
  description: SITE.description,
  keywords: [
    "Dive Hard",
    "Kabir Teja",
    "underwater filmmaking",
    "scuba cinema",
    "Raja Ampat",
    "Socorro",
    "Cocos",
    "Tubbataha",
  ],
  authors: [{ name: SITE.creator }],
  creator: SITE.creator,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: "Dive Hard — Epic underwater cinema",
    description: SITE.description,
    images: [
      {
        url: "/brand/channel-header.png",
        width: 1200,
        height: 630,
        alt: "Dive Hard channel header",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dive Hard — Epic underwater cinema",
    description: SITE.description,
    images: ["/brand/channel-header.png"],
  },
  icons: {
    icon: "/brand/logo-dive-hard.png",
    apple: "/brand/avatar.jpg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
