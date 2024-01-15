import React from 'react'

const CustomerWrapperItem = ({ children }: { children: React.ReactNode }) => {
      return <div className='w-full bg-white shadow-lg rounded-lg min-h-[230px] h-auto  max-h-auto p-[20px]'>{children}</div>
}

export default CustomerWrapperItem
