'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

interface DatePickerProps {
  name: string
  defaultValue?: Date
  onChange?: (date: Date | undefined) => void
  className?: string
}

export function DatePicker({ name, defaultValue, onChange, className }: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(defaultValue)
  const [open, setOpen] = useState(false)

  // Update internal state when defaultValue changes
  useEffect(() => {
    if (defaultValue) {
      setDate(defaultValue)
    }
  }, [defaultValue])

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (onChange) {
      onChange(selectedDate)
    }
    setOpen(false)
  }

  return (
    <div className={className}>
      {name && (
        <input
          type='hidden'
          name={name}
          id={`${name}-hidden`}
          value={date && !isNaN(date.getTime()) ? date.toISOString() : ''}
        />
      )}
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button
            type='button'
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start' side='bottom' sideOffset={4}>
          <Calendar
            mode='single'
            selected={date}
            onSelect={handleSelect}
            initialFocus
            disabled={(date) => date < new Date('1900-01-01')}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
