import type { ReactNode } from "react"
import { C } from "../../styles/theme"
import {
  DOMAINS,
  FAQS,
  PROCESS,
  SERVICES,
  STATS,
  WHY,
} from "../../data/siteContent"
import { DomainCard, ProcessCard, ServiceCard, WhyCard } from "../cards"
import { Btn, Divider, FaqItem, H2, Label, Reveal, StatCard } from "../ui"

const BORDER = `1px solid ${C.border}`

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

export default function HomeSections({
  scrollTo,
  openFaq,
  setOpenFaq,
}: {
  scrollTo: (id: string) => void
  openFaq: number | null
  setOpenFaq: (index: number | null) => void
}) {
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
