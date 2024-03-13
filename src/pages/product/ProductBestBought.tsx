import { useQuery } from '@tanstack/react-query'
import React, { useRef, useState } from 'react'
import ProductApi from '../../apis/product.api'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductItemMini from './Components/ProductItemMini'
const ELEMENT_PAGE = 8

const ProductBestBought = () => {
      const getAllProductBest = useQuery({
            queryKey: ['/v1/api/product/get-product-best-bought'],
            queryFn: () => ProductApi.getProductBestBought({ page: 1, limit: 18 }),
      })

      const wrapperListProductsRef = useRef<HTMLDivElement>(null)
      const PositionScrollCurrent = useRef<number>(0)
      const [limitShowProduct, setLimitShowProduct] = useState<number>(0)
      const [count, setCount] = useState(1)

      const handleClickNext = () => {
            if (wrapperListProductsRef.current) {
                  setCount((prev) => prev + 1)
                  const width = wrapperListProductsRef.current.getBoundingClientRect().width
                  PositionScrollCurrent.current = PositionScrollCurrent.current - width
                  wrapperListProductsRef.current.style.transform = `translate3d(${PositionScrollCurrent.current}px, 0,0)`
                  wrapperListProductsRef.current.style.transition = `all 1s`
            }
      }

      const handleClickPrev = () => {
            if (wrapperListProductsRef.current) {
                  setCount((prev) => prev - 1)

                  const width = wrapperListProductsRef.current.getBoundingClientRect().width
                  PositionScrollCurrent.current = PositionScrollCurrent.current + width

                  // console.log(Math.trunc(width))
                  wrapperListProductsRef.current.style.transform = `translate3d(${PositionScrollCurrent.current}px, 0,0)`
                  wrapperListProductsRef.current.style.transition = `all 1s`
            }
      }

      const productAllPage = getAllProductBest.data?.data.metadata.products

      const _page1 = productAllPage?.slice(0, ELEMENT_PAGE * 1)
      const _page2 = productAllPage?.slice(ELEMENT_PAGE, ELEMENT_PAGE * 2)
      const _page3 = productAllPage?.slice(ELEMENT_PAGE * 2, ELEMENT_PAGE * 3)

      const totalPage = Math.ceil(Number(productAllPage?.length) / 8)
      console.log({ totalPage, length: productAllPage?.length })

      const styleEffect = {
            buttonPrev: count === 1 ? 'xl:hidden' : 'xl:flex',
            buttonNext: totalPage === count ? 'xl:hidden' : 'xl:flex',
            disButtonPrev: count === 1 ? true : false,
            disButtonNext: totalPage === count ? true : false,
      }

      return (
            <div className='relative min-h-[300px] h-max bg-[#ffffff] rounded-lg flex flex-col gap-[16px] p-[16px] overflow-hidden'>
                  <h4 className='text-[16px] font-medium'>Tiki best</h4>

                  <div className=' flex  w-[calc(100%+32px)]    overflow-scroll xl:overflow-visible ' ref={wrapperListProductsRef}>
                        <div className='   xl:w-full  w-max grid grid-flow-col auto-cols-[130px] auto-rows-[225px] grid-cols-[130px] xl:grid-cols-[130px] grid-rows-[225px] gap-[18px] '>
                              {_page1?.map((product) => (
                                    // <div className='min-w-[calc((100%-64px)/4)] h-[225px]' key={product._id}>
                                    <ProductItemMini product={product} key={product._id} />
                                    // </div>
                              ))}
                        </div>
                        <div className='   xl:w-full w-max  ml-[100%]  grid grid-flow-col auto-cols-[130px] auto-rows-[225px] grid-cols-[130px] xl:grid-cols-[130px] grid-rows-[225px] gap-[18px] '>
                              {_page2?.map((product) => (
                                    // <div className='min-w-[calc((100%-64px)/4)] h-[225px]' key={product._id}>
                                    <ProductItemMini product={product} key={product._id} />
                                    // </div>
                              ))}
                        </div>
                        <div className='   xl:w-full ml-[100%]   grid grid-flow-col auto-cols-[130px] auto-rows-[225px] grid-cols-[130px] xl:grid-cols-[130px] grid-rows-[225px] gap-[18px] '>
                              {_page3?.map((product) => (
                                    // <div className='min-w-[calc((100%-64px)/4)] h-[225px]' key={product._id}>
                                    <ProductItemMini product={product} key={product._id} />
                                    // </div>
                              ))}
                        </div>
                        {/* <div className='w-[350px] h-[5px] mx-auto bg-red-800'></div> */}
                  </div>

                  <button
                        className={`${styleEffect.buttonPrev} hidden xl:flex  absolute top-[50%] left-[0px] translate-y-[30%]  bg-[#ffffff]  rounded-full shadow-3xl`}
                        onClick={handleClickPrev}
                        disabled={styleEffect.disButtonPrev || getAllProductBest.isPending}
                  >
                        <ChevronLeft size={28} color='blue' />
                  </button>

                  <button
                        className={`${styleEffect.buttonNext} hidden xl:flex absolute top-[50%] right-[0px] translate-y-[30%] bg-[#ffffff]  rounded-full shadow-3xl `}
                        onClick={handleClickNext}
                        disabled={styleEffect.disButtonNext || getAllProductBest.isPending}
                  >
                        <ChevronRight size={26} color='blue' />
                  </button>
            </div>
      )
}

export default ProductBestBought