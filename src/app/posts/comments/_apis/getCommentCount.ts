import { prisma } from '@/lib/prisma'

export const getCommentCount = async (postId: string): Promise<number> => {
  return prisma.comment.count({
    where: {
      postId,
    },
  })
}

export const getCommentCounts = async (postIds: string[]): Promise<Record<string, number>> => {
  const counts = await prisma.comment.groupBy({
    by: ['postId'],
    where: {
      postId: {
        in: postIds,
      },
    },
    _count: {
      id: true,
    },
  })

  const result: Record<string, number> = {}

  // Initialize all postIds with 0
  postIds.forEach((id) => {
    result[id] = 0
  })

  // Set actual counts
  counts.forEach((count) => {
    result[count.postId] = count._count.id
  })

  return result
}
