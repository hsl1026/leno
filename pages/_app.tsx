import '../styles/styles.css'
import 'bootstrap/dist/css/bootstrap.css'
import Script from 'next/script'
import '../images/font/iconfont.css'
import '../i18n/config'

import type { AppProps } from 'next/app'
import { MainLayout } from "../components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  </>
}

export default MyApp
