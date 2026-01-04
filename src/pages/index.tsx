import Head from "next/head"
import Image from "next/image"

import styles from "styles/Home.module.css"

import Greeting from "components/Greeting"
import Login from "components/Login"

function HomePage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Internet Computer</title>
      </Head>
      <main className={styles.main}>
        <h3 className={styles.title}>
          Welcome to the Internet Computer starter template
        </h3>
        <Login />
        <Greeting />
      </main>
      <footer className={styles.footer}>
        <a
          href="https://internetcomputer.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            width={140}
            height={35}
            src="/icp-logo.png"
            alt="Internet Computer logo"
            className={styles.logo}
          />
        </a>
      </footer>
    </div>
  )
}

export default HomePage
