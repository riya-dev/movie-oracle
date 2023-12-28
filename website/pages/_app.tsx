import type { AppProps } from 'next/app'
import '../styles/index.css'
import '../styles/NavBar.css'
import NavBar from './NavBar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}