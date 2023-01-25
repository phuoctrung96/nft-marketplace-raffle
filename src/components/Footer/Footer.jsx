import React from 'react'
import Logo from '../Logo'
import { ReactComponent as LinkedIn } from '../../assets/Linked In.svg'
import { ReactComponent as Facebook } from '../../assets/Facebook.svg'
import { ReactComponent as Instagram } from '../../assets/Instagram.svg'
import Button from '../Button'
import { ReactComponent as ArrowIcon } from '../../assets/arrow-icon.svg'

const Footer = ({additionalClass}) => {
  return (
    <div className={`flex flex-col w-4/5 gap-10 px-5 pb-10 mx-auto md:px-12 lg:flex-row ${additionalClass}`}>
      <div className='left basis-1/3'>
        <div className='flex items-center gap-4 logo'>
          <div className='w-3 h-3 rounded-full bg-accent'></div>
          <Logo />
        </div>
        <p className='mt-2 text-sm'>
          Run prize competitions and sell tickets to win their products, experiences or personal
          items as prizes
        </p>
        <div className='flex gap-4 my-6 socials'>
          <LinkedIn className='w-5' />
          <Facebook className='w-5' />
          <Instagram className='w-5' />
        </div>
      </div>
      <div className='quick-links basis-1/3'>
        <h4 className='font-medium font-clashDisplay '>Quick Links</h4>
        <div className='flex gap-24 links'>
          <div className='left'>
            <a href='' className='block my-4 text-xs text-text-color'>
              Buy
            </a>
            <a href='' className='block my-4 text-xs text-text-color'>
              Catalog
            </a>
            <a href='' className='block my-4 text-xs text-text-color'>
              Pricing
            </a>
          </div>
          <div className='right'>
            <a href='' className='block my-4 text-xs text-text-color'>
              Wallets
            </a>
            <a href='' className='block my-4 text-xs text-text-color'>
              Company
            </a>
          </div>
        </div>
      </div>
      <div className='cta basis-1/3 '>
        <p className='text-lg'>Submit for updates.</p>
        <p className='my-4 text-xs text-text-color'>
          Subscribe to get update and notify our exchange and products
        </p>
        <div className='relative w-full input-container'>
          <input
            type='email'
            placeholder='Enter your email address'
            className='w-full bg-[#2f324180] border border-card-icon  text-text-color text-xs py-4 px-4 rounded-full tex'
          />
          <Button
            text='send'
            accent
            additionalClass='py-2 xs:block hidden px-5 text-xs rounded-full absolute right-2 top-1/2 -translate-y-1/2'
          />
          <ArrowIcon className='absolute block -translate-y-1/2 white-arrow xs:hidden right-4 top-1/2 stroke-stone-100' />
        </div>
      </div>
    </div>
  )
}

export default Footer
