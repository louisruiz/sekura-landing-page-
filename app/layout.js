import './globals.css'

export const metadata = {
  title: 'Sekura — La sécurité personnelle intelligente',
  description: 'Que tu rentres seule le soir à Paris, que tu voyages à Medellín ou que tu vis à São Paulo — Sekura te protège en temps réel. Heatmap IA des zones à risque, SOS discret, navigation sécurisée.',
  keywords: 'sécurité personnelle, femmes, voyageurs, LATAM, SOS, heatmap, sécurité',
  openGraph: {
    title: 'Sekura — La sécurité personnelle intelligente',
    description: 'La première app qui donne à chacun le même niveau de protection que ceux qui peuvent se payer un garde du corps.',
    url: 'https://sekura.app',
    siteName: 'Sekura',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sekura — La sécurité personnelle intelligente',
    description: 'La première app qui donne à chacun le même niveau de protection que ceux qui peuvent se payer un garde du corps.',
    creator: '@SekuraApp',
  },
  robots: {
    index: true,
    follow: true,
  }
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
        {children}
      </body>
    </html>
  )
}
