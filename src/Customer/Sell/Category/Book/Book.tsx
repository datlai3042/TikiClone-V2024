import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import InputText from '../../components/InputText'
import InputNumber from '../../components/InputNumber'
import { Input, Select } from 'antd'
import { BookType } from '../../../../types/product/product.book.type'

// const schema = z.object({
//     producpublishing: z.string().min(1, { message: 'Tên nhà xuất bản là bắt buộc' }),
//     product_page_number: z
//         .number()
//         .min(1, { message: 'Số trang của sách phải lớn hơn 0' })
//         .max(3004, { message: 'Số trang của sách lớn nhất là 3004' }),
// })

const { TextArea } = Input

const optionSelect: { label: BookType; value: BookType }[] = [
      {
            label: 'Novel',
            value: 'Novel',
      },
      {
            label: 'Manga',
            value: 'Manga',
      },
      {
            label: 'Detective',
            value: 'Detective',
      },
]

export type TProps = {
      mode: 'UPLOAD' | 'UPDATE'
}

const Book = (props: TProps) => {
      const { mode } = props

      const form = useFormContext()
      const errors = form.formState.errors

      // console.log({ mode })
      return (
            <div className='flex flex-col gap-[16px]'>
                  <InputText FieldName={'attribute.publishing'} LabelMessage='Tên nhà sản xuất' placehorder='Nhập tên sản xuất' />
                  <InputText FieldName={'attribute.author'} LabelMessage='Tác giả' placehorder='Tên tác giả' />
                  <InputNumber FieldName={'attribute.page_number'} LabelMessage='Số trang của sách' placehorder='Số trang của sách' />
                  <Controller
                        name={'attribute.type'}
                        control={form.control}
                        render={({ field }) => {
                              return <Select placeholder={'Chọn thể loại sách'} options={optionSelect} onChange={field.onChange} />
                        }}
                  />
                  <Controller
                        name={'attribute.description'}
                        control={form.control}
                        render={({ field }) => <TextArea {...field} maxLength={1000} rows={8} />}
                  />

                  {errors?.attribute && (
                        <span className='text-red-700 text-[12px] w-[250px] '>{(errors.attribute as any)['description']?.message}</span>
                  )}
            </div>
      )
}

export default Book
