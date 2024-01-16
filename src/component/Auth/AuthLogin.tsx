import React, { SetStateAction, useState } from 'react'
import { TModeAuth } from './AuthWrapper'
import { Eye, EyeOff, ShieldX } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Auth from '../../apis/auth.api'

type TProps = {
      setModeAuth: React.Dispatch<SetStateAction<TModeAuth>>
}

type TFormLogin = {
      email: string
      password: string
}

const defaultValues: TFormLogin = {
      email: '',
      password: '',
}

const loginSchema = z.object({
      email: z
            .string()
            .min(1, { message: 'Email là bắt buộc' })
            .email({ message: 'Email không hợp lệ' })
            .max(50, { message: 'Giới hạn 50 kí tự' }),
      password: z.string().min(1, { message: 'Mật khẩu là bắt buộc' }).max(50, { message: 'Tối đa 50 kí tự' }),
})

type TloginZodSchema = z.infer<typeof loginSchema>

const AuthLogin = (props: TProps) => {
      //Mode Login | register
      const { setModeAuth } = props

      //state type password
      const [typePassword, setTypePassword] = useState<'password' | 'text'>('password')

      //react-hook-form
      const {
            register,
            handleSubmit,
            formState: { errors },
      } = useForm<TloginZodSchema>({
            defaultValues,
            resolver: zodResolver(loginSchema),
      })

      const authLogin = useMutation({
            mutationKey: ['login'],
            mutationFn: (data: TloginZodSchema) => Auth.login(data),
            onSuccess: (data: unknown) => console.log('success data check', data),
            onError: (data: unknown) => console.log('error data check', data),
      })

      //change type passsword
      const handleShowHidePassword = () => {
            if (typePassword === 'password') {
                  setTypePassword('text')
                  return
            } else {
                  setTypePassword('password')
            }
      }

      const onSubmit = (form: TFormLogin) => {
            // console.log(form, errors)
            authLogin.mutate(form)
      }

      return (
            <div className='flex flex-col items-center gap-[15px] py-[35px]'>
                  <h3 className='font-black text-slate-900 tracking-[5px] text-[24px]'>Login</h3>
                  <h4 className='text-stone-600 italic text-[16px] opacity-80 px-[12px]'>Đăng nhập để trải nghiệm mua sắm thỏa thích</h4>
                  <form className='flex flex-1 flex-col gap-[20px] mt-[12px] w-[70%]' noValidate onSubmit={handleSubmit(onSubmit)}>
                        <div className='w-full'>
                              <input
                                    {...register('email')}
                                    type='text'
                                    className={`w-full border-[1px] border-stone-300 focus:border-slate-900  focus:border-[2px] ${
                                          errors.email
                                                ? 'focus:border-red-700 placeholder:text-red-700 placeholder:italic text-[12px] border-red-700'
                                                : 'focus:border-slate-900 placeholder:text-stone-500  border-stone-300'
                                    }
}`}
                                    placeholder='Email'
                              />
                        </div>
                        {errors.email && (
                              <div className='flex gap-[6px] items-center mt-[-10px]'>
                                    <ShieldX size={'18px'} color={'red'} />
                                    <span className='text-red-700 italic  text-[13px]'>{errors.email.message}</span>
                              </div>
                        )}
                        <div className='w-full relative flex items-center'>
                              <input
                                    {...register('password')}
                                    type={typePassword}
                                    className={`w-full border-[1px] border-stone-300  focus:border-[2px] ${
                                          errors.password
                                                ? 'focus:border-red-700 placeholder:text-red-700 placeholder:italic text-[12px] border-red-700'
                                                : 'focus:border-slate-900 placeholder:text-stone-500  border-stone-300'
                                    }`}
                                    placeholder='Mật khẩu'
                              />
                              <span className='absolute right-[5px]' onClick={handleShowHidePassword}>
                                    {typePassword === 'text' ? (
                                          <EyeOff size={'20px'} color={errors.password ? 'red' : 'black'} />
                                    ) : (
                                          <Eye size={'20px'} color={errors.password ? 'red' : 'black'} />
                                    )}
                              </span>
                        </div>
                        {errors.password && (
                              <div className='flex gap-[6px] items-center mt-[-10px]'>
                                    <ShieldX size={'18px'} color={'red'} />
                                    <span className='text-red-700 italic  text-[13px]'>{errors.password.message}</span>
                              </div>
                        )}
                        <div className=''>
                              <p>
                                    Bạn chưa có tài khoản,{' '}
                                    <span className='underline text-slate-900' onClick={() => setModeAuth('Register')}>
                                          đăng kí nhé
                                    </span>
                              </p>
                        </div>
                        <button
                              type='submit'
                              className='w-full h-[60px] rounded-lg bg-slate-900 text-white disabled:bg-stone-400 disabled:cursor-not-allowed'
                              disabled={Object.keys(errors).length > 0}
                              title={Object.keys(errors).length > 0 ? 'Vui lòng nhập thông tin hợp lệ' : `Đăng nhập`}
                        >
                              Login
                        </button>
                  </form>
            </div>
      )
}

export default AuthLogin
