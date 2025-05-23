'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from '../ui/input'

const DEBOUNCE_DELAY = 300

const SearchInput = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const updateSearchParams = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }

    replace(`${pathname}?${params.toString()}`)
  }, DEBOUNCE_DELAY)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    updateSearchParams(value)
  }

  return (
    <Input
      onChange={handleChange}
      defaultValue={searchParams.get('q')?.toString()}
      placeholder='Search posts...'
      className='flex-1'
    />
  )
}

export default SearchInput
