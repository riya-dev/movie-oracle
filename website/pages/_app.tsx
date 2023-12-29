import type { AppProps } from 'next/app'
import '../styles/index.css'
import NavBar from './NavBar'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <div className='navbar'></div> */}
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}