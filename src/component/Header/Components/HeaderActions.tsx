import { Link } from 'react-router-dom'
import HeaderBoxHover from './HeaderBoxHover'

const HeaderActions = () => {
      return (
            <div className='h-full flex gap-5 basis-[50%]'>
                  <Link className='h-full flex items-center px-2 bg-blue-200 gap-2 rounded-lg text-blue-800' to='/'>
                        <img
                              src='https://salt.tikicdn.com/ts/upload/32/56/db/d919a4fea46f498b5f4708986d82009d.png'
                              alt=''
                              className='w-5 h-5'
                        />
                        <button className='text-sm font-semibold'>Trang Chủ</button>
                  </Link>

                  <div className='group relative flex items-center px-2 gap-2 border border-slate-500 rounded-lg hover:bg-slate-200 '>
                        <img
                              src='https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png'
                              alt=''
                              className='w-5 h-5'
                        />
                        <button className=''>Tài Khoản</button>
                        <div className='absolute top-[42px] z-[23] left-0 hidden group-hover:block'>
                              <HeaderBoxHover />
                        </div>
                  </div>
            </div>
      )
}

export default HeaderActions