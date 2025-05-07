'use client'

import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import * as SelectPrimitive from '@radix-ui/react-select'

interface SelectWithHiddenInputProps extends React.ComponentProps<typeof SelectPrimitive.Root> {
  name: string
  options: { value: string; label: string }[]
  defaultValue?: string
  placeholder?: string
  className?: string
  triggerClassName?: string
}

export function SelectWithHiddenInput({
  name,
  options,
  defaultValue,
  placeholder = 'Select an option',
  className,
  triggerClassName,
  onValueChange,
  ...props
}: SelectWithHiddenInputProps) {
  // Handle both the component's onValueChange and updating the hidden input
  const handleValueChange = (value: string) => {
    // Update the hidden input
    const hiddenInput = document.getElementById(`${name}-hidden`) as HTMLInputElement
    if (hiddenInput) hiddenInput.value = value

    // Call the original onValueChange if provided
    if (onValueChange) {
      onValueChange(value)
    }
  }

  return (
    <div className={className}>
      <input type='hidden' name={name} id={`${name}-hidden`} value={defaultValue || ''} />
      <Select name={name} defaultValue={defaultValue} onValueChange={handleValueChange} {...props}>
        <SelectTrigger className={triggerClassName || 'w-full'}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
