import { ReactNode } from 'react'
import { Separator } from '../ui/separator'

type Props = {
  title: string
  description?: string
  action?: ReactNode
}

const PageHeader = ({ title, description, action }: Props) => {
  return (
    <>
      <header className='flex justify-between items-center'>
        <div>
          <h1 className='tracking-tight'>{title}</h1>
          {description && <p className='text-muted-foreground'>{description}</p>}
        </div>
        {action}
      </header>

      <Separator />
    </>
  )
}

export default PageHeader
