"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "../../lib/utils"
import { buttonVariants } from "./button"
import { Space_Mono,Poppins } from "next/font/google"
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

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: `text-xl font-medium ${poppins.className}`,
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          `size-8 bg-transparent opacity-97 hover:opacity-100 border-none ${poppins.className}`
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse",
        head_row: "flex justify-between px-1",
        head_cell: `text-[rgba(8,24,67,0.9)] rounded-md w-8 font-normal text-[0.8rem] ${poppins.className}`,
        row: "flex w-full mt-2 justify-between px-1",
        cell: cn(
          `relative p-0 text-center text-sm focus-within:relative focus-within:z-20 ${poppins.className}`,
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          `size-8 font-normal aria-selected:opacity-100 hover:bg-[#ff6600]/40 cursor-pointer ${poppins.className}`
        ),
        day_selected:
          "bg-gradient-to-b from-[#ff6600] via-[#FF7417] to-[#e70303] text-white hover:bg-gradient-to-b hover:from-[#ff6600] hover:via-[#FF7417] hover:to-[#e70303] hover:text-white focus:bg-gradient-to-b focus:from-[#ff6600] focus:via-[#FF7417] focus:to-[#e70303] focus:text-white",
        day_today: "bg-[rgba(8,24,67,0.1)] text-[rgba(8,24,67,0.9)] font-bold",
        day_outside: "text-muted-foreground opacity-96 ",
        day_disabled: "text-muted-foreground opacity-70",
        day_hidden: "invisible ",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-6 text-[rgba(255,55,55,0.9)]", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-6 text-[rgba(255,55,55,0.9)]", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}

export { Calendar }
