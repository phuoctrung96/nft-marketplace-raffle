import React from 'react'

const Button = ({ text, additionalClass, onClickHandler, accent }) => {
  return (
    <button
      className={`px-16 py-2 rounded-full cursor-pointer  ${additionalClass} ${
        accent ? 'bg-accent text-white' : 'text-accent bg-black'
      }`}
      onClick={onClickHandler}>
      {text}
    </button>
  )
}

export default Button
