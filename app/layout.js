import './globals.css'
import Analytics from '../components/Analytics'
import StructuredData from '../components/StructuredData'

export const metadata = {
  title: 'Sekura — Application de sécurité personnelle | SOS discret, Heatmap IA, Femmes & Voyageurs',
  description: 'Sekura protège les femmes, voyageurs et familles en temps réel. Heatmap IA des zones à risque, SOS discret triple-clic, navigation sécurisée. Disponible Europe & Amérique Latine. Rejoins la whitelist gratuite.',
  keywords: 'application sécurité personnelle, app sécurité femme, SOS discret, sécurité voyageur LATAM, personal safety app, aplicacion seguridad personal, heatmap zones risque',
  authors: [{ name: 'Sekura' }],
  creator: 'Sekura',
  publisher: 'Sekura',
  alternates: {
    canonical: 'https://sekura.space',
    languages: {
      'fr': 'https://sekura.space',
      'en': 'https://sekura.space/en',
      'es': 'https://sekura.space/es',
      'pt': 'https://sekura.space/pt',
      'x-default': 'https://sekura.space',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#00E5A0' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    title: 'Sekura — App de sécurité personnelle intelligente',
    description: 'SOS discret, Heatmap IA, navigation sécurisée. Pour les femmes, voyageurs et familles. Europe & Amérique Latine.',
    url: 'https://sekura.space',
    siteName: 'Sekura',
    locale: 'fr_FR',
    alternateLocale: ['es_ES', 'pt_BR', 'en_US'],
    images: [{
      url: 'https://sekura.space/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Sekura — Sécurité personnelle intelligente',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sekura — App de sécurité personnelle intelligente',
    description: 'SOS discret, Heatmap IA, navigation sécurisée. Pour les femmes, voyageurs et familles.',
    creator: '@SekuraApp',
    site: '@SekuraApp',
    images: ['https://sekura.space/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'VOTRE_CODE_VERIFICATION_GSC',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Outfit', sans-serif", background: '#0A0C14' }}>
        <Analytics />
        <StructuredData />
        {children}
      </body>
    </html>
  )
}
