import type { ChangeEvent, FormEvent } from "react"
import { C } from "../../styles/theme"
import type { FormState } from "../../hooks/useHomePage"
import { Btn, FieldLabel, H2, Label, Reveal, inputStyle } from "../ui"

const BORDER = `1px solid ${C.border}`
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

export default function ContactSection({
  form,
  setForm,
  submitted,
  setSubmitted,
}: {
  form: FormState
  setForm: (form: FormState) => void
  submitted: boolean
  setSubmitted: (submitted: boolean) => void
}) {
  const fieldChange =
    (key: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [key]: event.target.value })
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
