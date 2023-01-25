import React from 'react';
import Button from '../Button';

const MyStatsCard = ({
    stat
}) => {
    const { description, stats, link } = stat

    const copyLink = () => {
        navigator.clipboard.writeText(link)
    }

    return (
        <div className='bg-card p-5 rounded-card'>
            <div className='text-base text-text-color mb-4'>{description}</div>
            <div className='flex mb-6'>{stats?.length > 0 && stats.map((stat, index) =>
                    (<div key={index} className='flex flex-col mr-6 items-center'>
                        <p className='text-sm text-text-color'> {stat.name}</p>
                        <p className='text-xl'>{stat.value}</p>
                    </div>)
                )}
            </div>
            <div>
                <p className='text-base mb-4'>Link</p>
                <div className='flex'>
                    <Button text='Copy' accent onClickHandler={copyLink}/>
                    <div className='bg-black-400 rounded-xl text-old-silver w-full px-6 py-3 ml-4'>
                        <a href={link} target="_blank" rel="noreferrer">{link}</a>
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default MyStatsCard;