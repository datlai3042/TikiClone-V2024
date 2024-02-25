import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartProduct, CartResponse } from '../../types/cart.type'
import BoxMoney from '../../component/BoxUi/BoxMoney'
import { ChevronUp } from 'lucide-react'
import { Address } from '../../types/address.type'
import { useMutation } from '@tanstack/react-query'
import OrderService from '../../apis/Order.service'

type TProps = {
      carts: CartResponse
      price: number
      product_payment: CartProduct[]
}

export type ParamOrderAdd = Omit<CartProduct, '_id'>[]

const PaymentCart = (props: TProps) => {
      const { carts, price, product_payment } = props
      console.log({ payment: product_payment })
      const productWrapperRef = useRef<HTMLDivElement>(null)
      const heightElement = useRef<number>(30)
      const [height, setHeight] = useState<number>(0)

      const [openSeeProduct, setOpenSeeProduct] = useState<boolean>(false)

      const orderPaymentMutation = useMutation({
            mutationKey: ['/v1/api/order/order-payment-product'],
            mutationFn: (products: ParamOrderAdd) => OrderService.orderAddProduct(products),
      })

      const controllOpenSeeProduct = () => {
            setOpenSeeProduct((prev) => !prev)
      }

      console.log({ product_payment })
      const handleVerifyBuy = () => {
            // let newArray: ParamOrderAdd= []
            // for (let index = 0; index < product_payment.length; index++) {
            //       newArray.push(product_payment[index])
            // }
            orderPaymentMutation.mutate(product_payment)
            // console.log({ newArray })
      }

      useEffect(() => {
            if (productWrapperRef.current) {
                  if (openSeeProduct) {
                        setHeight(heightElement.current * carts?.cart_products.length + 20 + 24 + 8)
                  } else {
                        setHeight(0)
                  }
            }
      }, [openSeeProduct, carts?.cart_products.length, height])

      return (
            <React.Fragment>
                  <div className='min-h-[230px] xl:min-h-[180px] h-max  transition-all duration-1000 bg-[#ffffff] rounded p-[16px] text-[12px]'>
                        <div className='w-full min-h-[50px]  flex flex-col gap-[6px]'>
                              <h4>Đơn hàng</h4>
                              <div className='flex gap-[6px]'>
                                    <span>{carts?.cart_products.length} sản phẩm</span>
                                    <p className='flex gap-[3px]' onClick={controllOpenSeeProduct}>
                                          <span>Xem thông tin</span>
                                          <ChevronUp className={`${height ? 'rotate-180' : 'rotate-0'} transition-all duration-300`} />
                                    </p>
                              </div>
                        </div>

                        <div className='w-[calc(100%+32px)] ml-[-16px] bg-slate-200 h-[1px] my-[8px] '></div>
                        <div
                              style={{ height, paddingTop: height > 0 ? 10 : 0, paddingBottom: height > 0 ? 10 : 0 }}
                              className={` flex flex-col gap-[8px] transition-all duration-100`}
                              ref={productWrapperRef}
                        >
                              {carts?.cart_products.map((product) => {
                                    return (
                                          <div
                                                style={{
                                                      height: heightElement.current,
                                                      display: height > 0 ? 'flex' : 'none',
                                                }}
                                                className=' justify-between  items-center'
                                                key={product._id}
                                          >
                                                <div className='flex gap-[2px] h-full items-center justify-between'>
                                                      <span className='self-end text-[12px]'>x</span>
                                                      <p className='self-end min-w-[50px] text-[20px] leading-none'>{product.quantity}</p>
                                                      <img
                                                            style={{
                                                                  width: (height / carts?.cart_products.length / 100) * 70,
                                                            }}
                                                            src={product.product_id.product_thumb_image.secure_url}
                                                            className=' h-[100%]'
                                                            alt='product'
                                                      />
                                                </div>
                                                <p className=' min-w-[50px] w-max text-left text-slate-900 font-bold text-[16px]'>
                                                      {product.quantity * product.product_id.product_price}
                                                </p>
                                          </div>
                                    )
                              })}
                              <div className='w-[calc(100%+32px)] ml-[-16px] bg-slate-200 h-[1px] '></div>
                        </div>
                        <div className=' bg-[#ffffff]  min-h-[150px]  flex-1 w-[calc(100%+32px)] ml-[-16px] px-[16px]'>
                              <div className='h-[49%]  flex flex-col gap-[8px] xl:gap-[16px] justify-center'>
                                    <div className='w-full flex  flex-col xl:flex-row justify-between'>
                                          <span>Tạm tính</span>
                                          <p className='w-max flex gap-[4px] items-center '>
                                                <span className='w-[130px] xl:w-max  max-w-[180px] truncate'>
                                                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                                            .format(price)
                                                            .replace('₫', '')}
                                                </span>
                                                <span className='ml-[-2px]'>VNĐ</span>
                                          </p>
                                    </div>
                                    <p className='w-full flex justify-between gap-[16px]'>
                                          <span>Giảm giá </span>
                                          <span>-15000</span>
                                    </p>
                              </div>
                              <div className='mt-0 transition-all duration-700 h-[49%] flex flex-col gap-[8px] xl:gap-0 justify-center bg-[#ffffff] '>
                                    <div className='flex   flex-col xl:flex-row justify-between '>
                                          <span>Tổng tiền</span>
                                          <BoxMoney name='VNĐ' money={price} />
                                    </div>
                                    <span className='block w-full text-right'>(Đã bao gồm VAT nếu có)</span>
                              </div>
                              <button
                                    onClick={handleVerifyBuy}
                                    className='w-full h-[45px] flex items-center justify-center bg-red-600 text-white rounded-md text-[16px] mt-[16px]'
                              >
                                    Mua hàng {'('}
                                    {carts?.cart_products.length}
                                    {')'}
                              </button>
                        </div>
                  </div>
            </React.Fragment>
      )
}

export default PaymentCart
