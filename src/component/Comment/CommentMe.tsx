import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { SetStateAction, useEffect, useState } from 'react'
import CommentService from '../../apis/comment.service'
import BoxCommentProduct from '../BoxUi/BoxCommentProduct'
import { TProductDetail } from '../../types/product/product.type'
import CommentItem from './CommentItem'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { UserResponse } from '../../types/user.type'
import { addToast } from '../../Redux/toast'
import { SLATE_TIME_COMMENT_ME_ALL } from '../../constant/staleTime'
import BoxConfirmDelete from '../BoxUi/confirm/BoxConfirmDelete'

type TProps = {
      product: TProductDetail
}

const CommentMe = (props: TProps) => {
      const { product } = props

      const user = useSelector((state: RootState) => state.authentication.user) as UserResponse
      const dispatch = useDispatch()
      const queryClient = useQueryClient()

      const [openBoxUpload, setOpenBoxUpload] = useState<boolean>(false)
      const [openBoxUpdate, setopenBoxUpdate] = useState<boolean>(false)
      const [openBoxDelete, setOpenBoxDelete] = useState<boolean>(false)

      const getMeCommentQuery = useQuery({
            queryKey: ['get-me-comment', product._id],
            queryFn: () => CommentService.getMeComment({ product_id: product._id }),
            staleTime: SLATE_TIME_COMMENT_ME_ALL,
      })

      const deleteCommentMutation = useMutation({
            mutationKey: ['/v1/api/comment/delete-comment'],
            mutationFn: ({ comment_product_id }: { comment_product_id: string }) => CommentService.deleteComment({ comment_product_id }),
            onSuccess: () => {
                  setOpenBoxDelete(false)
                  queryClient.invalidateQueries({
                        queryKey: ['get-all-comment-image'],
                  })

                  queryClient.invalidateQueries({
                        queryKey: ['get-me-comment', product._id],
                  })

                  queryClient.invalidateQueries({
                        queryKey: ['get-product-with-id', product._id],
                  })
            },
      })

      const onDeleteComment = ({ comment_product_id }: { comment_product_id: string }) => {
            deleteCommentMutation.mutate({ comment_product_id })
      }

      const onOpenModel = (cb: React.Dispatch<SetStateAction<boolean>>) => {
            if (!user) {
                  dispatch(addToast({ id: Math.random().toString(), type: 'WARNNING', message: 'Vui lòng đăng nhập để đánh giá sản phẩm' }))
                  return
            }

            console.log({ user })
            cb(true)
      }

      useEffect(() => {
            if (openBoxUpload || openBoxUpdate) {
                  document.body.style.overflow = 'hidden'
            } else {
                  document.body.style.overflow = 'unset'
            }
      }, [openBoxUpload, openBoxUpdate])
      const comment = getMeCommentQuery.data?.data.metadata.comment

      return (
            <div>
                  {getMeCommentQuery.data?.data.metadata.comment && comment && (
                        <div className='relative ' id={`${comment._id}`}>
                              <CommentItem comment={comment} />
                              {user?._id === comment?.comment_user_id?._id && (
                                    <>
                                          <button
                                                className='absolute bottom-[0px] right-[45px] xl:bottom-[30px] xl:right-[70px]'
                                                onClick={() => onOpenModel(setopenBoxUpdate)}
                                          >
                                                Chỉnh sửa
                                          </button>

                                          <button
                                                className='absolute bottom-[0px] right-[4px] xl:bottom-[30px] xl:right-[30px] text-red-600'
                                                onClick={() => onOpenModel(setOpenBoxDelete)}
                                          >
                                                Xóa
                                          </button>
                                    </>
                              )}

                              {openBoxDelete && (
                                    <BoxConfirmDelete
                                          content='Bạn xác nhận xóa comment này phải không'
                                          ButtonCancellContent='Hủy'
                                          ButtonConfrimContent='Xóa'
                                          onClose={setOpenBoxDelete}
                                          isLoadng={deleteCommentMutation.isPending}
                                          paramsActive={{ comment_product_id: product._id }}
                                          onActive={onDeleteComment}
                                    />
                              )}

                              {openBoxUpdate && (
                                    <BoxCommentProduct
                                          defaultValue={{
                                                content: comment.comment_content,
                                                secure_url: comment.comment_image[0]?.secure_url,
                                                vote: comment.comment_vote,
                                          }}
                                          mode='UPDATE'
                                          public_id={comment.comment_image[0]?.public_id}
                                          product={product}
                                          onClose={setopenBoxUpdate}
                                    />
                              )}
                        </div>
                  )}

                  {!comment && (
                        <div>
                              <button
                                    className=' mx-auto  w-[180px] my-[16px] h-[40px] border-[1px]  border-blue-400 text-blue-400 bg-[#ffffff] rounded'
                                    onClick={() => onOpenModel(setOpenBoxUpload)}
                              >
                                    Viết đánh giá
                              </button>

                              {openBoxUpload && getMeCommentQuery.isSuccess && (
                                    <BoxCommentProduct
                                          onClose={setOpenBoxUpload}
                                          mode='UPLOAD'
                                          product={product}
                                          defaultValue={{ content: '', vote: 5, secure_url: '' }}
                                          public_id={''}
                                    />
                              )}
                        </div>
                  )}
            </div>
      )
}

export default CommentMe
