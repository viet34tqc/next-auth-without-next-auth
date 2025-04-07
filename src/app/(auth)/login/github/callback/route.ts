import { cookies } from 'next/headers'

import { setSessionCookie } from '@/lib/auth/cookie'
import { getUserFromGitHubId, github } from '@/lib/auth/oauth'
import { createSession, generateRandomSessionToken } from '@/lib/auth/session'
import { prisma } from '@/lib/prisma'
import type { OAuth2Tokens } from 'arctic'

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const cookieStore = await cookies()
  const storedState = cookieStore.get('github_oauth_state')?.value ?? null
  if (code === null || state === null || storedState === null) {
    return new Response(null, {
      status: 400,
    })
  }
  if (state !== storedState) {
    return new Response(null, {
      status: 400,
    })
  }

  let tokens: OAuth2Tokens
  try {
    tokens = await github.validateAuthorizationCode(code)
  } catch {
    // Invalid code or client credentials
    return new Response(null, {
      status: 400,
    })
  }
  const githubUserResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${tokens.accessToken()}`,
    },
  })
  const githubUser = await githubUserResponse.json()
  const githubUserId = githubUser.id
  const githubUsername = githubUser.login

  const existingUser = await getUserFromGitHubId(githubUserId)

  if (existingUser !== null) {
    const sessionToken = generateRandomSessionToken()
    const session = await createSession(sessionToken, existingUser.id)
    await setSessionCookie(sessionToken, session.expiresAt)
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    })
  }

  const emailListResponse = await fetch('https://api.github.com/user/emails', {
    headers: {
      Authorization: `Bearer ${tokens.accessToken()}`,
    },
  })

  const emailListResult: unknown = await emailListResponse.json()
  if (!Array.isArray(emailListResult) || emailListResult.length < 1) {
    return new Response('Please restart the process.', {
      status: 400,
    })
  }

  let email: string | null = null
  for (const emailRecord of emailListResult) {
    const primaryEmail = emailRecord.primary
    const verifiedEmail = emailRecord.verified
    if (primaryEmail && verifiedEmail) {
      email = emailRecord.email
    }
  }
  if (email === null) {
    return new Response('Please verify your GitHub email address.', {
      status: 400,
    })
  }

  // Check existing user with the same email
  const existingUserWithEmail = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (existingUserWithEmail !== null) {
    // Update the existing user with the GitHub ID
    await prisma.user.update({
      where: {
        id: existingUserWithEmail.id,
      },
      data: {
        githubId: githubUserId,
      },
    })
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    })
    // return new Response('An account with the same email already exists.', {
    //   status: 400,
    // });
  }

  const user = await prisma.user.create({
    data: {
      githubId: githubUserId,
      firstName: githubUsername,
      lastName: githubUsername,
      email,
      passwordHash: '',
    },
  })

  const sessionToken = generateRandomSessionToken()
  const session = await createSession(sessionToken, user.id)
  setSessionCookie(sessionToken, session.expiresAt)
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/',
    },
  })
}
