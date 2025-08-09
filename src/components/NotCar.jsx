import React from 'react'

const NotCar = ({ resetFilters }) => {
    return (
        <div className="text-center py-16 px-5 bg-white h-screen">
            <h2 className="text-3xl font-semibold text-black mb-2">We can't find a suitable Porsche that fits your search criteria.</h2>
            <p className="text-md text-black">To find your ideal Porsche, we recommend resetting your selection.</p>
            <button onClick={resetFilters} className="mt-5 text-sm border border-black p-2 text-black text-center rounded px-10 py-2 hover:bg-gray-300">
                Reset Filters
            </button>
            <img src="https://configurator.porsche.com/model-start/pictures/model-compare-banner.png" alt="" />
            
        </div>
    )
}

export default NotCar