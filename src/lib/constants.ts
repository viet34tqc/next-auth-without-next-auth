import { ActionState } from './types'

export const EMPTY_FORM_STATE: ActionState = {
  status: 'UNSET' as const,
  message: '',
  fieldErrors: {},
  timestamp: Date.now(),
}
