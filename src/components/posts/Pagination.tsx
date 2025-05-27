'use client'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { PAGE_SIZE_OPTIONS } from './constants'

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
}

export default function Pagination({ currentPage, totalItems, itemsPerPage }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const createPageURL = (pageNumber: number, newItemsPerPage?: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    if (newItemsPerPage) {
      params.set('limit', newItemsPerPage.toString())
    }
    return `?${params.toString()}`
  }

  const handlePageChange = (pageNumber: number) => {
    // We can also use router replace like in the SearchInput and SortSelect component
    router.push(createPageURL(pageNumber))
  }

  const handlePageSizeChange = (newSize: string) => {
    const newPageSize = parseInt(newSize, 10)
    // If current page would be out of bounds with new page size, reset to page 1
    // For example, if you're on page 3 with 10 items per page, the first item on that page is at position (3-1)*10 = 20.
    // If you change to 20 items per page, the first item on page 3 would be at position (3-1)*20 = 40.
    const newPage = (currentPage - 1) * itemsPerPage < totalItems ? currentPage : 1
    router.push(createPageURL(newPage, newPageSize))
  }

  return (
    <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-4'>
      <div className='flex items-center gap-2'>
        <p className='text-sm text-muted-foreground'>Items per page</p>
        <Select value={itemsPerPage.toString()} onValueChange={handlePageSizeChange}>
          <SelectTrigger className='h-8 w-[70px]'>
            <SelectValue placeholder={itemsPerPage.toString()} />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZE_OPTIONS.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='icon'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>

        <div className='flex items-center gap-1'>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size='icon'
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant='outline'
          size='icon'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
