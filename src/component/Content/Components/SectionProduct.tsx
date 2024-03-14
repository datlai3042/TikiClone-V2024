import React from 'react'

type Props = {
      title?: React.ReactNode | JSX.Element
      other?: React.ReactNode | JSX.Element
      ElementRight?: React.ReactNode | JSX.Element | React.ReactNode[] | JSX.Element[]
      ListProducts: React.ReactNode | JSX.Element
      ArrowLeft?: JSX.Element | React.ReactElement
      ArrowRight?: JSX.Element | React.ReactElement
      background?: string
}

const SectionProduct = (props: Props) => {
      return (
            <div
                  style={{ background: props.background ? props.background : '' }}
                  className='bg-[#ffffff] rounded-lg flex-col  min-h-[295px]  p-[12px]'
            >
                  <div className='2xl:h[20%] 2xl:h-[8%] flex justify-between my-[16px]'>
                        <div className=' flex items-center  2xl:gap-3 2xl:w-full'>
                              {props.title && props.title}
                              {props.other && props.other}
                        </div>
                        <div className=''>{props.ElementRight && props.ElementRight}</div>
                  </div>

                  {props.ListProducts && props.ListProducts}
            </div>
      )
}

export default SectionProduct
