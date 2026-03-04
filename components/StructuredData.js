'use client'

export default function StructuredData() {
  // MobileApplication Schema
  const mobileAppSchema = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "name": "Sekura",
    "description": "Application de sécurité personnelle intelligente. Heatmap IA des zones à risque, SOS discret triple-clic, navigation sécurisée, mode offline. Pour les femmes, les voyageurs et les familles.",
    "url": "https://sekura.space",
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "iOS, Android",
    "offers": [
      {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR",
        "name": "Core Safety — Gratuit pour toujours"
      },
      {
        "@type": "Offer",
        "price": "2.99",
        "priceCurrency": "USD",
        "name": "Smart Safety",
        "billingIncrement": "P1M"
      },
      {
        "@type": "Offer",
        "price": "7.99",
        "priceCurrency": "USD",
        "name": "Premium Protection",
        "billingIncrement": "P1M"
      }
    ],
    "featureList": [
      "Heatmap IA zones à risque temps réel",
      "SOS discret triple-clic volume",
      "Navigation sécurisée anti-crime",
      "Timer de sécurité check-in automatique",
      "Mode offline SMS fallback",
      "Faux appel d'extraction",
      "Assistant IA sécurité 24/7",
      "Réseau de confiance jusqu'à 5 contacts",
      "Détection automatique déviation itinéraire"
    ],
    "inLanguage": ["fr", "es", "pt", "en"],
    "availableOnDevice": "Mobile",
    "countriesSupported": "FR, CO, MX, BR, ES, GB, US, AU, PE, EC",
    "publisher": {
      "@type": "Organization",
      "name": "Sekura",
      "url": "https://sekura.space"
    }
  }

  // FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Qu'est-ce que la whitelist Sekura ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La whitelist Sekura est un accès anticipé gratuit à l'application. Les 500 premiers inscrits obtiennent 3 mois de Smart Safety offerts et un accès prioritaire à la beta fermée. Aucune carte bancaire requise."
        }
      },
      {
        "@type": "Question",
        "name": "Dans quels pays Sekura sera disponible au lancement ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sekura sera disponible au lancement en France, Colombie, Mexique, Brésil, Espagne, Royaume-Uni, États-Unis et Australie. L'app est conçue pour fonctionner dans toute ville du monde."
        }
      },
      {
        "@type": "Question",
        "name": "Comment fonctionne le mode offline de Sekura ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sans connexion internet, Sekura permet l'envoi de SOS par SMS, l'accès à la dernière heatmap téléchargée localement, et fonctionne sur des appareils d'entrée de gamme (APK < 30MB). Indispensable en zones rurales, Amazonie ou Andes."
        }
      },
      {
        "@type": "Question",
        "name": "La personne à alerter doit-elle avoir Sekura installé ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Non. Vos contacts de confiance reçoivent votre position via un lien SMS accessible dans n'importe quel navigateur, sans avoir besoin d'installer l'application Sekura."
        }
      },
      {
        "@type": "Question",
        "name": "Mes données de localisation sont-elles partagées ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vos données de localisation sont chiffrées de bout en bout (E2E) et ne sont partagées qu'avec vos contacts de confiance explicitement définis. Sekura ne vend aucune donnée à des tiers."
        }
      },
      {
        "@type": "Question",
        "name": "Comment fonctionne le SOS discret de Sekura ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Un triple-clic sur le bouton volume de votre téléphone déclenche un SOS silencieux instantané. Vos 5 contacts de confiance reçoivent une notification et un SMS avec votre position GPS exacte. Rien n'apparaît à l'écran — personne autour de vous ne le voit."
        }
      }
    ]
  }

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sekura",
    "url": "https://sekura.space",
    "logo": "https://sekura.space/logo.png",
    "description": "Sekura développe des solutions de sécurité personnelle intelligente pour les femmes, les voyageurs et les familles.",
    "foundingDate": "2025",
    "areaServed": ["FR", "CO", "MX", "BR", "ES", "GB", "US", "AU"],
    "sameAs": [
      "https://twitter.com/SekuraApp",
      "https://instagram.com/sekura.app",
      "https://www.linkedin.com/company/sekura-app"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "contact@sekura.space"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(mobileAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  )
}
