import { useCallback, useEffect, useState } from "react"

export type FormState = {
  name: string
  company: string
  email: string
  message: string
}

const initialForm: FormState = {
  name: "",
  company: "",
  email: "",
  message: "",
}

export function useHomePage() {
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return {
    scrolled,
    openFaq,
    setOpenFaq,
    form,
    setForm,
    submitted,
    setSubmitted,
    scrollTo,
  }
}
