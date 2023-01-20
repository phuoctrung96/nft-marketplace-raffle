import React, { useState, useEffect } from 'react'
import InformationCard from '../components/Container/InformationCard'
import StatsCard from '../components/Container/StatsCard'
import Footer from '../components/Footer/Footer'
import ProductCarousel from '../components/ProductCarousel/ProductCarousel'
import SortRaffle from '../components/Sort/SortRaffle'

const ProfilePage = ({ raffles }) => {

    const [basicInformation] = useState(
        {
            name: 'John Malren', avatar: 'https://www.w3schools.com/howto/img_avatar.png',
            email: 'johnmalren@gmail.com',
            number: '+165165386743', socialMedia: { twitter: '@johnmalren' }
        })

    const [stat] = useState(
        {
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ',
            stats: [{ name: 'Invited Person', value: 50 }, { name: 'Invited Person', value: 50 }, { name: 'Invited Person', value: 50 }],
            link: 'https://raffall.com/@johnmalren',
        })

    const [sorts] = useState(
        {
            value: 'Price',
            sortValues: [{ name: 'Lowest to Highest', value: true }, { name: 'Highest to Lowest', value: false }],

        })
    const [sortValue, setSortValue] = useState(true)

    const [sortedRaffles, setSortedRaffles] = useState([])

    useEffect(() => {
        const result = raffles.sort((a, b) => { return sortValue ? a.prize - b.price : b.prize - a.prize })
        setSortedRaffles(result)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortValue])

    return (
        <>
            <div className='w-full h-full py-10 mx-auto md:w-10/12 max-w-7xl mb-5'>
                <div className='grid grid-cols-profileCards gap-5 mb-16 auto-rows-1fr'>
                    <div>
                        <p className='text-2xl font-clashDisplay font-medium mb-4'>My Profile</p>
                        <InformationCard className='mt-4' basicInformation={basicInformation} />
                    </div>
                    <div>
                        <p className='text-2xl font-clashDisplay font-medium mb-4'>My Stats</p>
                        <StatsCard stat={stat} />
                    </div>
                </div>

                <div className='flex justify-between'>
                    <h3 className="text-3xl font-clashDisplay font-medium mb-4">
                        Your Raffles <span className='text-lg font-normal text-accent'>{raffles.length} items</span>
                    </h3>
                    <SortRaffle sorts={sorts} sortValue={sortValue} changeValue={() => setSortValue(!sortValue)} />
                </div>

                <ProductCarousel raffles={sortedRaffles} slideClass='ml-3' cardClass='mr-5' title='Hottest Raffles' />
            </div>
            <div className='w-full'>
                <Footer />
            </div>
        </>
    )
}

export default ProfilePage
