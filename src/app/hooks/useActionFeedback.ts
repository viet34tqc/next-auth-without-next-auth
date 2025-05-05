import { ActionState } from '@/lib/types'
import { useEffect, useRef } from 'react'

type Options = {
  onSuccess?: (actionState: ActionState) => void
  onError?: (actionState: ActionState) => void
}

// This hook is used to handle the action state after submitting the form
const useActionFeedback = (actionState: ActionState, options: Options) => {
  const prevTimestamp = useRef(actionState.timestamp)
  // Prevent the callbacks from running twice
  const isNewAction = actionState.timestamp !== prevTimestamp.current
  useEffect(() => {
    if (!isNewAction) return
    if (actionState.status === 'SUCCESS') {
      options.onSuccess?.(actionState)
    } else if (actionState.status === 'ERROR') {
      options.onError?.(actionState)
    }
    prevTimestamp.current = actionState.timestamp
  }, [actionState, options, isNewAction])
}

export default useActionFeedback
