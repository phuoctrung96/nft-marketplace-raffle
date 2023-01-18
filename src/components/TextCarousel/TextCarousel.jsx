import React, { useState } from 'react'
import { ReactComponent as LeftArrow } from '../../assets/left-arrow.svg'
import { ReactComponent as RightArrow } from '../../assets/right-arrow.svg'

const TextCarousel = ({ title, children, additionalClass, innerAdditionalClass }) => {
  const [selectedItem, setSelectedItem] = useState(0)

  const selectNextItem = () => {
    setSelectedItem(selectedItem === React.Children.count(children) - 1 ? 0 : selectedItem + 1)
  }

  const selectPrevItem = () => {
    setSelectedItem(selectedItem === 0 ? React.Children.count(children) - 1 : selectedItem - 1)
  }

  return (
    <div
      className={` md:w-3/5 sm:w-4/5  w-full relative mx-auto md:mt-28 mt-2 pb-36 md:px-12 px-5  z-30  ${additionalClass}`}>
      <h1 className='text-3xl font-medium text-center font-clashDisplay '>{title}</h1>
      <LeftArrow
        className='absolute cursor-pointer md:bottom-40 bottom-10 left-16 md:-left-20'
        onClick={selectPrevItem}
      />
      <RightArrow
        className='absolute cursor-pointer md:bottom-40 bottom-10 right-16 md:-right-20'
        onClick={selectNextItem}
      />
      <div className='relative z-30 mt-16 overflow-x-hidden outer-carousel'>
        <div
          className={`inner-carousel relative   z-30 w-full flex ${innerAdditionalClass}`}
          style={{ transform: `translateX(-${selectedItem * 100}%)` }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default TextCarousel
