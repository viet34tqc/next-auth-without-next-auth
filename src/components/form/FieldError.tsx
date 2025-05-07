import { ActionState } from '@/lib/types'

type FieldErrorProps = {
  actionState: ActionState
  name: string
}

const FieldError = ({ actionState, name }: FieldErrorProps) => {
  return <span className='text-xs text-red-400'>{actionState.fieldErrors[name]?.[0]}</span>
}

export { FieldError }
