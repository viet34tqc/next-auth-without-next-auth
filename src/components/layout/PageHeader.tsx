'use client'

import { Separator } from '../ui/separator'

type Props = {
  title: string
  description?: string
}

const PageHeader = ({ title, description }: Props) => {
  return (
    <>
      <header>
        <h1 className='tracking-tight'>{title}</h1>
        {description && <p className='text-muted-foreground'>{description}</p>}
      </header>

      <Separator />
    </>
  )
}

export default PageHeader
