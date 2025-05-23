# Notes

## Caching

- Static rendering
  - time-based caching: `export const revalidate = 60`
  - on-demand caching: `revalidatePath(PATH)
- request caching: `import { cache } from react`
- data caching: fetch(URL, { next: {revalidate: 60} })

## Server Action

Wrap the server action inside a function to handle after submitting actions like in the create post form. However, the actionState from useFormState is not updated. So, if you are using error message from actionState, don't wrap the server action inside a function.

## Routes

- '/' → all posts (public)
- '/dashboard' → user posts
- '/posts/[id]' → detail page for each post

## Search

input search => change url => page get new param => getPosts(query)

## Sort

Create sort object including value, label and orderby for prisma query
sort => change url => page get new param => getPosts(sort)
