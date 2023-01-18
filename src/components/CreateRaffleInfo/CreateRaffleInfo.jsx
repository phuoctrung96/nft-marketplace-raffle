import React from 'react'
import InputBox from '../InputBox/InputBox'
import Select from 'react-select'
import TextBox from '../TextBox/TextBox'
import Line from '../Line'

const CreateRaffleInfo = ({ raffleInfo, setRaffleInfo, customStyles, images, onImageChange }) => {
  const infoChangeHandler = (e) => {
    const { name, value } = e.target
    setRaffleInfo({ ...raffleInfo, [name]: value })
  }

  const infoSelectHandler = (opt) => {
    const { name, value } = opt
    setRaffleInfo({ ...raffleInfo, [name]: value })
  }
  const categoryOptions = [
    {
      label: 'Collectible',
      value: '0',
      name: 'raffleCategory',
    },
    {
      label: 'Home Improvement',
      value: '1',
      name: 'raffleCategory',
    },
    {
      label: 'Fashion',
      value: '2',
      name: 'raffleCategory',
    },
    {
      label: 'Food and Beverages',
      value: '3',
      name: 'raffleCategory',
    },
    {
      label: 'Health and Beauty',
      value: '4',
      name: 'raffleCategory',
    },
    {
      label: 'Jwellery',
      value: '5',
      name: 'raffleCategory',
    },
    {
      label: 'Miscellaneous',
      value: '6',
      name: 'raffleCategory',
    },
    {
      label: 'Realty',
      value: '7',
      name: 'raffleCategory',
    },
    {
      label: 'Sports',
      value: '8',
      name: 'raffleCategory',
    },
    {
      label: 'Tech',
      value: '9',
      name: 'raffleCategory',
    },
    {
      label: 'Vehicles',
      value: '10',
      name: 'raffleCategory',
    },
  ]

  return (
    <div className='mt-8 '>
      <div className=''>
        <p className='text-lg subtitle'>Raffle Info</p>
        <Line />
        <InputBox
          labelText='Title'
          placeholder='Enter your raffle..'
          type='text'
          name='raffleTitle'
          value={raffleInfo.raffleTitle}
          onChangeHandler={infoChangeHandler}
          required
          showError
        />
        <InputBox labelText='Category'>
          <Select
            options={categoryOptions}
            placeholder='Select the category'
            styles={customStyles}
            name='raffleChange'
            onChange={infoSelectHandler}
          />
        </InputBox>
        <TextBox
          type={'textarea'}
          rows={8}
          value={raffleInfo.raffleDescription}
          onChangeHandler={infoChangeHandler}
          name='raffleDescription'
          labelText='Description'
          placeholder='Enter raffle description..'
          required
          showError
        />
        <InputBox
          type='number'
          labelText='Threshold'
          value={raffleInfo.raffleThreshold}
          onChangeHandler={infoChangeHandler}
          name='raffleThreshold'
          placeholder={'Enter threshold value'}
          minimumVal={1}
          maxVal={100}
          required
          showError
          additionalInfo={
            'Minimum % of tickets should be sold inorder for the raffle to be successfull'
          }
        />
      </div>
    </div>
  )
}

export default CreateRaffleInfo
