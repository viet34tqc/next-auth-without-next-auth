import { GitHub } from 'arctic'
import { prisma } from '../prisma'

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID ?? '',
  process.env.GITHUB_CLIENT_SECRET ?? '',
  'http://localhost:3000/login/github/callback',
)

export const getUserFromGitHubId = async (githubId: number) => {
  const row = await prisma.user.findFirst({
    where: {
      githubId,
    },
  })
  if (row === null) {
    return null
  }

  return {
    id: row.id,
    email: row.email,
    githubId: row.githubId,
    username: row.username,
  }
}
