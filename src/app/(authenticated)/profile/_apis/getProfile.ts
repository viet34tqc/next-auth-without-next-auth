import { getAuth } from '@/lib/auth/cookie'
import { prisma } from '@/lib/prisma'
import { ProfileData } from '../_types'

export async function getProfile(): Promise<ProfileData> {
  const { user } = await getAuth()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      username: true,
      email: true,
      githubId: true,
      // Select count of posts and comments
      _count: {
        select: {
          posts: true,
          comments: true,
        },
      },
      // Select recent posts
      posts: {
        take: 5,
        orderBy: { createdAt: 'desc' as const },
        select: {
          id: true,
          title: true,
          status: true,
          createdAt: true,
        },
      },
    },
  })

  if (!userData) {
    throw new Error('User not found')
  }

  return {
    id: userData.id,
    username: userData.username,
    email: userData.email,
    githubConnected: !!userData.githubId,
    stats: {
      posts: userData._count?.posts || 0,
      comments: userData._count?.comments || 0,
    },
    recentPosts: userData.posts || [],
  }
}
