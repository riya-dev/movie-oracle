import type { AppProps } from 'next/app'
import '../styles/index.css'
import NavBar from '../components/NavBar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <NavBar /> */}
      <Component {...pageProps} />
    </>
  );
}