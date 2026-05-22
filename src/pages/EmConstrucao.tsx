export default function EmConstrucao() {
  return (
    <div style={{
      minHeight: "100svh", background: "#0a0a0f",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "'Sora', sans-serif", color: "#fff",
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 8, marginBottom: 24,
        background: "linear-gradient(135deg, #a78bfa, #7c3aed)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 16, fontWeight: 800,
      }}>OI</div>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>Em construção</h1>
      <p style={{ fontSize: 14, opacity: 0.5 }}>Em breve algo incrível por aqui.</p>
    </div>
  );
}
