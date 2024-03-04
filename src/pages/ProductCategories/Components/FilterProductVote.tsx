import { Rate } from 'antd'
import { Check } from 'lucide-react'
import React, { SetStateAction, useEffect, useReducer, useRef } from 'react'
import filterProductReducer, { Actions, initialValue } from '../../../reducer/filterProduct.reducer'
type TProps = {
      setVote: React.Dispatch<SetStateAction<{ minPrice: number; maxPrice: number; onVote: number }>>
}

const FilterProductVote = (props: TProps) => {
      const { setVote } = props

      const inputRef1 = useRef<HTMLInputElement>(null)
      const inputRef2 = useRef<HTMLInputElement>(null)
      const inputRef3 = useRef<HTMLInputElement>(null)

      const [state, setState] = useReducer(filterProductReducer, initialValue)

      const onChangeInputHigh = ({ type }: { type: Actions }) => {
            if (inputRef1.current?.checked) {
                  setState({ type: 'ON_CHECKED_RESET' })
                  setVote((prev) => ({ ...prev, onVote: 5 }))

                  return
            }
            setState({ type })
      }

      const onChangeInputMid = ({ type }: { type: Actions }) => {
            if (inputRef2.current?.checked) {
                  setState({ type: 'ON_CHECKED_RESET' })
                  setVote((prev) => ({ ...prev, onVote: 4 }))

                  return
            }
            setState({ type })
      }

      const onChangeInputLow = ({ type }: { type: Actions }) => {
            if (inputRef3.current?.checked) {
                  setState({ type: 'ON_CHECKED_RESET' })
                  setVote((prev) => ({ ...prev, onVote: 3 }))

                  return
            }
            setState({ type })
      }

      console.log({ onValue: state.onMinValueVote })

      const styleEffect = {
            onSelect: (state: boolean) => {
                  if (state) return 'bg-blue-600 border-blue-600 '
                  return 'bg-[#ffffff] border-gray-300 hover:border-[2px] hover:border-blue-700 hover:shadow-lg '
            },
      }

      return (
            <div>
                  <div className='w-full flex flex-wrap  gap-[30px] py-[16px]'>
                        <h5 className='w-full'>Đánh giá</h5>
                        <div className='min-:w-[42%] flex items-center gap-[14px] text-[14px]'>
                              <input className='hidden' defaultChecked={state.onCheckedHigh} type='radio' ref={inputRef1} />
                              <div
                                    className={`${styleEffect.onSelect(
                                          state.onCheckedHigh,
                                    )} relative w-[24px] h-[24px]  border-[1px] hover:border-[2px] `}
                                    onClick={() => onChangeInputHigh({ type: 'ON_CHECKED_HIGH' })}
                              >
                                    {state.onCheckedHigh && (
                                          <Check
                                                className='animate-mountComponent absolute  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'
                                                size={14}
                                                color='white'
                                          />
                                    )}
                              </div>
                              <Rate disabled defaultValue={5} className='text-[14px]' />
                              <p>Từ 5 sao</p>
                        </div>

                        <div className='min-w-[42%] flex items-center gap-[12px] text-[14px]'>
                              <input className='hidden' defaultChecked={state.onCheckedMid} type='radio' ref={inputRef2} />
                              <div
                                    className={`${styleEffect.onSelect(state.onCheckedMid)} relative w-[24px] h-[24px]  border-[1px] `}
                                    onClick={() => onChangeInputMid({ type: 'ON_CHECKED_MID' })}
                              >
                                    {state.onCheckedMid && (
                                          <Check
                                                className='animate-mountComponent absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'
                                                size={14}
                                                color='white'
                                          />
                                    )}
                              </div>
                              <Rate disabled defaultValue={4} className='text-[14px]' />
                              <p>Từ 4 sao</p>
                        </div>

                        <div className='min-w-[50%] flex items-center gap-[14px]'>
                              <input className='hidden' defaultChecked={state.onCheckedLow} type='radio' ref={inputRef3} />
                              <div
                                    className={`${styleEffect.onSelect(state.onCheckedLow)} relative w-[24px] h-[24px]  border-[1px] `}
                                    onClick={() => onChangeInputLow({ type: 'ON_CHECKED_LOW' })}
                              >
                                    {state.onCheckedLow && (
                                          <Check
                                                className='animate-mountComponent absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'
                                                size={14}
                                                color='white'
                                          />
                                    )}
                              </div>
                              <Rate disabled defaultValue={3} className='text-[14px] gap-[2px]' />
                              <p>Từ 3 sao</p>
                        </div>
                  </div>
            </div>
      )
}

export default FilterProductVote
