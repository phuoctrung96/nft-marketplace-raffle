import React, { useRef, useState } from 'react'
import convert from '../../utils/convertETH'

const DropDown = ({  title,prize,data }) => {
  const [isOpened, setOpened] = useState(false)
  const [height, setHeight] = useState('0px')
  const contentElement = useRef(null)

  const HandleOpening = () => {
    setOpened((prev) => !prev)
    setHeight(!isOpened ? `${contentElement.current.scrollHeight+10}px` : '0px')
  }

  const getCollectionCountry=(code)=>{
    switch(code){
      case 1:
        return "UK";
        default:
          return "Ukraine"
    }
  }

  return (
    <div onClick={HandleOpening} className='border-b border-[#009797]'>
      <div className={'py-5 flex items-center justify-start text-white'}>
        <h4 className='font-semibold cursor-pointer'>{title}</h4>
        <div
          className={`w-10 px-2 pt-1 transition cursor-pointer duration-300 ease-in-out transform ${
            isOpened ? '-rotate-90 -top-[-2px] relative' : ''
          } ${!isOpened ? '-translate-y-0.0' : ''} `}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='white'
            className='w-6 h-6'>
            <path stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          </svg>
        </div>
      </div>
    {prize?.prizeTitle?  <div
        ref={contentElement}
        style={{ height: height }}
        className='overflow-hidden transition-all duration-200'>
        {prize?.prizeTitle!=="Money" ? <p> Collection Country: <span className='font-medium ml-2 rounded-sm font-sm bg-white text-accent     px-2 py-1'>{getCollectionCountry(prize?.prizeCollectionCountry)}</span></p>:<p>Amount: <span className='font-medium'>{convert(prize?.prizeAmount)}</span></p>}
      </div>:(
        <div  ref={contentElement}
        style={{ height: height }}
        className='overflow-hidden transition-all duration-200'>
          {data()}
        </div>
      )}
    </div>
  )
}

export default DropDown
