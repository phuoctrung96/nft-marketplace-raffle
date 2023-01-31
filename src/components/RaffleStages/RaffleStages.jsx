// import { info } from 'autoprefixer'
import React, { useState } from 'react'
import Select from 'react-select'
// import CreateRaffleHeader from '../CreateRaffleHeader'
import InputBox from '../InputBox/InputBox'
import Line from '../Line'
import { ReactComponent as CloseIcon } from '../../assets/cross-icon.svg'
import { ReactComponent as GiftIllustration } from '../../assets/gift.svg'

const Stage = ({
  stage,
  removeStageHandler,
  stagesOptions,
  customStyles,
  stageHandler,
  stageSelectHandler,
  i,
}) => {
  return (
    <div className='mt-8 '>
      <div className='flex items-center justify-between mr-20'>
        <p>Stage {stage.stageType}</p>
        <CloseIcon
          className='w-6 h-6 cursor-pointer stroke-accent'
          onClick={() => removeStageHandler(i)}
        />
      </div>
      <Line additionalClass={'w-1/2'} />
      <InputBox labelText='Stage Type'>
        <Select
          options={stagesOptions}
          defaultValue={stagesOptions[0]}
          placeholder='Select the category'
          styles={customStyles}
          name='stageType'
          onChange={(obj) => stageSelectHandler(obj, i)}
        />
      </InputBox>
      <InputBox
        labelText={'Tickets to Sell'}
        placeholder='Enter tickets to sell'
        value={stage.ticketsAvailable}
        name={'ticketsAvailable'}
        onChangeHandler={(e) => stageHandler(e, i)}
        showError
        required
      />
      <InputBox
        labelText={'Ticket Price'}
        placeholder='Enter ticket price amount'
        value={stage.ticketPrice}
        name={'ticketPrice'}
        onChangeHandler={(e) => stageHandler(e, i)}
        required
        showError
      />
    </div>
  )
}

const RaffleStages = ({
  createRaffleHandler,
  setCurrentSection,
  customStyles,
  stages,
  setStages,
  raffleInfo,
  setRaffleInfo,
}) => {
  // const [selectedStages, setSelectedStages] = useState([stages[0].stageType])
  const [isCharityContainerOpen, setIsCharityContainerOpen] = useState(false)
  const stagesOptions = [
    {
      name: 'stageType',
      label: 'PRESALE',
      value: '0',
    },
    {
      name: 'stageType',
      label: 'SALE',
      value: '1',
    },
    {
      name: 'stageType',
      label: 'PREMIUM',
      value: '2',
    },
  ]

  const stageSelectHandler = (obj, index) => {
    const { name, value } = obj
    // if(isPresent===undefined){
    //     setSelectedStages([...selectedStages,value])
    // }else{
    //     setSelectedStages(selectedStages.filter((st,i)=>i===isPresent ? stages[index].stageType : st))
    // }
    setStages(stages.map((stage, i) => (i === index ? { ...stage, [name]: value } : stage)))
  }

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setRaffleInfo({ ...raffleInfo, [name]: value })
  }

  const stageHandler = (e, index) => {
    const { name, value } = e.target
    setStages(stages.map((stage, i) => (i === index ? { ...stage, [name]: value } : stage)))
  }

  const removeStageHandler = (index) => {
    if (stages.length > 1) setStages(stages.filter((stage, i) => i !== index))
  }

  const checkRaffleStage = (e) => {
    e.preventDefault()
    const { charityName, charityAddress, percentToDonate } = raffleInfo

    const isStageFilled = stages.every(
      (stage) => stage.stageType !== '' && stage.ticketsAvailable !== '' && stage.ticketPrice !== ''
    )

    const isStageTypeRepeated = stages.some(
      (stage, i) => stages.filter((st) => st.stageType === stage.stageType).length > 1
    )

    const isDonate = charityName && charityAddress && percentToDonate && isCharityContainerOpen

    if (isStageFilled && !isStageTypeRepeated && isCharityContainerOpen === false) {
      createRaffleHandler()
    } else if (isStageFilled && !isStageTypeRepeated && isCharityContainerOpen && isDonate) {
      createRaffleHandler()
    } else {
      let error = ``
      if (!charityName && isCharityContainerOpen) {
        error += `Charity Name, `
      }
      if (!charityAddress && isCharityContainerOpen) {
        error += `Charity Address, `
      }
      if (!percentToDonate && isCharityContainerOpen) {
        error += `Percent to Donate, `
      }

      if (isStageTypeRepeated) {
        error += `Stage Type can't be repeated, `
      }
      if (!isStageFilled) {
        error += `All stage fields are required, `
      }

      error = error.slice(0, -2)

      alert(`Please fill in the following fields: ${error}`)

      return false
    }
  }

  return (
    <div>
      <div className='flex items-center gap-20'>
        <div className='w-5/12'>
          <p
            className='w-1/4 mt-8 ml-auto text-xs cursor-pointer text-accent '
            onClick={() => {
              if (stages.length <= 2)
                setStages([
                  ...stages,
                  { stageType: '0', ticketsAvailable: '', ticketPrice: '', ticketsSold: '0' },
                ])
            }}>
            Add Stage
          </p>
          <div className='inputs-container '>
            {stages.map((stage, i) => (
              <Stage
                key={i}
                stage={stage}
                removeStageHandler={removeStageHandler}
                stagesOptions={stagesOptions}
                customStyles={customStyles}
                stageHandler={stageHandler}
                stageSelectHandler={stageSelectHandler}
                i={i}
              />
            ))}
          </div>
          <div className='mt-16 mb-4 donate '>
            <p
              className='text-sm cursor-pointer text-accent'
              onClick={() => setIsCharityContainerOpen((prev) => !prev)}>
              Donate to Charity?
            </p>
            <Line additionalClass={'w-1/2'} />

            <div
              className={`inputs-charity transition-all ${
                isCharityContainerOpen ? 'h-auto opacity-100' : 'h-0 overflow-hidden opacity-0'
              }`}>
              <InputBox
                onChangeHandler={onChangeHandler}
                labelText={'Charity Name'}
                value={raffleInfo.charityName}
                name='charityName'
                placeholder='Enter charity name'
              />
              <InputBox
                onChangeHandler={onChangeHandler}
                labelText={'Charity Address'}
                value={raffleInfo.charityAddress}
                name='charityAddress'
                placeholder="Enter charity's wallet address"
              />
              <InputBox
                onChangeHandler={onChangeHandler}
                type='number'
                labelText={'Percentage to Donate'}
                value={raffleInfo.percentToDonate}
                name='percentToDonate'
                placeholder='Enter % of revenue collected to donate'
              />
            </div>
          </div>
        </div>

        <div className='relative w-7/12'>
          <GiftIllustration className='w-full opacity-40' />
        </div>
      </div>

      <button
        className='block px-16 py-3 mt-10 text-white rounded-sm bg-accent '
        onClick={() => setCurrentSection('Raffle Info')}>
        Previous
      </button>
      <button
        className='block px-16 py-3 mx-auto mt-10 text-white rounded-full bg-accent '
        onClick={checkRaffleStage}>
        Create Raffle
      </button>
    </div>
  )
}

export default RaffleStages
