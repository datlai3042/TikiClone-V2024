import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import InputText from '../components/InputText'
import InputNumber from '../components/InputNumber'
import { Input } from 'antd'

// const schema = z.object({
//     producpublishing: z.string().min(1, { message: 'Tên nhà xuất bản là bắt buộc' }),
//     product_page_number: z
//         .number()
//         .min(1, { message: 'Số trang của sách phải lớn hơn 0' })
//         .max(3004, { message: 'Số trang của sách lớn nhất là 3004' }),
// })

export type TFormBook = {
    publishing: string
    page_number: string
}

const { TextArea } = Input

const Book = () => {
    const form = useFormContext()
    const error = form.formState.errors
    return (
        <div className='flex flex-col gap-[16px]'>
            <InputText FieldName='publishing' LabelMessage='Tên nhà sản xuất' placehorder='Nhập tên sản xuất' />
            <InputNumber FieldName='page_number' LabelMessage='Số trang của sách' placehorder='Số trang của sách' />
            <InputText FieldName='author' LabelMessage='Tác giả' placehorder='Tên tác giả' />
            <Controller
                name='description'
                control={form.control}
                render={({ field }) => <TextArea {...field} maxLength={1000} rows={8} />}
            />
            {error['description'] && <span className='text-red-700 text-[12px]'>{error['description'].message as React.ReactNode}</span>}
        </div>
    )
}

export default Book
