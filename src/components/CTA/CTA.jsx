import React from 'react'
import Button from '../Button'
import './cta.css'
import { ReactComponent as ArrowIcon } from '../../assets/arrow-icon.svg'

const CTA = () => {
  return (
    <div className='w-full px-5 pb-8 mx-auto text-center md:px-12 md:w-4/5 lg:w-3/5 my-28'>
      <h3 className='text-3xl font-medium font-clashDisplay'>Get More Updates</h3>
      <p className='w-5/6 mx-auto mt-4 text-sm text-text-color'>
        The amount of revenue a competition can generate depends on many factors such as audience
        size, engagement, prizes and promotion.
      </p>
      <div className='relative w-4/5 mx-auto mt-8 input-container'>
        <input
          placeholder='Your email.'
          type='email'
          name=''
          id=''
          className='w-full py-3 pl-5 mx-auto text-sm text-black rounded-full '
        />
        <Button
          accent
          text="I'm in"
          additionalClass='w-auto absolute sm:block hidden right-1 top-1 py-2 text-sm'
        />
        <ArrowIcon className='absolute -translate-y-1/2 top-1/2 right-12 xs:right-5 sm:hidden' />
      </div>
    </div>
  )
}

export default CTA
