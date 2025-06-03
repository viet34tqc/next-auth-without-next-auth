import { GitHub } from 'arctic'
import { prisma } from '../prisma'

export const github = new GitHub(
  process.env.GITHUB_CLIENT_ID ?? '',
  process.env.GITHUB_CLIENT_SECRET ?? '',
  process.env.NODE_ENV !== 'development'
    ? 'https://next-auth.vietnguyenwp.com/sign-in/github/callback'
    : 'http://localhost:3000/sign-in/github/callback',
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
