import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Sekura — Ton garde du corps numérique",
  description:
    "Sekura protège ta sécurité physique en Amérique Latine : heatmap IA, SOS discret en 3 clics, navigation anti-crime et assistant IA 24h/24. Rejoins les 247 personnes déjà protégées.",
  keywords: [
    "sécurité personnelle",
    "Amérique Latine",
    "heatmap IA",
    "SOS discret",
    "navigation sécurisée",
    "safety app",
  ],
  openGraph: {
    title: "Sekura — Ton garde du corps numérique",
    description:
      "Heatmap IA · SOS discret · Navigation anti-crime · Assistant IA. Rejoins les 247 personnes déjà protégées. 3 mois gratuits.",
    siteName: "Sekura",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sekura — Ton garde du corps numérique",
    description:
      "Heatmap IA · SOS discret · Navigation anti-crime · Assistant IA. 3 mois offerts.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
