# Notes

## Caching

- Static rendering
  - time-based caching: `export const revalidate = 60`
  - on-demand caching: `revalidatePath(PATH)
- request caching: `import { cache } from react`
- data caching: fetch(URL, { next: {revalidate: 60} })

## Action

Wrap the server action inside a function to handle after submitting actions like in the create post form

## Routes

- '/' → all posts (public)
- '/dashboard' → user posts
- '/posts/[id]' → detail page for each post
