import { useEffect, useRef, useState } from "react"
import type { ReactNode, CSSProperties, RefObject } from "react"
import { C } from "../styles/theme"

export function useInView(ref: RefObject<Element | null>, threshold = 0.1) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (visible && ref.current) return
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, threshold, visible])
  return visible
}

export function useCounter(target: number, active: boolean, duration = 1600) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    const step = (timestamp: number) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setCount(Math.round((1 - Math.pow(1 - progress, 3)) * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, duration, target])
  return count
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  style = {},
}: {
  children: ReactNode
  className?: string
  delay?: number
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref)
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function Label({ children }: { children: string }) {
  return (
    <div
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 10,
        color: C.accent,
        letterSpacing: "0.18em",
        marginBottom: 20,
      }}
    >
      {children}
    </div>
  )
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
        fontWeight: 300,
        letterSpacing: "-0.03em",
        lineHeight: 0.95,
        color: C.fg,
      }}
    >
      {children}
    </h2>
  )
}

export function Divider() {
  return <div style={{ borderTop: `1px solid ${C.border}` }} />
}

export function Btn({
  children,
  onClick,
  variant = "primary",
}: {
  children: ReactNode
  onClick?: () => void
  variant?: "primary" | "ghost"
}) {
  const [hovered, setHovered] = useState(false)
  const base: CSSProperties = {
    padding: "12px 28px",
    borderRadius: 2,
    fontFamily: "'Inter', sans-serif",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  }
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...base,
        background:
          variant === "primary"
            ? hovered
              ? C.accentHov
              : C.accent
            : "transparent",
        color: variant === "primary" ? C.bg : hovered ? C.fg : C.muted,
        border:
          variant === "primary"
            ? "none"
            : `1px solid ${hovered ? "#444" : C.border}`,
      }}
    >
      {children}
    </button>
  )
}

export function StatCard({
  value,
  suffix,
  label,
}: {
  value: number
  suffix: string
  label: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, 0.3)
  const count = useCounter(value, visible)
  return (
    <div
      ref={ref}
      style={{
        background: C.surface,
        padding: 32,
        transition: "background 0.25s",
        height: "100%",
        boxSizing: "border-box",
      }}
      onMouseEnter={(event) =>
        (event.currentTarget.style.background = C.surface2)
      }
      onMouseLeave={(event) =>
        (event.currentTarget.style.background = C.surface)
      }
    >
      <div
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
          fontWeight: 700,
          color: C.accent,
          lineHeight: 1,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s 0.2s",
        }}
      >
        {count}
        {suffix}
      </div>
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: C.muted,
          marginTop: 10,
          lineHeight: 1.6,
        }}
      >
        {label}
      </div>
    </div>
  )
}

export function AnimHeadline() {
  const lines = [
    ["We", "build", "products"],
    ["people", "love", "to", "use."],
  ]
  return (
    <h1
      style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: "clamp(3.4rem, 10vw, 10.5rem)",
        fontWeight: 300,
        letterSpacing: "-0.04em",
        lineHeight: 0.9,
        color: C.fg,
      }}
    >
      {lines.map((words, lineIndex) => (
        <div
          key={lineIndex}
          style={{ overflow: "hidden", paddingBottom: "0.08em" }}
        >
          {words.map((word, wordIndex) => (
            <span
              key={wordIndex}
              className="hero-word"
              style={{
                animationDelay: `${(lineIndex * words.length + wordIndex) * 80 + 200}ms`,
                marginRight: "0.28em",
              }}
            >
              {word === "love" ? (
                <em style={{ fontStyle: "italic", color: C.accent }}>{word}</em>
              ) : (
                word
              )}
            </span>
          ))}
        </div>
      ))}
    </h1>
  )
}

export function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string
  a: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <div>
      <Divider />
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "22px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: C.fg,
          fontFamily: "'Inter', sans-serif",
          fontSize: 15,
          fontWeight: 500,
          letterSpacing: "-0.01em",
          gap: 16,
        }}
      >
        <span>{q}</span>
        <span
          style={{
            color: C.accent,
            fontSize: 20,
            flexShrink: 0,
            lineHeight: 1,
            transition: "transform 0.3s cubic-bezier(.22,1,.36,1)",
            transform: open ? "rotate(45deg)" : "none",
            display: "inline-block",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 300 : 0,
          transition: "max-height 0.4s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: C.muted,
            lineHeight: 1.8,
            paddingBottom: 24,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  )
}

export function NavLink({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        fontSize: 13,
        color: hovered ? C.fg : C.muted,
        transition: "color 0.2s",
      }}
    >
      {children}
    </button>
  )
}

export function FieldLabel({ children }: { children: string }) {
  return (
    <div
      style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 10,
        color: C.muted,
        letterSpacing: "0.12em",
        marginBottom: 8,
      }}
    >
      {children.toUpperCase()}
    </div>
  )
}

export const inputStyle: CSSProperties = {
  width: "100%",
  background: C.surface2,
  border: `1px solid ${C.border}`,
  borderRadius: 2,
  padding: "12px 16px",
  color: C.fg,
  fontFamily: "'Inter', sans-serif",
  fontSize: 14,
  outline: "none",
  transition: "border-color 0.2s",
}
