import { MessageCircle } from 'lucide-react'

type CommentCountProps = {
  count: number
  className?: string
}

export function CommentCount({ count, className = '' }: CommentCountProps) {
  return (
    <span className={`flex items-center gap-1 text-muted-foreground text-sm ${className}`}>
      <MessageCircle className='h-3 w-3' />
      {count} {count === 1 ? 'comment' : 'comments'}
    </span>
  )
}
