"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "../../lib/utils"
import { buttonVariants } from "./button"
import { Poppins } from "next/font/google"
import { useDarkMode } from "../../hooks/useDarkMode"

const poppins = Poppins({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const { isDarkMode } = useDarkMode();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: isDarkMode ? `text-white text-xl font-medium ${poppins.className}` : `text-xl font-medium ${poppins.className} text-[rgba(8,24,67,0.9)]`,
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          `size-8 bg-transparent opacity-97 hover:opacity-100 border-none ${poppins.className}`,
          isDarkMode ? 'text-white' : 'text-[rgba(8,24,67,0.9)]'
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: cn(
          "w-full border-collapse",
          isDarkMode ? "bg-[#262626]" : "bg-transparent"
        ),
        head_row: "flex justify-between px-1",
        head_cell: cn(
          `rounded-md w-8 font-normal text-[0.8rem] ${poppins.className}`,
          isDarkMode ? "text-white" : "text-[rgba(8,24,67,0.9)]"
        ),
        row: "flex w-full mt-2 justify-between px-1",
        cell: cn(
          `relative p-0 text-center text-sm focus-within:relative focus-within:z-20 ${poppins.className}`,
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          `size-8 font-normal aria-selected:opacity-100 cursor-pointer ${poppins.className}`,
          isDarkMode 
            ? "hover:bg-[#1c1c1c] text-white hover:text-white" 
            : "hover:bg-[#ff6600]/40 text-[rgba(8,24,67,0.9)]"
        ),
        day_selected:
          "bg-gradient-to-b from-[#ff6600] via-[#FF7417] to-[#e70303] text-white hover:bg-gradient-to-b hover:from-[#ff6600] hover:via-[#FF7417] hover:to-[#e70303] hover:text-white focus:bg-gradient-to-b focus:from-[#ff6600] focus:via-[#FF7417] focus:to-[#e70303] focus:text-white",
        day_today: cn(
          isDarkMode 
            ? " bg-gradient-to-b from-[#555657] via-[#434445] to-[#555657] text-white font-bold"
            : "bg-[rgba(8,24,67,0.1)] text-[rgba(8,24,67,0.9)] font-bold"
        ),
        day_outside: "text-muted-foreground opacity-65 ",
        day_disabled: "text-muted-foreground opacity-50",
        day_hidden: "invisible ",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-6 text-[rgba(255,55,55,0.9)]", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-6 text-[rgba(255,55,55,0.9)] ", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}

export { Calendar }
