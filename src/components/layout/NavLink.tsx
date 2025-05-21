'use client'

import { cn } from '@/lib/utils'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface NavLinkProps extends LinkProps {
  children: ReactNode
  className?: string
  activeClassName?: string
  exact?: boolean
}

export function NavLink({
  children,
  className,
  activeClassName = 'text-foreground font-medium',
  exact = false,
  ...props
}: NavLinkProps) {
  const pathname = usePathname()
  const isActive = exact
    ? pathname === props.href
    : typeof props.href === 'string' && pathname.startsWith(props.href)

  return (
    <Link
      className={cn(
        'text-sm text-muted-foreground hover:text-foreground transition-colors',
        isActive && activeClassName,
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
