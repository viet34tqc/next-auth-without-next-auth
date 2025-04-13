const PostDetail = async ({ params }: { params: { postId: string } }) => {
  console.log('params', params)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return <div>PostDetail</div>
}

export default PostDetail
