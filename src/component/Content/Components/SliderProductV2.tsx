import React, { useEffect, useRef, useState } from 'react'
import img1 from '../assets/img/SliderImage/img1png.webp'
import img2 from '../assets/img/SliderImage/img2.webp'
import img3 from '../assets/img/SliderImage/img3.webp'
import img4 from '../assets/img/SliderImage/img4.webp'
import img5 from '../assets/img/SliderImage/img5.webp'
import img6 from '../assets/img/SliderImage/img6.webp'
import BoxButtonCircle from '../../BoxUi/BoxButtonCircle'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SliderProductV2 = () => {
      const wrapperRef = useRef<HTMLDivElement>(null)
      const timer = useRef<NodeJS.Timeout | null>(null)
      const [newPosition, setNewPosition] = useState<number>(0)
      const [indexImage, setIndexImage] = useState<number>(1)
      const delay = 4000
      const LIMIT = 3

      const onClickNext = () => {
            if (wrapperRef.current) {
                  const width = wrapperRef.current?.getBoundingClientRect().width * -1
                  const pos = newPosition + width
                  wrapperRef.current.style.transform = `translateX(${pos}px)`
                  wrapperRef.current.style.transition = 'all 1s'
                  setNewPosition(pos)
                  setIndexImage((prev) => prev + 1)
            }
      }

      const onClickPrev = () => {
            if (wrapperRef.current) {
                  const width = wrapperRef.current?.getBoundingClientRect().width * 1
                  const pos = newPosition + width
                  wrapperRef.current.style.transform = `translateX(${pos}px)`
                  wrapperRef.current.style.transition = 'all 1s'
                  setNewPosition(pos)
                  setIndexImage((prev) => prev - 1)
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
                        wrapperRef.current.style.transition = 'all 1s'
                        setNewPosition(pos)
                        setIndexImage((prev) => prev + 1)
                  }
            }, delay)

            return () => {
                  clearInterval(timer.current as NodeJS.Timeout)
            }
      }, [newPosition, indexImage])

      return (
            <div className='relative group w-full h-[95%]  '>
                  <div className='w-full h-full  overflow-x-hidden'>
                        <div className='flex h-full ' ref={wrapperRef}>
                              <div className='flex min-w-full w-full h-full  gap-[20px]'>
                                    <img src={img1} className='w-full xl:w-[50%] h-full rounded-xl' alt='' />
                                    <img src={img2} className='w-full xl:w-[50%] h-full rounded-xl' alt='' />
                              </div>

                              <div className='flex min-w-full w-full h-full gap-[20px]'>
                                    <img src={img3} className='w-full xl:w-[50%] h-full rounded-xl' alt='' />
                                    <img src={img4} className='w-full xl:w-[50%] h-full rounded-xl' alt='' />
                              </div>

                              <div className='flex min-w-full w-full h-full gap-[20px]'>
                                    <img src={img5} className='w-full xl:w-[50%] h-full rounded-xl' alt='' />
                                    <img src={img6} className='w-full xl:w-[50%] h-full rounded-xl' alt='' />
                              </div>
                        </div>
                  </div>
                  <div className='absolute left-[50%] translate-x-[-50%] bottom-[-25px] w-[150px] h-[20px] flex items-center justify-center gap-[6px]'>
                        <button className={`${styleEffect.onActive(indexImage === 1)}`}></button>
                        <button className={`${styleEffect.onActive(indexImage === 2)}`}></button>
                        <button className={`${styleEffect.onActive(indexImage === 3)}`}></button>
                  </div>

                  <BoxButtonCircle
                        className='hidden group-hover:flex absolute top-[50%] translate-x-[-50%] left-[20px]'
                        width={30}
                        height={30}
                        icon={<ChevronLeft className='text-blue-600' />}
                        onClick={onClickPrev}
                        disabled={indexImage === 1}
                  />

                  <BoxButtonCircle
                        className='hidden group-hover:flex absolute top-[50%] translate-x-[-50%] right-[-10px]'
                        width={30}
                        height={30}
                        icon={<ChevronRight className='text-blue-600' />}
                        onClick={onClickNext}
                        disabled={indexImage === LIMIT}
                  />
            </div>
      )
}

export default SliderProductV2
