import React, { useState, useEffect } from 'react'

const SortRaffle = ({ sorts, sortValue, changeValue }) => {

    const { value, sortValues } = sorts

    const [sortDisplay, setSortDisplay] = useState('')

    useEffect(() => {
        const result = sortValues?.find(sort => sort.value === sortValue).name
        setSortDisplay(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortValue])

    return (
        <div className='flex border-accent px-4 py-2.5 border rounded-sort items-center'>
            <span className='text-base text-text-color mr-6'>{value}</span>
            <span className='text-accent text-sm cursor-pointer' onClick={changeValue}>
                {sortDisplay}
            </span>
        </div>
    )
}

export default SortRaffle
