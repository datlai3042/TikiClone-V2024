import { BellDot, Key, Lock, LogIn, Mail, MapPinned, NotebookPen, ShoppingBag, ShoppingCart, Store, UserRound } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store'
import { useMutation } from '@tanstack/react-query'
import Auth from '../../apis/auth.api'
import { doLogout } from '../../Redux/authenticationSlice'
import { addToast } from '../../Redux/toast'
import { UserResponse } from '../../types/user.type'

const CustomerRouter = () => {
      const user = useSelector((state: RootState) => state.authentication.user) as UserResponse
      const dispatch = useDispatch()
      const logoutMutation = useMutation({
            mutationKey: ['logout account'],
            mutationFn: () => Auth.logout(),
            onSuccess: () => {
                  dispatch(doLogout())
                  dispatch(addToast({ type: 'SUCCESS', message: 'Đăng xuất thành công', id: Math.random().toString() }))
            },
            onError: (error) => {
                  console.log({ error })
                  dispatch(addToast({ type: 'ERROR', message: 'Đăng xuất không thành công', id: Math.random().toString() }))
            },
      })
      const handleLogOut = () => {
            logoutMutation.mutate()
      }

      if (window.innerWidth > 1024) {
            return <p>Trang này chỉ hiển thị cho mobile</p>
      }

      return (
            <div className='block w-full py-[20px] bg-[#ffffff]'>
                  <div className='ml-[20px] h-[75px] flex items-center gap-[8px] overflow-x-hidden' title={`Account ${user?.email}` || ''}>
                        {user ? (
                              <>
                                    <img
                                          src={user.avatar?.secure_url || user.avatar_url_default || ''}
                                          alt='user_avatar'
                                          className='min-w-[30px] lg:min-w-[40px] w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] rounded-full'
                                    />

                                    <div className='flex flex-col gap-[1px]'>
                                          <span>Tài khoản của</span>
                                          {user && <span className='truncate w-[170px]'>{`@${user.email.split('@')[0]}`}</span>}
                                    </div>
                              </>
                        ) : (
                              <div className='flex text-red-700 gap-[15px]'>
                                    <Lock color='red' />
                                    <span className='font-bold'>Permission</span>
                              </div>
                        )}
                  </div>
                  <Link to={'/customer/account'} className='customer-item-bg px-[15px] py-[8px] w-full'>
                        <UserRound />
                        Account
                  </Link>

                  <Link to={'/customer/notification'} className='customer-item-bg px-[15px] py-[8px] w-full'>
                        <BellDot />
                        Thông báo của tôi
                  </Link>

                  <Link to={'/customer/order_history'} className='customer-item-bg px-[15px] py-[8px] w-full'>
                        <NotebookPen />
                        Quản lí đơn hàng
                  </Link>
                  <Link to={'/customer/shop'} className='customer-item-bg px-[15px] py-[8px] w-full'>
                        <ShoppingCart />
                        Shop
                  </Link>
                  <Link to={'/customer/register-sell'} className=' customer-item-bg px-[15px] py-[8px] w-full'>
                        <ShoppingBag />
                        Đăng kí bán
                  </Link>

                  {user?.verify_email && (
                        <Link to={'/customer/shop/product-list'} className='customer-item-bg px-[15px] py-[8px] w-full'>
                              <Store />
                              Sản phẩm của Shop
                        </Link>
                  )}
                  <Link to={'/customer/shop/product-list'} className={`customer-item-bg flex items-center p-[8px] gap-[24px] `}>
                        <Store />

                        <span>Sản phẩm của Shop</span>
                  </Link>

                  <Link to={'/customer/account/address'} className={`customer-item-bg flex items-center p-[8px] gap-[24px] `}>
                        <MapPinned />

                        <span>Số địa chỉ</span>
                  </Link>

                  <Link to={'/customer/account/update/email'} className={`customer-item-bg flex items-center p-[8px] gap-[24px] `}>
                        <Mail />
                        <span>Cập nhập Email</span>
                  </Link>

                  <Link to={'/customer/account/update/password'} className={`customer-item-bg flex items-center p-[8px] gap-[24px] `}>
                        <Key />
                        <span>Cập nhập mật khẩu</span>
                  </Link>

                  <div className={`customer-item-bg p-[8px]`} onClick={handleLogOut}>
                        <LogIn />
                        <span className=' py-[8px] w-full'>Đăng xuất</span>
                  </div>
            </div>
      )
}

export default CustomerRouter
