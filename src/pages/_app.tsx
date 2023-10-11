import { AppProps } from "next/app"
import React from "react"
import { ReActorProvider } from "service/actor"
import "styles/global.css"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ReActorProvider>
      <Component {...pageProps} />
    </ReActorProvider>
  )
}

export default App
