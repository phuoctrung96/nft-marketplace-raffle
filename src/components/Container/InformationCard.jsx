import React from 'react'

const InformationCard = ({ basicInformation }) => {

  const { name, avatar, email, number, socialMedia: { twitter } } = basicInformation
  return (
    <div className='bg-card p-5 rounded-card h-information-full'>
      <div className='grid grid-cols-information gap-5 mb-4'>
        <img className='h-20 w-20 rounded-full' src={avatar} alt="Avatar" />
        <div>
          <p className='text-xl'>{name}</p>
          <p className='text-sm text-text-color'>{twitter}</p>
        </div>
      </div>
      <div className='mb-2'>
        <p className='text-base'>Email</p>
        <p className='text-sm text-text-color'>{email}</p>
      </div>
      <div>
        <p className='text-base'>Phone Number</p>
        <p className='text-sm text-text-color'>{number}</p>
      </div>
    </div>
  )
}

export default InformationCard
