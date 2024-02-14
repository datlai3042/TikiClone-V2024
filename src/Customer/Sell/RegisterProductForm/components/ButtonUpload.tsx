import React, { SetStateAction, useEffect, useId, useRef, useState } from 'react'

//@api
import ProductApi, { IFormDataImage } from '../../../../apis/product.api'
import { useMutation } from '@tanstack/react-query'

//@icon
import { Image, View, X } from 'lucide-react'
//@modal
import BoxModal from '../../../../component/ui/BoxModal'
import { ui } from '../FormRegisterBook'
import { TChekUploadImage, TProfileImage } from '../../../../types/product/product.type'
import { TCloudinaryImage } from '../../types/cloudinary.typs'
import axios from 'axios'
import { set } from 'lodash'

//@Props
interface IProps {
      mode: 'UPLOAD' | 'UPDATE'
      CloudinaryImage?: TCloudinaryImage
      //@Tên nút button
      labelMessage: string

      //@width
      width?: string

      //@tất cả thông tin về hình ảnh
      setUrlProductThumb: React.Dispatch<SetStateAction<TProfileImage>>
      product_id?: string

      //@trạng thái submit
      isSubmit?: boolean
}

const ButtonUpload = (props: IProps) => {
      const { width, labelMessage, setUrlProductThumb, isSubmit, product_id, mode = 'UPLOAD', CloudinaryImage } = props
      const id = useId()
      const inputRef = useRef<HTMLInputElement>(null)

      const [modalFilePreview, setModalFilePreview] = useState(false)
      const [cloudinaryImage, setCloudinaryImage] = useState<TCloudinaryImage>(() => {
            if (mode === 'UPLOAD') {
                  return { secure_url: '', public_id: '' }
            }
            return CloudinaryImage as TCloudinaryImage
      })
      //@api upload image
      const uploadProductThumb = useMutation({
            mutationKey: ['product-thumb'],
            mutationFn: (data: IFormDataImage) => ProductApi.uploadProductThumb({ formData: data }),
            onSuccess: (axiosResponse) => {
                  const { public_id, secure_url } = axiosResponse.data.metadata.product.product_thumb_image
                  setCloudinaryImage(() => {
                        const newObject = {} as TCloudinaryImage
                        newObject.secure_url = secure_url
                        newObject.public_id = public_id
                        return newObject
                  })
                  setUrlProductThumb(() => {
                        console.log({ secure_url })
                        const newObject = {} as TProfileImage
                        newObject.isUploadImage = true
                        newObject.FileLength = secure_url ? 1 : 0
                        newObject.FileName = secure_url as string
                        return newObject
                  })
            },
      })

      //@api delete image
      const deleteProductThumb = useMutation({
            mutationKey: ['delete-product-thumb'],
            mutationFn: ({ public_id, id }: { public_id: string; id: string }) => ProductApi.deleteProductThumb({ public_id, id }),
            onSuccess: () => {
                  setCloudinaryImage({ secure_url: '', public_id: '' })
                  setUrlProductThumb({ isUploadImage: false, FileLength: 0, FileName: '' })
            },
      })

      //@handler click
      const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation()
            e.preventDefault()
            if (inputRef.current) {
                  inputRef.current.click()
            }
      }

      //@input click
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files![0]) {
                  const formData: IFormDataImage = new FormData()
                  formData.append('file', e.target.files![0])
                  formData.append('product_id', product_id as string)
                  uploadProductThumb.mutate(formData)
            }
      }

      const handleDeleteProductThumb = (public_id: string) => {
            deleteProductThumb.mutate({ public_id, id: product_id as string })
            if (inputRef) {
                  inputRef!.current!.value = ''
            }

            setUrlProductThumb({
                  isUploadImage: false,
                  FileName: '',
                  FileLength: 0,
            })
      }

      const styleEffect = {
            cursorButtonUpload: uploadProductThumb.isPending ? 'cursor-not-allowed' : 'cursor-pointer',
            widthButtonUpload: width ? 'w-[25%]' : 'w-full',
            stateButton:
                  isSubmit && !cloudinaryImage?.secure_url
                        ? 'border-[2px] border-red-700 text-red-700 bg-white'
                        : 'text-white bg-slate-900 border-[2px] border-slate-900',

            gap: ui.gapElementChildButton || 'gap-[8px]',
            fontSizeError: ui.fontSizeError || 'text-[12px]',
            colorError: ui.colorError || 'text-red-700',
      }

      //@element
      return (
            <div className={`${styleEffect.gap} w-full min-h-[70px] h-auto flex flex-col`}>
                  <label htmlFor={id}>{labelMessage}</label>
                  <input type='file' id={id} hidden ref={inputRef} onChange={(e) => handleInputChange(e)} />

                  {cloudinaryImage?.secure_url && (
                        <div className='animate-pulseCustome bg-gray-300 w-[150px] h-[150px] relative flex justify-center items-center'>
                              <img src={cloudinaryImage.secure_url} width={150} height={150} alt='preview' className={`w-full h-full`} />
                              <div className='absolute top-0 right-[-100px] h-[35px] w-[95px] '>
                                    <button
                                          disabled={uploadProductThumb.isPending}
                                          onClick={() => {
                                                handleDeleteProductThumb(
                                                      uploadProductThumb.data?.data.metadata.product.product_thumb_image
                                                            .public_id as string,
                                                )
                                                inputRef.current?.click()
                                          }}
                                          className='min-w-[150px] px-[12px] py-[6px] bg-slate-700 text-white rounded-md '
                                    >
                                          Chọn lại
                                    </button>
                              </div>
                              <div className='absolute bottom-[0px] right-[-140px] bg-white h-[35px] min-w-[150px] flex items-center justify-center rounded-full gap-[16px]'>
                                    <View onClick={() => setModalFilePreview(true)} size={28} className=' ' />
                                    <span>Xem trước</span>
                              </div>

                              {modalFilePreview && (
                                    <BoxModal>
                                          <div className='relative w-[450px] h-[650px]'>
                                                <img
                                                      src={cloudinaryImage.secure_url}
                                                      alt='preview'
                                                      className='w-full h-full bg-yellow-700'
                                                />
                                                <div
                                                      className='absolute top-[-10px] right-[-10px] bg-slate-900 flex items-center justify-center rounded-md'
                                                      onClick={() => setModalFilePreview(false)}
                                                >
                                                      <X color='white' size={40} />
                                                </div>
                                          </div>
                                    </BoxModal>
                              )}
                        </div>
                  )}
                  {uploadProductThumb.isPending && (
                        <div className='animate-pulse  bg-gray-100 w-[20%] h-[72px] flex items-center justify-center'>
                              <Image color='#666666' size={50} />
                        </div>
                  )}
                  <button
                        hidden={cloudinaryImage?.secure_url ? true : false}
                        disabled={uploadProductThumb.isPending}
                        className={`${styleEffect.widthButtonUpload} ${styleEffect.widthButtonUpload} ${styleEffect.stateButton}  xl:w-[32%] min-h-[40px] flex-1  rounded-md`}
                        onClick={(e) => handleButtonClick(e)}
                  >
                        Tải ảnh lên
                  </button>
                  {isSubmit && !cloudinaryImage?.secure_url && (
                        <span className={`${styleEffect.colorError} ${styleEffect.fontSizeError}`}>
                              Hình ảnh chỉnh của sản phẩm là bắt buộc
                        </span>
                  )}
            </div>
      )
}

export default ButtonUpload
