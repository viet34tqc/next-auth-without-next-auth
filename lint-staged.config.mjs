import path from 'path'

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`

const config = {
  '*.{js,ts,tsx}': [buildEslintCommand, 'pnpm format'],
}
export default config
