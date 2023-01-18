import React from 'react'
import Promo from '../assets/promo.svg'
import Coin from '../assets/coin.svg'
import Button from '../components/Button'
import Footer from '../components/Footer/Footer'

const PromoPage = ({}) => {
  return (
    <>
      <div className='w-full h-full py-10 mx-auto md:w-10/12 max-w-7xl'>
        <div className='flex flex-col items-center justify-between w-full gap-5 md:gap-10 md:flex-row'>
          <div className='w-10/12 md:w-1/2'>
            <img src={Promo} alt='Promo' />
          </div>
          <div className='flex flex-col justify-between w-10/12 h-auto gap-5 md:w-1/2'>
            <h3 className='text-4xl font-medium'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </h3>
            <p className='text-[#9C9C9C] text-left'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <div className='flex items-center gap-5'>
              <span className='text-[#E1E1E1] text-4xl'>$50</span>
              <img src={Coin} alt='Coin' />
            </div>
            <div className='flex items-center w-full gap-3 mb-10'>
              <Button text='Join' accent additionalClass='w-full md:w-auto' />
            </div>
          </div>
        </div>

        <div className='flex flex-col items-start justify-start w-full gap-5 p-10'>
          <h3 className='text-3xl'>How It’s Work ?</h3>

          <div className='bg-[#14161B] flex flex-col md:flex-row items-center justify-start w-full rounded-md p-5 h-auto md:h-[100px]'>
            <h4 className='flex items-start justify-center w-2/12 text-4xl'>01</h4>
            <p className='w-full md:w-1/2'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
              velit interdum, ac aliquet odio mattis.
            </p>
          </div>
          <div className='bg-[#14161B] flex flex-col md:flex-row items-center justify-start w-full rounded-md p-5 h-auto md:h-[100px]'>
            <h4 className='flex items-start justify-center w-2/12 text-4xl'>02</h4>
            <p className='w-full md:w-1/2'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
              velit interdum, ac aliquet odio mattis.
            </p>
          </div>
          <div className='bg-[#14161B] flex flex-col md:flex-row items-center justify-start w-full rounded-md p-5 h-auto md:h-[100px]'>
            <h4 className='flex items-start justify-center w-2/12 text-4xl'>03</h4>
            <p className='w-full md:w-1/2'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et
              velit interdum, ac aliquet odio mattis.
            </p>
          </div>
        </div>
      </div>
      <div className='w-full'>
        <Footer />
      </div>
    </>
  )
}

export default PromoPage
