import React, { useState } from 'react'
import Select from 'react-select'
import InputBox from '../InputBox/InputBox'
import { ReactComponent as CloseIcon } from '../../assets/cross-icon.svg'

const countryOptions = [{ name: 'country', label: 'Ukraine', value: '0' }]

const Prize = ({
  prizesHandler,
  prize,
  index,
  countryHandler,
  removePrizeHandler,
  customStyles,
}) => {
  const [errorSelect, setErrorSelect] = useState('')

  return (
    <div className='relative '>
      {prize.country !== '0' && index !== 0 && (
        <CloseIcon
          onClick={() => removePrizeHandler(index)}
          className='absolute top-0 w-4 h-4 cursor-pointer left-3/4 stroke-accent'
        />
      )}
      <InputBox
        value={prize.prizeTitle}
        onChangeHandler={(e) => prizesHandler(e, index)}
        type={'text'}
        placeholder='Prize title..'
        labelText={'Prize Title'}
        isDisabled={prize.country > Number('0')}
        name='prizeTitle'
        required
        showError
      />
      {prize.country === '1' ? (
        <InputBox
          labelText={'Prize Amount'}
          value={prize.prizeAmount}
          onChangeHandler={(e) => prizesHandler(e, index)}
          name='prizeAmount'
        />
      ) : (
        <InputBox labelText='Prize Collection Country'>
          <Select
            options={countryOptions}
            placeholder='Country where price can be collected from'
            styles={customStyles}
            onChange={(obj) => {
              countryHandler(obj, index)
              setErrorSelect('')
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value === '') {
                e.preventDefault()
                setErrorSelect('Field is required')
              }
            }}
          />
          <div>
            {errorSelect !== '' && <p className='mt-2 text-sm text-red-500'>{errorSelect}</p>}
          </div>
        </InputBox>
      )}
      <div className='line w-10/12 h-0.5 my-4 bg-accent opacity-25  '></div>
    </div>
  )
}

const RafflePrizes = ({ customStyles, prizes, setPrizes }) => {
  const prizesHandler = (e, index) => {
    const { name, value } = e.target
    setPrizes(prizes.map((prize, i) => (i === index ? { ...prize, [name]: value } : prize)))
  }

  const countryHandler = (obj, index) => {
    const { name, value } = obj;
    setPrizes(prizes.map((prize, i) => (i === index ? { ...prize, [name]: value } : prize)));
  }

  const addPrizeHandler = () => {
    setPrizes([...prizes, { prizeTitle: 'Money', country: '1', prizeAmount: 0 }])
  }

  const removePrizeHandler = (index) => {
    setPrizes(prizes.filter((prize, i) => i !== index))
  }

  return (
    <div className='mt-16 '>
      <div className='flex items-center justify-between'>
        <p className='text-lg subtitle '>Raffle Prizes</p>
        <button className='block mr-10 text-sm text-accent' onClick={addPrizeHandler}>
          Add Money Prize
        </button>
      </div>
      <div className='line w-10/12 h-0.5 mt-4 mb-2 bg-accent '></div>
      {prizes.map((prize, index) => {
        return (
          <Prize
            key={index}
            index={index}
            countryHandler={countryHandler}
            customStyles={customStyles}
            removePrizeHandler={removePrizeHandler}
            prize={prize}
            prizesHandler={prizesHandler}
          />
        )
      })}
    </div>
  )
}

export default RafflePrizes
