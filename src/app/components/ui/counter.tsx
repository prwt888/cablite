"use client"
import React, { useState } from 'react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import { useDarkMode } from '../../hooks/useDarkMode'
import { cn } from '../../lib/utils'

const poppins = Poppins({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export default function Counter() {
  const [count, setCount] = useState(1)
  const { isDarkMode } = useDarkMode()

  const handleIncrement = () => {
    setCount(prev => prev < 8 ? prev + 1 : prev)
  }

  const handleDecrement = () => {
    setCount(prev => prev > 0 ? prev - 1 : 0)
  }

  return (
    <div className={cn(
      "relative flex items-center justify-between p-6 rounded-xl",
      isDarkMode 
        ? "bg-[#262626] border-1 border-[rgba(160,160,161,0.9)] shadow-[inset_18px_17px_4px_-6px_rgba(0,0,0,0.25)]"
        : "bg-[#EEEEEE] border-2 border-[rgba(8,24,67,0.9)] shadow-[inset_16px_11px_4px_-6px_rgba(0,0,0,0.25)]"
    )}>
      <div className="flex items-center gap-4">
      <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isDarkMode ? "white" : "rgba(8,24,67,0.9)"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                  <path d="M16 19h6" />
                  <path d="M19 16v6" />
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
                </svg>
        <span className={`${poppins.className} text-base`}>
          Maximum People Allowed
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleDecrement}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 text-2xl font-bold cursor-pointer",
            isDarkMode
              ? "bg-[#1c1c1c] text-white hover:bg-[#333] active:scale-95"
              : "bg-gradient-to-b from-[#ff6600] via-[#FF7417] to-[#e70303] text-white hover:opacity-90 active:scale-95"
          )}
        >
          -
        </button>

        <div
          className={cn(
            "w-16 text-center text-2xl font-bold transition-all duration-300 transform",
            isDarkMode ? "text-white" : "text-[rgba(8,24,67,0.9)]",
            `${poppins.className}`
          )}
        >
          {count}
        </div>

        <button
          onClick={handleIncrement}
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 text-2xl font-bold cursor-pointer",
            isDarkMode
              ? "bg-[#1c1c1c] text-white hover:bg-[#333] active:scale-95 "
              : "bg-gradient-to-b from-[#ff6600] via-[#FF7417] to-[#e70303] text-white hover:opacity-90 active:scale-95"
          )}
        >
          +
        </button>
      </div>
    </div>
  )
}
