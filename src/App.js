import { useEffect, useState } from 'react'
import { useNavigate, Routes, Route, Link, Navigate } from 'react-router-dom'
import { Web3Modal, useAccount, useBalance, useSigner } from '@web3modal/react'
import { ethers, Signer } from 'ethers'
import { chains } from '@web3modal/ethereum'
import { useQuery } from '@apollo/client'
import { AllRafflesQuery } from './utils/query'
import Header from './components/Header/Header'
import LandingPage from './Pages/LandingPage'
import CreateRaffle from './Pages/CreateRaffle'
import Dashboard from './Pages/Dashboard'
import parseAddress from './utils/parseAddress'
import RaffleMarketplaceABI from './utils/RaffleMarketplace.json'
import PromoPage from './Pages/PromoPage'
import './App.css'

function App() {
  const { account, isReady } = useAccount()
  const { loading, error, data } = useQuery(AllRafflesQuery)
  const { data: dataSigner, error: errorSigner, isLoading, refetch } = useSigner()

  const navigate = useNavigate()
  const [userAccount, setUserAccount] = useState('')
  const [raffles, setRaffles] = useState([])
  const [contract, setContract] = useState()

  const config = {
    projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID,
    theme: 'dark',
    accentColor: 'teal',
    ethereum: {
      appName: 'web3Modal',

      chains: [chains.polygonMumbai],
    },
  }
  useEffect(() => {
    if (dataSigner) {
      const etherContract = new ethers.Contract(
        '0x6F9B8d6f980ac66aA0ef47BF492bcE0892dBBaa6',
        RaffleMarketplaceABI,
        dataSigner
      )
      setContract(etherContract)
    }
  }, [dataSigner])

  useEffect(() => {
    if (data?.raffles.length) {
      setRaffles(data.raffles)
    }
  }, [data])

  useEffect(() => {
    if (isReady) {
      setUserAccount(account.address)
    }
  }, [isReady, account])

  return (
    <div className='w-full min-h-screen py-2 text-white bg-black App font-poppins'>
      <Header account={userAccount} />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/create' element={<CreateRaffle contract={contract} />} />
        <Route path='/dashboard' element={<Dashboard raffles={raffles} />} />
        <Route path='/promo' element={<PromoPage />} />
      </Routes>

      <Web3Modal config={config} />
    </div>
  )
}

export default App
