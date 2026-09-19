import { useState, useEffect, useRef, useCallback } from "react";

/* ─── TOKENS ─── */
const C = {
  bg:       "#0b0906",
  surface:  "#131110",
  surface2: "#1a1714",
  border:   "#272320",
  fg:       "#f0ebe2",
  muted:    "#7a7068",
  dim:      "#3d3830",
  accent:   "#d4956a",
  accentHov:"#e0a87c",
  accentDim:"#7a4f33",
};

/* ─── DATA ─── */
const SERVICES = [
  {
    n: "01", icon: "◈",
    title: "Product Strategy",
    body: "Before a line of code is written, we help you think clearly. User research, scope definition, technical feasibility, and roadmap design — so you ship the right thing, not just something.",
    tags: ["Discovery", "Roadmapping", "User Research", "Feasibility"],
  },
  {
    n: "02", icon: "◉",
    title: "Full-Stack Engineering",
    body: "End-to-end web applications built for performance, scale, and longevity. We architect the whole system — database to UI — with deliberate decisions at every layer.",
    tags: ["Node.js", "React", "PostgreSQL", "TypeScript"],
  },
  {
    n: "03", icon: "◎",
    title: "Mobile Engineering",
    body: "Production-grade iOS and Android applications. Fluid interfaces, optimised media playback, background processing, and caching strategies that make the difference between good and great.",
    tags: ["Swift", "Kotlin", "React Native", "AVFoundation"],
  },
  {
    n: "04", icon: "◆",
    title: "Frontend Development",
    body: "Component systems and interfaces that feel alive. We care about motion, accessibility, and the micro-interactions that transform a competent UI into one people enjoy.",
    tags: ["React", "Next.js", "Animation", "Design Systems"],
  },
  {
    n: "05", icon: "◐",
    title: "Backend & APIs",
    body: "Scalable server architectures, open banking integrations, payment systems, and data pipelines. We've built fintech infrastructure handling cross-border transactions in production.",
    tags: ["REST", "GraphQL", "Open Banking", "Microservices"],
  },
  {
    n: "06", icon: "◑",
    title: "QA & Quality Engineering",
    body: "Quality as a first-class concern, not a final gate. Test strategy, automated suites, performance benchmarking, and the engineering culture to keep standards high across the lifecycle.",
    tags: ["Automation", "Performance", "Test Strategy", "CI/CD"],
  },
];

const DOMAINS = [
  { title: "Fintech & Open Banking",    body: "Cross-border remittance, non-residential banking, open banking integrations — systems where correctness and latency are both product decisions." },
  { title: "Web3 & Digital Assets",     body: "ERC-20 and ERC-721 token integrations, NFT management, and crypto wallets designed for mainstream users, not blockchain specialists." },
  { title: "Video & Media",             body: "High-performance media experiences with intelligent preloading and caching — for audiences that won't tolerate buffering." },
  { title: "Logistics & Marketplaces",  body: "Multi-sided ecosystems — buyer, seller, and delivery — with real-time coordination, assignment logic, and retention mechanics built to hold under scale." },
  { title: "Banking & Accounts",        body: "Financial services expansion: KYC flows, non-residential accounts, and compliance-aware feature development across multiple jurisdictions." },
  { title: "Legacy Modernisation",      body: "We inherit complex, legacy codebases and leave them clean. Migration without disruption, measurable error reduction, and no continuity gaps." },
];

const STATS = [
  { value: 30,  suffix: "%", label: "Reduction in system errors post-migration" },
  { value: 40,  suffix: "%", label: "Increase in user engagement, measured by analytics" },
  { value: 35,  suffix: "%", label: "Faster average order processing time" },
  { value: 25,  suffix: "%", label: "Transaction volume growth within 3 months" },
  { value: 60,  suffix: "%", label: "Early beta user retention rate" },
  { value: 20,  suffix: "%", label: "Increase in non-residential account activations" },
];

