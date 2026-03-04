export const metadata = {
  title: 'App de Seguridad en Medellín — Sekura | Zonas de riesgo en tiempo real',
  description: 'Sekura te protege en Medellín con heatmap IA de zonas de riesgo, SOS silencioso y navegación segura. Únete a la whitelist gratuita.',
  alternates: { canonical: 'https://sekura.space/es/seguridad-medellin/' },
}

export default function MedellinPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Seguridad en Medellín — Sekura",
            "description": "Aplicación de seguridad personal para Medellín. Heatmap IA de zonas de riesgo, SOS discreto, navegación segura.",
            "url": "https://sekura.space/es/seguridad-medellin/",
            "about": { "@type": "City", "name": "Medellín", "addressCountry": "CO" }
          })
        }}
      />
      <div style={{ minHeight: '100vh', background: '#0A0C14', color: '#F0F2FF', padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Seguridad personal en Medellín — Sekura te protege en tiempo real
          </h1>
          
          <p style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 24, color: 'rgba(240,242,255,0.8)' }}>
            Medellín ha transformado su imagen, pero los riesgos urbanos siguen siendo una realidad cotidiana para residentes y turistas. Sekura ofrece una <strong>heatmap IA de zonas de riesgo</strong> con granularidad de 50m x 50m, actualizada en tiempo real con reportes comunitarios e incidentes locales.
          </p>

          <h2 style={{ fontSize: 32, fontWeight: 700, marginTop: 48, marginBottom: 20 }}>¿Por qué necesitas Sekura en Medellín?</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, color: 'rgba(240,242,255,0.8)' }}>
            El Centro, Laureles de noche, las zonas alrededor del Metro — conocer la geografía del riesgo en Medellín toma años. Sekura te la da en 30 segundos. Evita zonas peligrosas, recibe alertas antes de entrar en áreas de riesgo, y alerta a tus contactos con un simple triple clic en el botón de volumen.
          </p>

          <h2 style={{ fontSize: 32, fontWeight: 700, marginTop: 48, marginBottom: 20 }}>Funcionalidades clave para Medellín</h2>
          <ul style={{ fontSize: 17, lineHeight: 2, marginBottom: 32, paddingLeft: 24, color: 'rgba(240,242,255,0.8)' }}>
            <li><strong>Heatmap IA actualizada en tiempo real</strong> — zonas cartel, robos, incidentes en Poblado, Envigado, Bello</li>
            <li><strong>SOS silencioso</strong> — triple clic en el botón de volumen, sin mirar la pantalla</li>
            <li><strong>Navegación segura</strong> — rutas que evitan zonas de riesgo activas</li>
            <li><strong>Modo offline</strong> — funciona sin conexión en zonas con señal débil (comunas, montañas)</li>
            <li><strong>Alertas en español</strong> — app 100% traducida para Colombia</li>
          </ul>

          <div style={{ marginTop: 48, padding: 32, background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.2)', borderRadius: 16 }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: '#00E5A0' }}>Únete a la whitelist gratuita</h3>
            <p style={{ marginBottom: 20, color: 'rgba(240,242,255,0.8)' }}>Los primeros 500 inscritos obtienen 3 meses de Smart Safety gratis. Sin tarjeta de crédito.</p>
            <a href="https://sekura.space/#waitlist" style={{ display: 'inline-block', padding: '14px 32px', background: '#00E5A0', color: '#0A0C14', fontWeight: 800, borderRadius: 12, textDecoration: 'none' }}>
              Unirse a la whitelist →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
