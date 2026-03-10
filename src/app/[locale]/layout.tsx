import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { getDictionary } from "@/dictionaries";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const dict = await getDictionary(params.locale);
  
  return {
    title: dict.meta?.title || "Sekura — Ton garde du corps numérique",
    description: dict.meta?.description || "Sekura protège ta sécurité physique en Amérique Latine.",
    keywords: [
      "sécurité personnelle",
      "Amérique Latine",
      "heatmap IA",
      "SOS discret",
      "navigation sécurisée",
      "safety app",
    ],
    openGraph: {
      title: dict.meta?.og_title || "Sekura — Ton garde du corps numérique",
      description: dict.meta?.og_description || "Heatmap IA · SOS discret · Navigation anti-crime · Assistant IA.",
      siteName: "Sekura",
      type: "website",
      locale: params.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta?.og_title || "Sekura — Ton garde du corps numérique",
      description: dict.meta?.og_description || "Heatmap IA · SOS discret · Navigation anti-crime · Assistant IA.",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={params.locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
