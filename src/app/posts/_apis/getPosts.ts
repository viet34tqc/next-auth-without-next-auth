import { MOCK_POSTS } from '../_constants'
import { PostType } from '../_types'

export const getPosts = (): Promise<PostType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_POSTS)
    }, 1000)
  })
}
