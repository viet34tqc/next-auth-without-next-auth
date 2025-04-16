import Placeholder from '@/components/layout/Placeholder'
import { getPost } from '../_apis/getPost'
import { DeletePostButton } from '../_components/DeletePostButton'

const PostDetail = async ({ params }: { params: { postId: string } }) => {
  const post = await getPost(params.postId)

  if (post === null) {
    return <Placeholder text='Post not found' />
  }

  return (
    <article className='space-y-4'>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <DeletePostButton id={params.postId} />
    </article>
  )
}

export default PostDetail
