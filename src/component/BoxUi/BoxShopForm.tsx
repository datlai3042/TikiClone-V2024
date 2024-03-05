import { Plus, X } from 'lucide-react'
import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import InputText from '../../Customer/Sell/components/InputText'
import { register } from 'module'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ShopApi, { RegisterShop, StateFile } from '../../apis/shop.api'
import { TFormRegisterShop } from '../../Customer/Shop/ShopRegister'
import { useDispatch } from 'react-redux'
import { addToast } from '../../Redux/toast'

type TForm = {
      shop_name: string
}

/*
      mode upload [] -> defaultValues, preview 
*/

export type ModeForm = 'UPLOAD' | 'UPDATE'

type TProps = {
      onClose: React.Dispatch<SetStateAction<boolean>>
      modeForm: ModeForm
      defaultValues: { shop_name: string; shop_avatar: string }
}

const BoxShopForm = (props: TProps) => {
      const { onClose, modeForm, defaultValues } = props

      const inputAvatar = useRef<HTMLInputElement | null>(null)
      const [preview, setPreview] = useState<string>(defaultValues.shop_avatar)
      const [imageAvatar, setImageAvatar] = useState<File>()
      const queryClieny = useQueryClient()
      const dispatch = useDispatch()

      const form = useForm<TForm>({
            defaultValues: { shop_name: defaultValues.shop_name },
      })

      const onClickAvatar = () => {
            if (inputAvatar) {
                  inputAvatar.current?.click()
            }
      }

      console.log({ errors: form.formState.errors })

      const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
            // if(!)
            const url = URL.createObjectURL(e?.target?.files![0])
            setPreview(url)
            setImageAvatar(e?.target.files![0])
      }

      const onResetAvatar = () => {
            URL.revokeObjectURL(preview)
            setPreview('')
      }

      const registerShopMutation = useMutation({
            mutationKey: ['register-shop'],
            mutationFn: (data: RegisterShop, state: StateFile) => ShopApi.registerShop(data, modeForm, state),
            onSuccess: () => {
                  queryClieny.invalidateQueries({
                        queryKey: ['get-my-shop'],
                  })
            },
      })

      const onSubmit: SubmitHandler<TForm> = (dataForm) => {
            // console.log({ form: dataForm })
            if (!preview && modeForm === 'UPDATE') {
                  dispatch(addToast({ id: Math.random().toString(), type: 'WARNNING', message: 'Vui lòng upload hình đại diện' }))
                  return
            }
            const formData: RegisterShop = new FormData()
            formData.append('file', imageAvatar as File)
            formData.append('shop_name', dataForm.shop_name)
            registerShopMutation.mutate(formData)
      }

      useEffect(() => {
            return () => {
                  URL.revokeObjectURL(preview)
            }
      }, [preview])

      return (
            <div className='fixed inset-0 bg-[rgba(0,0,0,.4)] h-screen flex items-center justify-center z-[500]'>
                  <div className='animate-authBox w-[300px] xl:w-[700px] min-h-[300px] h-max  mx-[10px] xl:mx-0 bg-red-800'>
                        <FormProvider {...form}>
                              <form
                                    className='relative w-full h-[575px] xl:h-[300px] flex flex-col xl:flex-row  bg-[#ffffff]'
                                    onSubmit={form.handleSubmit(onSubmit)}
                              >
                                    <div className='w-full xl:w-[40%] h-full bg-black pb-[16px] xl:pb-0'>
                                          <div className='flex flex-col items-center mt-[30px]'>
                                                <div
                                                      className='relative w-[180px] h-[180px] flex flex-col items-center justify-center bg-gray-200 rounded-full border-[6px] border-blue-300'
                                                      onClick={onClickAvatar}
                                                >
                                                      {preview && <img src={preview} className='w-full h-full rounded-full' alt='avatar' />}

                                                      {!preview && <Plus size={40} color='blue' />}
                                                </div>

                                                {preview && (
                                                      <button
                                                            className='mt-[20px] p-[12px_14px] border-[1px] border-blue-500 bg-[#ffffff] text-blue-500 rounded-md hover:bg-blue-500 hover:text-white hover:cursor-pointer transition-all duration-300'
                                                            onClick={onResetAvatar}
                                                      >
                                                            Chọn lại
                                                      </button>
                                                )}
                                                <input
                                                      type='file'
                                                      className='hidden'
                                                      id='avatar_shop'
                                                      onChange={(e) => {
                                                            onChangeAvatar(e)
                                                      }}
                                                      ref={(e) => {
                                                            inputAvatar.current = e
                                                      }}
                                                />
                                          </div>
                                    </div>
                                    <div className='w-full xl:w-[60%] h-full pt-[16px]   flex flex-col items-center gap-[20px] bg-[#ffffff]'>
                                          <header>Đăng kí thông tin về cửa hàng</header>
                                          <div className='flex flex-col gap-[8px] w-[80%]'>
                                                <label htmlFor='shop_name'>Tên Shop</label>
                                                <input
                                                      type='text'
                                                      id='shop_name'
                                                      className='w-full h-[40px] p-[12px_24px] bg-[#ffffff] rounded outline-none border-[1px] border-gray-200'
                                                      {...form.register('shop_name', {
                                                            required: { value: true, message: 'Tên shop là bắt buộc' },
                                                            minLength: { value: 3, message: 'Tối thiểu 3 kí tự' },
                                                            maxLength: { value: 150, message: 'Tối thiểu 150 kí tự' },
                                                      })}
                                                />
                                          </div>
                                          <button className='mt-[20px] p-[12px_14px] border-[1px] border-blue-500 bg-[#ffffff] text-blue-500 rounded-md hover:bg-blue-500 hover:text-white hover:cursor-pointer transition-all duration-300'>
                                                Đăng kí
                                          </button>
                                    </div>

                                    <button
                                          className='absolute top-[-20px] right-[-20px] w-[40px] h-[40px] flex items-center justify-center rounded-full bg-slate-800'
                                          onClick={() => onClose(false)}
                                    >
                                          <X color='white' />
                                    </button>
                              </form>
                        </FormProvider>
                  </div>
            </div>
      )
}

export default BoxShopForm
