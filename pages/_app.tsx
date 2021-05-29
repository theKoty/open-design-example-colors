import Head from 'next/head'
import type { AppProps } from 'next/app'

import Header from '../src/components/Header'

import '../public/styles/normalize.css'
import '../public/styles/global.css'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SDK Example: Colors</title>

        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;600&display=swap'
          rel='stylesheet'
        />
      </Head>

      <Header />

      <main>
        <Component {...pageProps} />
      </main>
    </>
  )
}

export default CustomApp
