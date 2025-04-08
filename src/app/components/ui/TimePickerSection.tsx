"use client"
import React, { useState } from 'react'
import Image from "next/image"
import { useId } from "react"
import { Poppins } from 'next/font/google'
import { cn } from "../../lib/utils"
import { Button } from "./button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"
import { ScrollArea } from "./scroll-area"
import { useDarkMode } from '../../hooks/useDarkMode'
const poppins = Poppins({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

interface TimeRange {
  from: string | null;
  to: string | null;
}

export default function TimePickerSection() {
  const fromId = useId();
  const toId = useId();
  const [timeRange, setTimeRange] = useState<TimeRange>({ from: null, to: null });
  const [error, setError] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const formatTime = (time: string) => {
    if (!time) return null;
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleTimeSelect = (type: 'from' | 'to', time: string) => {
    setError(null);
    setHasError(false);
    const newTimeRange = { ...timeRange, [type]: time };
    setTimeRange(newTimeRange);

    // Validate time range
    if (newTimeRange.from && newTimeRange.to) {
      const fromTime = new Date(`1970-01-01 ${newTimeRange.from}`);
      const toTime = new Date(`1970-01-01 ${newTimeRange.to}`);

      if (toTime < fromTime) {
        setError("Please enter the correct time range");
        setHasError(true);
      }
    }
  };

  const clearTime = (type: 'from' | 'to') => {
    setTimeRange(prev => ({ ...prev, [type]: null }));
    setError(null);
    setHasError(false);
  };

  const TimePickerPopover = ({ type }: { type: 'from' | 'to' }) => {
    // Initialize state from existing timeRange when available
    const initializeTimeValues = () => {
      if (timeRange[type]) {
        const [hours, minutes] = timeRange[type]!.split(':');
        const hour = parseInt(hours);
        const minute = parseInt(minutes);
        return {
          hour: hour > 12 ? hour - 12 : hour,
          minute,
          isAM: hour < 12
        };
      }
      return { hour: null, minute: null, isAM: true };
    };

    const { hour, minute, isAM: initialIsAM } = initializeTimeValues();
    const [selectedHour, setSelectedHour] = useState<number | null>(hour);
    const [selectedMinute, setSelectedMinute] = useState<number | null>(minute);
    const [isAM, setIsAM] = useState(initialIsAM);
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode } = useDarkMode();

    const handleConfirm = () => {
      if (selectedHour && selectedMinute !== null) {
        const hour = isAM ? selectedHour : selectedHour + 12;
        const timeString = `${hour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
        handleTimeSelect(type, timeString);
        setIsOpen(false);
      }
    };

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              isDarkMode 
                ? ` w-full bg-[#262626] border-1 ${hasError ? 'border-red-500' : 'border-[rgba(160,160,161,0.9)]'} shadow-[inset_18px_17px_4px_-6px_rgba(0,0,0,0.25)] rounded-xl py-6 justify-start text-left ${poppins.className} font-medium` 
                : ` w-full bg-[#EEEEEE] border-2 ${hasError ? 'border-red-500' : 'border-[rgba(8,24,67,0.9)]'} shadow-[inset_16px_11px_4px_-6px_rgba(0,0,0,0.25)] rounded-xl py-6 justify-start text-left ${poppins.className} font-medium`,
              !timeRange[type] && "text-muted-foreground"
            )}
          >
            <Image
              src="/images/clock.svg"
              alt="Clock Icon"
              width={25}
              height={23}
            />
            {timeRange[type] ? (
              <span className={`pl-1 text-base ${poppins.className}`}>
                {type === 'from' ? 'From: ' : 'To: '}{formatTime(timeRange[type])}
              </span>
            ) : (
              <span className={`pl-1 text-base ${poppins.className}`}>
                Select {type === 'from' ? 'start' : 'end'} time
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={isDarkMode ? "text-white bg-[#262626] border-1 border-[rgba(160,160,161,0.9)] shadow-[inset_18px_17px_4px_-6px_rgba(0,0,0,0.25)] rounded-4xl p-4 w-[300px] z-50" : "bg-[#EEEEEE] border-2 border-[rgba(8,24,67,0.9)] shadow-lg rounded-4xl p-4 w-[300px] z-50"}>
          <div className="flex gap-1">
            <div className="flex-1">
              <ScrollArea className="h-[200px] rounded-md ">
                <div className="shadow-lg mr-3">
                  {hours.map((hour) => (
                    <Button
                      key={hour}
                      variant={selectedHour === hour ? "default" : "ghost"}
                      className={cn(
                        `w-full justify-start ${poppins.className}`,
                        selectedHour === hour && "bg-gradient-to-b from-blue-500 to-blue-700 text-white"
                      )}
                      onClick={() => setSelectedHour(hour)}
                    >
                      {hour}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="flex-1">
              <ScrollArea className="h-[200px] rounded-md">
                <div className="shadow-lg mr-3">
                  {minutes.map((minute) => (
                    <Button
                      key={minute}
                      variant={selectedMinute === minute ? "default" : "ghost"}
                      className={cn(
                        `w-full justify-start ${poppins.className}`,
                        selectedMinute === minute && "bg-gradient-to-b from-blue-500 to-blue-700 text-white"
                      )}
                      onClick={() => setSelectedMinute(minute)}
                    >
                      {minute.toString().padStart(2, '0')}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant={isAM ? "default" : "ghost"}
                className={cn(
                  `w-full  ${poppins.className}`,
                  isAM && "bg-gradient-to-b from-blue-500 to-blue-700 text-white"
                )}
                onClick={() => setIsAM(true)}
              >
                AM
              </Button>
              <Button
                variant={!isAM ? "default" : "ghost"}
                className={cn(
                  `w-full ${poppins.className}`,
                  !isAM && "bg-gradient-to-b from-blue-500 to-blue-700 text-white"
                )}
                onClick={() => setIsAM(false)}
              >
                PM
              </Button>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={() => clearTime(type)}
              className={`cursor-pointer border-red-500 bg-gradient-to-b from-red-500 to-red-700 text-white hover:text-white hover:from-red-600 hover:to-red-800 ${poppins.className}`}
            >
              Clear
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedHour || selectedMinute === null}
              className={`cursor-pointer bg-gradient-to-b from-green-500 to-green-700 text-white hover:from-green-600 hover:to-green-800 ${poppins.className}`}
            >
              Confirm
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className="z-10 w-full">
      <div className="flex gap-1">
        <div className="w-1/2">
          <TimePickerPopover type="from" />
        </div>
        <div className="w-1/2">
          <TimePickerPopover type="to" />
        </div>
      </div>
      {error && (
        <div className={`text-red-500 text-sm ${poppins.className} mt-2`}>
          {error}
        </div>
      )}
    </div>
  );
} 