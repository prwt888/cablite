"use client"
import React, { useState, useEffect } from 'react'
import { Input } from "./input";
import Image from "next/image";
import { useId } from "react";
import { Instrument_Serif,Poppins } from 'next/font/google';
import { format } from "date-fns"
import TimePickerSection from './TimePickerSection'
import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import Counter from './counter'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"
import { useDarkMode } from "../../hooks/useDarkMode"

const poppins = Poppins({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-poppins',
})    




export default function SearchSection() {
  const fromId = useId();
  const toId = useId();
  const [date, setDate] = React.useState<Date>()
  const { isDarkMode } = useDarkMode();

  return (
    <div className="z-10 w-full max-w-full mx-auto -mt-13">
      <div className={isDarkMode?"bg-[#1c1c1c] border-1 border-[rgba(160,160,161,0.9)] shadow-[inset_18px_17px_4px_-6px_rgba(0,0,0,0.25)] rounded-3xl p-6 mx-8":"bg-[#F7F6FF] border-2 border-[rgba(8,24,67,0.9)] shadow-[inset_18px_17px_4px_-6px_rgba(0,0,0,0.25)] rounded-3xl p-6 mx-8"}>
        <div className="flex flex-col gap-6">
          {/* Leaving From Section */}
          <div className="group relative">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Image
                  src="/images/leaveicon.png"
                  alt="Leave Icon"
                  width={20}
                  height={20}
                />
              </div>
              <Input
                id={fromId}
                type="text"
                placeholder=""
                className={isDarkMode 
                  ? `text-white w-full bg-[#262626] border-1 border-[rgba(160,160,161,0.9)] shadow-[inset_18px_17px_4px_-6px_rgba(0,0,0,0.25)] rounded-xl ${poppins.className}`
                  : `w-full bg-[#EEEEEE] border-2 border-[rgba(8,24,67,0.9)] shadow-[inset_16px_11px_4px_-6px_rgba(0,0,0,0.25)] rounded-xl ${poppins.className}`
                }
              />
            </div>
            <label
              htmlFor={fromId}
              className="origin-start absolute left-14 top-1/2 block -translate-y-1/2 cursor-text px-1 text-xl text-white transition-all z-20
              group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:left-6 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:z-30
              has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:left-4 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium"
            >
              <span className={`inline-flex bg-gradient-to-b from-[#ff6600] via-[#FF7417] to-[#e70303] rounded-md px-2 py-1 ${poppins.className} font-medium`}>Leaving From :</span>
            </label>
          </div>

          {/* Going To Section */}
          <div className="group relative">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                <Image
                  src="/images/goingtoicon.png"
                  alt="Going To Icon"
                  width={20}
                  height={20}
                />
              </div>
              <Input
                id={toId}
                type="text"
                placeholder=""
                className={isDarkMode 
                  ? `text-white w-full bg-[#262626] border-1 border-[rgba(160,160,161,0.9)] shadow-[inset_18px_17px_4px_-6px_rgba(0,0,0,0.25)] rounded-xl ${poppins.className}`
                  : `w-full bg-[#EEEEEE] border-2 border-[rgba(8,24,67,0.9)] shadow-[inset_16px_11px_4px_-6px_rgba(0,0,0,0.25)] rounded-xl ${poppins.className}`
                }
              />
            </div>
            <label
              htmlFor={toId}
              className="origin-start absolute left-14 top-1/2 block -translate-y-1/2 cursor-text px-1 text-xl text-white transition-all z-20
              group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:left-6 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:z-30
              has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:left-4 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium"
            >
              <span className={`inline-flex bg-gradient-to-b from-[#21b807] via-[#6acb03] to-[#21b807] rounded-md px-7 py-1 ${poppins.className} font-medium`}>Going  To :</span>
            </label>
          </div>
          {/* Calendar Popover with custom styling */}
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                  isDarkMode ? `w-full bg-[#262626] border-1 border-[rgba(160,160,161,0.9)] shadow-[inset_18px_17px_4px_-6px_rgba(0,0,0,0.25)] rounded-xl py-8 justify-start text-xl text-left ${poppins.className} font-medium` : `w-full bg-[#EEEEEE] border-2 border-[rgba(8,24,67,0.9)] shadow-[inset_16px_11px_4px_-6px_rgba(0,0,0,0.25)] rounded-xl py-8 justify-start text-xl text-left ${poppins.className} font-medium`,
                  
                    !date && "text-muted-foreground"
                  )}
                >
                  <Image
                    src="/images/calenderlighticon.png"
                    alt="Calendar Icon"
                    width={25}
                    height={23}
                  />
                  {date ? format(date, "PPP") : <span className={`pl-3 text-base ${poppins.className}`}>Pick a date for Carpool</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className={isDarkMode 
                  ? "text-white bg-[#262626] border-1 border-[rgba(160,160,161,0.9)] shadow-[inset_18px_17px_4px_-6px_rgba(0,0,0,0.25)] rounded-4xl"
                  : "bg-[#EEEEEE] border-2 border-[rgba(8,24,67,0.9)] shadow-lg rounded-4xl"
                }
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="rounded-4xl"
                  fromDate={new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          <TimePickerSection />
          <Counter />
          <button className={isDarkMode ? `cursor-pointer bg-gradient-to-b from-[#03097c] via-[#014575] to-[#001282] rounded-4xl px-10 py-4 text-white text-3xl font-extrabold shadow-[inset_18px_17px_4px_-6px_rgba(0,0,0,0.25)] ${poppins.className}` : `cursor-pointer bg-gradient-to-b from-[#ff6600] via-[#FF7417] to-[#e70303] rounded-4xl px-5 py-4 text-white text-3xl font-extrabold  ${poppins.className}`}>
            <span className='flex items-center gap-3'>
            <Image src="/images/search.svg" alt="Search Icon" width={30} height={30} />
            Search</span>
            </button>

        </div>
      </div>
    </div>
  )
}
