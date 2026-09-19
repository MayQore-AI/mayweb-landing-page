import type { ChangeEvent, FormEvent, ReactNode } from "react"
import { C } from "../styles/theme"
import {
  DOMAINS,
  FAQS,
  PROCESS,
  SERVICES,
  STATS,
  TICKER_ITEMS,
  WHY,
} from "../data/siteContent"
import {
  DomainCard,
  ProcessCard,
  ServiceCard,
  WhyCard,
} from "../components/cards"
import {
  AnimHeadline,
  Btn,
  Divider,
  FaqItem,
  FieldLabel,
  H2,
  Label,
  NavLink,
  Reveal,
  StatCard,
  inputStyle,
} from "../components/ui"

type FormState = {
  name: string
  company: string
  email: string
  message: string
}
type HomePageProps = {
  scrolled: boolean
  openFaq: number | null
  setOpenFaq: (index: number | null) => void
  form: FormState
  setForm: (form: FormState) => void
  submitted: boolean
  setSubmitted: (submitted: boolean) => void
  scrollTo: (id: string) => void
}

const BORDER = `1px solid ${C.border}`
const NAV = [
  { label: "Services", id: "services" },
  { label: "Domains", id: "domains" },
  { label: "Impact", id: "impact" },
  { label: "Why us", id: "why" },
  { label: "FAQ", id: "faq" },
]
const FORM_FIELDS = [
  {
    key: "name" as const,
    label: "Your name",
    type: "text",
    placeholder: "Jane Smith",
  },
  {
    key: "company" as const,
    label: "Company",
    type: "text",
    placeholder: "Acme Inc.",
  },
  {
    key: "email" as const,
    label: "Email",
    type: "email",
    placeholder: "jane@acme.com",
  },
]

