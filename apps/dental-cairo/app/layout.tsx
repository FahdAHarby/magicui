import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { Toaster } from "@/components/ui/sonner";
import { clinic } from "@/config/clinic";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: `${clinic.fullName} — Dentist in New Cairo & Sheikh Zayed`,
    template: `%s · ${clinic.fullName}`,
  },
  description: clinic.description,
  keywords: [
    "dentist in Cairo",
    "dental clinic New Cairo",
    "dental implants Egypt",
    "Invisalign Cairo",
    "teeth whitening Cairo",
    "dentist Sheikh Zayed",
  ],
  openGraph: {
    title: `${clinic.fullName} — Modern dentistry in Cairo`,
    description: clinic.description,
    locale: "en_EG",
    type: "website",
    images: [
      {
        url: "/images/hero-patient.jpg",
        width: 1408,
        height: 768,
        alt: "A patient smiling in the Nile Smile Dental Studio treatment chair",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#2aa79f",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "bg-background text-foreground font-sans antialiased"
        )}
      >
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
