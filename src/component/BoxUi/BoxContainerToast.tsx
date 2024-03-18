import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import ToastDemo from './ToastDemo'

const BoxContainerToast = () => {
      const toast = useSelector((state: RootState) => state.toast.toast)

      // if (toast.length < 0) return null
      return (
            <>
                  {toast.length !== 0 && (
                        <div className='hideScrollBar fixed flex flex-col gap-[30px]  text-white top-[100px] right-0 xl:right-[18px] xl:top-[60px] border-none   min-h-[500px] max-h-max bg-transparent py-[12px]  w-[220px] xl:w-[300px] max-w-[360px] xl:max-w-[500px] overflow-hidden  z-[600]'>
                              {toast.map((t) => (
                                    <React.Fragment key={t.id}>
                                          {/* <span>{t.id}</span> */}
                                          <ToastDemo toast={t} />
                                    </React.Fragment>
                              ))}
                        </div>
                  )}
            </>
      )
}

export default BoxContainerToast
