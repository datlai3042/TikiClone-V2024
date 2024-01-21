import { memo, useState } from 'react'

//@react router
import { Link, Outlet, useLocation } from 'react-router-dom'

//@redux-toolkit
import { useSelector } from 'react-redux'
import { RootState } from '../store'

//@components
import CustomerWrapperItem from './Components/CustomerWrapperItem'
import AuthPermission from '../component/Auth/AuthPermission'
import NotFound from '../component/Errors/NotFound'

//@icon
import { BellDot, Lock, NotebookPen } from 'lucide-react'
import { UserRound } from 'lucide-react'

//@const
const link = [
      { path: '/customer/account', text: 'Thông tin tài khoản' },
      { path: '/customer/notification', text: 'Thông báo của tôi' },
      { path: '/customer/order_history', text: 'Quản lí đơn hàng' },
      { path: '/customer/account/edit/email', text: 'Cập nhập email' },
      { path: '/customer/account/edit/pass', text: 'Cập nhập password' },
]

//@Component
const Customer = () => {
      //@pathname
      let pathName = useLocation()?.pathname

      //@context pathname
      const [_, setSectionActive] = useState('/customer/account')

      //@connect state redux
      const user = useSelector((state: RootState) => state.authentication.user)
      const auth = Boolean(user)

      //@check path
      if (pathName === '/customer') return <NotFound />

      //@filter pathname context
      const textLink = link.find((pathItem) => {
            if (pathItem.path === pathName) return pathItem
      })

      //@active pathname
      const handleActive = (pathName: string) => {
            setSectionActive(pathName)
      }

      //@element
      return (
            <>
                  <div className='px-[75px] w-full h-full flex items-center lg:block pt-[15px] xl:pt-[0px] mt-0 xl:mt-[10px]'>
                        {/* @header */}
                        <div className='hidden lg:block mb-[1px]'>
                              <Link to={'/'}>Trang chủ</Link>
                              <span> {' > '}</span>
                              <Link className='' to={textLink?.path as string}>
                                    {textLink?.text}
                              </Link>
                        </div>

                        <div className='w-full flex gap-[1%] min-h-[450px]  h-[auto] '>
                              {/* @navigate pathname */}
                              <div className='hidden  xl:block lg:w-[24%]'>
                                    <div
                                          className='h-[75px] flex items-center gap-[8px] overflow-x-hidden'
                                          title={`Account ${user?.email}` || ''}
                                    >
                                          {user ? (
                                                <>
                                                      <img
                                                            src={user.avatar?.secure_url || user.avartar_url_default || ''}
                                                            alt='user_avatar'
                                                            className='min-w-[30px] lg:min-w-[40px] w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] rounded-full'
                                                      />

                                                      <div className='flex flex-col gap-[1px]'>
                                                            <span>Tài khoản của</span>
                                                            {user && (
                                                                  <span className='truncate w-[170px]'>{`@${
                                                                        user.email.split('@')[0]
                                                                  }`}</span>
                                                            )}
                                                      </div>
                                                </>
                                          ) : (
                                                <div className='flex text-red-700 gap-[15px]'>
                                                      <Lock color='red' />
                                                      <span className='font-bold'>Permission</span>
                                                </div>
                                          )}
                                    </div>
                                    <div
                                          className={`customer-item-bg ${textLink?.path === '/customer/account' ? 'isActive' : ''}`}
                                          onClick={(e) => handleActive('/customer/account')}
                                    >
                                          <UserRound />
                                          <Link to={'/customer/account'} className='p-[15px] w-full'>
                                                Account
                                          </Link>
                                    </div>

                                    <div
                                          className={`customer-item-bg ${textLink?.path === '/customer/notification' ? 'isActive' : ''}`}
                                          onClick={(e) => handleActive('/customer/notification')}
                                    >
                                          <BellDot />

                                          <Link to={'/customer/notification'} className='p-[15px] w-full'>
                                                Thông báo của tôi
                                          </Link>
                                    </div>

                                    <div
                                          className={`customer-item-bg ${textLink?.path === '/customer/order_history' ? 'isActive' : ''}`}
                                          onClick={(e) => handleActive('/customer/order_history')}
                                    >
                                          <NotebookPen />
                                          <Link to={'/customer/order_history'} className='p-[15px] w-full'>
                                                Quản lí đơn hàng
                                          </Link>
                                    </div>
                              </div>

                              {/*@ Outlet */}
                              <div className='w-full 2xl:w-[75%]'>
                                    <div className='hidden xl:flex h-[55px]  items-center'>{textLink?.text}</div>
                                    {auth ? (
                                          <CustomerWrapperItem>
                                                <Outlet />
                                          </CustomerWrapperItem>
                                    ) : (
                                          <AuthPermission />
                                    )}
                              </div>
                        </div>
                  </div>
            </>
      )
}

export default memo(Customer)