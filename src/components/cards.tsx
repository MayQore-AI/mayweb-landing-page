import { useState } from "react"
import type { ReactNode } from "react"
import { C } from "../styles/theme"
import type { DOMAINS, PROCESS, SERVICES, WHY } from "../data/siteContent"

type Service = typeof SERVICES[number]
type Domain = typeof DOMAINS[number]
type Why = typeof WHY[number]
type Process = typeof PROCESS[number]

type HoverCardProps = {
  children: ReactNode
  background: string
  hoverBackground: string
  padding: string
}
function HoverCard({
  children,
  background,
  hoverBackground,
  padding,
}: HoverCardProps) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? hoverBackground : background,
        padding,
        transition: "background 0.3s",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  )
}

export function ServiceCard({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? C.surface : C.bg,
        padding: "40px 36px",
        transition: "background 0.3s",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: C.dim,
          }}
        >
          {service.n}
        </span>
        <span
          style={{
            fontSize: 16,
            color: hovered ? C.accent : C.dim,
            transition: "color 0.3s",
          }}
        >
          {service.icon}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 17,
          fontWeight: 600,
          marginBottom: 14,
          letterSpacing: "-0.015em",
          color: C.fg,
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: C.muted,
          lineHeight: 1.75,
          marginBottom: 24,
        }}
      >
        {service.body}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {service.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 10,
              color: C.muted,
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 2,
              padding: "4px 10px",
              letterSpacing: "0.04em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export function DomainCard({ domain }: { domain: Domain }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? C.surface2 : C.surface,
        padding: "40px 36px",
        transition: "background 0.3s",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: hovered ? 42 : 28,
          height: 2,
          background: hovered ? C.accent : C.dim,
          marginBottom: 24,
          transition: "background 0.3s, width 0.3s",
        }}
      />
      <h3
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 12,
          letterSpacing: "-0.015em",
        }}
      >
        {domain.title}
      </h3>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: C.muted,
          lineHeight: 1.75,
        }}
      >
        {domain.body}
      </p>
    </div>
  )
}

export function WhyCard({ why }: { why: Why }) {
  return (
    <HoverCard
      background={C.surface}
      hoverBackground={C.surface2}
      padding="40px 36px"
    >
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          color: C.accent,
          letterSpacing: "0.14em",
          marginBottom: 18,
        }}
      >
        {why.label.toUpperCase()}
      </div>
      <h3
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 16,
          fontWeight: 600,
          marginBottom: 12,
          letterSpacing: "-0.015em",
        }}
      >
        {why.title}
      </h3>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: C.muted,
          lineHeight: 1.75,
        }}
      >
        {why.body}
      </p>
    </HoverCard>
  )
}

export function ProcessCard({ process }: { process: Process }) {
  return (
    <HoverCard
      background={C.bg}
      hoverBackground={C.surface}
      padding="48px 40px"
    >
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11,
          color: C.accent,
          marginBottom: 28,
        }}
      >
        {process.step}
      </div>
      <h3
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 22,
          fontWeight: 300,
          marginBottom: 16,
          letterSpacing: "-0.02em",
          fontStyle: "italic",
        }}
      >
        {process.title}
      </h3>
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: C.muted,
          lineHeight: 1.75,
        }}
      >
        {process.body}
      </p>
    </HoverCard>
  )
}