const WHY = [
  { label: "Track record",  title: "Results we can measure",             body: "Every engagement is tracked against milestones. We instrument, monitor, and report — because impact you can't measure is just a claim." },
  { label: "Rigour",        title: "A team built to a high bar",          body: "We designed our own technical assessment framework to hire the engineers on your project. The same standard applies to every role." },
  { label: "Strategy",      title: "We help you shape the product",       body: "Not just builders. We bring product thinking — research, scoping, feasibility, and roadmap clarity — before writing a single line of code." },
  { label: "Culture",       title: "Engineering that grows",              body: "Mentorship, growth paths, and knowledge transfer are standard. We deliver the project and leave the team stronger, not dependent." },
  { label: "Depth",         title: "Seniors, not a managed layer",        body: "Lead engineers who've shipped across fintech, Web3, media, and logistics. You work with the people doing the work." },
  { label: "Partnership",   title: "Structured accountability",           body: "Regular syncs, milestone tracking, one-on-ones. On-time delivery is a process we've built and refined — not a hope." },
];

const PROCESS = [
  { step: "01", title: "Discover",    body: "We map the product, users, and constraints before anything is built. Ambiguity at this stage costs ten times more later." },
  { step: "02", title: "Architect",   body: "Technology decisions matched to actual scale and risk — not borrowed from a larger company's playbook." },
  { step: "03", title: "Deliver",     body: "Iterative, milestone-tracked engineering with regular check-ins and transparent progress. No surprises at launch." },
  { step: "04", title: "Optimise",    body: "Post-launch performance tuning, analytics review, and deliberate debt paydown — on a defined schedule." },
];

const FAQS = [
  { q: "What kinds of products do you build?",        a: "Full-stack web applications, mobile apps (iOS and Android), backend systems, and the product strategy that underpins them. Our strongest work tends to be in technically demanding environments where performance, correctness, and scale all matter." },
  { q: "Can you help define the product before building?", a: "Yes — and we'd argue this is often the highest-value work. We offer discovery and strategy engagements that produce scope documents, technical feasibility assessments, and roadmaps before a build contract begins." },
  { q: "Do you work with early-stage companies?",     a: "Yes. We've worked across the spectrum from pre-launch MVPs to established products with millions of users. What matters more than stage is whether you have clarity on what you're building and why." },
  { q: "Can you take over an existing codebase?",     a: "Absolutely. We've handled large-scale legacy migrations and have a track record of significantly reducing system errors post-migration. We conduct a technical audit before any work begins." },
  { q: "How do you handle NDAs and confidentiality?", a: "All engagements are governed by robust NDAs as standard. We don't discuss client work publicly. What you build with us stays with you." },
];

const TICKER_ITEMS = ["Full-Stack", "Mobile", "Frontend", "Backend", "QA", "Product Strategy", "Open Banking", "Web3", "Fintech", "Logistics", "Media Platforms", "Quality Engineering"];

/* ─── HOOKS ─── */
function useInView(ref: React.RefObject<Element | null>, threshold = 0.1) {
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!v && ref.current) {
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold });
      obs.observe(ref.current);
      return () => obs.disconnect();
    }
  }, [ref, threshold, v]);
  return v;
}

function useCounter(target: number, active: boolean, duration = 1600) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      setCount(Math.round(ease * target));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

/* ─── PRIMITIVES ─── */
function Reveal({ children, className = "", delay = 0, style = {} }: {
  children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const v = useInView(ref);
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.8s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Label({ children }: { children: string }) {
  return (
    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.accent, letterSpacing: "0.18em", marginBottom: 20 }}>
      {children}
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: "'Fraunces', Georgia, serif",
      fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
      fontWeight: 300,
      letterSpacing: "-0.03em",
      lineHeight: 0.95,
      color: C.fg,
    }}>
      {children}
    </h2>
  );
}

function Divider() {
  return <div style={{ borderTop: `1px solid ${C.border}` }} />;
}

function Btn({ children, onClick, variant = "primary" }: {
  children: React.ReactNode; onClick?: () => void; variant?: "primary" | "ghost";
}) {
  const [hov, setHov] = useState(false);
  const base: React.CSSProperties = {
    padding: "12px 28px", borderRadius: 2, fontFamily: "'Inter', sans-serif",
    fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
    border: "none", display: "inline-flex", alignItems: "center", gap: 6,
  };
  if (variant === "primary") return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, background: hov ? C.accentHov : C.accent, color: C.bg }}>
      {children}
    </button>
  );
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...base, background: "transparent", color: hov ? C.fg : C.muted, border: `1px solid ${hov ? "#444" : C.border}` }}>
      {children}
    </button>
  );
}

