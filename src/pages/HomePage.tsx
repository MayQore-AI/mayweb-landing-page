import type { FormState } from "../hooks/useHomePage"
import ContactSection from "../components/home/ContactSection"
import HomeSections from "../components/home/HomeSections"
import { Footer, Hero, SiteNav } from "../components/home/SiteChrome"

export type HomePageProps = {
  scrolled: boolean
  openFaq: number | null
  setOpenFaq: (index: number | null) => void
  form: FormState
  setForm: (form: FormState) => void
  submitted: boolean
  setSubmitted: (submitted: boolean) => void
  scrollTo: (id: string) => void
}

export default function HomePage(props: HomePageProps) {
  return (
    <div
      className="noise"
      style={{
        background: "#0b0906",
        color: "#f0ebe2",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <SiteNav scrolled={props.scrolled} scrollTo={props.scrollTo} />
      <Hero scrollTo={props.scrollTo} />
      <HomeSections
        openFaq={props.openFaq}
        setOpenFaq={props.setOpenFaq}
        scrollTo={props.scrollTo}
      />
      <ContactSection
        form={props.form}
        setForm={props.setForm}
        submitted={props.submitted}
        setSubmitted={props.setSubmitted}
      />
      <Footer scrollTo={props.scrollTo} />
    </div>
  )
}
