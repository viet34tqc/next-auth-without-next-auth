export type RecentPost = {
  id: string
  title: string
  status: string
  createdAt: Date
}

export type ProfileData = {
  id: string
  username: string
  email: string
  githubConnected: boolean
  stats: {
    posts: number
    comments: number
  }
  recentPosts: Array<{
    id: string
    title: string
    status: string
    createdAt: Date
  }>
}
