export const metadata = {
  title: 'App de Seguridad en Bogotá — Sekura | Zonas de riesgo Colombia',
  description: 'Sekura te protege en Bogotá con heatmap IA, SOS discreto y navegación segura. Para residentes, expats y viajeros.',
  alternates: { canonical: 'https://sekura.space/es/seguridad-bogota/' },
}

export default function BogotaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Seguridad en Bogotá — Sekura",
            "description": "Aplicación de seguridad personal para Bogotá. Heatmap IA, SOS discreto, navegación segura.",
            "url": "https://sekura.space/es/seguridad-bogota/",
            "about": { "@type": "City", "name": "Bogotá", "addressCountry": "CO" }
          })
        }}
      />
      <div style={{ minHeight: '100vh', background: '#0A0C14', color: '#F0F2FF', padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Seguridad personal en Bogotá — Sekura te protege 24/7
          </h1>
          
          <p style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 24, color: 'rgba(240,242,255,0.8)' }}>
            Bogotá es el corazón de Colombia, pero navegar la ciudad de forma segura requiere conocimiento local. <strong>Sekura te ofrece un mapa de calor IA</strong> actualizado en tiempo real — zonas de riesgo en Chapinero, el Centro, Soacha, y localidades periféricas.
          </p>

          <h2 style={{ fontSize: 32, fontWeight: 700, marginTop: 48, marginBottom: 20 }}>¿Por qué necesitas Sekura en Bogotá?</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, color: 'rgba(240,242,255,0.8)' }}>
            TransMilenio de noche, Candelaria, Kennedy — hay zonas que cambian de seguras a peligrosas en cuestión de horas. Sekura te da visibilidad en tiempo real, alertas antes de entrar en áreas de riesgo, y un SOS silencioso para emergencias.
          </p>

          <h2 style={{ fontSize: 32, fontWeight: 700, marginTop: 48, marginBottom: 20 }}>Funcionalidades clave para Bogotá</h2>
          <ul style={{ fontSize: 17, lineHeight: 2, marginBottom: 32, paddingLeft: 24, color: 'rgba(240,242,255,0.8)' }}>
            <li><strong>Heatmap IA tiempo real</strong> — robos, hurtos, zonas de riesgo por localidad</li>
            <li><strong>Alertas TransMilenio</strong> — estaciones y horarios de mayor riesgo</li>
            <li><strong>SOS discreto</strong> — triple clic volumen, sin mirar pantalla</li>
            <li><strong>Navegación segura</strong> — rutas que evitan zonas peligrosas activas</li>
            <li><strong>Modo offline</strong> — funciona sin conexión móvil</li>
          </ul>

          <div style={{ marginTop: 48, padding: 32, background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.2)', borderRadius: 16 }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: '#00E5A0' }}>Únete a la whitelist gratuita</h3>
            <p style={{ marginBottom: 20, color: 'rgba(240,242,255,0.8)' }}>Los primeros 500 inscritos obtienen 3 meses de Smart Safety gratis.</p>
            <a href="https://sekura.space/#waitlist" style={{ display: 'inline-block', padding: '14px 32px', background: '#00E5A0', color: '#0A0C14', fontWeight: 800, borderRadius: 12, textDecoration: 'none' }}>
              Unirse ahora →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
