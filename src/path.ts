export const PATHS = {
  posts: () => '/posts',
  post: (postId: string) => `${PATHS.posts()}/${postId}`,

  signUp: () => '/sign-up',
  signIn: () => '/sign-in',
  signInGithub: () => '/sign-in/github',
}
