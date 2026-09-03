// Validações de formulário. As mesmas regras já existiam copiadas dentro de
// cada componente de diagnóstico; formulário novo usa daqui.

export function validarNome(valor) {
  const limpo = valor.trim()
  const partes = limpo.split(/\s+/)
  return partes.length >= 2 && partes.every((p) => p.length >= 2)
}

export function validarEmail(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim())
}

// Aceita fixo com DDD (10 dígitos) e celular com o 9 na frente (11 dígitos).
export function validarWhatsApp(valor) {
  const limpo = valor.replace(/\D/g, '')
  return limpo.length === 10 || (limpo.length === 11 && /^[1-9][1-9]9[0-9]{8}$/.test(limpo))
}

export function formatarWhatsApp(valor) {
  const limpo = valor.replace(/\D/g, '').slice(0, 11)
  if (limpo.length === 0) return ''
  if (limpo.length <= 2) return `(${limpo}`
  if (limpo.length <= 7) return `(${limpo.slice(0, 2)}) ${limpo.slice(2)}`
  if (limpo.length <= 10) {
    return `(${limpo.slice(0, 2)}) ${limpo.slice(2, 6)}-${limpo.slice(6)}`
  }
  return `(${limpo.slice(0, 2)}) ${limpo.slice(2, 7)}-${limpo.slice(7, 11)}`
}
