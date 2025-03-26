"use client"
import ThemeToggle from './ThemeToggle'
import { InteractiveHoverButton } from './interactive-hover-button'

import React, { useState, useEffect } from 'react'

import {Instrument_Serif} from 'next/font/google' 
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
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
  const handleThemeChange = (theme: 'light' | 'dark') => {
    setIsDarkMode(theme === 'dark')
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }
  return (
    <div className='flex space-x-4 p-3 px-auto'>    <button className='rounded-3xl text-xl p-3  shadow-input'><span>{isDarkMode ? '🌙' : '🔴'}</span>{" "}
    <span className="font-instserif-italic rounded-3xl px-1">How It Works?</span></button>
       <InteractiveHoverButton>CREATE CABPOOL</InteractiveHoverButton>
                   <span className='p-4'>
                       <SignedIn>
                       <UserButton appearance={{
elements:{
  userButtonBox:''
}
                       }}
                       />
                                        </SignedIn>
                   </span>
                 <span className='m-3'>
                     <ThemeToggle onThemeChange={handleThemeChange} />
                 </span>
                 </div>
  )
}

export default Navbar