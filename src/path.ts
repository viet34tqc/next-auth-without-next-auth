export const PATHS = {
  posts: () => '/posts',
  post: (postId: string) => `${PATHS.posts()}/${postId}`,
}
