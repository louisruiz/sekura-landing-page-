export const metadata = {
  title: 'App de Seguridad en CDMX — Sekura | Heatmap IA Ciudad de México',
  description: 'Sekura te protege en Ciudad de México con heatmap IA, SOS discreto y navegación segura. Para residentes, turistas y expats.',
  alternates: { canonical: 'https://sekura.space/es/seguridad-cdmx/' },
}

export default function CDMXPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Seguridad en CDMX — Sekura",
            "description": "Aplicación de seguridad personal para Ciudad de México. Heatmap IA, SOS discreto, navegación segura.",
            "url": "https://sekura.space/es/seguridad-cdmx/",
            "about": { "@type": "City", "name": "Ciudad de México", "addressCountry": "MX" }
          })
        }}
      />
      <div style={{ minHeight: '100vh', background: '#0A0C14', color: '#F0F2FF', padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            App de seguridad personal en Ciudad de México — Navega CDMX con confianza
          </h1>
          
          <p style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 24, color: 'rgba(240,242,255,0.8)' }}>
            CDMX es una megalópolis vibrante donde conviven Polanco, Roma Norte y zonas que requieren precaución extrema. <strong>Sekura mapea los riesgos en tiempo real</strong> — robos en el Metro, zonas de extorsión, alertas de delegaciones.
          </p>

          <h2 style={{ fontSize: 32, fontWeight: 700, marginTop: 48, marginBottom: 20 }}>¿Por qué Sekura en CDMX?</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, color: 'rgba(240,242,255,0.8)' }}>
            Más de 22 millones de personas, 16 delegaciones, cientos de colonias. Imposible conocerlas todas. Sekura te da visibilidad instantánea: dónde está seguro moverse ahora, qué rutas evitar, cómo alertar a tus contactos si algo sale mal.
          </p>

          <h2 style={{ fontSize: 32, fontWeight: 700, marginTop: 48, marginBottom: 20 }}>Funcionalidades para CDMX</h2>
          <ul style={{ fontSize: 17, lineHeight: 2, marginBottom: 32, paddingLeft: 24, color: 'rgba(240,242,255,0.8)' }}>
            <li><strong>Heatmap en tiempo real</strong> — Condesa, Tepito, Iztapalapa, Neza</li>
            <li><strong>Alertas Metro CDMX</strong> — identifica estaciones de riesgo alto</li>
            <li><strong>SOS discreto triple clic</strong> — para situaciones de extorsión o robo</li>
            <li><strong>Faux appel</strong> — llamada falsa para salir de situaciones incómodas</li>
            <li><strong>Offline mode</strong> — funciona sin datos móviles</li>
          </ul>

          <div style={{ marginTop: 48, padding: 32, background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.2)', borderRadius: 16 }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: '#00E5A0' }}>Únete a la whitelist — Acceso anticipado</h3>
            <p style={{ marginBottom: 20, color: 'rgba(240,242,255,0.8)' }}>3 meses de Smart Safety gratis para los primeros 500 inscritos.</p>
            <a href="https://sekura.space/#waitlist" style={{ display: 'inline-block', padding: '14px 32px', background: '#00E5A0', color: '#0A0C14', fontWeight: 800, borderRadius: 12, textDecoration: 'none' }}>
              Acceso prioritario →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
