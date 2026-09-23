import { useCallback, useEffect, useState } from "react"
import HomePage from "./pages/HomePage"

import { useHomePage } from "./hooks/useHomePage"

export default function App() {
  const homePageProps = useHomePage()
  return <HomePage {...homePageProps} />
}
