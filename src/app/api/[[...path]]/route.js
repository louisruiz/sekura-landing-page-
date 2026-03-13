import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY
const resendApiKey = process.env.RESEND_API_KEY
const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

function getSupabase() {
  return createClient(supabaseUrl, supabaseServiceKey)
}

function getResend() {
  return new Resend(resendApiKey)
}

const rateLimitMap = new Map()

function checkRateLimit(ip) {
  const now = Date.now()
  const windowMs = 60 * 1000
  const maxReq = 3
  const key = ip || 'unknown'
  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, [])
  }
  const timestamps = rateLimitMap.get(key).filter(t => now - t < windowMs)
  if (timestamps.length >= maxReq) return false
  timestamps.push(now)
  rateLimitMap.set(key, timestamps)
  return true
}

function isValidEmail(email) {
  if (!email || email.length > 254) return false
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return emailRegex.test(email)
}

function getConfirmationEmail(email, count) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Tu es sur la whitelist Sekura !</title></head>
<body style="margin:0;padding:0;background:#0A0C14;font-family:'Outfit',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0A0C14;">
    <tr><td align="center" style="padding:40px 20px;">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr><td style="background:#0A0C14;border-bottom:1px solid rgba(0,229,160,0.18);padding:32px 40px;text-align:center;">
          <h1 style="margin:0;font-size:32px;font-weight:900;color:#F0F2FF;letter-spacing:-1px;">Sek<span style="color:#00E5A0;">ur</span>a</h1>
          <p style="margin:8px 0 0;color:#8892B0;font-size:13px;letter-spacing:3px;text-transform:uppercase;">SECURITE PERSONNELLE INTELLIGENTE</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="background:#141720;padding:40px;">
          <h2 style="color:#F0F2FF;font-size:26px;margin:0 0 12px;">🎉 Tu es sur la whitelist !</h2>
          <p style="color:#8892B0;font-size:16px;line-height:1.6;margin:0 0 24px;">Tu fais partie des <strong style="color:#00E5A0;">${count} premiers inscrits</strong> sur la whitelist Sekura. Bienvenue à bord !</p>
          <!-- Benefits box -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(0,229,160,0.06);border:1px solid rgba(0,229,160,0.20);border-radius:12px;margin-bottom:28px;">
            <tr><td style="padding:24px 28px;">
              <p style="color:#00E5A0;font-size:13px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px;">CE QUE TU OBTIENS :</p>
              <p style="color:#F0F2FF;font-size:15px;margin:0 0 10px;">✓ &nbsp;<strong>3 mois de Smart Safety gratuit</strong> — au lancement</p>
              <p style="color:#F0F2FF;font-size:15px;margin:0 0 10px;">✓ &nbsp;<strong>Accès beta prioritaire</strong> — avant le grand public</p>
              <p style="color:#F0F2FF;font-size:15px;margin:0 0 0;">✓ &nbsp;<strong>Tu es contacté(e) en avant-première</strong> — dès que c'est prêt</p>
            </td></tr>
          </table>
          <p style="color:#8892B0;font-size:15px;line-height:1.6;margin:0 0 28px;">On te contacte dès que la beta est prête. Reste connecté(e) — ça arrive bientôt.</p>
          <!-- CTA -->
          <table cellpadding="0" cellspacing="0" border="0">
            <tr><td style="background:#00E5A0;border-radius:12px;">
              <a href="https://twitter.com/SekuraApp" style="color:#0A0C14;font-size:15px;font-weight:800;text-decoration:none;display:block;padding:14px 28px;">Suivre @SekuraApp sur X (Twitter) →</a>
            </td></tr>
          </table>
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:#0A0C14;border-top:1px solid rgba(255,255,255,0.07);padding:24px 40px;text-align:center;">
          <p style="color:#4A5568;font-size:12px;margin:0 0 8px;">© 2025 Sekura · Tous droits réservés</p>
          <p style="color:#4A5568;font-size:11px;margin:0;">Sekura est un outil d'aide, pas un service de secours professionnel.<br>Tu reçois cet email car tu t'es inscrit(e) sur sekura.app</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(request, { params }) {
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}

export async function GET(request, { params }) {
  return NextResponse.json({ error: 'Not found' }, { status: 404 })
}
