import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  QUESTIONS,
  calculateScore,
  calculateImpact,
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
          <span className="text-xs text-white/60 font-medium tracking-wide uppercase">
            Diagnóstico One Impact
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
        >
          A maioria dos advogados
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #5907DB 0%, #8539FF 50%, #677BFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            bons é invisível
          </span>
          <br />
          no digital.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed mb-8 max-w-2xl mx-auto px-2"
        >
          Você tem experiência, clientes satisfeitos e bons resultados.
          Mas quando alguém pesquisa seu nome, o que aparece?
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-left max-w-xl mx-auto mb-10 bg-white/[0.02] border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur"
        >
          <p className="text-sm text-white/50 mb-4 font-medium">Em 90 segundos, descubra:</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#8539FF] text-xl leading-none mt-0.5">•</span>
              <span className="text-white/90 text-base">
                O <strong className="text-white">número exato</strong> que sua estrutura digital deixa na mesa todo mês
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8539FF] text-xl leading-none mt-0.5">•</span>
              <span className="text-white/90 text-sm sm:text-base">
                <strong className="text-white">3 sinais de risco</strong> específicos pro seu caso
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#8539FF] text-xl leading-none mt-0.5">•</span>
              <span className="text-white/90 text-sm sm:text-base">
                O <strong className="text-white">plano</strong> que escritórios do seu porte estão usando
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
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            100% gratuito
          </span>
          <span className="text-white/30">·</span>
          <span className="flex items-center gap-1.5">
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
          className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-[#5907DB] via-[#8539FF] to-[#677BFF] text-white shadow-[0_0_40px_rgba(133,57,255,0.5)] hover:scale-[1.03] active:scale-[0.98] transition-transform"
        >
          QUERO MEU DIAGNÓSTICO
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-xs text-white/40 max-w-md mx-auto leading-relaxed"
        >
          Baseado em dados reais de OAB, Martindale-Avvo e 500+ escritórios analisados.
        </motion.p>
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
          className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 leading-tight"
        >
          {question.label}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-white/60 text-sm md:text-base leading-relaxed mb-6 sm:mb-8"
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
                <span className={`text-sm md:text-base ${isSelected(opt.value) ? 'text-white font-semibold' : 'text-white/80'}`}>
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
            className={`w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold text-base transition-all ${
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
    const newErrors = {}
    if (!validateNome(nome)) newErrors.nome = 'Coloque nome e sobrenome'
    if (!validateWhatsApp(whatsapp)) newErrors.whatsapp = 'WhatsApp inválido (com DDD)'
    if (!validateEmail(email)) newErrors.email = 'E-mail inválido'
    if (!pessoalConfirm) newErrors.pessoal = 'Confirme que é seu número pessoal'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      trackEvent('capture_validation_error', { errors: Object.keys(errors) })
      return
    }
    setSubmitting(true)
    trackEvent('capture_submitted', { hasPessoal: pessoalConfirm })
    const cleanedWhatsapp = whatsapp.replace(/\D/g, '')
    await submitToRenvChat({
      nome: nome.trim(),
      whatsapp: cleanedWhatsapp,
      email: email.trim(),
      pessoalConfirm,
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
            <span className="text-xs text-emerald-300 font-medium">Seu diagnóstico tá pronto!</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Faltam só alguns dados</h1>
          <p className="text-white/60 text-base">Pra eu personalizar o relatório final, preciso de 3 informações rápidas.</p>
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
              <strong className="text-amber-200">⚠️ Importante:</strong> coloque seu WhatsApp{' '}
              <strong className="text-amber-200">PESSOAL</strong> (não o do escritório). Você vai
              receber informações estratégicas e confidenciais. É fundamental que chegue direto
              pra você, não pra recepção.
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
              placeholder="Dr(a). Nome Sobrenome"
              className={`w-full px-4 py-3 rounded-xl bg-black/30 border ${
                errors.nome ? 'border-red-400/60' : 'border-white/10'
              } text-white placeholder-white/30 focus:outline-none focus:border-[#8539FF] focus:ring-2 focus:ring-[#8539FF]/20 transition`}
            />
            {errors.nome && <p className="mt-1.5 text-xs text-red-300">{errors.nome}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              WhatsApp pessoal <span className="text-[#8539FF]">*</span>
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
              <span className="text-sm text-white/70">É meu número pessoal</span>
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
            <p className="text-xs text-white/50 mb-2 font-medium">Por que pedimos o pessoal:</p>
            <ul className="space-y-1.5 text-xs text-white/60">
              <li className="flex items-start gap-2"><span className="text-[#8539FF]">•</span><span>Estratégias avançadas que não podem cair em mãos erradas</span></li>
              <li className="flex items-start gap-2"><span className="text-[#8539FF]">•</span><span>Análises confidenciais do seu escritório</span></li>
              <li className="flex items-start gap-2"><span className="text-[#8539FF]">•</span><span>Conteúdo exclusivo pra decisores</span></li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-xl font-bold text-base bg-gradient-to-r from-[#5907DB] via-[#8539FF] to-[#677BFF] text-white shadow-[0_0_30px_rgba(133,57,255,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
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
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
          Gerando seu diagnóstico
        </motion.h2>
        <motion.p key={step} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-white/60 text-base">
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
  const { score, impacto, sinais, plano, pacote, nome } = payload
  const faixa = getScoreFaixa(score)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen w-full px-4 sm:px-6 py-10 sm:py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5907DB] rounded-full filter blur-[150px] opacity-15" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#677BFF] rounded-full filter blur-[150px] opacity-15" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-xs text-emerald-300 font-medium">Diagnóstico gerado com sucesso</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {nome.split(' ')[0]}, seu diagnóstico
          </h1>
          <p className="text-white/60">Aqui está o retrato real do seu digital — sem maquiagem.</p>
        </motion.div>

        {/* SCORE */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-6 backdrop-blur text-center">
          <p className="text-sm text-white/60 mb-2">Seu score digital</p>
          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className="text-6xl md:text-7xl font-extrabold text-white">{score}</span>
            <span className="text-2xl text-white/40">/100</span>
          </div>
          <p className={`text-lg font-semibold ${faixa.cor}`}>{faixa.emoji} {faixa.label}</p>
        </motion.div>

        {/* IMPACTO FINANCEIRO */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-6 backdrop-blur">
          <h2 className="text-lg font-bold text-white mb-1">💸 Impacto financeiro estimado</h2>
          <p className="text-sm text-white/60 mb-4">Calculado com base no seu volume, ticket e tempo de resposta.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Por mês</p>
              <p className="text-2xl md:text-3xl font-bold text-white">{fmt(impacto.mensal)}</p>
            </div>
            <div className="bg-gradient-to-br from-[#5907DB]/20 to-[#8539FF]/20 border border-[#8539FF]/30 rounded-xl p-4">
              <p className="text-xs text-[#8539FF] uppercase tracking-wider mb-1">Por ano</p>
              <p className="text-2xl md:text-3xl font-bold text-white">{fmt(impacto.anual)}</p>
            </div>
          </div>
        </motion.div>

        {/* SINAIS DE RISCO */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-6 backdrop-blur">
          <h2 className="text-lg font-bold text-white mb-1">⚠️ 3 sinais de risco críticos</h2>
          <p className="text-sm text-white/60 mb-5">Cruzamos suas respostas com nossa base. Esses são os pontos que mais te custam.</p>
          <div className="space-y-4">
            {sinais.map((s, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/10 rounded-xl p-4">
                <p className="text-base font-semibold text-white mb-2">
                  <span className="text-[#8539FF] mr-2">#{i + 1}</span>
                  {s.title}
                </p>
                <p className="text-sm text-white/70 leading-relaxed mb-2">{s.desc}</p>
                <p className="text-xs text-white/40">Fonte: {s.source}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* PLANO DE AÇÃO */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 mb-6 backdrop-blur">
          <h2 className="text-lg font-bold text-white mb-1">📋 Plano de ação personalizado</h2>
          <p className="text-sm text-white/60 mb-5">Por onde começar, em qual prazo, e o que esperar.</p>

          <div className="mb-5">
            <p className="text-sm font-semibold text-emerald-300 mb-2">Curto prazo (0–30 dias)</p>
            <ul className="space-y-1.5">
              {plano.curto.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-5">
            <p className="text-sm font-semibold text-blue-300 mb-2">Médio prazo (30–90 dias)</p>
            <ul className="space-y-1.5">
              {plano.medio.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="text-blue-400 mt-0.5">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-purple-300 mb-2">Longo prazo (90+ dias)</p>
            <ul className="space-y-1.5">
              {plano.longo.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="text-purple-400 mt-0.5">★</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* PACOTE RECOMENDADO */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-gradient-to-br from-[#5907DB]/20 via-[#8539FF]/15 to-[#677BFF]/20 border border-[#8539FF]/40 rounded-2xl p-6 mb-6 backdrop-blur shadow-[0_0_40px_rgba(133,57,255,0.3)]">
          <p className="text-xs uppercase tracking-widest text-[#8539FF] font-bold mb-2">Pacote recomendado</p>
          <h2 className="text-2xl font-extrabold text-white mb-1">{pacote.nome}</h2>
          <p className="text-3xl font-bold text-white mb-3">{pacote.preco}</p>
          <p className="text-sm text-white/70 mb-5">{pacote.desc}</p>
          <ul className="space-y-2 mb-6">
            {pacote.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/90">
                <span className="text-emerald-400 mt-0.5">✓</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-4 rounded-xl font-bold text-base bg-gradient-to-r from-[#5907DB] via-[#8539FF] to-[#677BFF] text-white shadow-[0_0_30px_rgba(133,57,255,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-transform"
          >
            FALAR COM UM ESPECIALISTA →
          </a>
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
    if (history.length === 0) return
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
      const sinais = chooseSignals(answers)
      const plano = generatePlano(answers, sinais)
      const pacote = recommendPackage(answers)
      setResult({ ...data, score, impacto, sinais, plano, pacote })
      trackEvent('result_generated', { score, pacote: pacote.nome })
      setScreen('result')
      setHistory([])
    }, 3500)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <AnimatePresence mode="wait">
        {screen === 'hero' && (
          <div key="hero" className="bg-[#0a0a0f]">
            <Hero onStart={handleStart} />
          </div>
        )}

        {screen === 'question' && (
          <div key="question-wrapper" className="min-h-screen flex flex-col items-center justify-center py-6 sm:py-8 relative bg-[#0a0a0f]">
            <ScoreQuestion
              question={QUESTIONS[questionIndex]}
              step={questionIndex + 1}
              total={QUESTIONS.length}
              value={answers[QUESTIONS[questionIndex].id]}
              onChange={handleAnswerChange}
              onNext={handleNextQuestion}
              onBack={questionIndex > 0 ? goBack : null}
              canGoBack={questionIndex > 0}
            />
          </div>
        )}

        {screen === 'capture' && (
          <div key="capture" className="bg-[#0a0a0f]">
            <Capture onSubmit={handleCaptureSubmit} onBack={goBack} initialData={userData} />
          </div>
        )}

        {screen === 'loading' && (
          <div key="loading" className="bg-[#0a0a0f]">
            <Loading />
          </div>
        )}

        {screen === 'result' && result && (
          <div key="result" className="bg-[#0a0a0f]">
            <Result payload={result} onEdit={editData} />
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DiagnosticoForm
