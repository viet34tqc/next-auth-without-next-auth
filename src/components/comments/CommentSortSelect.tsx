'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { COMMENT_SORT_OPTIONS_LIST } from './constants'

export function CommentSortSelect() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const updateSortParam = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value && value !== 'newest') {
      params.set('commentSort', value)
    } else {
      params.delete('commentSort')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleValueChange = (value: string) => {
    updateSortParam(value)
  }

  return (
    <Select value={searchParams.get('commentSort') || 'newest'} onValueChange={handleValueChange}>
      <SelectTrigger className='w-40'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {COMMENT_SORT_OPTIONS_LIST.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
