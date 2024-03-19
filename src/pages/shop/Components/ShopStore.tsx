import React, { useEffect } from 'react'
import ProductSlider from './ProductSlider'
import ProductTopSellQuery from './ProductTopSellQuery'
import ProductBestSellerRank from './ProductBestSellerRank'
import ShopProductAll from './ShopProductAll'
import { ShopResponse } from '../../../types/shop.type'

type TProps = {
      shop_id: string
      shop: ShopResponse
}

const ShopStore = (props: TProps) => {
      const { shop_id, shop } = props

      console.log({ shop_id })
      const Layout = ProductTopSellQuery<{ TransitionTime: number }>({
            shop_id,
            limit: 10,
            sort: 'product_is_bought',
            inc: -1,
            Component: ProductSlider,
      })

      const LayoutTopRank = ProductTopSellQuery({
            shop_id,
            limit: 3,
            sort: 'product_is_bought',
            inc: -1,
            Component: ProductBestSellerRank,
      })

      if (shop && shop?.shop_products.length === 0) {
            return (
                  <div className='w-full h-[500px] bg-[#ffffff] flex items-center justify-center text-[18px] font-semibold'>
                        Shop này chưa đăng sản phẩm
                  </div>
            )
      }

      console.log('re-render')

      return (
            <div className='flex flex-col gap-[16px]'>
                  <div className='mx-[10px] xl:mx-0 h-[300px] xl:h-[500px] flex items-center justify-center xl:block'>
                        <Layout TransitionTime={3} />
                  </div>
                  <div className='min-w-full min-h-full h-max flex flex-col gap-[50px] overflow-x-auto'>
                        <LayoutTopRank />
                  </div>
                  <ShopProductAll shop_id={shop_id} searchName='' mode='Normal' shop={shop} />

                  <div className='w-full h-[500px] bg-yellow-400'></div>
            </div>
      )
}

export default ShopStore
