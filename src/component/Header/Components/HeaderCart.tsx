import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { doCloseBoxLogin, doOpenBoxLogin } from '../../../Redux/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { RootState, store } from '../../../store'
import { useQuery } from '@tanstack/react-query'
import CartService from '../../../apis/cart.service'
import { ShoppingCart } from 'lucide-react'

const HeaderCart = () => {
      const user = useSelector((state: RootState) => state.authentication.user)

      const cartQuery = useQuery({
            queryKey: ['cart-get-count-product'],
            queryFn: () => CartService.getCountProductCart(),
      })

      useEffect(() => {}, [cartQuery.data?.data.metadata.count])

      return (
            <Link className='2xl:w-[45px] flex items-center justify-centen p-2 hover:bg-sky-200 rounded' to={'/cart'}>
                  <span className='flex relative'>
                        <ShoppingCart size={28} color='blue' />

                        {cartQuery.isSuccess && (
                              <div className='absolute top-[-12px] right-[-5px] w-[18px] h-[18px] rounded-full bg-red-400 flex items-center justify-center'>
                                    <span className=' text-[#ffffff] font-bold text-[12px] xl:text-[14px]'>
                                          {cartQuery.data.data.metadata.count || 0}
                                    </span>
                              </div>
                        )}
                  </span>
            </Link>
      )
}

export default HeaderCart
