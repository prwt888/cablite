
"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import {Instrument_Serif} from 'next/font/google' 
import Navbar from './Navbar'

const instserif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-instserif',
})

const Header: React.FC = () => {
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
    <header className="w-full py-2 absolute top-0 left-0 z-10">
      <div className="pl-4 pr-5 mx-auto flex justify-between items-center">
        <Image 
          src={isDarkMode ? "/images/Cablitedarkmodelogo.gif" : "/images/CabliteLightmodelogo.gif"}
          alt="Cablite" 
          width={250} 
          height={110} 
          priority
          className="rounded-3xl shadow-[0_20px_10px_rgb(0,0,0,0.12)] object-cover"
          style={{
            objectFit: 'cover',
            aspectRatio: '240/100',  // Maintain the aspect ratio
          }}
        />
<Navbar/>    
      </div>

    </header>
  )
}

export default Header