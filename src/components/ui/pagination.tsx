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

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  pageSizeOptions: readonly number[]
  pageParamName?: string
  limitParamName?: string
  itemsLabel?: string
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  pageSizeOptions,
  pageParamName = 'page',
  limitParamName = 'limit',
  itemsLabel = 'Items',
}: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const createPageURL = (pageNumber: number, newItemsPerPage?: number) => {
    const params = new URLSearchParams(searchParams)
    params.set(pageParamName, pageNumber.toString())
    if (newItemsPerPage) {
      params.set(limitParamName, newItemsPerPage.toString())
    }
    return `?${params.toString()}`
  }

  const handlePageChange = (pageNumber: number) => {
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

  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 4 // Maximum number of page buttons to show

    if (totalPages <= maxVisiblePages) {
      // If total pages is small, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? 'default' : 'outline'}
            size='icon'
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>,
        )
      }
    } else {
      // Calculate the range of pages to show around current page
      const sidePages = 1 // Number of pages to show on each side of current page
      let startPage = Math.max(1, currentPage - sidePages)
      let endPage = Math.min(totalPages, currentPage + sidePages)

      // Ensure we always show at least 3 pages in the middle
      if (endPage - startPage < 2) {
        if (startPage === 1) {
          endPage = Math.min(totalPages, startPage + 2)
        } else if (endPage === totalPages) {
          startPage = Math.max(1, endPage - 2)
        }
      }

      // Always show first page
      if (startPage > 1) {
        pages.push(
          <Button
            key={1}
            variant={currentPage === 1 ? 'default' : 'outline'}
            size='icon'
            onClick={() => handlePageChange(1)}
          >
            1
          </Button>,
        )

        // Add ellipsis if there's a gap between 1 and startPage
        if (startPage > 2) {
          pages.push(
            <span key='ellipsis-start' className='px-2 text-muted-foreground'>
              ...
            </span>,
          )
        }
      }

      // Add the middle range pages (including current page)
      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? 'default' : 'outline'}
            size='icon'
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Button>,
        )
      }

      // Always show last page
      if (endPage < totalPages) {
        // Add ellipsis if there's a gap between endPage and totalPages
        if (endPage < totalPages - 1) {
          pages.push(
            <span key='ellipsis-end' className='px-2 text-muted-foreground'>
              ...
            </span>,
          )
        }

        pages.push(
          <Button
            key={totalPages}
            variant={currentPage === totalPages ? 'default' : 'outline'}
            size='icon'
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Button>,
        )
      }
    }

    return pages
  }

  return (
    <div className='flex flex-col sm:flex-row flex-wrap items-center justify-between gap-4 mt-4'>
      <div className='flex items-center gap-2'>
        <p className='text-sm text-muted-foreground'>{itemsLabel} per page</p>
        <Select value={itemsPerPage.toString()} onValueChange={handlePageSizeChange}>
          <SelectTrigger className='h-8 w-[70px]'>
            <SelectValue placeholder={itemsPerPage.toString()} />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
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

        <div className='flex items-center gap-1'>{renderPageNumbers()}</div>

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
