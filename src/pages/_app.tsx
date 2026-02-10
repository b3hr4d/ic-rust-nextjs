import { AppProps } from "next/app"
import React, { useEffect } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { clientManager, queryClient } from "lib/reactor"
import "styles/global.css"
import { useAgentState } from "lib/hooks"

/**
 * Next.js App Component
 *
 * Wraps the application with QueryClientProvider for TanStack Query,
 * enabling caching and state management for IC Reactor queries.
 */
const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default App
