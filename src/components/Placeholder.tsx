'use client'

type Props = { text: string }

const Placeholder = ({ text }: Props) => {
  return (
    <div className='flex-1 self-center flex flex-col items-center justify-center'>
      <h2 className='text-lg text-center'>{text}</h2>
    </div>
  )
}

export default Placeholder
