"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../../styles/hero.module.css'

interface HeroProps {
  className?: string
}

const Hero: React.FC<HeroProps> = ({ className = 'mb-0' }) => {
  // Track theme for image switching (light/dark)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check if we're in dark mode
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark-mode'))
    }
    
    // Initial check
    checkDarkMode()
    
    // Set up observer to watch for class changes on html element
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
    
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`${styles.heroContainer} ${className}`}>
      <div className={styles.heroImage}>
        {/* Use Image component for optimized loading */}
        <Image
          src={isDarkMode ? '/images/herodark.png' : '/images/herolight.png'}
          alt="Hero background"
          priority={true}
          fill
            style={{ objectFit: 'cover', objectPosition: 'top' ,zIndex:-10}}
        />
      </div>
    </div>
  )
}

export default Hero