/* ─── STAT CARD ─── */
function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const v = useInView(ref, 0.3);
  const count = useCounter(value, v);
  return (
    <div ref={ref} style={{ background: C.surface, padding: 32, transition: "background 0.25s", height: "100%", boxSizing: "border-box" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = C.surface2)}
      onMouseLeave={(e) => (e.currentTarget.style.background = C.surface)}>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 700, color: C.accent, lineHeight: 1, opacity: v ? 1 : 0, transition: "opacity 0.4s 0.2s" }}>
        {count}{suffix}
      </div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.muted, marginTop: 10, lineHeight: 1.6 }}>
        {label}
      </div>
    </div>
  );
}

/* ─── HERO WORDS ─── */
function AnimHeadline() {
  const lines = [
    ["We", "build", "products"],
    ["people", "love", "to", "use."],
  ];
  return (
    <h1 style={{
      fontFamily: "'Fraunces', Georgia, serif",
      fontSize: "clamp(3.4rem, 10vw, 10.5rem)",
      fontWeight: 300,
      letterSpacing: "-0.04em",
      lineHeight: 0.9,
      color: C.fg,
    }}>
      {lines.map((words, li) => (
        <div key={li} style={{ overflow: "hidden", paddingBottom: "0.08em" }}>
          {words.map((word, wi) => (
            <span
              key={wi}
              className="hero-word"
              style={{
                animationDelay: `${(li * words.length + wi) * 80 + 200}ms`,
                marginRight: "0.28em",
              }}
            >
              {word === "love" ? <em style={{ fontStyle: "italic", color: C.accent }}>{word}</em> : word}
            </span>
          ))}
        </div>
      ))}
    </h1>
  );
}

/* ─── FAQ ITEM ─── */
function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div>
      <Divider />
      <button
        onClick={onToggle}
        style={{
          width: "100%", textAlign: "left", padding: "22px 0",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: "none", border: "none", cursor: "pointer", color: C.fg,
          fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 500, letterSpacing: "-0.01em", gap: 16,
        }}
      >
        <span>{q}</span>
        <span style={{
          color: C.accent, fontSize: 20, flexShrink: 0, lineHeight: 1,
          transition: "transform 0.3s cubic-bezier(.22,1,.36,1)",
          transform: open ? "rotate(45deg)" : "none",
          display: "inline-block",
        }}>+</span>
      </button>
      <div style={{
        overflow: "hidden",
        maxHeight: open ? 300 : 0,
        transition: "max-height 0.4s cubic-bezier(.22,1,.36,1)",
      }}>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.8, paddingBottom: 24 }}>
          {a}
        </p>
      </div>
    </div>
  );
}

