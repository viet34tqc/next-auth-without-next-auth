import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PATHS } from '@/path'
import { format } from 'date-fns'
import { Github, Mail, MessageSquare, Newspaper } from 'lucide-react'
import Link from 'next/link'
import { getProfile } from './_apis/getProfile'
import { RecentPost } from './_types'

export default async function ProfilePage() {
  let profileData

  try {
    profileData = await getProfile()
  } catch (error) {
    console.error('Error loading profile:', error)
    return (
      <div className='container mx-auto px-4 py-8'>
        <p>Error loading profile data. Please try again later.</p>
      </div>
    )
  }

  const { username, email, githubConnected, stats, recentPosts } = profileData

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid gap-6 md:grid-cols-3'>
        <div className='md:col-span-1'>
          <Card>
            <CardHeader>
              <div className='flex items-center space-x-4'>
                <div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary'>
                  {username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h1 className='text-2xl font-bold'>{username || 'User'}</h1>
                </div>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center space-x-2 text-sm'>
                <Mail className='h-4 w-4 text-muted-foreground' />
                <span className='text-muted-foreground'>{email}</span>
              </div>
              <div className='flex items-center space-x-2 text-sm'>
                <Github className='h-4 w-4 text-muted-foreground' />
                <span className='text-muted-foreground'>
                  {githubConnected ? 'Connected to GitHub' : 'Not connected to GitHub'}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className='mt-6'>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent className='grid grid-cols-2 gap-4'>
              <div className='flex flex-col items-center rounded-lg bg-muted/50 p-4 text-center'>
                <Newspaper className='mb-2 h-6 w-6 text-primary' />
                <div className='text-2xl font-bold'>{stats?.posts || 0}</div>
                <div className='text-sm text-muted-foreground'>Posts</div>
              </div>
              <div className='flex flex-col items-center rounded-lg bg-muted/50 p-4 text-center'>
                <MessageSquare className='mb-2 h-6 w-6 text-primary' />
                <div className='text-2xl font-bold'>{stats?.comments || 0}</div>
                <div className='text-sm text-muted-foreground'>Comments</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='md:col-span-2'>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your most recent posts</CardDescription>
            </CardHeader>
            <CardContent>
              {recentPosts?.length > 0 ? (
                <div className='space-y-4'>
                  {recentPosts.map((post: RecentPost) => (
                    <div key={post.id} className='rounded-lg border p-4'>
                      <div className='flex items-center justify-between'>
                        <h3 className='font-medium'>
                          <Link href={`/posts/${post.id}`} className='hover:underline'>
                            {post.title}
                          </Link>
                        </h3>
                        <span className='rounded-full bg-muted px-2 py-1 text-xs capitalize'>
                          {post.status.toLowerCase()}
                        </span>
                      </div>
                      <p className='mt-1 text-sm text-muted-foreground'>
                        Posted on {format(new Date(post.createdAt), 'MMM d, yyyy')}
                      </p>
                    </div>
                  ))}
                  <div className='mt-4 text-center'>
                    <Link
                      href='/dashboard'
                      className='text-sm font-medium text-primary hover:underline'
                    >
                      View all posts →
                    </Link>
                  </div>
                </div>
              ) : (
                <div className='rounded-lg border border-dashed p-8 text-center'>
                  <Newspaper className='mx-auto h-12 w-12 text-muted-foreground' />
                  <h3 className='mt-2 text-sm font-medium text-foreground'>No posts yet</h3>
                  <p className='mt-1 text-sm text-muted-foreground'>
                    Get started by creating a new post.
                  </p>
                  <Link
                    href={PATHS.dashboard()}
                    className='mt-4 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90'
                  >
                    Create Post
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
