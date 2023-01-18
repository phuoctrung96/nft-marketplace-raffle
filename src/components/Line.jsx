import React from 'react'

const Line = ({additionalClass}) => {
  return (
    <div className={`line w-10/12 h-0.5 mt-4 mb-2 bg-accent ${additionalClass} `}></div>
  )
}

export default Line