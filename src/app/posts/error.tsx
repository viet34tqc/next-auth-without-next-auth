'use client'

import Placeholder from '@/components/layout/Placeholder'

type Props = {
  error: Error
}

const Error = ({ error }: Props) => {
  return <Placeholder text={error.message || 'Something went wrong'} />
}

export default Error
