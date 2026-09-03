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
  calculateDashboard,
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
const Capture = ({ onSubmit, onBack, initialData, answers }) => {
  const [nome, setNome] = useState(initialData?.nome || '')
  const [whatsapp, setWhatsapp] = useState(initialData?.whatsapp ? formatWhatsApp(initialData.whatsapp) : '')
  const [email, setEmail] = useState(initialData?.email || '')
  const [pessoalConfirm, setPessoalConfirm] = useState(initialData?.whatsapp ? true : false)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!nome.trim()) newErrors.nome = 'Nome é obrigatório'
    const digits = whatsapp.replace(/\D/g, '')
    if (!digits || digits.length < 10) newErrors.whatsapp = 'WhatsApp inválido'
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) newErrors.email = 'E-mail inválido'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    trackEvent('capture_submitted', { hasPessoal: pessoalConfirm })
    const cleanedWhatsapp = whatsapp.replace(/\D/g, '')
    await submitToRenvChat({
      nome: nome.trim(),
      whatsapp: cleanedWhatsapp,
      email: email.trim(),
      pessoalConfirm,
      answers: answers || {},
    })
    setSubmitting(false)
    onSubmit({ nome: nome.trim(), whatsapp: cleanedWhatsapp, email: email.trim() })
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
            <span className="texto-card text-emerald-300">Análise pronta</span>
          </div>
          <h1 className="titulo-hero text-white mb-3">Seus resultados estão te esperando</h1>
          <p className="texto-card text-white/60">Preencha abaixo para ver o diagnóstico completo do seu negócio e receber o plano de ação.</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 backdrop-blur space-y-4 sm:space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Como você se chama? <span className="text-[#8539FF]">*</span>
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu primeiro nome"
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
            <p className="mt-2 text-xs text-white/40">Use um número que você acessa com frequência — o diagnóstico será enviado por aqui.</p>
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
    'Cruzando com dados de mercado...',
    'Calculando impacto financeiro...',
    'Identificando pontos de melhoria...',
    'Montando seu diagnóstico personalizado...',
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
const fmt = (v) => (v ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })

const ScoreGaugeResult = ({ score, scoreLabel, scoreColor }) => {
  const r = 115
  const circumference = Math.PI * r
  const offset = circumference - (score / 100) * circumference
  return (
    <div>
      <p className="texto-card text-white/60 mb-4">Score de presença digital</p>
      <div className="relative">
        <svg viewBox="0 0 280 155" className="w-full max-w-[260px] mx-auto">
          <path d="M 25 140 A 115 115 0 0 1 255 140" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="26" strokeLinecap="round" />
          <path d="M 25 140 A 115 115 0 0 1 255 140" fill="none" stroke={scoreColor} strokeWidth="26" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.2s ease-out', filter: `drop-shadow(0 0 10px ${scoreColor}90)` }} />
        </svg>
        <div className="absolute inset-x-0 text-center" style={{ top: '48%', transform: 'translateY(-8%)' }}>
          <div className="text-5xl font-extrabold text-white tabular-nums">{score}</div>
          <div className="text-base font-extrabold mt-1" style={{ color: scoreColor }}>{scoreLabel}</div>
        </div>
      </div>
    </div>
  )
}

const GoalRingResult = ({ goal }) => {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference - (Math.min(goal.value, 100) / 100) * circumference
  return (
    <div className="bg-gradient-to-br from-[#5907DB]/30 to-[#8539FF]/15 border border-[#8539FF]/50 shadow-[0_0_24px_rgba(133,57,255,0.18)] rounded-2xl p-5 text-center">
      <p className="texto-card font-bold text-white mb-4 min-h-[40px]">{goal.label}</p>
      <div className="relative mx-auto w-[116px] h-[116px]">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 116 116">
          <circle cx="58" cy="58" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
          <circle cx="58" cy="58" r={radius} fill="none" stroke="#8539FF" strokeWidth="10" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={dashOffset} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-white">{goal.value}%</span>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-left">
        <div className="rounded-xl bg-white/[0.04] px-3 py-2">
          <p className="text-[11px] text-white/40">Pontuação</p>
          <p className="texto-card font-bold text-white mt-0.5">{goal.value} pts</p>
        </div>
        <div className="rounded-xl bg-white/[0.04] px-3 py-2">
          <p className="text-[11px] text-white/40">Faltam</p>
          <p className="texto-card font-bold text-white mt-0.5">{Math.max(0, goal.target - goal.value)} pts</p>
        </div>
      </div>
      <div className="mt-3 rounded-xl border border-white/10 px-3 py-2 text-left">
        <p className="text-xs text-white/50 leading-relaxed">{goal.reading}</p>
      </div>
    </div>
  )
}

