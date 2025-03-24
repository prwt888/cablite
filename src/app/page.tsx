
// File: /pages/index.tsx
import Head from 'next/head';
import Hero from './components/Hero';
import Header from "./components/Header"
export default function Home() {
  return (
    <div >
      <Head>
        <title>CabLite</title>
        <meta name="description" content="Best Carpooling app ever made" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


 
      <Header/>

      <Hero/>

    </div>
  );
}