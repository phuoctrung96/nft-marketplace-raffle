import React from 'react'

const CreateRaffleHeader = ({currentSection,setCurrentSection, raffInfoValid}) => {
  return (
    <div className='flex justify-between items-center w-full'>
          <h1 className="title font-clashDisplay font-semibold text-3xl   tracking-wide">
            Create <span className="text-accent ml-2">RAFFLES</span>
          </h1>
          <div className="text-xs text-accent flex gap-10 items-center">
            <p
              onClick={() => setCurrentSection("Raffle Info")}
              className={`${
                currentSection === "Raffle Info" ? 'text-slate-800' : 'cursor-pointer'
              }`}
            >
              Raffle Info
            </p>
            <p
              onClick={() => setCurrentSection("Stages and Ticket Info")}
              className={`${
                (currentSection === "Stages and Ticket Info" || !raffInfoValid) ? 'text-slate-800' : 'cursor-pointer'
              }`}
            >
              Stages and Ticket Info
            </p>
          </div>
    </div>
  )
}

export default CreateRaffleHeader