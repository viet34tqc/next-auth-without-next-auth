import { cookies } from 'next/headers'
import CookieToastRender from './Render'

const CookieToastWrapper = async () => {
  // In nextjs 15, we can only read the cookie in the asynchronous server component
  const cookieStore = await cookies()
  const message = cookieStore.get('toast-message')

  if (message) {
    return <CookieToastRender message={message.value} />
  }

  return null
}

export default CookieToastWrapper
