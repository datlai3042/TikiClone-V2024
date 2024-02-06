export type TProductFull =
    | {
          _id: string
          user_id: string
          product_name: string
          product_price: number
          product_thumb_image: {
              secure_url: string
              public_id: string
          }

          product_desc_image: {
              secure_url: string
              public_id: string
          }[]

          isProductFull?: boolean
          expireAt?: Date
          product_type: string
          attribute: IProductBook
      }
    | undefined

export type IProductBook = {
    product_id: string
    publishing: string
    author: string
    page_number: number
    description: string
}