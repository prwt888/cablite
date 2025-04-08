"use client"
import React, { useState } from 'react'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import { useDarkMode } from '../../hooks/useDarkMode'
import { cn } from '../../lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip"

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
    setCount(prev => prev < 9 ? prev + 1 : prev)
  }

  const handleDecrement = () => {
    setCount(prev => prev > 0 ? prev - 1 : 0)
  }

  return (
    <div className={cn(
      "flex justify-center px-1 py-3 rounded-2xl ",
      isDarkMode 
        ? "bg-[#262626] border-1 border-[rgba(160,160,161,0.9)] shadow-[inset_18px_17px_4px_-6px_rgba(0,0,0,0.25)]"
        : "bg-[#EEEEEE] border-2 border-[rgba(8,24,67,0.9)] shadow-[inset_16px_11px_4px_-6px_rgba(0,0,0,0.25)]"
    )}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center space-x-1 cursor-help">
              <div className="relative w-[25px] h-[25px] mx-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill={isDarkMode ? "white" : "orange"}
                  stroke={isDarkMode ? "white" : "black"}
                  strokeWidth="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                  <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                  <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" ></path>
                </svg>
          
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent 
            className={cn(
              "p-2 rounded-lg",
              isDarkMode 
                ? "bg-[#1c1c1c] text-white border-1 border-[rgba(160,160,161,0.9)]" 
                : "bg-[#EEEEEE] text-[rgba(8,24,67,0.9)] border-1 border-[rgba(8,24,67,0.9)]"
            )}
          >
            <p className={`${poppins.className} text-xs `}>People in carpool</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex items-center gap-2 ml-1">
        <button
          onClick={handleDecrement}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 text-xl font-bold cursor-pointer",
            isDarkMode
              ? "bg-white text-[#1c1c1c] hover:bg-gray-200 active:scale-95  shadow-[inset_13px_7px_4px_-6px_rgba(0,0,0,0.25)] border-1 border-[rgba(160,160,161,0.9)]"
              : "bg-gradient-to-b from-[#ff6600] via-[#FF7417] to-[#e70303] text-white hover:opacity-90 active:scale-95"
          )}
        >
          -
        </button>

        <div
          className={cn(
            "w-8 text-center text-xl font-bold transition-all duration-300 transform",
            isDarkMode ? "text-white" : "text-[rgba(8,24,67,0.9)]",
            `${poppins.className}`
          )}
        >
          {count}
        </div>

        <button
          onClick={handleIncrement}
          disabled={count >= 9}
          className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 text-xl font-bold cursor-pointer",
            isDarkMode
              ? "bg-white text-[#1c1c1c] hover:bg-gray-200 active:scale-95 disabled:opacity-50 disabled:hover:bg-gray-500 disabled:cursor-not-allowed shadow-[inset_13px_7px_4px_-6px_rgba(0,0,0,0.25)] border-1 border-[rgba(160,160,161,0.9)]"
              : "bg-gradient-to-b from-[#ff6600] via-[#FF7417] to-[#e70303] text-white hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:hover:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          +
        </button>
      </div>
    </div>
  )
}
