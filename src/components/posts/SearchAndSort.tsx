'use client'

import { FC } from 'react'
import SearchInput from './SearchInput'
import SortSelect from './SortSelect'

const SearchAndSort: FC = () => {
  return (
    <div className='flex gap-2 mb-5'>
      <SearchInput />
      <SortSelect />
    </div>
  )
}

export default SearchAndSort
