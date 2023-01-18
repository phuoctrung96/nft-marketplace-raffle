import React from 'react'
import ReviewCard from '../ReviewCard'

const Reviews = () => {
  return (
    <div className='md:w-5/6 w-full sm:w-5/6 mx-auto mt-24 pb-24 md:px-12 px-5'>
        <h1 className='text-3xl font-clashDisplay font-semibold text-center'>WHY PEOPLE LOVE RAFFALL</h1>
        <p className="subtitle text-text-color text-xs text-center my-4">Raffall provides credibility to hosts and security for their entrants.</p>
        <div className="reviews mt-12 flex flex-col sm:flex-wrap md:flex-nowrap  sm:flex-row items-center gap-6">
            <ReviewCard title="Referrals" desc="Buy and sell popular digital currencies, keep track of them in the one place."/>
            <ReviewCard title="Referrals" additionalClass="relative md:top-20" desc="Buy and sell popular digital currencies, keep track of them in the one place."/>
            <ReviewCard title="Referrals" desc="Buy and sell popular digital currencies, keep track of them in the one place."/>
        </div>
    </div>
  )
}

export default Reviews