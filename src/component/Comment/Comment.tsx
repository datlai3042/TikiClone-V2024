import { keepPreviousData, useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import CommentService from '../../apis/comment.service'
import CommentItem from './CommentItem'
import CommentSketeton from './CommentSketeton'

type TProps = {
      product_id: string
}

const LIMIT = 2

const Comment = (props: TProps) => {
      const { product_id } = props
      const [page, setPage] = useState<number>(1)
      const getAllCommentQuery = useQuery({
            queryKey: ['get-all-comment', product_id, page],
            queryFn: () => CommentService.getAllCommentProduct({ product_id, limit: LIMIT, page }),
            placeholderData: keepPreviousData,
      })

      useEffect(() => {
            if (getAllCommentQuery.isSuccess) {
                  const { comments } = getAllCommentQuery.data.data.metadata
                  // console.log({ getAllCommentQuery })
                  console.log({ comments })
            }
      }, [getAllCommentQuery.isSuccess])

      // const pages = Math.ceil(getAllCommentQuery?.data?.data?.metadata?.total / LIMIT) || 0

      const styleEffect = {
            onActive: (check: boolean) => {
                  if (check) return ' bg-blue-500 text-white border-[1px]  rounded-full'
                  return ' bg-transparent text-slate-500 border-[1px] border-transparent  rounded-full'
            },
      }

      return (
            <div className='relative h-full '>
                  {getAllCommentQuery.isSuccess &&
                        getAllCommentQuery.data.data.metadata.comments.map((comment) => (
                              <CommentItem key={comment._id} comment={comment} />
                        ))}
                  {getAllCommentQuery.isPending && (
                        <>
                              <CommentSketeton />
                              <CommentSketeton />
                        </>
                  )}
                  <div className='absolute bottom-[-10px] xl:bottom-0 right-0 flex gap-[20px] '>
                        {getAllCommentQuery.isSuccess &&
                              Array(Math.ceil(getAllCommentQuery.data?.data.metadata.total / LIMIT))
                                    .fill(0)
                                    .map((_, index) => (
                                          <button
                                                key={index}
                                                className={`${styleEffect.onActive(
                                                      page === index + 1,
                                                )} w-[20px] h-[20px] xl:w-[30px] xl:h-[30px] flex items-center justify-center transition-all `}
                                                onClick={() => setPage(index + 1)}
                                          >
                                                {index + 1}
                                          </button>
                                    ))}
                  </div>
            </div>
      )
}

export default Comment
