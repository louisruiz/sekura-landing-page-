export const metadata = {
  title: 'App de Segurança em São Paulo — Sekura | Heatmap IA SP',
  description: 'Sekura te protege em São Paulo com heatmap IA de zonas de risco, SOS discreto e navegação segura. Para residentes, turistas e expatriados.',
  alternates: { canonical: 'https://sekura.space/pt/seguranca-sao-paulo/' },
}

export default function SaoPauloPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Segurança em São Paulo — Sekura",
            "description": "Aplicativo de segurança pessoal para São Paulo. Heatmap IA, SOS discreto, navegação segura.",
            "url": "https://sekura.space/pt/seguranca-sao-paulo/",
            "about": { "@type": "City", "name": "São Paulo", "addressCountry": "BR" }
          })
        }}
      />
      <div style={{ minHeight: '100vh', background: '#0A0C14', color: '#F0F2FF', padding: '80px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 24, lineHeight: 1.2 }}>
            Segurança pessoal em São Paulo — Sekura te protege em tempo real
          </h1>
          
          <p style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 24, color: 'rgba(240,242,255,0.8)' }}>
            São Paulo é vibrante, imensa, desafiadora. Com 12 milhões de habitantes e zonas de risco que mudam por hora, <strong>Sekura oferece um mapa de calor IA atualizado continuamente</strong> — assaltos na Paulista, arrastões em bairros específicos, zonas seguras versus perigosas.
          </p>

          <h2 style={{ fontSize: 32, fontWeight: 700, marginTop: 48, marginBottom: 20 }}>Por que você precisa de Sekura em SP?</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, color: 'rgba(240,242,255,0.8)' }}>
            Jardins, Vila Madalena, Brás, Cracolândia — a geografia do risco em São Paulo é complexa. Sekura te dá visibilidade instantânea: evite zonas perigosas, receba alertas antes de entrar em áreas de risco, acione um SOS discreto se necessário.
          </p>

          <h2 style={{ fontSize: 32, fontWeight: 700, marginTop: 48, marginBottom: 20 }}>Funcionalidades para São Paulo</h2>
          <ul style={{ fontSize: 17, lineHeight: 2, marginBottom: 32, paddingLeft: 24, color: 'rgba(240,242,255,0.8)' }}>
            <li><strong>Heatmap IA em tempo real</strong> — assaltos, furtos, zonas de risco em toda SP</li>
            <li><strong>SOS silencioso</strong> — triplo clique no botão de volume, sem olhar para a tela</li>
            <li><strong>Navegação segura</strong> — rotas que evitam zonas perigosas ativas</li>
            <li><strong>Modo offline</strong> — funciona sem conexão (indispensável no metrô)</li>
            <li><strong>Alertas em português</strong> — app 100% traduzida para o Brasil</li>
          </ul>

          <div style={{ marginTop: 48, padding: 32, background: 'rgba(0,229,160,0.08)', border: '1px solid rgba(0,229,160,0.2)', borderRadius: 16 }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, color: '#00E5A0' }}>Entre na lista de espera gratuita</h3>
            <p style={{ marginBottom: 20, color: 'rgba(240,242,255,0.8)' }}>Os primeiros 500 inscritos ganham 3 meses de Smart Safety grátis. Sem cartão de crédito.</p>
            <a href="https://sekura.space/#waitlist" style={{ display: 'inline-block', padding: '14px 32px', background: '#00E5A0', color: '#0A0C14', fontWeight: 800, borderRadius: 12, textDecoration: 'none' }}>
              Entrar na lista →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
