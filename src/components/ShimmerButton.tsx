import { ButtonHTMLAttributes, ReactNode, CSSProperties } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  style?: CSSProperties;
}

export default function ShimmerButton({ children, style, ...rest }: Props) {
  const base: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    padding: "15px 28px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.12em",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
    background: "#7c3aed",
    color: "#fff",
    transition: "opacity 0.2s",
    fontFamily: "inherit",
    ...style,
  };

  return (
    <button style={base} {...rest}>
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      <span className="shimmer-overlay" />
    </button>
  );
}
