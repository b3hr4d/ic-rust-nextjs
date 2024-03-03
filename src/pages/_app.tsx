import { AppProps } from "next/app"
import React from "react"
import "styles/global.css"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App
