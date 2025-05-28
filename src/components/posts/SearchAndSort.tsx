'use client'

import SortSelect from '@/components/ui/sort-select'
import { FC } from 'react'
import { SORT_OPTIONS_LIST } from './constants'
import SearchInput from './SearchInput'

const SearchAndSort: FC = () => {
  return (
    <div className='flex gap-2 mb-5'>
      <SearchInput />
      <SortSelect options={SORT_OPTIONS_LIST} defaultValue='newest' />
    </div>
  )
}

export default SearchAndSort
