import React from 'react'
import Hero from '../components/Hero/Hero'
import Reviews from '../components/RaffleCard/Reviews'
import TextCarousel from '../components/TextCarousel/TextCarousel'
import { ReactComponent as Background } from '../assets/bg-1.svg'
import { ReactComponent as BackgroundMobile } from '../assets/bg-1-mobile.svg'

import CarouselTextItem from '../components/CarouselTextItem'
import ProductCarousel from '../components/ProductCarousel/ProductCarousel'
import CTA from '../components/CTA/CTA'
import Footer from '../components/Footer/Footer'

const LandingPage = ({ address, connectWalletHandler }) => {
  return (
    <div className='relative z-10 overflow-hidden'>
      <Hero address={address} connectWalletHandler={connectWalletHandler} />
      <div className='relative mobile-bg-container '>
        <BackgroundMobile className='absolute right-0 z-10 md:hidden bg top-120 ' />
      </div>
      <Reviews />
      <div className='relative w-full '>
        <Background className='absolute hidden md:block -left-20 -top-48 bg ' />
      </div>
      <TextCarousel title='WHO USES RAFFALL TO HOST COMPETITIONS?'>
        <CarouselTextItem
          title='Brand 1'
          desc='Whether it’s to increase public engagement or brand awareness; brands use Raffall to host public and private competitions that give their customers and staff the opportunity to win exciting prizes whilst at the same time supporting charities and causes they believe in.'
        />
        <CarouselTextItem
          title='Brand 2'
          desc='Whether it’s to increase public engagement or brand awareness; brands use Raffall to host public and private competitions that give their customers and staff the opportunity to win exciting prizes whilst at the same time supporting charities and causes they believe in.'
        />
        <CarouselTextItem
          title='Brand 3'
          desc='Whether it’s to increase public engagement or brand awareness; brands use Raffall to host public and private competitions that give their customers and staff the opportunity to win exciting prizes whilst at the same time supporting charities and causes they believe in.'
        />
      </TextCarousel>
      <h3 className="text-3xl text-center font-clashDisplay font-medium mb-4">
        Hottest Raffles
      </h3>
      <ProductCarousel title='Hottest Raffles' />
      <CTA />
      <Footer />
    </div>
  )
}

export default LandingPage
