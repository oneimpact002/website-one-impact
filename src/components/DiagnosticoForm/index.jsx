import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  QUESTIONS,
  calculateScore,
  calculateImpact,
  calcularPotencial,
  chooseSignals,
  generatePlano,
  recommendPackage,
  getScoreFaixa,
} from './lib/data'
import {
  validateWhatsApp,
  validateEmail,
  validateNome,
  formatWhatsApp,
  submitToRenvChat,
  trackEvent,
} from './lib/api'

// ======================== PROGRESS BAR ========================
const ProgressBar = ({ step, total }) => {
  const pct = (step / total) * 100
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-white/50 font-medium">
          Pergunta {step} de {total}
        </span>
        <motion.span
          key={step}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-white/70 font-semibold tabular-nums"
        >
          {Math.round(pct)}%
        </motion.span>
      </div>
      <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#5907DB] via-[#8539FF] to-[#677BFF] rounded-full"
          style={{ boxShadow: '0 0 12px rgba(133, 57, 255, 0.5)' }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

// ======================== HERO ========================
const Hero = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-12 relative overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(rgba(247, 250, 255, 0.15) 1.2px, transparent 1.2px), linear-gradient(180deg, #0a0a0f 0%, #12111a 100%)',
        backgroundSize: '24px 24px, 100% 100%',
      }}
    >
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#5907DB] rounded-full filter blur-[120px] opacity-30" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#677BFF] rounded-full filter blur-[120px] opacity-25" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#8539FF] animate-pulse" />
          <span className="text-xs text-white/60 font-medium tracking-wide uppercase" style={{ fontFamily: "'Sora', sans-serif" }}>
            Diagnóstico gratuito
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="titulo-hero text-white leading-[1.05] tracking-tight mb-6"
        >
          A estrutura do seu negócio está{' '}
          <span className="gradient-text-animated">custando mais</span>
          {' do que você imagina.'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="texto-descricao text-white/70 leading-relaxed mb-8 max-w-2xl mx-auto px-2"
        >
          Descubra em 90 segundos o que está faltando na sua estrutura digital, e quanto essa lacuna está impactando suas vendas.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-left max-w-xl mx-auto mb-10 bg-white/[0.02] border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur"
        >
          <p className="texto-card text-white/50 mb-4 font-medium">Em 90 segundos, descubra:</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#8539FF] text-xl leading-none mt-0.5">•</span>
              <span className="texto-card text-white/90">
                O <strong className="text-white">número exato</strong> que sua estrutura digital deixa na mesa todo mês
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8539FF] text-xl leading-none mt-0.5">•</span>
              <span className="texto-card text-white/90">
                Os <strong className="text-white">sinais de risco</strong> que estão escondidos na sua presença digital
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8539FF] text-xl leading-none mt-0.5">•</span>
              <span className="texto-card text-white/90">
                O <strong className="text-white">plano prático</strong> para reverter esse cenário nos próximos 90 dias
              </span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/60 mb-8"
        >
          <span className="texto-card flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            100% gratuito
          </span>
          <span className="text-white/30">·</span>
          <span className="texto-card flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Veja o resultado na hora
          </span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          onClick={onStart}
          className="texto-card group relative inline-flex items-center gap-2 px-6 sm:px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-[#5907DB] via-[#8539FF] to-[#677BFF] text-white shadow-[0_0_40px_rgba(133,57,255,0.5)] hover:scale-[1.03] active:scale-[0.98] transition-transform"
        >
          QUERO MEU DIAGNÓSTICO
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.button>

      </div>
    </motion.div>
  )
}

