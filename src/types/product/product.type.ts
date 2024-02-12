import { TCloudinaryImage } from '../../Customer/Sell/types/cloudinary.typs'

export type TProductFull =
      | {
              _id: string
              shop_id: string
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

export type TProductDetail = {
      _id: string
      product_name: string
      product_price: number
      product_thumb_image: {
            secure_url: string
            public_id: string
      }

      product_desc_image: TCloudinaryImage[]

      product_type: string
      attribute: IProductBook
      shop_id: { shop_name: string; _id: string }
}

export type IProductBook = {
      product_id: string
      publishing: string
      author: string
      page_number: number
      description: string
}

// export type TFormProduct = {
//       product_name: string

//       product_price: number | null
//       product_thumb_image: { secure_url: string; public_id: string }
//       product_image_desc: string[]
//       product_id: string
// }

export type TFormBook = {
      publishing: string
      author: string
      page_number: number
      description: string
}

//@type upload 1 hình
export type TProfileImage = {
      isUploadImage: boolean
      FileName: string
      FileLength: number
} & TChekUploadImage

//@type upload 1 mảng
export type UploadImages = {
      // secure_url: string
      // public_id: string
}
export type TChekUploadImage = {
      isUploadImage: boolean
}

export type TCheckDescriptionImage = TChekUploadImage & {
      numberImage: number
}

export type TProductFormCommon = {
      product_id: string
      product_name: string
      product_price: number | null
}
