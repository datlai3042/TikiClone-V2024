import React, { SetStateAction, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Radio, RadioChangeEvent } from 'antd'
import Portal from '../../Portal'
import FormAddress from '../../../forms/FormAddress'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { UserAddress, UserResponse } from '../../../types/user.type'
import { renderStringAddress, renderStringAddressDetail, renderStringAddressDetailV2 } from '../../../utils/address.util'
import { Span } from 'next/dist/trace'
import BoxButton from '../BoxButton'
import { AddressType, CartCurrent, setAddressProduct } from '../../../Redux/cartSlice'
import { TProductDetail } from '../../../types/product/product.type'
import { addToast } from '../../../Redux/toast'
import { CartProduct } from '../../../types/cart.type'
import CartItem from '../../Cart/CartItem'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CartService from '../../../apis/cart.service'

type TProps = {
      setOpenModal: React.Dispatch<SetStateAction<boolean>>
      product_id: string
      mode?: 'Select' | 'Update'
      cart_item?: CartProduct
}

const BoxConfirmAddress = (props: TProps) => {
      const user = useSelector((state: RootState) => state.authentication.user) as UserResponse
      const cartCurrent = useSelector((state: RootState) => state.cartSlice.cart_current) as CartCurrent
      const { setOpenModal, product_id, mode = 'Select', cart_item } = props
      const queryClient = useQueryClient()

      const address_default = (user?.user_address && user?.user_address.filter((address) => address.address_default === true)) || ''

      const updateAddressCart = useMutation({
            mutationKey: ['/v1/api/cart/update-cart'],
            mutationFn: ({ product_id, address_text }: { product_id: string; address_text: string }) =>
                  CartService.updateAddresCart({ address_text, product_id }),
            onSuccess: () => {
                  queryClient.invalidateQueries({
                        queryKey: ['v1/api/cart/cart-get-my-cart'],
                  })
                  setOpenModal(false)
            },
      })

      const dispatch = useDispatch()

      const [valueAddress, setValueAddress] = useState<string>(() => {
            if (mode === 'Update') {
                  let foundId = user.user_address.find((address) =>
                        address.address_text.includes(cart_item?.cart_address.address as string),
                  )
                  console.log({ cart: cart_item?.cart_address._id, foundId, user: user?.user_address, item: cart_item })
                  return foundId?._id as string
            }

            return cartCurrent.cart_current_address_id || address_default[0]?._id || ''
      })

      const [addNew, setAddNew] = useState<boolean>(false)

      const handleCloseModal = () => {
            setOpenModal(false)
      }

      const onSuccessAddAddress = (id: string) => {
            setAddNew(true)
            setValueAddress(id)
      }

      const onVerifyAddress = () => {
            if (!valueAddress) {
                  dispatch(
                        addToast({
                              type: 'WARNNING',
                              message: `Vui lòng chọn 1 trong ${user?.user_address.length} địa chỉ`,
                              id: Math.random().toString(),
                        }),
                  )
                  return
            }

            if (mode === 'Update') {
                  const addressSelector = user?.user_address.find((address) => address._id === valueAddress)
                  updateAddressCart.mutate({
                        product_id,
                        address_text: renderStringAddressDetail(addressSelector as UserAddress) as string,
                  })
                  return
            }

            const address_default = user?.user_address.find((address) => address._id === valueAddress)
            if (address_default) {
                  dispatch(
                        setAddressProduct({
                              cart_current_product_id: product_id as string,
                              cart_current_address: renderStringAddressDetailV2(address_default as UserAddress) || '',
                              cart_current_address_type: address_default?.type as AddressType,
                              cart_current_address_id: address_default._id,
                              cart_current_address_ward: address_default.address_ward,
                              cart_current_address_district: address_default.address_district,
                              cart_current_address_province: address_default.address_province,
                              // address: renderStringAddressDetail(foundAddress as UserAddress) || '',
                              // product_id: product_id,
                              // address_type: foundAddress?.type as AddressType,
                              // address_id: foundAddress?._id as string,
                        }),
                  )
            }
            setOpenModal(false)
      }

      const handleChangeRadio = (e: RadioChangeEvent) => {
            console.log({ radio: e.target.value })
            setValueAddress(e.target.value)
      }

      return (
            <Portal>
                  <div className='fixed inset-0 bg-[rgba(0,0,0,.45)] flex justify-center items-center z-[500]'>
                        <div className='relative w-full xl:w-[600px] min-h-[370px] h-max bg-[#ffffff] p-[12px_8px]  xl:p-[24px_12px] mx-[16px] xl:mx-0 mt-[120px] xl:mt-0 rounded'>
                              <div className='flex flex-col gap-[10px] h-full'>
                                    <div className='basis-[80%] bg-white rounded-lg  py-[12px] flex flex-col gap-[12px]'>
                                          <header className='text-[20px] font-medium text-center'>Địa chỉ giao hàng</header>
                                          <div className='w-full h-[1px] bg-gray-100'></div>
                                          <div className='px-[36px] mt-[24px] text-[14px]'>
                                                <span>
                                                      Hãy chọn địa chỉ nhận hàng để được dự báo thời gian giao hàng cùng phí đóng gói, vận
                                                      chuyển một cách chính xác nhất.
                                                </span>
                                          </div>
                                          {user && user?.user_address && (
                                                <div className='px-[36px] mt-[24px] '>
                                                      <Radio.Group
                                                            className='flex flex-col gap-[8px]'
                                                            onChange={handleChangeRadio}
                                                            value={valueAddress}
                                                            defaultValue={valueAddress}
                                                      >
                                                            {user?.user_address.map((address, index) => {
                                                                  return (
                                                                        <div key={address._id}>
                                                                              <Radio
                                                                                    value={address._id}
                                                                                    defaultChecked={address.address_default}
                                                                              >
                                                                                    <span>
                                                                                          {renderStringAddressDetailV2(address)!.replace(
                                                                                                'Địa chỉ:',
                                                                                                '',
                                                                                          ) || ''}
                                                                                    </span>
                                                                                    {addNew && user?.user_address.length === index + 1 && (
                                                                                          <span className='ml-[6px] inline-block bg-blue-400 rounded-md p-[2px] text-white'>
                                                                                                new
                                                                                          </span>
                                                                                    )}
                                                                              </Radio>
                                                                        </div>
                                                                  )
                                                            })}

                                                            <Radio value={'Other'}>Chọn địa chỉ khác</Radio>
                                                      </Radio.Group>
                                                </div>
                                          )}
                                          {valueAddress !== 'Other' && (
                                                <div className='mt-[20px]' onClick={onVerifyAddress}>
                                                      <BoxButton content='Xác nhận' />
                                                </div>
                                          )}

                                          {valueAddress === 'Other' && <FormAddress onSuccessAddAddress={onSuccessAddAddress} />}
                                    </div>
                              </div>
                              <button
                                    className='absolute top-[-15px] right-[-15px] w-[30px] h-[30px] border-[1px] border-gray-300 bg-white rounded-full flex items-center justify-center'
                                    onClick={handleCloseModal}
                              >
                                    <X color='gray' />
                              </button>
                        </div>
                  </div>
            </Portal>
      )
}

export default BoxConfirmAddress
