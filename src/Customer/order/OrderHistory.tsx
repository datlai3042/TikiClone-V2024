import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import OrderService from '../../apis/Order.service'
import CartEmpty from '../../component/Cart/CartEmpty'
import OrderHistoryItem from './OrderHistoryItem'
import BoxLoading from '../../component/BoxUi/BoxLoading'

const OrderHistory = () => {
      const getMyOrder = useQuery({
            queryKey: ['/v1/api/order/get-my-order'],
            queryFn: () => OrderService.getMyOrder(),
      })

      return (
            <div className='flex flex-col w-full min-h-[500px] h-max bg-[#f5f4f6]  gap-[30px]'>
                  {getMyOrder.isSuccess &&
                        getMyOrder.data.data.metadata.order &&
                        getMyOrder.data.data.metadata.order?.order_products &&
                        getMyOrder.data.data.metadata.order?.order_products?.map((order) => (
                              <div className='flex flex-col  '>
                                    <OrderHistoryItem orderItem={order} />
                              </div>
                        ))}
                  {getMyOrder.isSuccess && !getMyOrder.data.data.metadata.order && <CartEmpty />}
                  {getMyOrder.isPending && (
                        <div className='h-[300px]'>
                              <BoxLoading />
                        </div>
                  )}
            </div>
      )
}

//order -> order products [] -> products, một mảng chứa các sản phẩm thanh toán trong phiên đó -> product
// 3 array
//   {order.map((product) => (
//                                           <div className='flex flex-col'>
//                                                 <span>{product.order_time_payment.toString()}</span>
//                                                 {product.products.map((p) => (
//                                                       <div className='flex gap-[50px]'>{p.product_id.product_name}</div>
//                                                 ))}
//                                           </div>
//                                     ))}
// /*
// order_product chứa 1 mảng order
// trong mảng order có time và 1 mảng products
// vậy nên loop qua order_products để thu về mảng order, sau đó loop qua mảng order để lấy time và mảng products, loop products để lấy thông tin

// */

/*
[ [{}] ,[{}] ]
*/

export default OrderHistory
