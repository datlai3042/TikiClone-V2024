import { useQuery } from '@tanstack/react-query'
import { memo } from 'react'
import ProductApi from '../../../apis/product.api'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { STALE_TIME } from '../../Comment/Comment'

import truyenNgan from '../assets/img/book.png'
import taiNghe from '../assets/img/taiNghe.jpg'
import nguCoc from '../assets/img/ngucoc.png'
import message from '../assets/img/ngucoc.png'

import tatVoNam from '../assets/img/tatNam.jpg'
import truyenDai from '../assets/img/truyenDai.jpg'
import milk from '../assets/img/milk.jpg'
import nhaSach from '../assets/img/nhaSach.png'

type Props = {
      onReset: () => void
      text: string
}

const LIMIT = 3
const arrayCategory = [
      { image: truyenNgan, label: 'Truyện ngắn - tản văn - tạp văn', href: '/book' },
      { image: taiNghe, label: 'Tai nghe có dây nhét tai', href: '/digital-device' },

      { image: nguCoc, label: 'Ngũ cốc, bột', href: '/food' },
      { image: message, label: 'Máy massage toàn thân', href: '/digital-device' },
      { image: tatVoNam, label: 'Tất vớ nam', href: '/fashion-male' },
      { image: truyenDai, label: 'Truyện dài', href: '/book' },
      { image: milk, label: 'Các sản phẩm từ sữa khác', href: '/food' },
      { image: nhaSach, label: 'Nhà sách Tiki', href: '/book' },
]

const HeaderResultSearch = (props: Props) => {
      const { text, onReset } = props
      console.log({ text })

      const searchQuery = useQuery({
            queryKey: ['/v1/api/product/get-product-shop-name', text],
            queryFn: () => ProductApi.getProductShopName({ text }),
            enabled: Boolean(text),
      })

      const getProductTopSearch = useQuery({
            queryKey: ['get-product-top-search'],
            queryFn: () => ProductApi.getTopProductSearch({ limit: LIMIT }),
            enabled: !text,
            staleTime: STALE_TIME,
      })

      const products = searchQuery.data?.data.metadata.products
      const shops = searchQuery.data?.data.metadata.shops

      const onNavigate = () => {
            // setText('')
            onReset()
      }

      return (
            <>
                  <div className=' absolute left-0 top-full right-0  m-h-25 overflow-hidden  rounded-[2px]  bg-white border-[1px] border-solid border-[#ccc] min-h-55 z-[9999] min-h-[400px]'>
                        <div className='sanPhamTheoTen dienThoai:my-2 flex flex-col gap-y-2 overflow-hidden min-h-[150px]'>
                              {!text && getProductTopSearch.isSuccess && getProductTopSearch.data.data.metadata.products.length === 0 && (
                                    <span className='p-2 opacity-50'>Hãy nhập tìm kiếm</span>
                              )}
                              {!text &&
                                    getProductTopSearch.isSuccess &&
                                    getProductTopSearch.data.data.metadata.products.map((product) => (
                                          <div
                                                className=' min-h-[40px] h-max bg-[#ffffff]  px-[20px] flex flex-col gap-[8px] justify-center hover:bg-slate-200'
                                                key={product._id}
                                          >
                                                <Link to={`/product/${product._id}`} className='flex gap-[8px] ' onClick={onNavigate}>
                                                      <Search className='text-slate-400' />
                                                      <span>{product.product_name}</span>
                                                </Link>
                                          </div>
                                    ))}

                              {searchQuery.isSuccess && (
                                    <div className=' min-h-[40px] h-max bg-[#ffffff]  px-[20px] flex flex-col gap-[8px] justify-center hover:bg-slate-200'>
                                          {products &&
                                                products.length > 0 &&
                                                products.map((product) => (
                                                      <Link
                                                            key={product._id}
                                                            to={`/product/${product._id}`}
                                                            className='flex gap-[8px]'
                                                            onClick={onNavigate}
                                                      >
                                                            <Search className='text-slate-400' />
                                                            <span>{product.product_name}</span>
                                                      </Link>
                                                ))}

                                          {shops &&
                                                shops.length > 0 &&
                                                shops.map((shop) => (
                                                      <Link key={shop._id} to={`/shop/${shop._id}`}>
                                                            {shop.shop_name}
                                                      </Link>
                                                ))}

                                          {products?.length === 0 && shops?.length === 0 && <span>Không tìm thấy kết quả</span>}
                                    </div>
                              )}
                        </div>
                        <div className=''>
                              <p className='ml-[16px]'>Danh mục nổi bật</p>
                              <div className='w-full grid grid-cols-4 grid-rows-[160px] gap-[40px] justify-between p-[24px]'>
                                    {arrayCategory.map((category) => (
                                          <Link
                                                to={category.href}
                                                key={category.href}
                                                className='w-full h-full hover:bg-[#ffffff] hover:shadow-2xl flex flex-col items-center gap-[6px] px-[4px]'
                                          >
                                                <img src={category.image} className='w-[110px] h-[110px] rounded-full' alt='category' />
                                                <span className=' text-[13px]'>{category.label}</span>
                                          </Link>
                                    ))}
                              </div>
                        </div>
                  </div>
            </>
      )
}

export default memo(HeaderResultSearch)