function Logo() {
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

function SiteNav({
  scrolled,
  scrollTo,
}: Pick<HomePageProps, "scrolled" | "scrollTo">) {
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

function Hero({ scrollTo }: Pick<HomePageProps, "scrollTo">) {
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
              {item.toUpperCase()}
              <span style={{ color: C.accent, fontSize: 5 }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

function GridSection({
  id,
  label,
  title,
  children,
  background = C.bg,
}: {
  id: string
  label: string
  title: ReactNode
  children: ReactNode
  background?: string
}) {
  return (
    <section
      id={id}
      style={{ padding: "112px 32px", background, borderBottom: BORDER }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <Reveal style={{ marginBottom: 64 }}>
          <Label>{label}</Label>
          <H2>{title}</H2>
        </Reveal>
        {children}
      </div>
    </section>
  )
}

function ContentSections({
  scrollTo,
  openFaq,
  setOpenFaq,
}: Pick<HomePageProps, "scrollTo" | "openFaq" | "setOpenFaq">) {
  return (
    <>
      <GridSection
        id="services"
        label="SERVICES"
        title={
          <>
            <span>What we</span>
            <br />
            <em style={{ fontStyle: "italic" }}>deliver.</em>
          </>
        }
      >
        <div className="grid-3">
          {SERVICES.map((service, index) => (
            <Reveal
              key={service.n}
              delay={index * 55}
              style={{ height: "100%" }}
            >
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </GridSection>
      <GridSection
        id="domains"
        label="DOMAINS"
        background={C.surface}
        title={
          <>
            <span>Industries we've</span>
            <br />
            <em style={{ fontStyle: "italic" }}>shaped.</em>
          </>
        }
      >
        <div className="grid-3">
          {DOMAINS.map((domain, index) => (
            <Reveal
              key={domain.title}
              delay={index * 50}
              style={{ height: "100%" }}
            >
              <DomainCard domain={domain} />
            </Reveal>
          ))}
        </div>
      </GridSection>
      <section
        id="impact"
        style={{ padding: "112px 32px", borderBottom: BORDER }}
      >
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div className="impact-layout">
            <Reveal>
              <Label>IMPACT</Label>
              <H2>
                Measured results.
                <br />
                <em style={{ fontStyle: "italic" }}>Not estimates.</em>
              </H2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: C.muted,
                  lineHeight: 1.8,
                  marginTop: 24,
                  maxWidth: 380,
                }}
              >
                Every number here comes from real post-launch analytics,
                milestone tracking, and usage data — across fintech, media,
                logistics, and digital asset products.
              </p>
            </Reveal>
            <div className="grid-stats">
              {STATS.map((stat, index) => (
                <Reveal
                  key={stat.label}
                  delay={index * 60}
                  style={{ height: "100%" }}
                >
                  <StatCard {...stat} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      <GridSection
        id="why"
        label="WHY MAYWEB"
        background={C.surface}
        title={
          <>
            <span>The studio that</span>
            <br />
            <em style={{ fontStyle: "italic", color: C.accent }}>
              actually delivers.
            </em>
          </>
        }
      >
        <div className="grid-3">
          {WHY.map((why, index) => (
            <Reveal
              key={why.title}
              delay={index * 50}
              style={{ height: "100%" }}
            >
              <WhyCard why={why} />
            </Reveal>
          ))}
        </div>
      </GridSection>
      <GridSection
        id="process"
        label="HOW WE WORK"
        title={
          <>
            <span>Built on</span>
            <br />
            <em style={{ fontStyle: "italic" }}>accountability.</em>
          </>
        }
      >
        <div className="grid-4">
          {PROCESS.map((process, index) => (
            <Reveal
              key={process.step}
              delay={index * 80}
              style={{ height: "100%" }}
            >
              <ProcessCard process={process} />
            </Reveal>
          ))}
        </div>
      </GridSection>
      <section id="faq" style={{ padding: "112px 32px", borderBottom: BORDER }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 64 }}>
            <Label>FAQ</Label>
            <H2>
              Common questions,
              <br />
              <em style={{ fontStyle: "italic" }}>straight answers.</em>
            </H2>
          </Reveal>
          <div className="two-col">
            <Reveal>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  color: C.muted,
                  lineHeight: 1.8,
                }}
              >
                We work best with teams that are ready to build. Whether you're
                a founder with a clear brief, a product team that needs senior
                engineering capacity, or a company looking for a technical
                partner from zero — we're likely a fit.
              </p>
              <div style={{ marginTop: 40 }}>
                <Btn onClick={() => scrollTo("contact")}>
                  Start a conversation →
                </Btn>
              </div>
            </Reveal>
            <Reveal delay={80}>
              {FAQS.map((faq, index) => (
                <FaqItem
                  key={faq.q}
                  {...faq}
                  open={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
              <Divider />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

function Contact({
  form,
  setForm,
  submitted,
  setSubmitted,
}: Pick<HomePageProps, "form" | "setForm" | "submitted" | "setSubmitted">) {
  const update = (key: keyof FormState, value: string) =>
    setForm({ ...form, [key]: value })
  const fieldChange =
    (key: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      update(key, event.target.value)
  const submit = (event: FormEvent) => {
    event.preventDefault()
    setSubmitted(true)
  }
  return (
    <section
      id="contact"
      style={{
        padding: "112px 32px",
        background: C.surface,
        borderBottom: BORDER,
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div className="two-col">
          <Reveal>
            <Label>LET'S TALK</Label>
            <H2>
              Ready to build
              <br />
              something{" "}
              <em style={{ fontStyle: "italic", color: C.accent }}>
                exceptional?
              </em>
            </H2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: C.muted,
                lineHeight: 1.8,
                marginTop: 28,
                maxWidth: 400,
              }}
            >
              We partner with ambitious teams that want world-class engineering
              and the strategic thinking to match. Tell us what you're building.
            </p>
            <div
              style={{
                marginTop: 40,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <a
                href="mailto:Michaelo@maywebltd.com"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 13,
                  color: C.accent,
                  textDecoration: "none",
                }}
              >
                Michaelo@maywebltd.com
              </a>
              <span
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 11,
                  color: C.dim,
                }}
              >
                Response within 24 hours
              </span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            {submitted ? (
              <div
                style={{
                  background: C.surface2,
                  border: BORDER,
                  borderRadius: 4,
                  padding: 56,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 36, color: C.accent }}>✓</div>
                <h3
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    margin: "16px 0 8px",
                  }}
                >
                  Message received
                </h3>
                <p style={{ color: C.muted }}>
                  We'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={submit}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {FORM_FIELDS.map((field) => (
                  <div key={field.key}>
                    <FieldLabel>{field.label}</FieldLabel>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      value={form[field.key]}
                      onChange={fieldChange(field.key)}
                      style={inputStyle}
                    />
                  </div>
                ))}
                <div>
                  <FieldLabel>Tell us about your project</FieldLabel>
                  <textarea
                    rows={5}
                    placeholder="What are you building? What's the challenge?"
                    required
                    value={form.message}
                    onChange={fieldChange("message")}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>
                <Btn>Send message →</Btn>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Footer({ scrollTo }: Pick<HomePageProps, "scrollTo">) {
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

export default function HomePage(props: HomePageProps) {
  return (
    <div
      className="noise"
      style={{
        background: C.bg,
        color: C.fg,
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <SiteNav scrolled={props.scrolled} scrollTo={props.scrollTo} />
      <Hero scrollTo={props.scrollTo} />
      <ContentSections
        scrollTo={props.scrollTo}
        openFaq={props.openFaq}
        setOpenFaq={props.setOpenFaq}
      />
      <Contact
        form={props.form}
        setForm={props.setForm}
        submitted={props.submitted}
        setSubmitted={props.setSubmitted}
      />
      <Footer scrollTo={props.scrollTo} />
    </div>
  )
}
