import React, { useState } from 'react'

const TextBox = ({
  labelText,
  showError,
  name,
  value,
  onChangeHandler,
  placeholder,
  rows,
  required,
}) => {
  const [error, setError] = useState('')

  return (
    <div className='w-5/6 mt-4 '>
      <label htmlFor='' className='block'>
        {labelText}
      </label>
      <textarea
        rows={rows}
        className={`${
          error ? 'inputError' : ''
        } w-full px-4 py-2 mt-3 text-sm font-light text-white rounded-sm focus:outline-none bg-black-400 placeholder:text-sm`}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={(e) => {
          onChangeHandler(e)
          setError('')
        }}
        onKeyDown={(e) => {
          if (e.key.toLowerCase() === 'arrowdown' && e.target.value === '' && required) {
            e.preventDefault()
            setError(`${labelText} is required`)
          }
        }}
      />
      <div>{error !== '' && showError && <p className='mt-2 text-sm text-red-500'>{error}</p>}</div>
    </div>
  )
}

export default TextBox