// ======================== SCORE QUESTION ========================
const ScoreQuestion = ({ question, step, total, value, onChange, onNext, onBack, canGoBack }) => {
  const [touched, setTouched] = useState(false)
  const isCheckbox = question.type === 'checkbox'
  const isMatrix = question.type === 'checkbox-matrix'

  const canProceed = () => {
    if (isCheckbox || isMatrix) {
      return value && Object.values(value).some(Boolean)
    }
    return value && value !== ''
  }

  const handleSelect = (val) => {
    if (isCheckbox) {
      const arr = Array.isArray(value) ? value : []
      const next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]
      onChange(next)
    } else if (isMatrix) {
      const obj = value || {}
      onChange({ ...obj, [val]: !obj[val] })
    } else {
      onChange(val)
    }
    setTouched(true)
  }

  const isSelected = (val) => {
    if (isCheckbox) return Array.isArray(value) && value.includes(val)
    if (isMatrix) return value && value[val] === true
    return value === val
  }

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8"
    >
      {canGoBack && (
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Voltar
        </button>
      )}

      <ProgressBar step={step} total={total} />

      <div className="mt-8 sm:mt-10">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="texto-titulo text-white mb-3 leading-tight"
        >
          {question.label}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="texto-card text-white/60 leading-relaxed mb-6 sm:mb-8"
        >
          {question.help}
        </motion.p>

        <div className={`grid gap-3 ${isMatrix ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
          {question.options.map((opt, i) => (
            <motion.button
              key={opt.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.04 }}
              onClick={() => handleSelect(opt.value)}
              className={`group relative w-full text-left px-5 py-4 rounded-xl border transition-all ${
                isSelected(opt.value)
                  ? 'border-[#8539FF] bg-gradient-to-r from-[#5907DB]/20 to-[#8539FF]/10 shadow-[0_0_20px_rgba(133,57,255,0.3)]'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 ${isCheckbox || isMatrix ? 'rounded-sm' : 'rounded-full'} border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    isSelected(opt.value)
                      ? 'border-[#8539FF] bg-[#8539FF]'
                      : 'border-white/30 group-hover:border-white/50'
                  }`}
                >
                  {isSelected(opt.value) && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`texto-card ${isSelected(opt.value) ? 'text-white font-semibold' : 'text-white/80'}`}>
                  {opt.label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {touched && question.microfeedback && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 flex items-center gap-2 text-xs text-[#8539FF] font-medium"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {question.microfeedback}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 sm:mt-10"
        >
          <button
            onClick={onNext}
            disabled={!canProceed()}
            className={`texto-card w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold transition-all ${
              canProceed()
                ? 'bg-gradient-to-r from-[#5907DB] to-[#8539FF] text-white shadow-[0_0_30px_rgba(133,57,255,0.4)] hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-white/5 text-white/30 cursor-not-allowed'
            }`}
          >
            Continuar →
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ======================== CAPTURE ========================
const Capture = ({ onSubmit, onBack, initialData }) => {
  const [nome, setNome] = useState(initialData?.nome || '')
  const [whatsapp, setWhatsapp] = useState(initialData?.whatsapp ? formatWhatsApp(initialData.whatsapp) : '')
  const [email, setEmail] = useState(initialData?.email || '')
  const [pessoalConfirm, setPessoalConfirm] = useState(initialData?.whatsapp ? true : false)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    // Campos agora são opcionais - não valida nada
    const newErrors = {}
    setErrors(newErrors)
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    trackEvent('capture_submitted', { hasPessoal: pessoalConfirm })
    const cleanedWhatsapp = whatsapp.replace(/\D/g, '')
    // Envia dados mesmo se vazios (teste)
    if (nome.trim() || whatsapp || email.trim()) {
      await submitToRenvChat({
        nome: nome.trim(),
        whatsapp: cleanedWhatsapp,
        email: email.trim(),
        pessoalConfirm,
      })
    }
    setSubmitting(false)
    onSubmit({ nome: nome.trim() || 'Visitante', whatsapp: cleanedWhatsapp, email: email.trim() })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-12 relative overflow-hidden"
    >
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#5907DB] rounded-full filter blur-[120px] opacity-20" />

      <div className="relative z-10 max-w-xl mx-auto w-full">
        {onBack && (
          <button onClick={onBack} className="mb-6 flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="texto-card text-emerald-300">Seu diagnóstico tá pronto!</span>
          </div>
          <h1 className="titulo-hero text-white mb-3">Faltam só alguns dados</h1>
          <p className="texto-card text-white/60">Pra eu montar o relatório sob medida do seu negócio, preciso de 3 informações rápidas.</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 backdrop-blur space-y-4 sm:space-y-5"
        >
          <div className="bg-amber-400/5 border border-amber-400/20 rounded-xl p-4 mb-2">
            <p className="text-amber-200/90 text-sm leading-relaxed">
              <strong className="text-amber-200">⚠️ Importante:</strong> coloque um WhatsApp{' '}
              <strong className="text-amber-200">que você abra com frequência</strong>. Você vai
              receber o relatório, os próximos passos e conteúdos estratégicos personalizados.
              É fundamental que chegue direto pra você, não pra uma equipe ou central que possa
              descartar.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Nome completo <span className="text-[#8539FF]">*</span>
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              className={`w-full px-4 py-3 rounded-xl bg-black/30 border ${
                errors.nome ? 'border-red-400/60' : 'border-white/10'
              } text-white placeholder-white/30 focus:outline-none focus:border-[#8539FF] focus:ring-2 focus:ring-[#8539FF]/20 transition`}
            />
            {errors.nome && <p className="mt-1.5 text-xs text-red-300">{errors.nome}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              WhatsApp <span className="text-[#8539FF]">*</span>
            </label>
            <input
              type="tel"
              inputMode="numeric"
              value={whatsapp}
              onChange={(e) => setWhatsapp(formatWhatsApp(e.target.value))}
              placeholder="(XX) XXXXX-XXXX"
              className={`w-full px-4 py-3 rounded-xl bg-black/30 border ${
                errors.whatsapp ? 'border-red-400/60' : 'border-white/10'
              } text-white placeholder-white/30 focus:outline-none focus:border-[#8539FF] focus:ring-2 focus:ring-[#8539FF]/20 transition`}
            />
            {errors.whatsapp && <p className="mt-1.5 text-xs text-red-300">{errors.whatsapp}</p>}

            <label className="flex items-center gap-2.5 mt-3 cursor-pointer group">
              <div
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  pessoalConfirm
                    ? 'border-[#8539FF] bg-[#8539FF]'
                    : 'border-white/30 group-hover:border-white/50'
                }`}
              >
                {pessoalConfirm && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={pessoalConfirm}
                onChange={(e) => setPessoalConfirm(e.target.checked)}
                className="sr-only"
              />
              <span className="texto-card text-white/70">É um número que eu consulto com frequência</span>
            </label>
            {errors.pessoal && <p className="mt-1.5 text-xs text-red-300">{errors.pessoal}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              E-mail <span className="text-[#8539FF]">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className={`w-full px-4 py-3 rounded-xl bg-black/30 border ${
                errors.email ? 'border-red-400/60' : 'border-white/10'
              } text-white placeholder-white/30 focus:outline-none focus:border-[#8539FF] focus:ring-2 focus:ring-[#8539FF]/20 transition`}
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-300">{errors.email}</p>}
          </div>

          <div className="border-t border-white/10 pt-4">
            <p className="text-xs text-white/50 mb-2 font-medium">Por que pedimos um número direto:</p>
            <ul className="space-y-1.5 text-xs text-white/60">
              <li className="flex items-start gap-2"><span className="text-[#8539FF]">•</span><span>Estratégias e análises que não podem cair em mãos erradas</span></li>
              <li className="flex items-start gap-2"><span className="text-[#8539FF]">•</span><span>Conteúdo personalizado pro seu momento de negócio</span></li>
              <li className="flex items-start gap-2"><span className="text-[#8539FF]">•</span><span>Comunicação direta, sem intermediários que possam descartar</span></li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="texto-card w-full py-4 rounded-xl font-bold bg-gradient-to-r from-[#5907DB] via-[#8539FF] to-[#677BFF] text-white shadow-[0_0_30px_rgba(133,57,255,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Gerando diagnóstico...' : 'VER MEU DIAGNÓSTICO →'}
          </button>
        </motion.form>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-center text-xs text-white/40 mt-6">
          🔒 Seus dados são protegidos pela LGPD. Não enviamos spam.
        </motion.p>
      </div>
    </motion.div>
  )
}

// ======================== LOADING ========================
const Loading = () => {
  const [step, setStep] = useState(0)
  const steps = [
    'Analisando suas respostas...',
    'Cruzando com dados do mercado jurídico...',
    'Calculando impacto financeiro...',
    'Identificando sinais de risco...',
    'Montando seu plano personalizado...',
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s < steps.length - 1 ? s + 1 : s))
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#8539FF] rounded-full filter blur-[150px] opacity-20" />
      <div className="relative z-10 max-w-md w-full text-center">
        <motion.div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8 sm:mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-[#5907DB] via-[#8539FF] to-[#677BFF]"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{ filter: 'blur(2px)' }}
          />
          <motion.div
            className="absolute inset-2 rounded-full bg-[#0a0a0f]"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="texto-card font-bold text-white mb-3">
          Gerando seu diagnóstico
        </motion.h2>
        <motion.p key={step} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="texto-card text-white/60">
          {steps[step]}
        </motion.p>
        <div className="flex justify-center gap-2 mt-8">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              className={`h-1.5 rounded-full transition-all ${i <= step ? 'bg-[#8539FF] w-8' : 'bg-white/10 w-1.5'}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ======================== RESULT ========================
const fmt = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

const Result = ({ payload, onEdit }) => {
  const { score, impacto, potencial, sinais, plano, pacote, nome } = payload
  const faixa = getScoreFaixa(score)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen w-full px-4 sm:px-6 py-10 sm:py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5907DB] rounded-full filter blur-[150px] opacity-15" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#677BFF] rounded-full filter blur-[150px] opacity-15" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="texto-card text-emerald-300">Diagnóstico gerado com sucesso</span>
          </div>
          <h1 className="titulo-hero text-white mb-2">
            {nome.split(' ')[0]}, seu diagnóstico
          </h1>
          <p className="texto-card text-white/60">Aqui está o retrato real do seu digital.</p>
        </motion.div>

        {/* SCORE */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-6 backdrop-blur text-center">
          <p className="texto-card text-white/60 mb-2">Seu score digital</p>
          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className="text-6xl md:text-7xl font-extrabold text-white">{score}</span>
            <span className="text-2xl text-white/40">/100</span>
          </div>
          <p className={`texto-card font-semibold ${faixa.cor}`}>{faixa.emoji} {faixa.label}</p>
        </motion.div>

        {/* IMPACTO FINANCEIRO */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-6 backdrop-blur">
          <h2 className="titulo-secao text-white mb-3">Perda financeira estimada</h2>
          <p className="texto-card text-white/60 mb-4">O quanto sua falta de estrutura digital está custando pro seu negócio todo mês e todo ano.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
              <p className="texto-card text-white/50 uppercase tracking-wider mb-1">Por mês</p>
              <p className="text-2xl md:text-3xl font-bold text-white">{fmt(impacto.mensal)}</p>
            </div>
            <div className="bg-gradient-to-br from-[#5907DB]/20 to-[#8539FF]/20 border border-[#8539FF]/30 rounded-xl p-4">
              <p className="texto-card text-[#8539FF] uppercase tracking-wider mb-1">Por ano</p>
              <p className="text-2xl md:text-3xl font-bold text-white">{fmt(impacto.anual)}</p>
            </div>
          </div>
        </motion.div>

        {/* PREVISÃO DE GANHO (cenários) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-6 backdrop-blur">
          <h2 className="titulo-secao text-white mb-3">Com estrutura + automação, você poderia ganhar</h2>
          <p className="texto-card text-white/60 mb-4">Três cenários baseados no seu nível de maturidade digital. Do mais conservador ao mais otimista.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* CARD: Mais receita */}
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#915EFF] to-[#A872FF] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <p className="texto-card font-semibold text-white">Mais receita</p>
              </div>
              <div className="space-y-2">
                {potencial.map((c, i) => (
                  <div key={c.nome} className="flex items-baseline justify-between">
                    <span className={`text-xs uppercase tracking-wider ${i === 1 ? 'text-emerald-300' : 'text-white/40'}`}>
                      {c.label}
                      {i === 1 && <span className="ml-1.5 text-[10px] text-emerald-300/80">★</span>}
                    </span>
                    <span className={`font-bold tabular-nums ${i === 1 ? 'text-emerald-300 text-lg' : 'text-white/70 text-sm'}`}>
                      +{fmt(c.receitaMensal)}/mês
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-white/40 mt-3 leading-relaxed">
                Entre <strong className="text-white/60">{fmt(potencial[0].receitaAnual)}</strong> e <strong className="text-white/60">{fmt(potencial[2].receitaAnual)}</strong> por ano no cenário mais otimista.
              </p>
            </div>

            {/* CARD: Mais clientes */}
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-[#915EFF] to-[#A872FF] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
                <p className="texto-card font-semibold text-white">Mais clientes</p>
              </div>
              <div className="space-y-2">
                {potencial.map((c, i) => (
                  <div key={c.nome} className="flex items-baseline justify-between">
                    <span className={`text-xs uppercase tracking-wider ${i === 1 ? 'text-emerald-300' : 'text-white/40'}`}>
                      {c.label}
                      {i === 1 && <span className="ml-1.5 text-[10px] text-emerald-300/80">★</span>}
                    </span>
                    <span className={`font-bold tabular-nums ${i === 1 ? 'text-emerald-300 text-lg' : 'text-white/70 text-sm'}`}>
                      +{c.clientesMensal} clientes/mês
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-white/40 mt-3 leading-relaxed">
                Considerando um aumento de ~30% no volume com canais otimizados e captação estruturada.
              </p>
            </div>
          </div>

          <p className="texto-card text-white/40 mt-4 italic">
 ⚠️ Referência baseada em benchmarks de mercado para empresas com nível de maturidade similar ao seu. Não é promessa. Resultados dependem da execução.
          </p>
        </motion.div>

        {/* PESQUISAS DE RISCO */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-6 backdrop-blur">
          <h2 className="titulo-secao text-white mb-3">Os pontos que estão custando clientes hoje</h2>
          <p className="texto-card text-white/60 mb-5">Com base nas suas respostas e em dados de mercado, identificamos o que mais impacta sua conversão.</p>
          {sinais.length === 0 ? (
            <div className="bg-emerald-400/5 border border-emerald-400/20 rounded-xl p-5 text-center">
              <p className="texto-card font-semibold text-emerald-300 mb-1">🎉 Parabéns!</p>
              <p className="texto-card text-white/70">Nenhuma das 8 pesquisas de risco se aplica ao seu cenário. Sua estrutura digital está bem encaminhada.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sinais.map((s, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                  <p className="texto-card font-semibold text-white mb-2">
                    <span className="text-[#8539FF] mr-2">#{i + 1}</span>
                    {s.titulo}
                  </p>
                  <p className="texto-card text-white/70 leading-relaxed mb-2">{s.descricao}</p>
                  <p className="texto-card text-white/40">Fonte: {s.fonte}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* PLANO DE AÇÃO */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-6 backdrop-blur">
          <h2 className="titulo-secao text-white mb-3">O que você precisa estruturar</h2>
          <p className="texto-card text-white/60 mb-5">Com um mercado cada vez mais competitivo, não basta ter um site simples ou automações básicas. É necessário estratégia correta para o seu segmento.</p>

          {/* ESSENCIAIS */}
          <div className="mb-6">
            <p className="texto-card font-semibold text-emerald-300 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-400 text-xs font-bold">E</span>
              Essenciais
            </p>
            <div className="space-y-2">
              {[
                { num: '01', texto: 'Definir posicionamento estratégico: quem você é, para quem fala e qual mensagem carrega', obs: 'Isso guia todo o resto. Requer análise profunda do negócio' },
                { num: '02', texto: 'Identificar público-alvo exato e criar perfil do cliente ideal', obs: 'Sem isso, qualquer site é chute. E ninguém quer pagar por um site que não funciona' },
                { num: '03', texto: 'Estruturar presença digital profissional (Instagram, Google Meu Negócio)', obs: 'Cada canal precisa ter um propósito. Não é só ter, é saber usar' },
                { num: '04', texto: 'Ter um site estratégico que trabalha pra você', obs: 'Não é qualquer site. É um que converte. Feito com copy que vende, não só apresenta' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex-shrink-0 w-7 flex items-center justify-center">
                    <div className="w-5 h-5 rounded border-2 border-emerald-400/50 flex items-center justify-center">
                      <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="texto-card text-white/90">{item.texto}</p>
                    <p className="texto-card text-white/40 text-xs mt-1 italic">{item.obs}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AVANÇADAS */}
          <div className="mb-6">
            <p className="texto-card font-semibold text-[#915EFF] mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#915EFF]/20 flex items-center justify-center text-[#915EFF] text-xs font-bold">A</span>
              Avançadas
            </p>
            <div className="space-y-2">
              {[
                { num: '05', texto: 'Ter fluxo de atendimento que responde em menos de 2 minutos', obs: 'Cada minuto conta. Quem responde primeiro, fecha primeiro' },
                { num: '06', texto: 'Ter automações que trabalham 24/7', obs: 'Pra você não precisar estar online o tempo todo. Mas precisa ser bem configurado' },
                { num: '07', texto: 'Ter marca visual e tom de voz consistentes em todos os canais', obs: 'Consistência constrói confiança. Confiança fecha negócios' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex-shrink-0 w-7 flex items-center justify-center">
                    <div className="w-5 h-5 rounded border-2 border-[#915EFF]/50 flex items-center justify-center">
                      <svg className="w-3 h-3 text-[#915EFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="texto-card text-white/90">{item.texto}</p>
                    <p className="texto-card text-white/40 text-xs mt-1 italic">{item.obs}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IMPACTO */}
          <div>
            <p className="texto-card font-semibold text-purple-300 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-purple-400/20 flex items-center justify-center text-purple-300 text-xs font-bold">I</span>
              Impacto
            </p>
            <div className="space-y-2">
              {[
                { num: '08', texto: 'Ter uma estratégia de marketing de conversão que funciona pro seu nicho', obs: 'Não é sobre postar todo dia. É sobre atrair quem realmente quer contratar você' },
                { num: '09', texto: 'Ter prova social e autoridade que te diferencia do concorrente', obs: 'Depoimentos, cases e reconhecimento. O que faz você ser lembrado quando alguém precisa' },
                { num: '10', texto: 'Ter conteúdo que qualifica o lead antes do primeiro contato', obs: 'Cliente que chega pré-qualificado fecha mais rápido. Mas isso exige estratégia, não só produção' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex-shrink-0 w-7 flex items-center justify-center">
                    <div className="w-5 h-5 rounded border-2 border-purple-400/50 flex items-center justify-center">
                      <svg className="w-3 h-3 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="texto-card text-white/90">{item.texto}</p>
                    <p className="texto-card text-white/40 text-xs mt-1 italic">{item.obs}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-[#5907DB]/10 to-[#8539FF]/10 border border-[#8539FF]/20">
            <p className="texto-card text-white/80">
              Cada um desses pontos precisa ser feito<strong className="text-white">da forma correta</strong> para o seu segmento. Isso exige conhecimento técnico, experiência no seu nicho e tempo de execução. É isso que fazemos: posicionamento, sites e automações que realmente convertem.
</p>
          </div>
        </motion.div>

        {/* PACOTE RECOMENDADO */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-gradient-to-br from-[#5907DB]/20 via-[#8539FF]/15 to-[#677BFF]/20 border border-[#8539FF]/40 rounded-2xl p-6 mb-6 backdrop-blur shadow-[0_0_40px_rgba(133,57,255,0.3)]">
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 texto-card font-medium mb-4">
              ✓ Recomendado pra você
            </span>
            <h2 className="titulo-hero text-white mb-2">{pacote.nome}</h2>
            <p className="texto-card text-white/70">{pacote.desc}</p>
          </div>

          <ul className="space-y-3 mb-6">
            {pacote.features.map((f, i) => (
              <li key={i} className="flex items-start gap-3 texto-card text-white/90">
                <svg className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* Preço após a lista */}
          <div className="text-center pt-4 border-t border-white/10 mb-4">
            <p className="texto-card text-white/50 mb-2">Valor de investimento</p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-4xl font-bold text-white/30">R$</span>
              <span className="text-4xl font-bold text-white/20 blur-md select-none">1.497</span>
            </div>
            <p className="texto-card text-white/60 mt-2">Valor sob consulta</p>
            <p className="texto-card text-white/50">Entre em contato e fale com nossos especialistas</p>
          </div>

          <div className="space-y-3">
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="texto-card block w-full text-center py-4 rounded-xl font-bold bg-gradient-to-r from-[#5907DB] via-[#8539FF] to-[#677BFF] text-white shadow-[0_0_30px_rgba(133,57,255,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-transform"
            >
              ENTRAR EM CONTATO →
            </a>
            <a
              href="#"
              className="texto-card block w-full text-center py-3 rounded-xl font-medium border border-white/10 text-white/50 hover:text-white/70 hover:border-white/20 transition-colors"
            >
              Saiba mais sobre nossos serviços
            </a>
          </div>
        </motion.div>

        <motion.button
          onClick={onEdit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full text-center text-sm text-white/50 hover:text-white/80 transition-colors"
        >
          ← Editar meus dados
        </motion.button>
      </div>
    </motion.div>
  )
}

// ======================== COMPONENTE PRINCIPAL ========================
const DiagnosticoForm = () => {
  const [screen, setScreen] = useState('hero')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [userData, setUserData] = useState(null)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])

  const navigate = (newScreen, newIndex = questionIndex) => {
    setHistory([...history, { screen, questionIndex }])
    setScreen(newScreen)
    setQuestionIndex(newIndex)
  }

  const goBack = () => {
    if (history.length === 0) {
      setScreen('hero')
      return
    }
    const prev = history[history.length - 1]
    setHistory(history.slice(0, -1))
    setScreen(prev.screen)
    setQuestionIndex(prev.questionIndex)
    trackEvent('back_button_clicked', { from: screen, to: prev.screen })
  }

  const editData = () => {
    setScreen('capture')
    setHistory([{ screen: 'result', questionIndex: 0 }])
    trackEvent('edit_data_clicked', { from: screen })
  }

  const handleStart = () => {
    trackEvent('hero_cta_clicked')
    navigate('question', 0)
  }

  const handleAnswerChange = (value) => {
    const currentQ = QUESTIONS[questionIndex]
    setAnswers({ ...answers, [currentQ.id]: value })
  }

  const handleNextQuestion = () => {
    trackEvent('question_answered', { question: QUESTIONS[questionIndex].id })
    if (questionIndex < QUESTIONS.length - 1) {
      navigate('question', questionIndex + 1)
    } else {
      trackEvent('questions_completed')
      navigate('capture')
    }
  }

  const handleCaptureSubmit = (data) => {
    setUserData(data)
    navigate('loading')
    setTimeout(() => {
      const score = calculateScore(answers)
      const impacto = calculateImpact(answers)
      const potencial = calcularPotencial(answers)
      const sinais = chooseSignals(answers)
      const plano = generatePlano(answers, sinais)
      const pacote = recommendPackage(answers)
      setResult({ ...data, score, impacto, potencial, sinais, plano, pacote })
      trackEvent('result_generated', { score, pacote: pacote.nome })
      setScreen('result')
      setHistory([])
    }, 3500)
  }

  return (
    <div className="min-h-screen text-white bg-mesh">
      <AnimatePresence mode="wait">
        {screen === 'hero' && (
          <div key="hero">
            <Hero onStart={handleStart} />
          </div>
        )}

        {screen === 'question' && (() => {
          // Filtra perguntas condicionais baseado nas respostas até agora
          const activeQuestions = QUESTIONS.filter((q) => !q.conditional || q.conditional(answers))
          const activeIndex = Math.min(questionIndex, activeQuestions.length - 1)
          const currentQ = activeQuestions[activeIndex]
          if (!currentQ) return null
          return (
            <div key="question-wrapper" className="min-h-screen flex flex-col items-center justify-center py-6 sm:py-8 relative">
              <ScoreQuestion
                question={currentQ}
                step={activeIndex + 1}
                total={activeQuestions.length}
                value={answers[currentQ.id]}
                onChange={(v) => {
                  setAnswers({ ...answers, [currentQ.id]: v })
                }}
                onNext={() => {
                  trackEvent('question_answered', { question: currentQ.id })
                  if (activeIndex < activeQuestions.length - 1) {
                    setQuestionIndex(activeIndex + 1)
                  } else {
                    trackEvent('questions_completed')
                    navigate('capture')
                  }
                }}
                onBack={activeIndex > 0 ? () => setQuestionIndex(activeIndex - 1) : goBack}
                canGoBack={true}
              />
            </div>
          )
        })()}

        {screen === 'capture' && (
          <div key="capture">
            <Capture onSubmit={handleCaptureSubmit} onBack={goBack} initialData={userData} />
          </div>
        )}

        {screen === 'loading' && (
          <div key="loading">
            <Loading />
          </div>
        )}

        {screen === 'result' && result && (
          <div key="result">
            <Result payload={result} onEdit={editData} />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DiagnosticoForm
