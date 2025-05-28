import type { BaseComment, CommentWithUser } from './types'

/**
 * Builds a hierarchical comment tree from a flat array of comments
 */
export function buildCommentTree(comments: BaseComment[], maxDepth?: number): CommentWithUser[] {
  // I'm using map for quick lookup
  const commentMap = new Map<string, CommentWithUser>()
  const rootComments: CommentWithUser[] = []

  // Create all comment objects with empty replies arrays
  comments.forEach((comment) => {
    commentMap.set(comment.id, {
      ...comment,
      replies: [],
      depth: 0,
    })
  })

  // Build the tree structure
  comments.forEach((comment) => {
    const commentWithReplies = commentMap.get(comment.id)!

    // If comment has parent
    if (comment.parentId) {
      // Find its parent
      const parent = commentMap.get(comment.parentId)
      if (parent) {
        // Set depth based on parent
        // Child depth will have one more level than parent. That's why I plus one
        commentWithReplies.depth = (parent.depth || 0) + 1

        // Only add to parent if within max depth limit
        if (!maxDepth || commentWithReplies.depth <= maxDepth) {
          parent.replies!.push(commentWithReplies)
        }
      }
    } else {
      // Else, this is a Top-level comment, push it to root
      rootComments.push(commentWithReplies)
    }
  })

  // Sort replies recursively
  const sortReplies = (comments: CommentWithUser[]) => {
    comments.forEach((comment) => {
      if (comment.replies && comment.replies.length > 0) {
        // Sort replies by creation date (oldest first)
        comment.replies.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        )
        sortReplies(comment.replies)
      }
    })
  }

  sortReplies(rootComments)
  return rootComments
}

// export function flattenCommentTree(comments: CommentWithUser[]): CommentWithUser[] {
//   const flattened: CommentWithUser[] = []

//   const flatten = (commentList: CommentWithUser[]) => {
//     commentList.forEach((comment) => {
//       flattened.push(comment)
//       if (comment.replies && comment.replies.length > 0) {
//         flatten(comment.replies)
//       }
//     })
//   }

//   flatten(comments)
//   return flattened
// }
