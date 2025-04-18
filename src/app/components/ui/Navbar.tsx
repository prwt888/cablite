"use client"
import ThemeToggle from './ThemeToggle'
import { InteractiveHoverButton } from './interactive-hover-button'

import React, { useState, useEffect } from 'react'

import { Instrument_Serif } from 'next/font/google'
import {
  SignedIn,
  UserButton,
} from '@clerk/nextjs'

const instserif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instserif',
})

const Navbar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Check for dark mode on component mount and when theme changes
  useEffect(() => {
    // Initial check
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark-mode')
      setIsDarkMode(isDark)
    }

    checkDarkMode()

    // Set up an observer to detect class changes on the html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === 'class' &&
          mutation.target === document.documentElement
        ) {
          checkDarkMode()
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    // Clean up observer on component unmount
    return () => observer.disconnect()
  }, [])

  // Handle theme change from ThemeToggle component
  const handleThemeChange = (theme: 'light' | 'dark-mode') => {
    setIsDarkMode(theme === 'dark-mode')
    if (theme === 'dark-mode') {
      document.documentElement.classList.add('dark-mode')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark-mode')
    }
  }
  return (
    <div className='flex space-x-4 p-2'>    
    <button className={isDarkMode?'rounded-4xl px-5 opacity-95 bg-gradient-to-b from-[#1c1c1c] via-[#252525] to-[#464444] text-white':'rounded-4xl px-5  shadow-input'}>
    <span className='text-2xl italic'>{isDarkMode ? '❔' : '❓'}</span>{" "}
      <span className="font-instserif-italic font-medium px-1 text-2xl">How It Works
        </span>
        </button>
      <InteractiveHoverButton>DASHBOARD</InteractiveHoverButton>
      <span className='p-2'>
        <SignedIn>
          <UserButton
          />
        </SignedIn>
      </span>
      <span className='flex items-center'>
        <ThemeToggle onThemeChange={handleThemeChange} />
      </span>
    </div>
  )
}

export default Navbar