'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { SORT_OPTIONS_LIST } from './constants'

const SortSelect = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const updateSortParam = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set('sort', value)
    } else {
      params.delete('sort')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleValueChange = (value: string) => {
    updateSortParam(value)
  }

  return (
    <Select onValueChange={handleValueChange} defaultValue={searchParams.get('sort') || 'newest'}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Sort by' />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS_LIST.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SortSelect
