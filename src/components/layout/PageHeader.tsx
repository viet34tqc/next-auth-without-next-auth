import { ReactNode } from 'react'
import { Separator } from '../ui/separator'

type Props = {
  title: string
  description?: string
  action?: ReactNode
}

const PageHeader = ({ title, description, action }: Props) => {
  return (
    <div className='mb-8'>
      <header className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='tracking-tight'>{title}</h1>
          {description && <p className='text-muted-foreground'>{description}</p>}
        </div>
        {action}
      </header>

      <Separator />
    </div>
  )
}

export default PageHeader
