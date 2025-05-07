'use server'

import { cookies } from 'next/headers'

export async function deleteToastCookie() {
  const cookieStore = await cookies()

  cookieStore.delete('toast-message')
}
