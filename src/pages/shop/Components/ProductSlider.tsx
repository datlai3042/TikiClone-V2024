import React, { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TProductDetail } from '../../../types/product/product.type'
import BoxButtonCircle from '../../../component/BoxUi/BoxButtonCircle'

type TProps = {
      products: TProductDetail[]
      TransitionTime?: number
}

const ProductSlider = (props: TProps) => {
      const { products, TransitionTime = 1 } = props

      const wrapperRef = useRef<HTMLDivElement>(null)
      const timer = useRef<NodeJS.Timeout | null>(null)
      const imageRef = useRef<HTMLImageElement[]>([])

      const [newPosition, setNewPosition] = useState<number>(0)
      const [indexImage, setIndexImage] = useState<number>(1)
      const delay = (TransitionTime + 2) * 1000
      const LIMIT = Math.ceil(products.length / 2)

      const onClickNext = () => {
            if (wrapperRef.current) {
                  const width = wrapperRef.current?.getBoundingClientRect().width * -1
                  const pos = newPosition + width
                  wrapperRef.current.style.transform = `translateX(${pos}px)`
                  wrapperRef.current.style.transition = `all ${TransitionTime}s`
                  setNewPosition(pos)
                  setIndexImage((prev) => prev + 1)
            }
      }

      const onClickPrev = () => {
            if (wrapperRef.current) {
                  const width = wrapperRef.current?.getBoundingClientRect().width * 1
                  const pos = newPosition + width
                  wrapperRef.current.style.transform = `translateX(${pos}px)`
                  wrapperRef.current.style.transition = `all ${TransitionTime}s`
                  setNewPosition(pos)
                  setIndexImage((prev) => prev - 1)
            }
      }

      const onChangeSourceImage = ({ secure_url, refIndex }: { secure_url: string; refIndex: number }) => {
            console.log('OK', imageRef.current)
            if (imageRef.current) {
                  imageRef.current[refIndex].src = secure_url
            }
      }

      const onMouseRegainSoucre = ({ refIndex }: { refIndex: number }) => {
            if (imageRef.current) {
                  imageRef.current[refIndex].src = products[refIndex].product_thumb_image.secure_url
            }
      }

      const styleEffect = {
            onActive: (check: boolean) => {
                  if (check) return 'w-[24px] rounded-[999px] bg-blue-600 h-[2px]'
                  return 'w-[16px] rounded-[999px] bg-slate-300 h-[2px]'
            },
      }

      useEffect(() => {
            timer.current = setInterval(() => {
                  if (indexImage === LIMIT) {
                        if (wrapperRef.current) {
                              const pos = 0

                              wrapperRef.current.style.transform = `translateX(${pos}px)`
                              wrapperRef.current.style.transition = 'all 0s'
                              setNewPosition(pos)
                              setIndexImage(1)
                        }
                        return
                  }

                  if (wrapperRef.current) {
                        const width = wrapperRef.current?.getBoundingClientRect().width * -1
                        const pos = newPosition + width
                        wrapperRef.current.style.transform = `translateX(${pos}px)`
                        wrapperRef.current.style.transition = `all ${TransitionTime}s`
                        setNewPosition(pos)
                        setIndexImage((prev) => prev + 1)
                  }
            }, delay)

            return () => {
                  clearInterval(timer.current as NodeJS.Timeout)
            }
      }, [newPosition, indexImage, LIMIT, TransitionTime, delay])
      // console.log({ products: products.length, index: indexImage, LIMIT, TransitionTime, props: props })

      if (products.length === 0) {
            return <div className='animate-pulse bg-gray-200 w-full h-full'></div>
      }

      return (
            <div className='relative group w-full h-full  pb-[50px] '>
                  <div className='w-full h-full  overflow-x-hidden'>
                        <div className='  min-w-full flex h-full gap-[15px] xl:gap-[30px]' ref={wrapperRef}>
                              {(() => {
                                    let images = []
                                    for (let index = 0; index < products.length; index += 2) {
                                          images.push(
                                                <div
                                                      className='flex justify-between   min-w-full w-full h-full overflow-x-auto gap-[15px] xl:gap-[30px]'
                                                      key={index}
                                                >
                                                      <div className='relative w-[calc(100%/2)] h-full  rounded'>
                                                            <img
                                                                  ref={(ref) => (imageRef.current![index] = ref as HTMLImageElement)}
                                                                  src={products[index].product_thumb_image.secure_url}
                                                                  className='w-full h-full rounded  shadow-3xl'
                                                                  alt=''
                                                            />
                                                            <div className='absolute min-w-[420px] w-max h-[90px] left-[50%] translate-x-[-50%] bottom-[20px] hidden xl:flex gap-[20px] p-[10px] bg-[#ffffff] rounded-lg shadow-2xl'>
                                                                  {[products[index].product_thumb_image]
                                                                        .concat(products[index].product_desc_image)
                                                                        .map((img) => (
                                                                              <img
                                                                                    src={img.secure_url}
                                                                                    className='w-[calc(100%/5)] h-[70px] outline-2 outline-dashed outline-offset-4 outline-blue-600'
                                                                                    alt='description'
                                                                                    key={img.public_id}
                                                                                    onMouseEnter={() =>
                                                                                          onChangeSourceImage({
                                                                                                secure_url: img.secure_url,
                                                                                                refIndex: index,
                                                                                          })
                                                                                    }
                                                                                    onClick={() =>
                                                                                          onChangeSourceImage({
                                                                                                secure_url: img.secure_url,
                                                                                                refIndex: index,
                                                                                          })
                                                                                    }
                                                                              />
                                                                        ))}
                                                            </div>
                                                      </div>
                                                      {index + 1 !== products.length && (
                                                            <div className='relative w-[calc(100%/2)] h-full  rounded'>
                                                                  <img
                                                                        ref={(ref) =>
                                                                              (imageRef.current![index + 1] = ref as HTMLImageElement)
                                                                        }
                                                                        src={products[index + 1].product_thumb_image.secure_url}
                                                                        className='w-full h-full rounded'
                                                                        alt=''
                                                                  />
                                                                  <div className='absolute min-w-[420px] w-max h-[90px] left-[50%] translate-x-[-50%] bottom-[20px] hidden xl:flex gap-[20px] p-[10px] bg-[#ffffff] rounded-lg shadow-2xl'>
                                                                        {[products[index + 1].product_thumb_image]
                                                                              .concat(products[index + 1].product_desc_image)
                                                                              .map((img) => (
                                                                                    <img
                                                                                          src={img.secure_url}
                                                                                          className='w-[calc(100%/5)] h-[70px] outline-2 outline-dashed outline-offset-4 outline-blue-600'
                                                                                          alt='description'
                                                                                          key={img.public_id}
                                                                                          onMouseEnter={() =>
                                                                                                onChangeSourceImage({
                                                                                                      secure_url: img.secure_url,
                                                                                                      refIndex: index + 1,
                                                                                                })
                                                                                          }
                                                                                          // onMouseLeave={() => onMouseRegainSoucre({ refIndex+1: index+1 })}
                                                                                          onClick={() =>
                                                                                                onChangeSourceImage({
                                                                                                      secure_url: img.secure_url,
                                                                                                      refIndex: index + 1,
                                                                                                })
                                                                                          }
                                                                                    />
                                                                              ))}
                                                                  </div>
                                                            </div>
                                                      )}
                                                </div>,
                                          )
                                    }
                                    return images
                              })()}
                        </div>
                  </div>
                  <div className='absolute left-[50%] translate-x-[-50%] bottom-[0px] w-[150px] h-[20px] flex items-center justify-center gap-[6px]'>
                        {(() => {
                              let images = []
                              for (let index = 0; index < products.length / 2; index++) {
                                    images.push(
                                          <button className={`${styleEffect.onActive(indexImage === index + 1)}`} key={index}></button>,
                                    )
                              }
                              return images
                        })()}
                  </div>

                  <BoxButtonCircle
                        className='hidden group-hover:flex absolute top-[50%] translate-x-[-50%] left-[20px] disabled:cursor-not-allowed'
                        width={30}
                        height={30}
                        icon={<ChevronLeft className='text-blue-600' />}
                        onClick={onClickPrev}
                        disabled={indexImage === 1}
                  />

                  <BoxButtonCircle
                        className='hidden group-hover:flex absolute top-[50%] translate-x-[-50%] right-[-10px] disabled:cursor-not-allowed'
                        width={30}
                        height={30}
                        icon={<ChevronRight className='text-blue-600' />}
                        onClick={onClickNext}
                        disabled={indexImage === LIMIT}
                  />
            </div>
      )
}

export default ProductSlider
