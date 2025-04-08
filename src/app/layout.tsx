import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedOut,
} from '@clerk/nextjs'
import { Geist, Geist_Mono,Instrument_Serif, Space_Mono, Poppins } from 'next/font/google'
import {dark,neobrutalism} from '@clerk/themes'
import './globals.css'
import ThemeToggle from './components/ui/ThemeToggle'
import ClientProviders from './components/ClientProviders'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const instserif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instserif',
})
const space_mono = Space_Mono({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-space-mono',
})
const poppins = Poppins({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-poppins',
})


export const metadata: Metadata = {
  title: "CabLite-Your Ultimate Carpooling App",
  description: "Best Carpooling Application in the World",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClientProviders>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} ${instserif.variable} ${space_mono.variable} antialiased`}>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <ThemeToggle />
            </SignedOut>
          </header>
          {children}
        </body>
      </html>
    </ClientProviders>
  )
}
