"use client"

import { ArrowRight } from "lucide-react";
import { cn } from "@/app/lib/utils";
import React, { useState, useEffect } from 'react'

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, ...props }, ref) => {
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
    <button
      ref={ref}
      className={cn(isDarkMode ? "group relative w-auto cursor-pointer overflow-hidden rounded-full   bg-gradient-to-b from-[#03097c] via-[#024d82] to-[#0281bb] p-3 px-6 text-center text-2xl font-mono font-bold text-white shadow-[7px_9px_4px_rgba(0,0,0,0.15)]" : "group relative w-auto cursor-pointer overflow-hidden rounded-full   bg-gradient-to-b from-[#ff6600] via-[#FF7417] to-[#e70303] p-3 px-6 text-center text-2xl font-mono font-bold text-white shadow-[7px_9px_4px_rgba(0,0,0,0.15)]",
        className,
      )}
      {...props}
     >
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:scale-[100]"></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className={isDarkMode ? "absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-1 text-[#1820ac] opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100" : "absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-1 text-[#FF7417] opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100"}>
        <span>{children}</span>
        <ArrowRight />
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
