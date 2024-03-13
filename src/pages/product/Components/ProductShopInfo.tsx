import React from 'react'
import { ShopResponse } from '../../../types/shop.type'
import { Link } from 'react-router-dom'
import ShopLogo from '../../../component/Content/assets/img/Label/offical.png'
import { Rate } from 'antd'

type TProps = {
      shop: ShopResponse
}

const ProductShopInfo = (props: TProps) => {
      const { shop } = props

      return (
            <Link
                  to={`/shop/${shop._id}`}
                  className='w-full min-h-[130px] h-full bg-[#ffffff] rounded-lg flex flex-col gap-[16px] p-[16px]'
            >
                  <h4 className='text-[16px] font-medium'>Thông tin nhà bán</h4>
                  <div className='flex flex-row xl:flex-col gap-[16px]'>
                        <div className='flex flex-1 gap-[12px]'>
                              <img
                                    src={shop?.shop_avatar?.secure_url || shop.shop_avatar_default}
                                    className='w-[40px] h-[40px] rounded-full'
                                    alt='shop avatar'
                              />
                              <div className='flex  flex-col gap-[6px] xl:gap-[12px]'>
                                    <div className='w-max flex  flex-col-reverse xl:flex-row gap-[6px]'>
                                          <span className='font-medium text-[14px]'>{shop.shop_name}</span>
                                          <img src={ShopLogo} className='w-[80px]' alt='label logo' />
                                    </div>
                                    <div className='flex items-center gap-[6px] w-max'>
                                          <Rate disabled allowHalf defaultValue={4} className='text-[12px]' />
                                          <span className='text-[13px] xl:text-[14px]'>(5.4tr+ đánh giá)</span>
                                    </div>
                              </div>
                        </div>

                        <div className='ml-[48px] self-start justify-self-start flex flex-col gap-[12px]'>
                              <div className=''>
                                    <button className='min-w-[60px] w-max h-[24px] p-[4px] border-[1px] border-slate-400 flex items-center justify-center rounded-md'>
                                          Xem shop
                                    </button>
                              </div>
                        </div>
                  </div>
            </Link>
      )
}

export default ProductShopInfo