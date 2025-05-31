import { useId } from 'react'

// This field is used to prevent duplicate form submissions
const SubmitIdField = () => {
  const submitId = useId()
  return <input type='hidden' name='submitId' value={submitId} />
}

export default SubmitIdField
