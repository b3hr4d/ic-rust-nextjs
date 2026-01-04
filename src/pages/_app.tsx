import { AppProps } from "next/app"
import React from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "lib/reactor"
import "styles/global.css"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

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
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
