'use client'

import * as React from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface AvailableSlots {
  [date: string]: {
    slots: string[];
  };
}

interface CalendarProps {
  onDateTimeSelect?: (date: Date, time: string) => void
  className?: string
}

export function CustomCalendar({ onDateTimeSelect, className }: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null)
  const [availableSlots, setAvailableSlots] = React.useState<AvailableSlots>({})
  const [isLoading, setIsLoading] = React.useState(false)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  // Fetch available slots
  React.useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/checkBookedSlots', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          })
        })

        if (!response.ok) {
          throw new Error('Failed to fetch slots')
        }

        const data = await response.json()
        setAvailableSlots(data.availableSlots)
      } catch (error) {
        console.error('Error fetching slots:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAvailableSlots()
  }, [])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    
    const days: (number | null)[] = []
    
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    
    // Add empty slots for days after the last day of the month
    while (days.length < 42) {
      days.push(null)
    }
    
    return days
  }

  const handleDateClick = (day: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(newDate)
  }

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    setCurrentDate(prevMonth)
  }

  const handleNextMonth = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    setCurrentDate(nextMonth)
  }

  const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })

  // Check if a date has available slots
  const hasAvailableSlots = (day: number | null) => {
    if (!day) return false
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const dateKey = format(date, 'yyyy-MM-dd')
    return availableSlots[dateKey]?.slots?.length > 0
  }

  return (
    <div className={cn("w-full max-w-[800px] mx-auto pt-8", className)}>
      <div className="flex flex-col md:flex-row items-start justify-center gap-8">
        <div className="w-[343px] mx-auto">
          <div className="w-full rounded-xl border-[3px] border-[rgba(217,201,153,0.8)] bg-gradient-to-b from-[#51422F] to-[#121212] shadow-[inset_0px_0px_40px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="p-4">
              {/* Month and navigation */}
              <div className="flex items-center justify-between mb-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handlePrevMonth}
                  className="text-white hover:text-white hover:bg-transparent"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <span className="text-xl font-bold text-white text-center flex-1 font-['Harmonia_Sans_Pro_Cyr'] drop-shadow-[0_0_12px_rgba(252,204,115,1)]">
                  {monthYear}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleNextMonth}
                  className="text-white hover:text-white hover:bg-transparent"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>

              {/* Days header */}
              <div className="grid grid-cols-7 mb-2">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="h-[42px] flex items-center justify-center text-white font-['Harmonia_Sans_Pro_Cyr']"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Date grid */}
              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth(currentDate).map((day, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-[42px] flex items-center justify-center",
                      day === null && "opacity-25"
                    )}
                  >
                    {day && (
                      <button
                        onClick={(e) => handleDateClick(day, e)}
                        disabled={!hasAvailableSlots(day) || isLoading}
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-white font-['Harmonia_Sans_Pro_Cyr'] text-lg",
                          !hasAvailableSlots(day) && "opacity-50 cursor-not-allowed",
                          isLoading && "cursor-wait",
                          selectedDate?.getDate() === day &&
                          selectedDate?.getMonth() === currentDate.getMonth() &&
                          "bg-gradient-to-r from-[#D7C798] via-[#EDE4CC] to-[#D7C798] text-[#3A3022] font-bold"
                        )}
                      >
                        {day}
                      </button>
                    )}
                    {day === null && <span className="text-white/25 text-lg">1</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-[300px] max-w-[343px] mx-auto w-full h-[460px]">
          <div>
            <label
              className="text-lg font-semibold font-seasons mb-3 block"
              style={{ textShadow: "0 0 20px #FCCC73" }}
            >
              {isLoading ? "Loading..." : "Scheduled Time"}
            </label>
            <div className="bg-[#554735] border-[1px] border-[#827E4B] rounded-full py-3 px-6 text-white font-harmonia text-center">
              {selectedTime && selectedDate 
                ? `${format(new Date(selectedTime), 'ha')} ${format(selectedDate, 'MMMM d yyyy')}` 
                : isLoading ? "Loading available slots..." : "Select a date and time"}
            </div>
          </div>
          
          {selectedDate && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold font-seasons mb-4" style={{ textShadow: "0 0 20px #FCCC73" }}>
                Available Times
              </h3>
              <div className="h-[280px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-3 gap-3">
                  {isLoading ? (
                    <div className="col-span-3 text-center text-white">Loading available times...</div>
                  ) : (
                    availableSlots[format(selectedDate, 'yyyy-MM-dd')]?.slots.map((time) => (
                      <button
                        key={time}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedTime(time);
                          if (onDateTimeSelect && selectedDate) {
                            onDateTimeSelect(selectedDate, time);
                          }
                        }}
                        className={cn(
                          "py-2.5 px-3 text-sm rounded-lg text-white font-['Harmonia_Sans_Pro_Cyr'] transition-all",
                          selectedTime === time
                            ? "bg-gradient-to-r from-[#D7C798] via-[#EDE4CC] to-[#D7C798] text-[#3A3022] shadow-[0_0_20px_rgba(215,199,152,0.3)]"
                            : "bg-[#51422F] hover:bg-[#61523F]"
                        )}
                      >
                        {format(new Date(time), 'h:mm a')}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}