import { C } from "../../styles/theme"
import { STATS, TICKER_ITEMS } from "../../data/siteContent"
import { AnimHeadline, Btn, NavLink } from "../ui"

const BORDER = `1px solid ${C.border}`
const NAV = [
  { label: "Services", id: "services" },
  { label: "Domains", id: "domains" },
  { label: "Impact", id: "impact" },
  { label: "Why us", id: "why" },
  { label: "FAQ", id: "faq" },
]

export function Logo() {
  return (
    <div
      style={{
        width: 34,
        height: 34,
        background: C.accent,
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Mono', monospace",
        fontSize: 10,
        fontWeight: 700,
        color: C.bg,
      }}
    >
      MW
    </div>
  )
}

export function SiteNav({
  scrolled,
  scrollTo,
}: {
  scrolled: boolean
  scrollTo: (id: string) => void
}) {
  return (
    <nav
      style={{
        position: "fixed",
        inset: "0 0 auto",
        zIndex: 100,
        background: scrolled ? "rgba(11,9,6,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? BORDER : "none",
        transition: "background 0.4s, border-color 0.4s",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "0 32px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Logo />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              color: C.fg,
            }}
          >
            MayWeb
          </span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {NAV.map((item) => (
            <NavLink key={item.id} onClick={() => scrollTo(item.id)}>
              {item.label}
            </NavLink>
          ))}
          <Btn onClick={() => scrollTo("contact")}>Start a project →</Btn>
        </div>
      </div>
    </nav>
  )
}

export function Hero({ scrollTo }: { scrollTo: (id: string) => void }) {
  return (
    <>
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "112px 32px 0",
          borderBottom: BORDER,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: `radial-gradient(${C.dim} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
            opacity: 0.35,
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
          }}
        />
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              color: C.muted,
              letterSpacing: "0.18em",
              marginBottom: 40,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span style={{ width: 24, height: 1, background: C.accent }} />
            DIGITAL PRODUCT STUDIO
            <span style={{ width: 24, height: 1, background: C.border }} />
            EST. 2023
          </div>
          <AnimHeadline />
          <div
            style={{
              marginTop: 48,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 32,
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 16,
                lineHeight: 1.75,
                color: C.muted,
                maxWidth: 440,
              }}
            >
              MayWeb is a full-service engineering studio. We work with you from
              initial concept through to shipped product — strategy, design
              systems, mobile, web, backend, and quality engineering, unified.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Btn onClick={() => scrollTo("services")}>Explore services</Btn>
              <Btn onClick={() => scrollTo("contact")} variant="ghost">
                Get in touch →
              </Btn>
            </div>
          </div>
          <div
            className="stat-strip"
            style={{ borderTop: BORDER, marginTop: 72 }}
          >
            {STATS.slice(0, 4).map((stat) => (
              <div
                key={stat.label}
                style={{ padding: "28px 16px", textAlign: "center" }}
              >
                <div
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                    fontWeight: 700,
                    color: C.accent,
                  }}
                >
                  {stat.value}
                  {stat.suffix}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    color: C.dim,
                    marginTop: 8,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div
        style={{
          background: C.surface,
          borderBottom: BORDER,
          padding: "14px 0",
          overflow: "hidden",
        }}
      >
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
            <span
              key={`${item}-${index}`}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 11,
                color: C.dim,
                letterSpacing: "0.14em",
                display: "flex",
                gap: 14,
              }}
            >
              {item.toUpperCase()}{" "}
              <span style={{ color: C.accent, fontSize: 5 }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

export function Footer({ scrollTo }: { scrollTo: (id: string) => void }) {
  return (
    <footer style={{ padding: "28px 32px", borderTop: BORDER }}>
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: C.dim,
            }}
          >
            MayWeb Technologies Ltd.
          </span>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["services", "domains", "impact", "contact"].map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 12,
                color: C.dim,
                background: "none",
                border: "none",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {id}
            </button>
          ))}
        </div>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            color: C.dim,
          }}
        >
          © {new Date().getFullYear()} MayWeb Technologies
        </div>
      </div>
    </footer>
  )
}
