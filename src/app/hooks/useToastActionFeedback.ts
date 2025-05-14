import { ActionState } from '@/lib/types'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

type Options = {
  // Custom callback to run on success and error, besides showing a toast
  onSuccessCallback?: (actionState: ActionState) => void
  onErrorCallback?: (actionState: ActionState) => void
  showToast?: boolean
}

/**
 * A hook that handles action state feedback with toast notifications
 */
const useToastActionFeedback = (actionState: ActionState, options: Options = {}) => {
  const { onSuccessCallback, onErrorCallback, showToast = true } = options

  const prevTimestamp = useRef(actionState.timestamp)
  // Prevent the callbacks from running twice
  const isNewAction = actionState.timestamp !== prevTimestamp.current

  useEffect(() => {
    if (!isNewAction) return

    if (actionState.status === 'SUCCESS') {
      if (showToast && actionState.message) {
        toast.success(actionState.message)
      }
      if (onSuccessCallback) {
        onSuccessCallback(actionState)
      }
    } else if (actionState.status === 'ERROR') {
      if (showToast && actionState.message) {
        toast.error(actionState.message)
      }
      if (onErrorCallback) {
        onErrorCallback(actionState)
      }
    }

    prevTimestamp.current = actionState.timestamp
  }, [actionState, onSuccessCallback, onErrorCallback, isNewAction, showToast])
}

export default useToastActionFeedback
