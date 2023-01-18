import React, { useState } from 'react'

const InputBox = ({
  minimumVal,
  labelText,
  type,
  name,
  value,
  onChangeHandler,
  children,
  placeholder,
  isDisabled,
  additionalInfo,
  maxVal,
  required,
  showError,
  ...props
}) => {
  const [error, setError] = useState('')

  return (
    <div className='w-5/6 mt-4 '>
      <div className=''>
        <label htmlFor='' className='block'>
          {labelText}
        </label>
        {additionalInfo ? <p className='mt-3 text-xs text-accent'>({additionalInfo})</p> : null}
      </div>
      {name && (
        <input
          min={minimumVal}
          max={maxVal}
          disabled={isDisabled}
          className={`${
            error ? 'inputError' : ''
          } w-full px-4 py-2 mt-3 text-sm font-light text-white rounded-sm bg-black-400 placeholder:text-sm`}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.target.value === '' && required) {
              e.preventDefault()
              setError(`${labelText} is required`)
            }
          }}
          type={type}
          value={value}
          name={name}
          onChange={(e) => {
            onChangeHandler(e)
            setError('')
          }}
          {...props}
        />
      )}
      <div>{error !== '' && showError && <p className='mt-2 text-sm text-red-500'>{error}</p>}</div>

      {children && children}
    </div>
  )
}

export default InputBox
