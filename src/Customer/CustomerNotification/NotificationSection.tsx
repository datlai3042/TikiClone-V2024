import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import NotificationService, { NotificationType } from '../../apis/notification.service'
import { limitNotification } from '../../constant/notification.constant'
import { convertDateToStringFull } from '../../utils/date.utils'
import { Clock8, Inbox } from 'lucide-react'
import { Link } from 'react-router-dom'
import BoxLoading from '../../component/BoxUi/BoxLoading'
import BoxConfirmDelete from '../../component/BoxUi/confirm/BoxConfirmDelete'

type TProps = {
      type: NotificationType
}

const NotificationSection = (props: TProps) => {
      const { type } = props
      const queryClient = useQueryClient()
      const [showConfirm, setShowConfirm] = useState<boolean>(false)

      const getMyNotification = useInfiniteQuery({
            queryKey: ['/v1/api/notification/get-my-notification', type],
            queryFn: ({ pageParam = 1 }) => NotificationService.getMyNotification({ page: pageParam, type, limit: limitNotification }),
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
                  lastPage.data.metadata.notifications.notification.notifications_message.length > 0 ? allPages.length + 1 : undefined,
      })

      const readNotificationMutation = useMutation({
            mutationKey: ['read-notification'],
            mutationFn: ({ notification_id }: { notification_id: string }) => NotificationService.readNotification({ notification_id }),
            onSuccess: () => {
                  queryClient.invalidateQueries({
                        queryKey: ['/v1/api/notification/get-my-notification', type],
                  })
            },
      })

      const deleteNotificationMutation = useMutation({
            mutationKey: ['delete-notification'],
            mutationFn: ({ notification_id }: { notification_id: string }) => NotificationService.deleteNotification({ notification_id }),
            onSuccess: () => {
                  queryClient.invalidateQueries({
                        queryKey: ['/v1/api/notification/get-my-notification', type],
                  })
            },
      })

      const onReadNotification = ({ notification_id, read }: { notification_id: string; read: boolean }) => {
            if (read) {
                  return
            }
            readNotificationMutation.mutate({ notification_id })
      }

      const styleEffect = {
            isRead: (read: boolean) => (read ? 'bg-white' : 'bg-blue-100'),
      }

      return (
            <div className='w-full min-h-[50px] h-max bg-[#ffffff] relative pb-[20px] mb-[80px] xl:mb-0'>
                  <div className='mb-[80px] xl:mb-[40px] flex flex-col gap-[16px] xl:gap-0'>
                        {getMyNotification.data?.pages.map((page) =>
                              page.data.metadata.notifications.notification.notifications_message.map((notification) => (
                                    <div
                                          className={`${styleEffect.isRead(
                                                notification.notification_isRead,
                                          )} bg-[#ffffff] w-full h-[180px] xl:h-[100px] flex flex-col xl:flex-row items-center  p-[14px] xl:px-[32px] gap-[4px] xl:gap-[16px]`}
                                          key={notification._id}
                                    >
                                          <div className='flex w-full xl:w-[24%] h-max xl:h-[70%] items-center  justify-between'>
                                                <p>{convertDateToStringFull(notification.notification_creation_time)}</p>
                                                <div className='w-[40px] h-[40px] bg-blue-200 flex items-center justify-center rounded-full'>
                                                      {notification.notification_attribute.notification_type === 'PRODUCT' && (
                                                            <Inbox size={24} color='white' />
                                                      )}
                                                      {notification.notification_attribute.notification_type === 'SYSTEM' && (
                                                            <Clock8 size={24} color='white' />
                                                      )}

                                                      {notification.notification_attribute.notification_type === 'USER' && (
                                                            <Clock8 size={24} color='white' />
                                                      )}

                                                      {notification.notification_attribute.notification_type === 'SHOP' && (
                                                            // <Clock8 size={24} color='white' />
                                                            <img
                                                                  className='w-full h-full rounded'
                                                                  src={notification.notification_attribute.product_image}
                                                                  alt='product'
                                                            />
                                                      )}
                                                </div>
                                          </div>
                                          <div className='flex flex-1 w-full  items-center  h-full '>
                                                {notification.notification_attribute.notification_type === 'SYSTEM' && (
                                                      <span>{notification.notification_attribute.notification_content}</span>
                                                )}

                                                {notification.notification_attribute.notification_type === 'USER' && (
                                                      <span>{notification.notification_attribute.notification_content}</span>
                                                )}
                                                {notification.notification_attribute.notification_type === 'SHOP' && (
                                                      <p>
                                                            {notification.notification_attribute.notification_content}
                                                            <span className='mx-[2px]  text-black underlinex inline-block px-[2px] py-1'>
                                                                  {notification.notification_attribute.product_name}
                                                            </span>
                                                            <span className='mx-[2px] text-blue-400 underline  inline-block px-[2px] py-1'>
                                                                  số lượng: {notification.notification_attribute.product_quantity}
                                                            </span>
                                                      </p>
                                                )}

                                                {notification.notification_attribute.notification_type === 'PRODUCT' && (
                                                      <div className='flex flex-col gap-[4px]'>
                                                            <p>
                                                                  {notification.notification_attribute.notification_content}
                                                                  <span className='mx-[2px]  text-blue-600 inline-block px-[2px] py-1'>
                                                                        {notification.notification_attribute.product_name}
                                                                  </span>
                                                                  <span className='mx-[2px] text-blue-400  inline-block px-[2px] py-1'>
                                                                        số lượng: {notification.notification_attribute.product_quantity}
                                                                  </span>
                                                            </p>
                                                            <Link
                                                                  to={`/order-check/${notification.notification_attribute.order_id}`}
                                                                  className='text-left'
                                                            >
                                                                  Xem chi tiết
                                                            </Link>
                                                      </div>
                                                )}
                                          </div>
                                          <div className='w-full xl:w-[20%] flex items-center justify-between '>
                                                {!notification.notification_isRead && (
                                                      <button
                                                            className='xl:min-w-[50%] w-max h-[30px]  text-blue-400'
                                                            onClick={() =>
                                                                  onReadNotification({
                                                                        notification_id: notification._id,
                                                                        read: notification.notification_isRead,
                                                                  })
                                                            }
                                                      >
                                                            Đánh dấu là đã đọc
                                                      </button>
                                                )}
                                                <button className='w-max h-[30px] text-red-400' onClick={() => setShowConfirm(true)}>
                                                      Xóa
                                                      {showConfirm && (
                                                            <BoxConfirmDelete
                                                                  content='Bạn có chắc có thông báo này không'
                                                                  ButtonCancellContent='Hủy'
                                                                  ButtonConfrimContent='Xóa'
                                                                  onClose={setShowConfirm}
                                                                  paramsActive={{ notification_id: notification._id }}
                                                                  onActive={deleteNotificationMutation.mutate}
                                                            />
                                                      )}
                                                </button>
                                          </div>
                                          {/* {notification.notification_attribute.notification_type === 'SHOP' && (
                                                <span>{notification.notification_attribute.order_id}</span>
                                          )} */}
                                    </div>
                              )),
                        )}
                  </div>
                  <button
                        className='mx-[32px] px-[16px] min-w-[150px] w-max h-[40px] flex items-center gap-[16px] bg-[#ffffff] border-[1px] border-blue-400 text-blue-400 rounded'
                        onClick={() => getMyNotification.fetchNextPage()}
                        disabled={!getMyNotification.hasNextPage || getMyNotification.isFetchingNextPage}
                  >
                        {!getMyNotification.hasNextPage ? 'Không có dữ liệu thông báo' : 'Tải thêm thông báo'}
                        {getMyNotification.isPending && <BoxLoading />}
                  </button>
            </div>
      )
}

export default NotificationSection
