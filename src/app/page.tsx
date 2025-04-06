
// File: /pages/index.tsx
import Head from 'next/head';
import Hero from './components/ui/Hero';
import Header from "./components/ui/Header"
import SearchSection from "./components/ui/SearchSection"
export default function Home() {
  return (
    <div>
      <Head>
        <title>CabLite</title>
        <meta name="description" content="Best Carpooling app ever made" />
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <Header />

      <Hero />
      <SearchSection />
    </div>
  );
}