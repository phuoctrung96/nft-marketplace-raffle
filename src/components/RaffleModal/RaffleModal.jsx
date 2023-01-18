import React, { useEffect, useMemo, useState } from 'react'
import Modal from 'react-modal'
import DropDown from '../DropDown/DropDown'
import { ReactComponent as TicketIcon } from '../../assets/ticket.svg'
import Button from '../Button'
import getCurrentStage from '../../utils/getCurrentStage'
import { ethers } from 'ethers'

Modal.setAppElement('#root')

const RaffleModal = ({ modalIsOpen, closeModal, data }) => {
  const [amount, setAmount] = useState('0')
  const [currentStage, setCurrentStage] = useState({})

  useEffect(() => {
    if (data?.stages?.length) {
      const filteredStage = getCurrentStage(data.stages, data.ongoingStage, data.title)
      setCurrentStage(filteredStage.length ? filteredStage[0] : {})
    }
  }, [data])

  const handleAmount = (e) => {
    setAmount(e.target.value)
  }

  useEffect(() => {
    console.log('modal data: ', data)
  }, [data, modalIsOpen])

  const convertSeconds = useMemo(() => {
    let hours = Math.floor(data.raffleEndTime / 3600)
    let minutes = Math.floor((data.raffleEndTime % 3600) / 60)
    let secs = Math.floor((data.raffleEndTime % 3600) % 60)

    return { hours, minutes, secs }
  }, [data])

  useEffect(() => {
    if (modalIsOpen) {
      const elements = document.querySelectorAll('.ReactModalPortal')

      elements.forEach((element) => {
        element.className += ' filter-blur'
      })
    }
  }, [modalIsOpen])

  const stages = {
    0: 'Pre-sale',
    1: 'Sale',
    2: 'Premium',
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '90vh',
      width: '80vw',
      backgroundColor: '#14161B',
    },
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      className=''
      style={customStyles}
      onRequestClose={closeModal}
      contentLabel='Main Prize'>
      <div className='h-full p-8 flex flex-col items-center lg:items-start justify-between text-white bg-[#14161B]'>
        <h2 className='mb-5 text-2xl'>Main Prize</h2>
        <div className='flex flex-col xl:flex-row items-center w-full h-max xl:min-h-[591px] xl:h-[591px]'>
          <div className='w-full h-full xl:w-1/2'>
            <div className='flex justify-center w-full mx-auto xl:justify-start'>
              <img
                src={`https://${data.images[0]}`}
                className='relative flex items-center justify-center object-cover rounded-md cursor-pointer opacity-60'
                alt={data.title}
                width={413}
                height={283}
              />
            </div>
            <div className='flex items-center justify-center gap-4 mt-2 xl:justify-start'>
              {data.images.map((item) => {
                return (
                  <img
                    className='rounded-xl w-[127px] h-[120px]'
                    src={`https://${item}`}
                    alt={item}
                    key={item}
                  />
                )
              })}
            </div>
          </div>
          <div className='flex flex-col items-center justify-center w-1/2 h-full py-4 xl:justify-start lg:py-0 lg:items-start gap-7'>
            <h3 className='text-2xl'>{data.title}</h3>

            <div className='z-30 flex items-center gap-1 my-5 text-lg md:bottom-2 sm:bottom-6 right-6'>
              <div className='flex items-center gap-1 tickets-stats '>
                <p className='text-accent'>{data.stages[0].ticketsSold}</p>
                <p className=''>/{data.stages[0].ticketsAvailable}</p>
              </div>
              <TicketIcon />
            </div>

            <div className='flex items-center justify-center gap-10 mt-4 font-bold time font-clashDisplay'>
              <div className="hour text-center after:content-[':']   after:inline-block after:absolute after:top-2 after:font-bold after:-right-5 relative">
                <h3 className='text-xl font-medium font-clashDisplay'>{convertSeconds.hours}</h3>
                <p className='text-xs font-normal'>Hours</p>
              </div>
              <div className="minutes text-center after:content-[':']   after:inline-block after:absolute after:top-2 after:font-bold after:-right-5 relative">
                {' '}
                <h3 className='text-xl font-medium font-clashDisplay'>{convertSeconds.minutes}</h3>
                <p className='text-xs font-normal'>Minutes</p>
              </div>
              <div className='text-center seconds '>
                <h3 className='text-xl font-medium font-clashDisplay'>{convertSeconds.secs}</h3>
                <p className='text-xs font-normal'>Seconds</p>
              </div>
            </div>

            <div className='flex w-full gap-3 my-10 border lg:w-1/2 border-accent rounded-3xl'>
              <div className='w-3/5 py-3 text-center rounded-full price bg-accent outline outline-accent outline-1'>
                <button className='text-white'>
                  {currentStage.ticketPrice && ethers.utils.formatEther(currentStage.ticketPrice)}{' '}
                  <span className='font-bold'> M</span>
                </button>
              </div>
              <div className='flex items-center justify-between w-full pl-2 pr-6 lg:w-3/5 input'>
                <button
                  className='text-xl font-medium font-clashDisplay'
                  onClick={() => {
                    setAmount((prev) => +prev + 1)
                  }}>
                  +
                </button>
                <input
                  value={amount}
                  type='number'
                  onChange={handleAmount}
                  className='w-full h-full text-xl font-medium text-center border-none disable-arrows font-clashDisplay bg-inherit'
                />
                <button
                  className='text-xl font-medium font-clashDisplay'
                  onClick={() => {
                    setAmount((prev) => {
                      if (+prev > 0) {
                        return +prev - 1
                      }
                      return 0
                    })
                  }}>
                  -
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col w-full h-auto mt-10'>
          <h3 className='text-xl'>About Raffle</h3>
          <p className='text-[#9C9C9C] w-full mt-5'>{data.description}</p>
        </div>

        <div className='flex flex-col w-full my-10'>
          <h3>Ongoing Stage: {stages[data.ongoingStage]}</h3>
          {data.stages?.map((item) => {
            return (
              <DropDown
                key={item.stageType}
                title={stages[item.stageType]}
                data={() => (
                  <div className='flex flex-col w-full h-auto my-2'>
                    <span>Ticket Price: {item.ticketPrice}</span>
                    <span>Ticket Available: {item.ticketsAvailable}</span>
                    <span>Tickets Sold: {item.ticketsSold}</span>
                  </div>
                )}
              />
            )
          })}
        </div>

        <div className='w-full my-5'>
          <h3 className='text-white'>
            {data.prizes?.length} {data.prizes?.length > 1 ? 'Prizes' : 'Prize'}{' '}
          </h3>
          {data.prizes.map((prize, index) => (
            <DropDown
              key={prize.prizeTitle}
              title={prize.prizeTitle}
              data={() => <p className='p-4'>Amount {prize.prizeAmount}</p>}
            />
          ))}
        </div>

        {data.charity.charityAddress !== '0x0000000000000000000000000000000000000000' ? (
          <div className='flex flex-col w-full h-auto py-10 '>
            <h3 className='mb-5'>Charity</h3>
            <h4>{data.charity.charityName}</h4>
            <p>The {data.charity.percentToDonate}% of amount to donate</p>
          </div>
        ) : null}

        <div className='flex items-center w-full gap-3 mb-10'>
          <Button text='Verify Raffle' accent additionalClass='w-full md:w-auto' />
        </div>
      </div>
    </Modal>
  )
}

export default RaffleModal