// placeholder — replaced by ScoreGaugeResult above
const ScoreGauge = ({ score }) => {
  const radius = 80
  const stroke = 14
  const circumference = Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative w-full max-w-[280px] mx-auto">
      <svg viewBox="0 0 200 120" className="w-full">
        {/* Trilha de fundo */}
        <path
          d="M 20 110 A 80 80 0 0 1 180 110"
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* Arco do score */}
        <path
          d="M 20 110 A 80 80 0 0 1 180 110"
          fill="none"
          stroke="#1F2937"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
        {/* Marcadores 0/50/100 */}
        <text x="10" y="125" fontSize="10" fill="#6B7280" fontWeight="500">0</text>
        <text x="96" y="42" fontSize="10" fill="#6B7280" fontWeight="500" textAnchor="middle">50</text>
        <text x="190" y="125" fontSize="10" fill="#6B7280" fontWeight="500" textAnchor="end">100</text>
      </svg>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/4 text-center mt-2">
        <p className="text-5xl font-extrabold text-gray-900 tabular-nums leading-none">{score}</p>
        <p className="text-xs text-gray-500 mt-1 font-medium">/ 100</p>
      </div>
    </div>
  )
}

const Result = ({ payload, onEdit }) => {
  const { score, sinais, nome, dashboard } = payload
  const faixa = getScoreFaixa(score)
  const waLink = 'https://link.oneimpact.com.br/contato-agencia-one-impact'
  const [showToast, setShowToast] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShowToast(false), 4000)
    return () => clearTimeout(t)
  }, [])

  const financialCards = [
    { label: 'Perda estimada por mês', value: fmt(dashboard.monthlyLoss), desc: 'Receita que sai por falhas de presença e atendimento.' },
    { label: 'Perda projetada em 12 meses', value: fmt(dashboard.yearlyLoss), desc: 'Impacto acumulado enquanto o problema continua invisível.' },
    { label: 'Custo por dia sem agir', value: fmt(dashboard.costPerDay), desc: 'O que você perde a cada dia que o problema continua sem solução.' },
    { label: 'Clientes para o concorrente/mês', value: `${dashboard.missedLeads} clientes`, desc: 'Pessoas que chegaram até você mas acabaram escolhendo outra empresa.' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
      className="min-h-screen w-full relative overflow-hidden bg-mesh"
    >
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#5907DB] rounded-full filter blur-[160px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-[#5907DB] rounded-full filter blur-[180px] opacity-[0.28] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 pb-20 sm:pb-0">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="titulo-hero text-white mb-2">{nome.split(' ')[0]}, aqui está seu diagnóstico</h1>
          <p className="texto-card text-white/60">O retrato real da sua presença digital — e quanto ela está custando.</p>
        </div>

        {/* Score + métricas financeiras */}
        <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 sm:p-6 mb-6">
          <div className="mb-6 grid gap-4 lg:grid-cols-2 lg:items-stretch">
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5">
              <h2 className="text-[22px] sm:text-[28px] font-bold leading-tight text-white" style={{ fontFamily: "'Zalando Sans Expanded', sans-serif" }}>Visão geral</h2>
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
              <p className="texto-card text-white/70 leading-relaxed">
                Estes são os sinais financeiros mais importantes do seu diagnóstico — quanto está saindo por mês e o que está puxando esse número.
              </p>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-[0.85fr_1.25fr]">
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 flex flex-col items-center">
              <ScoreGaugeResult score={score} scoreLabel={faixa.label} scoreColor={faixa.color} />
              <p className="text-xs text-white/40 text-center mt-4 leading-relaxed max-w-[220px]">
                O score mostra o quanto sua estrutura digital está preparada para converter interesse em clientes.
              </p>
            </div>
            <div>
              <p className="texto-card text-white/60 font-medium mb-3" style={{ fontSize: '15px' }}>Métricas financeiras</p>
              <div className="grid grid-cols-2 gap-3">
                {financialCards.map((c, i) => (
                  <div key={c.label} className={`rounded-2xl p-4 border ${i < 2 ? 'bg-gradient-to-br from-[#5907DB]/30 to-[#8539FF]/15 border-[#8539FF]/50 shadow-[0_0_24px_rgba(133,57,255,0.18)]' : 'bg-white/[0.02] border-white/10'}`}>
                    <p className={`text-[11px] font-medium mb-2 leading-tight ${i < 2 ? 'text-white/60' : 'text-white/40'}`}>{c.label}</p>
                    <p className="text-xl font-extrabold text-white tabular-nums">{c.value}</p>
                    <p className="text-[10px] text-white/30 mt-2 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* O que precisa melhorar */}
        <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 sm:p-6 mb-6">
          <div className="mb-6 grid gap-4 lg:grid-cols-2 lg:items-stretch">
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5">
              <h2 className="text-[22px] sm:text-[28px] font-bold leading-tight text-white" style={{ fontFamily: "'Zalando Sans Expanded', sans-serif" }}>O que precisa melhorar para seu score subir</h2>
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
              <p className="texto-card text-white/70 leading-relaxed">
                Estes são os pontos que mais puxam seu resultado para baixo hoje. Melhorar essas áreas aumenta seu score e reduz a perda de oportunidades.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {dashboard.goalMetrics.map(g => <GoalRingResult key={g.label} goal={g} />)}
          </div>
          <div className="mt-5 bg-white/[0.04] border border-white/20 rounded-2xl p-4 flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#8539FF]/20 border border-[#8539FF]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <p className="texto-card font-bold text-white mb-1" style={{ fontSize: '15px' }}>Resumo inteligente</p>
              <p className="texto-card text-white/60 leading-relaxed">
                Para subir o score, o caminho passa por três pontos: ampliar os canais por onde novos clientes te encontram, reduzir o tempo entre o interesse e o primeiro atendimento, e fortalecer a presença digital que transmite confiança antes do cliente entrar em contato.
              </p>
            </div>
          </div>
        </section>

        {/* Pesquisas que explicam o risco */}
        <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 sm:p-6 mb-6">
          <div className="mb-6 grid gap-4 lg:grid-cols-2 lg:items-stretch">
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5">
              <h2 className="text-[22px] sm:text-[28px] font-bold leading-tight text-white" style={{ fontFamily: "'Zalando Sans Expanded', sans-serif" }}>Pesquisas que explicam o risco</h2>
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
              <p className="texto-card text-white/70 leading-relaxed">
                Estes dados mostram por que uma presença digital confusa pode custar oportunidades mesmo quando existe interesse real.
              </p>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="space-y-3">
              {[
                { title: 'O cliente pesquisa antes de chamar', text: '96% dos prospectos fazem sua própria pesquisa antes de falar com um vendedor. Se sua presença digital não transmite clareza, parte da venda morre antes da conversa.', source: 'HubSpot State of Sales Report, 2025' },
                { title: 'Uma experiência ruim pode custar o lead', text: 'Mais da metade dos consumidores troca de fornecedor após apenas uma experiência ruim. Atendimento lento, confuso ou sem direção aumenta esse risco.', source: 'Zendesk CX Trends Report, 2026' },
                { title: 'O concorrente mais organizado ganha vantagem', text: '79% dos consumidores trocariam para outra empresa se descobrissem que ela oferece melhor experiência. Às vezes o concorrente só parece mais fácil de entender e chamar.', source: 'Zendesk CX Trends Report, 2026' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 bg-white/[0.02] border border-white/10 rounded-xl p-4">
                  <span className="mt-1 w-1 min-h-[54px] shrink-0 rounded-full bg-[#8539FF]/60" />
                  <div>
                    <p className="texto-card font-bold text-white mb-2">{item.title}</p>
                    <p className="texto-card text-white/60 leading-relaxed">{item.text}</p>
                    <p className="text-[10px] text-white/30 mt-3 uppercase tracking-wider">Fonte: {item.source}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              {[
                { title: 'Confiança começa na experiência digital', text: '87% dos consumidores confiam mais em uma empresa que oferece excelente experiência. A forma como a pessoa encontra, entende e conversa com você pesa na decisão.', source: 'Zendesk CX Trends Report, 2026' },
                { title: 'O digital precisa combinar com o atendimento real', text: '62% dos clientes acreditam que experiências devem fluir naturalmente entre espaços físicos e digitais. Se seu atendimento é bom, sua presença digital precisa refletir isso.', source: 'Zendesk CX Trends Report, 2026' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 bg-white/[0.02] border border-white/10 rounded-xl p-4">
                  <span className="mt-1 w-1 min-h-[54px] shrink-0 rounded-full bg-[#8539FF]/60" />
                  <div>
                    <p className="texto-card font-bold text-white mb-2">{item.title}</p>
                    <p className="texto-card text-white/60 leading-relaxed">{item.text}</p>
                    <p className="text-[10px] text-white/30 mt-3 uppercase tracking-wider">Fonte: {item.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plano de ação (borrado) + CTA */}
        <section className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 sm:p-8 mb-6">
          <div className="mb-6 grid gap-4 lg:grid-cols-2 lg:items-stretch">
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5">
              <h2 className="text-[22px] sm:text-[28px] font-bold leading-tight text-white" style={{ fontFamily: "'Zalando Sans Expanded', sans-serif" }}>Plano de ação recomendado</h2>
            </div>
            <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
              <p className="texto-card text-white/70 leading-relaxed">
                Uma sequência de ações priorizadas para melhorar sua infraestrutura digital, fortalecer sua presença online e transformar mais interessados em oportunidades reais de venda.
              </p>
            </div>
          </div>
          <div className="relative min-h-[560px] sm:min-h-[470px] overflow-hidden rounded-xl lg:min-h-[520px]">
            <div className="grid min-h-[560px] sm:min-h-[470px] gap-3 blur-[5px] select-none pointer-events-none md:grid-cols-2 lg:min-h-[520px]">
              {[
                { title: 'Criar uma página central da oferta', text: 'Explicar serviço, público ideal, diferenciais, provas e botão direto para WhatsApp.' },
                { title: 'Organizar o primeiro atendimento', text: 'Criar mensagens rápidas para entender intenção, urgência e tipo de necessidade do lead.' },
                { title: 'Adicionar sinais de confiança', text: 'Usar depoimentos, antes/depois, números, fotos reais, especialidades e apresentação profissional.' },
                { title: 'Medir origem e perda de oportunidades', text: 'Acompanhar quantas pessoas chamam, respondem, somem e viram conversa real.' },
                { title: 'Reforçar a prova de autoridade', text: 'Selecionar depoimentos, resultados, fotos e evidências que aumentem segurança antes do contato.' },
                { title: 'Criar follow-up sem pressão', text: 'Montar uma sequência curta para reativar interessados que chamaram, mas ainda não decidiram.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 bg-white/[0.03] border border-white/10 rounded-xl p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-[13px] font-extrabold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="texto-card font-bold text-white leading-snug">{item.title}</p>
                    <p className="text-xs text-white/50 mt-1.5 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-start justify-center px-3 pt-8 text-center backdrop-blur-[2px] sm:px-4 md:items-center md:pt-0"
              style={{ background: 'rgba(18,17,26,0.55)' }}>
              <div className="relative z-10 w-full max-w-[520px] bg-gradient-to-br from-[#5907DB]/30 to-[#8539FF]/15 border border-[#8539FF]/50 shadow-[0_0_60px_rgba(133,57,255,0.50),0_0_120px_rgba(89,7,219,0.25)] rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 mb-4">
                  <svg className="w-3.5 h-3.5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50">Plano de ação bloqueado</span>
                </div>
                <p className="text-[26px] sm:text-[30px] font-bold leading-tight text-white mb-5"
                  style={{ fontFamily: "'Zalando Sans Expanded', sans-serif" }}>
                  Recupere os {fmt(dashboard.monthlyLoss)} que você está perdendo por mês
                </p>
                <ul className="mb-6 space-y-3">
                  {[
                    'Análise do seu diagnóstico em 15 min',
                    '3 ações prioritárias para o seu caso',
                    'Sem compromisso',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 texto-card text-white/70">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#8539FF]/30 text-[#A872FF]">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="texto-card inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5907DB] via-[#8539FF] to-[#677BFF] font-bold text-white shadow-[0_0_30px_rgba(133,57,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-transform"
                >
                  Quero recuperar esses clientes →
                </a>
              </div>
            </div>
          </div>
        </section>

        <button
          onClick={onEdit}
          className="w-full text-center texto-card text-white/30 hover:text-white/60 transition-colors mt-2"
        >
          ← Editar meus dados
        </button>

        <div className="mt-6 border-t border-white/[0.06] pt-4 pb-4 text-center">
          <p className="text-sm text-white/30">© {new Date().getFullYear()} One Impact. Todos os direitos reservados.</p>
        </div>
      </div>

      {/* Barra CTA fixada no mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden border-t border-white/10 backdrop-blur-xl px-4 py-3 flex items-center gap-3"
        style={{ background: 'rgba(10,10,15,0.65)' }}>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-white/40 leading-none mb-0.5">Plano de ação bloqueado</p>
          <p className="text-[13px] font-bold text-white leading-tight truncate">Recupere {fmt(dashboard.monthlyLoss)}/mês</p>
        </div>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#5907DB] to-[#8539FF] text-[13px] font-bold text-white shadow-[0_0_20px_rgba(133,57,255,0.4)]"
        >
          Quero meu plano →
        </a>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border border-emerald-400/20 bg-[#0d1a14]/90 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
            <div>
              <p className="text-[13px] font-bold text-white leading-tight">Diagnóstico gerado com sucesso</p>
              <p className="text-[11px] text-white/40 mt-0.5">Seus dados foram processados</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ======================== RESULT_OLD (unused) ========================
const _ResultOld = ({ payload, onEdit }) => {
  const { score, impacto, potencial, sinais, plano, pacote, nome } = payload
  const faixa = getScoreFaixa(score)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen w-full bg-white text-gray-900">

      {/* HEADER estilo pin: faixa roxa sólida */}
      <header className="w-full bg-[#4C1D95] text-white px-6 sm:px-10 py-5 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Relatório do Diagnóstico</h1>
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-semibold uppercase backdrop-blur-sm">
          {nome.charAt(0)}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* BLOCO 1 - Score + métricas operacionais */}
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Visão geral da maturidade digital</h2>
            <div className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-lg w-fit">
              <button className="px-3 py-1.5 text-xs font-semibold rounded-md bg-white shadow-sm text-gray-900">Mensal</button>
              <button className="px-3 py-1.5 text-xs font-medium rounded-md text-gray-500 hover:text-gray-700">Trimestral</button>
              <button className="px-3 py-1.5 text-xs font-medium rounded-md text-gray-500 hover:text-gray-700">Anual</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Card do Score (gauge) */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">Score de maturidade</h3>
                <button className="text-gray-400 hover:text-gray-600" aria-label="Mais informações">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" />
                    <path strokeLinecap="round" d="M12 16v-4M12 8h.01" />
                  </svg>
                </button>
              </div>
              <ScoreGauge score={score} />
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 mb-1">Nível atual</p>
                <p className="text-sm font-bold text-gray-900">{faixa.label}</p>
              </div>
            </div>

            {/* Métricas operacionais (4 mini cards) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <p className="text-xs text-gray-500 font-medium mb-1">Perda mensal</p>
                <p className="text-2xl font-extrabold text-gray-900 tabular-nums">{fmt(impacto.mensal)}</p>
                <p className="text-[10px] text-gray-500 mt-2">Estimativa de receita não captada</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <p className="text-xs text-gray-500 font-medium mb-1">Perda anual</p>
                <p className="text-2xl font-extrabold text-gray-900 tabular-nums">{fmt(impacto.anual)}</p>
                <p className="text-[10px] text-gray-500 mt-2">Impacto acumulado em 12 meses</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <p className="text-xs text-gray-500 font-medium mb-1">Sinais críticos</p>
                <p className="text-2xl font-extrabold text-gray-900 tabular-nums">{sinais.length}</p>
                <p className="text-[10px] text-gray-500 mt-2">Pontos de risco identificados</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
                <p className="text-xs text-gray-500 font-medium mb-1">Potencial de ganho</p>
                <p className="text-2xl font-extrabold text-gray-900 tabular-nums">+{potencial[1]?.clientesMensal || 0}</p>
                <p className="text-[10px] text-gray-500 mt-2">Clientes/mês no cenário médio</p>
              </div>
            </div>
          </div>
        </section>

        {/* BLOCO 2 - Cenários de ganho (3 colunas estilo "goals" do pin) */}
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Cenários com estrutura + automação</h2>
            <p className="text-xs text-gray-500">Meta em 90 dias · 3 cenários</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {potencial.map((c, i) => {
              const isMain = i === 1
              return (
                <div
                  key={c.nome}
                  className={`rounded-2xl p-6 border ${
                    isMain
                      ? 'bg-gray-900 border-gray-900 text-white'
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                >
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-3 ${isMain ? 'text-gray-300' : 'text-gray-500'}`}>
                    {c.label}
                  </p>
                  <p className={`text-3xl font-extrabold tabular-nums mb-1 ${isMain ? 'text-white' : 'text-gray-900'}`}>
                    +{c.clientesMensal}
                  </p>
                  <p className={`text-xs mb-4 ${isMain ? 'text-gray-400' : 'text-gray-500'}`}>clientes / mês</p>
                  <div className={`h-px mb-3 ${isMain ? 'bg-white/10' : 'bg-gray-200'}`} />
                  <p className={`text-sm font-semibold tabular-nums ${isMain ? 'text-white' : 'text-gray-900'}`}>
                    +{fmt(c.receitaMensal)} <span className={`text-xs font-normal ${isMain ? 'text-gray-400' : 'text-gray-500'}`}>/mês</span>
                  </p>
                  <p className={`text-[10px] mt-2 ${isMain ? 'text-gray-400' : 'text-gray-500'}`}>
                    Cenário {isMain ? 'recomendado' : i === 0 ? 'conservador' : 'otimista'}
                  </p>
                </div>
              )
            })}
          </div>
          <p className="text-xs text-gray-400 mt-4 italic">
            ⚠️ Referência baseada em benchmarks de mercado. Não é promessa. Resultados dependem da execução.
          </p>
        </section>

        {/* BLOCO 3 - Sinais de risco + Plano de ação */}
        <section className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-5">O que está custando resultado hoje</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Coluna esquerda - Sinais de risco */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-1">Sinais de risco identificados</h3>
              <p className="text-xs text-gray-500 mb-4">O que está impactando sua conversão agora.</p>
              {sinais.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
                  <p className="text-sm font-bold text-gray-900 mb-1">✓ Tudo certo por aqui</p>
                  <p className="text-xs text-gray-600">Nenhum sinal crítico no seu cenário.</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {sinais.slice(0, 4).map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 leading-snug">{s.titulo}</p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">{s.descricao}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Coluna direita - Plano de ação resumido */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-gray-900 mb-1">Plano de ação recomendado</h3>
              <p className="text-xs text-gray-500 mb-4">Os 3 primeiros passos prioritários.</p>
              <ol className="space-y-3">
                {[
                  { num: '01', titulo: 'Definir posicionamento estratégico', desc: 'Quem você é, para quem fala e qual mensagem carrega.' },
                  { num: '02', titulo: 'Estruturar presença digital', desc: 'Instagram, Google Meu Negócio e site estratégico.' },
                  { num: '03', titulo: 'Implementar atendimento rápido', desc: 'Resposta em menos de 2 minutos + automação 24/7.' },
                ].map((item) => (
                  <li key={item.num} className="flex items-start gap-3">
                    <span className="flex-shrink-0 text-xs font-bold text-gray-400 tabular-nums mt-0.5">{item.num}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 leading-snug">{item.titulo}</p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-gray-900 text-white rounded-2xl p-6 sm:p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Próximo passo</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-3">
            Receba o plano completo e personalizado
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mx-auto mb-6 leading-relaxed">
            Falamos com você em até 24h com a análise detalhada, as 10 ações priorizadas e o caminho prático dos próximos 90 dias.
          </p>
          <a
            href="https://link.oneimpact.com.br/contato-agencia-one-impact?text=Quero%20receber%20o%20plano%20completo%20do%20diagn%C3%B3stico"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-4 rounded-xl font-bold bg-white text-gray-900 hover:bg-gray-100 transition-colors"
          >
            FALAR COM UM CONSULTOR
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <p className="text-xs text-gray-400 mt-5">Resposta em até 24h · Sem compromisso · 100% personalizado</p>
        </section>

        {/* Link secundário */}
        <button
          onClick={onEdit}
          className="w-full text-center text-sm text-gray-500 hover:text-gray-900 transition-colors mt-6"
        >
          ← Editar meus dados
        </button>
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
      const dashboard = calculateDashboard(answers)
      setResult({ ...data, score, impacto, potencial, sinais, plano, pacote, dashboard })
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
            <Capture onSubmit={handleCaptureSubmit} onBack={goBack} initialData={userData} answers={answers} />
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
