import { useState, useEffect, useRef } from "react";
import WordReveal from "@/components/WordReveal";
import ShimmerButton from "@/components/ShimmerButton";

// ─── Paleta ───────────────────────────────────────────────────────────────────
const C = {
  bg:          "#0a0a0f",
  bgMid:       "#12121a",
  white:       "#f1f0ff",
  muted:       "#6b7280",
  accent:      "#7c3aed",
  accentLight: "#a78bfa",
  accentMuted: "rgba(124, 58, 237, 0.08)",
  border:      "rgba(139, 92, 246, 0.14)",
};

const inner = "max-w-[1140px] mx-auto px-6";

// ─── FloatingCard ─────────────────────────────────────────────────────────────
const CARDS = [
  { label: "Site para Advogados",  top: "45%", left: "5%"  },
  { label: "Site para Médicos",    top: "50%", right: "5%" },
  { label: "Site para Contadores", top: "40%", left: "10%" },
];

function FloatingCard() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const cycle = (current: number) => {
      const t1 = setTimeout(() => {
        if (cancelled) return;
        setFading(true);
        const t2 = setTimeout(() => {
          if (cancelled) return;
          const next = (current + 1) % CARDS.length;
          setActive(next);
          setFading(false);
          cycle(next);
        }, 600);
        return t2;
      }, 3000);
      return t1;
    };
    const t = cycle(0);
    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  return (
    <>
      {CARDS.map((c, i) => (
        <div key={i} style={{
          position: "absolute",
          top: c.top,
          left: (c as any).left,
          right: (c as any).right,
          zIndex: 2,
          animation: "float 3.5s ease-in-out infinite",
          opacity: active === i ? (fading ? 0 : 1) : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: "none",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1px solid rgba(255,255,255,0.25)", borderRadius: 100,
            padding: "6px 16px", backdropFilter: "blur(8px)",
            background: "rgba(0,0,0,0.25)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#7c3aed", flexShrink: 0 }} />
            <span style={{ fontSize: 10, letterSpacing: "0.18em", color: "#fff", textTransform: "uppercase", fontWeight: 600 }}>
              {c.label}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function OneImpact() {
  const heroRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Serviços",   id: "servicos"   },
    { label: "Processo",   id: "processo"   },
    { label: "Resultados", id: "resultados" },
    { label: "Sobre",      id: "sobre"      },
  ];

  return (
    <div style={{ fontFamily: "'Red Hat Text', sans-serif", backgroundColor: C.bg, color: C.white }}>

      {/* ══════════════════════════════════════════
          01 · NAV
      ══════════════════════════════════════════ */}
      <div style={{ position: "fixed", top: 20, left: 0, right: 0, zIndex: 9999, padding: "0 24px" }}>
        <div style={{
          maxWidth: 1140, margin: "0 auto",
          background: "#ffffff",
          borderRadius: menuOpen ? "20px 20px 0 0" : 20,
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        }}>
          {/* barra principal */}
          <div style={{
            height: 70, display: "flex", alignItems: "center",
            justifyContent: "space-between", padding: "0 24px",
            position: "relative",
          }}>
            {/* Logo */}
            <a href="#inicio" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: `linear-gradient(135deg, ${C.accentLight}, ${C.accent})`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>OI</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: C.accent, letterSpacing: "0.02em" }}>
                One<span style={{ color: "#0a0a0f" }}>Impact</span>
              </span>
            </a>

            {/* Links desktop — centro */}
            <div className="hidden md:flex items-center gap-10" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
              {navLinks.map(({ label, id }) => (
                <a key={id} href={`#${id}`} style={{
                  fontSize: 15, color: "#17247D", textDecoration: "none", opacity: 0.7,
                  transition: "opacity 0.2s",
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Botão desktop */}
            <div className="hidden md:block">
              <ShimmerButton style={{ background: C.accent, color: "#fff", borderRadius: 6, padding: "10px 28px", fontSize: 13, fontWeight: 700 }}>
                FALAR COM ESPECIALISTA
              </ShimmerButton>
            </div>

            {/* Hamburguer mobile */}
            <button
              className="flex md:hidden flex-col justify-center items-center gap-[5px]"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
              onClick={() => setMenuOpen(o => !o)}
            >
              {menuOpen ? (
                <>
                  <span style={{ display: "block", width: 22, height: 2, background: "#1E1E1E", borderRadius: 2, transform: "rotate(45deg) translate(5px, 5px)" }} />
                  <span style={{ display: "block", width: 22, height: 2, background: "#1E1E1E", borderRadius: 2, opacity: 0 }} />
                  <span style={{ display: "block", width: 22, height: 2, background: "#1E1E1E", borderRadius: 2, transform: "rotate(-45deg) translate(5px, -5px)" }} />
                </>
              ) : (
                <>
                  <span style={{ display: "block", width: 24, height: 2, background: "#1E1E1E", borderRadius: 2 }} />
                  <span style={{ display: "block", width: 24, height: 2, background: "#1E1E1E", borderRadius: 2 }} />
                  <span style={{ display: "block", width: 16, height: 2, background: "#1E1E1E", borderRadius: 2 }} />
                </>
              )}
            </button>
          </div>

          {/* Menu mobile expandido */}
          {menuOpen && (
            <div className="md:hidden" style={{ borderTop: "1px solid rgba(0,0,0,0.07)", padding: "12px 0 20px", borderRadius: "0 0 20px 20px" }}>
              {navLinks.map(({ label, id }) => (
                <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} style={{
                  display: "block", padding: "14px 24px",
                  fontSize: 16, fontWeight: 600, color: "#17247D",
                  textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.05)",
                }}>
                  {label}
                </a>
              ))}
              <div style={{ padding: "16px 24px 0" }}>
                <ShimmerButton style={{ background: C.accent, color: "#fff", borderRadius: 6, padding: "14px 0", fontSize: 15, fontWeight: 700, width: "100%", display: "block", textAlign: "center" }}>
                  FALAR COM ESPECIALISTA
                </ShimmerButton>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          02 · HERO
      ══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        id="inicio"
        className="relative overflow-hidden flex flex-col justify-end md:justify-center"
        style={{
          background: "#000",
          minHeight: "100svh",
          paddingTop: 110,
        }}
      >
        {/* Vídeo de fundo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ opacity: 1 }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Gradiente leitura */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 40%, transparent 70%)",
        }} />

        {/* Card flutuante */}
        <FloatingCard />

        {/* Orb central */}
        <div className="absolute pointer-events-none" style={{
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800, height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, rgba(124,58,237,0.03) 40%, transparent 70%)",
        }} />

        {/* Orb secundário */}
        <div className="absolute pointer-events-none" style={{
          right: "8%", top: "15%",
          width: 420, height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 65%)",
        }} />

        <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 48px 30px", width: "100%", position: "relative" }}>
          <div style={{ maxWidth: 520 }}>


            {/* Headline */}
            <h1 style={{
              fontFamily: "'Zalando Sans Expanded', sans-serif",
              fontSize: 32, fontWeight: 500, lineHeight: 1.3,
              letterSpacing: "-0.02em", color: "#fff", marginBottom: 20,
            }}>
              Seu site deve refletir a excelência do seu trabalho
            </h1>

            {/* Descrição */}
            <p style={{
              fontFamily: "'Sora', sans-serif", fontSize: 18, fontWeight: 400, color: "#ffffffcc",
              lineHeight: 1.75, marginBottom: 20,
            }}>
              Criamos sites que transformam a percepção do seu negócio
            </p>

            {/* CTA */}
            <ShimmerButton style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, padding: "10px 22px", background: C.accent, color: "#fff", borderRadius: 6, fontWeight: 400 }}>
              Entre em contato
            </ShimmerButton>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          03 · RODAPÉ
      ══════════════════════════════════════════ */}
      <footer style={{ background: "#06060a", borderTop: `1px solid ${C.border}`, padding: "64px 24px 32px" }}>
        {/* Linha brilhante no topo */}
        <div style={{
          position: "absolute", left: 0, right: 0,
          height: 1,
          background: `linear-gradient(to right, transparent, ${C.accent}50, transparent)`,
          marginTop: -65,
        }} />

        <div className={inner}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10" style={{ marginBottom: 48 }}>
            {/* Brand */}
            <div className="lg:col-span-2">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6,
                  background: `linear-gradient(135deg, ${C.accentLight}, ${C.accent})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: "#fff", fontFamily: "'Red Hat Display', sans-serif" }}>OI</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.white, fontFamily: "'Red Hat Display', sans-serif" }}>
                  One<span style={{ color: C.accentLight }}>Impact</span>
                </span>
              </div>
              <p style={{ fontSize: 14, color: C.white, opacity: 0.25, lineHeight: 1.75, maxWidth: 300 }}>
                Elevamos a percepção de valor de prestadores de serviços com sites que convertem visitantes em clientes premium.
              </p>
            </div>

            {/* Navegação */}
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.accentLight, opacity: 0.6, marginBottom: 16 }}>
                Navegação
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Serviços", "Processo", "Resultados", "Sobre"].map(l => (
                  <li key={l}>
                    <a
                      href="#"
                      style={{ fontSize: 14, color: C.white, opacity: 0.3, textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "0.3")}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contato */}
            <div>
              <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.accentLight, opacity: 0.6, marginBottom: 16 }}>
                Contato
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["WhatsApp", "Instagram", "LinkedIn", "contato@oneimpact.com.br"].map(l => (
                  <li key={l}>
                    <a
                      href="#"
                      style={{ fontSize: 14, color: C.white, opacity: 0.3, textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                      onMouseLeave={e => (e.currentTarget.style.opacity = "0.3")}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: `1px solid ${C.border}`,
            paddingTop: 24,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            flexWrap: "wrap", gap: 12,
          }}>
            <p style={{ fontSize: 12, color: C.white, opacity: 0.18 }}>
              © 2026 One Impact. Todos os direitos reservados.
            </p>
            <div style={{ display: "flex", gap: 24 }}>
              {["Política de Privacidade", "Termos de Uso"].map(l => (
                <a key={l} href="#" style={{ fontSize: 12, color: C.white, opacity: 0.18, textDecoration: "none" }}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
