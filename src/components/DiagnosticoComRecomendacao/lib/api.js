// =================================================================
// Validações e formatação
// =================================================================

export function validateWhatsApp(value) {
  const cleaned = value.replace(/\D/g, '')
  return (cleaned.length === 11 && /^[1-9][1-9]9[0-9]{8}$/.test(cleaned)) || cleaned.length === 10
}

export function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function validateNome(value) {
  const trimmed = value.trim()
  const parts = trimmed.split(/\s+/)
  return parts.length >= 2 && parts.every((p) => p.length >= 2)
}

export function formatWhatsApp(value) {
  const cleaned = value.replace(/\D/g, '').slice(0, 11)
  if (cleaned.length === 0) return ''
  if (cleaned.length <= 2) return `(${cleaned}`
  if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`
  if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  }
  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`
}

export function getUTMParams() {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get('utm_source') || 'direct',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_content: params.get('utm_content') || '',
  }
}

export function trackEvent(event, data = {}) {
  if (typeof window === 'undefined') return
  const utm = getUTMParams()
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, ...data, ...utm, ts: Date.now() }),
  }).catch(() => {})
}

export async function submitToRenvChat(payload) {
  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    return await res.json()
  } catch (err) {
    console.error('Erro ao enviar lead:', err)
    return { ok: false, error: err.message }
  }
}