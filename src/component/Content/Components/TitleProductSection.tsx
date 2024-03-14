import React from 'react'

type Props = {
      content: string | React.ReactNode
}

const TitleProductSection = ({ content }: Props) => {
      return <h3 className='font-bold pl-[15px]'>{content}</h3>
}

export default TitleProductSection
