export const PATHS = {
  home: () => '/',
  posts: () => '/posts',
  post: (postId: string) => `${PATHS.posts()}/${postId}`,
  dashboard: () => '/dashboard',

  signUp: () => '/sign-up',
  signIn: () => '/sign-in',
  signInGithub: () => '/sign-in/github',

  profile: () => '/profile', // Points to /(authenticated)/profile
  changePassword: () => '/change-password',
}
