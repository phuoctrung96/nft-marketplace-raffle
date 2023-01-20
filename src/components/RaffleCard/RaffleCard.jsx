import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import getCurrentStage from '../../utils/getCurrentStage'
import { ReactComponent as TicketIcon } from '../../assets/ticket.svg'
import RaffleABI from '../../utils/Raffle.json'
import { BigNumber, ethers } from 'ethers'
import { useSigner } from '@web3modal/react'
import RaffleModal from '../RaffleModal/RaffleModal'

const RaffleCard = ({ additionalClass, raffle }) => {
  const { data: dataSigner, error: errorSigner, isLoading, refetch } = useSigner()

  const [currentStage, setCurrentStage] = useState({})
  const [ticketNumber, setTicketNumber] = useState('')
  const [raffleContract, setRaffleContract] = useState({})
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (raffle?.stages?.length) {
      const filteredStage = getCurrentStage(raffle.stages, raffle.ongoingStage, raffle.title)
      setCurrentStage(filteredStage.length ? filteredStage[0] : {})
    }
  }, [raffle])

  // useEffect(() => {
  //   if (raffle) {
  //     const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider());

  //     const signer = provider.getSigner()
  //     setRaffleContract(new ethers.Contract(raffle.raffleAddress, RaffleABI, signer))
  //   }
  // }, [raffle])

  useEffect(() => {
    setTicketNumber(Number(currentStage.ticketsAvailable) - Number(currentStage.ticketsSold))
  }, [currentStage])

  const enterRaffle = async () => {
    const amount = BigNumber.from(currentStage.ticketPrice).mul(ticketNumber)
    await raffleContract.enterRaffle({ value: amount })
  }

  return (
    raffle?.id && (
      <>
        <div
          className={`${additionalClass} sm:w-3/5 md:w-2/5 relative backdrop-filter sm:block z-100 bg-gradient-to-b drop-shadow-sm from-black to-[rgba(255,255,255,.15)] rounded-xl`}>
          <div className='relative'>
            <img
              src={`https://${raffle.images[0]}`}
              className='relative block object-cover w-full h-64 rounded-md cursor-pointer opacity-60'
              alt=''
              onClick={() => {
                setOpenModal(true)
              }}
            />

            <div className='absolute z-30 flex items-center gap-1 text-lg tickets-info md:bottom-2 sm:bottom-6 right-6'>
              <div className='flex items-center gap-1 tickets-stats '>
                <p className='text-accent'>{currentStage.ticketsSold}</p>
                <p className=''>/{currentStage.ticketsAvailable}</p>
              </div>
              <TicketIcon />
            </div>
          </div>
          <div className='relative flex flex-col justify-end '>
            <div className=''>
              <h3 className='mt-4 text-xl raffle-title'>{raffle.title}</h3>
              <p className='mt-2 text-xs font-medium text-text-color'>{raffle.description}.</p>
            </div>
            <div className='flex items-center justify-center gap-10 mt-4 font-bold time font-clashDisplay'>
              <div className="hour text-center after:content-[':']   after:inline-block after:absolute after:top-2 after:font-bold after:-right-5 relative">
                <h3 className='text-xl font-medium font-clashDisplay'>17</h3>
                <p className='text-xs font-normal'>Hours</p>
              </div>
              <div className="minutes text-center after:content-[':']   after:inline-block after:absolute after:top-2 after:font-bold after:-right-5 relative">
                {' '}
                <h3 className='text-xl font-medium font-clashDisplay'>17</h3>
                <p className='text-xs font-normal'>Hours</p>
              </div>
              <div className='text-center seconds '>
                <h3 className='text-xl font-medium font-clashDisplay'>17</h3>
                <p className='text-xs font-normal'>Hours</p>
              </div>
            </div>

            <div className='w-full ticekts'>
              <div className='flex w-full gap-3 my-3 border border-accent rounded-3xl'>
                <div className='w-3/5 py-3 text-center rounded-full price bg-accent outline outline-accent outline-1'>
                  <button onClick={() => enterRaffle()} className='text-white'>
                    {currentStage.ticketPrice && ethers.utils.formatEther(currentStage.ticketPrice)}{' '}
                    <span className='font-bold'> M</span>
                  </button>
                </div>
                <div className='flex items-center justify-between w-3/5 pl-2 pr-6 input'>
                  <button
                    className='text-xl font-medium font-clashDisplay'
                    onClick={() => {
                      if (ticketNumber < currentStage.ticketsAvailable) {
                        setTicketNumber((prev) => prev + 1)
                      }
                    }}>
                    +
                  </button>
                  <input
                    value={ticketNumber.toString()}
                    onChange={(e) => setTicketNumber(e.target.value)}
                    className='w-full h-full text-xl font-medium text-center border-none font-clashDisplay bg-inherit'
                  />
                  <button
                    className='text-xl font-medium font-clashDisplay'
                    onClick={() => {
                      if (ticketNumber !== 0) {
                        setTicketNumber((prev) => prev - 1)
                      }
                    }}>
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RaffleModal modalIsOpen={openModal} data={raffle} closeModal={() => setOpenModal(false)} />
      </>
    )
  )
}

export default RaffleCard
