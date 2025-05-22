'use client'

import { signOut } from '@/app/(auth)/sign-out/_actions/sign-out'
import { PATHS } from '@/path'
import { LayoutDashboard, LogOut, Settings, User as UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback } from '../../ui/avatar'
import { Button } from '../../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'

import type { User } from '@/lib/auth/types'

export interface UserDropdownProps {
  user: User | null
}

export function UserDropdown({ user }: UserDropdownProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push(PATHS.signIn())
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarFallback>
              {user?.username ? (
                user.username.charAt(0).toUpperCase()
              ) : (
                <UserIcon className='h-4 w-4' />
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{user?.username || 'User'}</p>
            <p className='text-xs leading-none text-muted-foreground'>{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push(PATHS.dashboard())}>
            <LayoutDashboard className='mr-2 h-4 w-4' />
            <span>Dashboard</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(PATHS.profile())}>
            <UserIcon className='mr-2 h-4 w-4' />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(PATHS.changePassword())}>
            <Settings className='mr-2 h-4 w-4' />
            <span>Change Password</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
