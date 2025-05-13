import { github } from '@/lib/auth/oauth'
import { generateState } from 'arctic'
import { cookies } from 'next/headers'

export async function GET(): Promise<Response> {
  const state = generateState()

  // We use user:email scope to get the user's email address
  // We need this to update the user's email in database
  const url = github.createAuthorizationURL(state, ['user:email'])

  const cookieStore = await cookies()

  // The state parameter is used in OAuth 2.0 to prevent Cross-Site Request Forgery (CSRF) attacks. Here's a step-by-step explanation of why and how it is used:
  // Generate State: When initiating the OAuth flow, your application generates a random string (state) and stores it in a cookie or session.
  // Send State: This state is sent along with the authorization request to the OAuth provider (e.g., GitHub).
  // Receive State: After the user authorizes the application, the OAuth provider redirects back to your application with the authorization code and the state parameter.
  // Validate State: Your application then retrieves the state from the cookie or session and compares it with the state received from the OAuth provider.
  // The purpose of this process is to ensure that the request and response are part of the same transaction and to prevent CSRF attacks. If the states do not match, it indicates that the request may have been tampered with, and the authorization process should be aborted.

  cookieStore.set('github_oauth_state', state, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  })

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  })
}
