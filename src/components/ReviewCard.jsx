import React from 'react'
import {ReactComponent as Icon} from "../assets/whyloveraffle.svg"

const ReviewCard = ({title,desc,additionalClass}) => {
  return (
    <div className={`sm:w-2/5 mx-auto md:w-1/3 w-full bg-card md:px-5  pt-12 pb-28 rounded-md text-center z-40 ${additionalClass}`}>
        <Icon className='w-1/4 mx-auto'/>
        <p className='text-lg font-medium mt-6'>{title}</p>
        <p className='text-xs text-text-color mt-4 w-5/6 mx-auto'>{desc}</p>
    </div>
  )
}

export default ReviewCard