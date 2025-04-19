# Notes

## Caching

- Static rendering
  - time-based caching: `export const revalidate = 60`
  - on-demand caching: `revalidatePath(PATH)
- request caching: `import { cache } from react`
- data caching: fetch(URL, { next: {revalidate: 60} })