/* ─── MAIN ─── */
export default function App() {
  const [scrolled, setScrolled]   = useState(false);
  const [openFaq, setOpenFaq]     = useState<number | null>(null);
  const [form, setForm]           = useState({ name: "", company: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const NAV = [
    { label: "Services",  id: "services" },
    { label: "Domains",   id: "domains" },
    { label: "Impact",    id: "impact" },
    { label: "Why us",    id: "why" },
    { label: "FAQ",       id: "faq" },
  ];

  const G = `1px solid ${C.border}`;

  return (
    <div className="noise" style={{ background: C.bg, color: C.fg, minHeight: "100vh", position: "relative" }}>

      {/* ══════════ NAV ══════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(11,9,6,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? G : "none",
        transition: "background 0.4s, border-color 0.4s",
      }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 32px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
            <div style={{
              width: 34, height: 34, background: C.accent, borderRadius: 3,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 700, color: C.bg,
              letterSpacing: "0.05em",
            }}>MW</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600, color: C.fg, letterSpacing: "-0.01em" }}>MayWeb</span>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 32, flexWrap: "nowrap" }}>
            {NAV.map((n) => (
              <NavLink key={n.id} onClick={() => scrollTo(n.id)}>{n.label}</NavLink>
            ))}
            <Btn onClick={() => scrollTo("contact")}>Start a project →</Btn>
          </div>
        </div>
      </nav>

      {/* ══════════ HERO ══════════ */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "112px 32px 0", borderBottom: G, position: "relative", overflow: "hidden" }}>
        {/* subtle grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `radial-gradient(${C.dim} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          opacity: 0.35,
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
        }} />

        <div style={{ maxWidth: 1320, margin: "0 auto", width: "100%", position: "relative" }}>
          {/* eyebrow */}
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.muted,
            letterSpacing: "0.18em", marginBottom: 40,
            animation: "fade-in 1s 0.1s both",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: C.accent }} />
            DIGITAL PRODUCT STUDIO
            <span style={{ display: "inline-block", width: 24, height: 1, background: C.border }} />
            EST. 2023
          </div>

          <AnimHeadline />

          <div style={{
            marginTop: 48,
            display: "flex", flexWrap: "wrap",
            alignItems: "flex-end", justifyContent: "space-between", gap: 32,
            animation: "fade-up 0.8s 0.6s both",
          }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, lineHeight: 1.75, color: C.muted, maxWidth: 440 }}>
              MayWeb is a full-service engineering studio. We work with you from
              initial concept through to shipped product — strategy, design systems,
              mobile, web, backend, and quality engineering, unified.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Btn onClick={() => scrollTo("services")}>Explore services</Btn>
              <Btn onClick={() => scrollTo("contact")} variant="ghost">Get in touch →</Btn>
            </div>
          </div>

          {/* stat strip */}
          <div
            className="stat-strip"
            style={{ borderTop: G, marginTop: 72, animation: "fade-up 0.8s 0.75s both" }}
          >
            {STATS.slice(0, 4).map((s, i) => (
              <div key={s.label} style={{
                padding: "28px 16px",
                borderRight: i < 3 ? G : "none",
                textAlign: "center",
              }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: C.accent, lineHeight: 1 }}>
                  {s.value}{s.suffix}
                </div>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.dim, marginTop: 8, lineHeight: 1.5 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TICKER ══════════ */}
      <div style={{ background: C.surface, borderBottom: G, padding: "14px 0", overflow: "hidden" }}>
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.dim, letterSpacing: "0.14em", display: "flex", alignItems: "center", gap: 14 }}>
              {item.toUpperCase()}
              <span style={{ color: C.accent, fontSize: 5 }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════ SERVICES ══════════ */}
      <section id="services" style={{ padding: "112px 32px", borderBottom: G }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 64 }}>
            <div>
              <Label>SERVICES</Label>
              <H2>What we<br /><em style={{ fontStyle: "italic" }}>deliver.</em></H2>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted, maxWidth: 360, lineHeight: 1.8 }}>
              From shaping what you build to shipping and sustaining it — we cover every
              layer of the product, end to end.
            </p>
          </Reveal>

          <div className="grid-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.n} delay={i * 55} style={{ height: "100%" }}>
                <ServiceCard s={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ DOMAINS ══════════ */}
      <section id="domains" style={{ padding: "112px 32px", background: C.surface, borderBottom: G }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 64 }}>
            <Label>DOMAINS</Label>
            <H2>Industries we've<br /><em style={{ fontStyle: "italic" }}>shaped.</em></H2>
          </Reveal>

          <div className="grid-3">
            {DOMAINS.map((d, i) => (
              <Reveal key={d.title} delay={i * 50} style={{ height: "100%" }}>
                <DomainCard d={d} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ IMPACT ══════════ */}
      <section id="impact" style={{ padding: "112px 32px", borderBottom: G }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div className="impact-layout">
            <Reveal>
              <Label>IMPACT</Label>
              <H2>Measured results.<br /><em style={{ fontStyle: "italic" }}>Not estimates.</em></H2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.8, marginTop: 24, maxWidth: 380 }}>
                Every number here comes from real post-launch analytics, milestone
                tracking, and usage data — across fintech, media, logistics, and
                digital asset products.
              </p>
            </Reveal>

            <div className="grid-stats">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 60} style={{ height: "100%" }}>
                  <StatCard value={s.value} suffix={s.suffix} label={s.label} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ WHY ══════════ */}
      <section id="why" style={{ padding: "112px 32px", background: C.surface, borderBottom: G }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 64 }}>
            <Label>WHY MAYWEB</Label>
            <H2>The studio that<br /><em style={{ fontStyle: "italic", color: C.accent }}>actually delivers.</em></H2>
          </Reveal>

          <div className="grid-3">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={i * 50} style={{ height: "100%" }}>
                <WhyCard w={w} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROCESS ══════════ */}
      <section id="process" style={{ padding: "112px 32px", borderBottom: G }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 64 }}>
            <div>
              <Label>HOW WE WORK</Label>
              <H2>Built on<br /><em style={{ fontStyle: "italic" }}>accountability.</em></H2>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted, lineHeight: 1.8, maxWidth: 340 }}>
              A structured process from first conversation to post-launch. No black boxes. No surprises.
            </p>
          </Reveal>

          <div className="grid-4">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 80} style={{ height: "100%" }}>
                <ProcessCard p={p} />
              </Reveal>
            ))}
          </div>

          {/* Connecting timeline */}
          <Reveal>
            <div style={{ marginTop: 48, display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
              {PROCESS.map((p, i) => (
                <div key={p.step} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    border: `1.5px solid ${C.accent}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.accent,
                    background: C.bg,
                  }}>{p.step}</div>
                  {i < PROCESS.length - 1 && (
                    <div style={{ width: "clamp(48px, 12vw, 140px)", height: 1, background: `linear-gradient(90deg, ${C.accent}, ${C.border})` }} />
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ APPROACH ══════════ */}
      <section style={{ padding: "112px 32px", background: C.surface, borderBottom: G }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div className="approach-layout">
            <Reveal>
              <Label>OUR APPROACH</Label>
              <H2>Engineering culture<br />is a <em style={{ fontStyle: "italic", color: C.accent }}>product<br />decision.</em></H2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.8, marginTop: 28 }}>
                The quality of a product is inseparable from the health of the team
                that builds it. Growth paths, mentorship, and knowledge transfer aren't perks —
                they're how we keep the standard high across every engagement.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.8, marginTop: 16 }}>
                Our hiring framework was built from scratch to select engineers who take ownership.
                You work with people who were chosen against a deliberate, rigorous standard.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div style={{ display: "flex", flexDirection: "column", gap: 1, background: C.border }}>
                {[
                  { m: "Product thinking first",        d: "Strategy and research before the first sprint" },
                  { m: "Individual growth paths",       d: "Every engineer knows where they're going" },
                  { m: "Structured mentorship",         d: "Tracked as a quality signal, not a checkbox" },
                  { m: "Technical assessment framework",d: "Custom-designed to hire top-tier talent" },
                  { m: "Milestone tracking",            d: "On-time delivery measured, not assumed" },
                  { m: "Regular alignment sessions",    d: "Clarity built into the rhythm of every project" },
                ].map((item, i) => (
                  <Reveal key={item.m} delay={i * 40}>
                    <div
                      style={{ background: C.surface, padding: "20px 28px", display: "flex", flexDirection: "column", gap: 5, transition: "background 0.2s", cursor: "default" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = C.surface2)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = C.surface)}
                    >
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: C.fg }}>{item.m}</div>
                      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.muted }}>{item.d}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section id="faq" style={{ padding: "112px 32px", borderBottom: G }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 64 }}>
            <Label>FAQ</Label>
            <H2>Common questions,<br /><em style={{ fontStyle: "italic" }}>straight answers.</em></H2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <Reveal>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.8 }}>
                We work best with teams that are ready to build. Whether you're a founder
                with a clear brief, a product team that needs senior engineering capacity, or a company
                looking for a technical partner from zero — we're likely a fit.
              </p>
              <div style={{ marginTop: 40 }}>
                <Btn onClick={() => scrollTo("contact")}>Start a conversation →</Btn>
              </div>
            </Reveal>
            <Reveal delay={80}>
              {FAQS.map((faq, i) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
              ))}
              <Divider />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT ══════════ */}
      <section id="contact" style={{ padding: "112px 32px", background: C.surface, borderBottom: G }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <Reveal>
              <Label>LET'S TALK</Label>
              <H2>Ready to build<br />something <em style={{ fontStyle: "italic", color: C.accent }}>exceptional?</em></H2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.8, marginTop: 28, maxWidth: 400 }}>
                We partner with ambitious teams that want world-class engineering and the
                strategic thinking to match. Tell us what you're building.
              </p>
              <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 8 }}>
                <a href="mailto:Michaelo@maywebltd.com" style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: C.accent, textDecoration: "none", letterSpacing: "0.03em" }}>
                  Michaelo@maywebltd.com
                </a>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.dim }}>
                  Response within 24 hours
                </span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              {submitted ? (
                <div style={{ background: C.surface2, border: G, borderRadius: 4, padding: 56, textAlign: "center" }}>
                  <div style={{ fontSize: 36, marginBottom: 16, color: C.accent }}>✓</div>
                  <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Message received</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: C.muted }}>We'll be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { key: "name",    label: "Your name",    type: "text",  ph: "Jane Smith" },
                    { key: "company", label: "Company",      type: "text",  ph: "Acme Inc." },
                    { key: "email",   label: "Email",        type: "email", ph: "jane@acme.com" },
                  ].map((f) => (
                    <div key={f.key}>
                      <FieldLabel>{f.label}</FieldLabel>
                      <input
                        type={f.type} placeholder={f.ph} required
                        value={(form as any)[f.key]}
                        onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = C.accent)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
                      />
                    </div>
                  ))}
                  <div>
                    <FieldLabel>Tell us about your project</FieldLabel>
                    <textarea
                      rows={5} placeholder="What are you building? What's the challenge?" required
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{ ...inputStyle, resize: "vertical" as const }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = C.accent)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = C.border)}
                    />
                  </div>
                  <div>
                    <Btn>Send message →</Btn>
                  </div>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer style={{ padding: "28px 32px", borderTop: G }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 28, height: 28, background: C.accent, borderRadius: 3,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'DM Mono', monospace", fontSize: 9, fontWeight: 700, color: C.bg,
            }}>MW</div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.dim }}>MayWeb Technologies Ltd.</span>
          </div>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {["services", "domains", "impact", "contact"].map((id) => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                fontFamily: "'Inter', sans-serif", fontSize: 12, color: C.dim,
                background: "none", border: "none", cursor: "pointer", textTransform: "capitalize",
                transition: "color 0.2s",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.muted)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.dim)}
              >{id}</button>
            ))}
          </div>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.dim }}>
            © {new Date().getFullYear()} MayWeb Technologies
          </div>
        </div>
      </footer>

    </div>
  );
}

/* ─── CARD COMPONENTS ─── */
function NavLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  const [h, setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: 13, color: h ? C.fg : C.muted, transition: "color 0.2s" }}>
      {children}
    </button>
  );
}

function ServiceCard({ s }: { s: typeof SERVICES[0] }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: h ? C.surface : C.bg, padding: "40px 36px", transition: "background 0.3s", height: "100%", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.dim }}>{s.n}</span>
        <span style={{ fontSize: 16, color: h ? C.accent : C.dim, transition: "color 0.3s" }}>{s.icon}</span>
      </div>
      <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, fontWeight: 600, marginBottom: 14, letterSpacing: "-0.015em", color: C.fg }}>{s.title}</h3>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.75, marginBottom: 24 }}>{s.body}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {s.tags.map((t) => (
          <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.muted, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 2, padding: "4px 10px", letterSpacing: "0.04em" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function DomainCard({ d }: { d: typeof DOMAINS[0] }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: h ? C.surface2 : C.surface, padding: "40px 36px", transition: "background 0.3s", height: "100%", boxSizing: "border-box" }}>
      <div style={{ width: 28, height: 2, background: h ? C.accent : C.dim, marginBottom: 24, transition: "background 0.3s, width 0.3s" }} />
      <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 12, letterSpacing: "-0.015em" }}>{d.title}</h3>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.75 }}>{d.body}</p>
    </div>
  );
}

function WhyCard({ w }: { w: typeof WHY[0] }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: h ? C.surface2 : C.surface, padding: "40px 36px", transition: "background 0.3s", height: "100%", boxSizing: "border-box" }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.accent, letterSpacing: "0.14em", marginBottom: 18 }}>
        {w.label.toUpperCase()}
      </div>
      <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 12, letterSpacing: "-0.015em" }}>{w.title}</h3>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.75 }}>{w.body}</p>
    </div>
  );
}

function ProcessCard({ p }: { p: typeof PROCESS[0] }) {
  const [h, setH] = useState(false);
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ background: h ? C.surface : C.bg, padding: "48px 40px", transition: "background 0.3s", height: "100%", boxSizing: "border-box" }}>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: C.accent, marginBottom: 28 }}>{p.step}</div>
      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 300, marginBottom: 16, letterSpacing: "-0.02em", fontStyle: "italic" }}>{p.title}</h3>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: C.muted, lineHeight: 1.75 }}>{p.body}</p>
    </div>
  );
}

function FieldLabel({ children }: { children: string }) {
  return (
    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: C.muted, letterSpacing: "0.12em", marginBottom: 8 }}>
      {children.toUpperCase()}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", background: C.surface2, border: `1px solid ${C.border}`,
  borderRadius: 2, padding: "12px 16px", color: C.fg,
  fontFamily: "'Inter', sans-serif", fontSize: 14, outline: "none",
  transition: "border-color 0.2s",
};

const C2 = C; // satisfy linter reference
