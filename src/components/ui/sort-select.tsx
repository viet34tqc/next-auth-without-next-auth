'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

interface SortOption {
  label: string
  value: string
}

interface SortSelectProps {
  options: SortOption[]
  defaultValue: string
  paramName?: string
  placeholder?: string
  className?: string
  triggerClassName?: string
  onValueChange?: (value: string) => void
}

export default function SortSelect({
  options,
  defaultValue,
  paramName = 'sort',
  placeholder = 'Sort by',
  className,
  triggerClassName = 'w-[180px]',
  onValueChange,
}: SortSelectProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const updateSortParam = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value && value !== defaultValue) {
      params.set(paramName, value)
    } else {
      params.delete(paramName)
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleValueChange = (value: string) => {
    updateSortParam(value)
    onValueChange?.(value)
  }

  const currentValue = searchParams.get(paramName) || defaultValue

  return (
    <Select value={currentValue} onValueChange={handleValueChange}>
      <SelectTrigger className={triggerClassName}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={className}>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
