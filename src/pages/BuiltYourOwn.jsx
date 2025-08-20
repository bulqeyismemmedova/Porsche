import React, { useContext } from 'react'
import { CarsContext } from '../context/DataContext'
import Loader from "../components/Loader"
import Error from "../components/Error"
import { NavLink } from 'react-router-dom'
import Scroll from '../components/Scroll'

const BuiltYourOwn = () => {
  const { model, loader, error, data } = useContext(CarsContext)

  const desc = ["The mid-engine sports car for two", "The quintessential, rear engine sports car", "The pure expression of an electric sports car", "The sports car with stylish design and everyday practicality", "The sports car of compact SUVs", "Impressive sports car with up to 5 seats"]
  const price = ["75.400", "132.300", "103.900", "110.100", "64.600", "88.800"]

  if (loader) return <Loader />
  if (error) return <Error />

  const models = [...new Set(data.map(item => item.model))]

  const allBodyTypesPerModel = models.map(modelName => {
    return [...new Set(
      data
        .filter(item => item.model === modelName)
        .map(item => item.bodyDesign)
    )]
  })
  
  const allSeats = models.map(modelName => {
    return [...new Set(
      data.filter(item => item.model === modelName)
        .map(item => item.seats)
    )]
  })

  const allTrans = models.map(modelName => {
    return [...new Set(
      data.filter(item => item.model === modelName)
        .map(item => item.transmission)
    )]
  })

  return (
    <>
    <Scroll/>
    <div className='bg-gray-100'>
      <section className="bg-gray-100 container mx-auto min-h-screen pt-[130px] px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6">Select a Model Line</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {model.map((item, index) => (
            <NavLink 
              to={`/built/${item.model}`} 
              key={index} 
              className="bg-white p-6 sm:p-8 rounded-2xl cursor-pointer shadow-md hover:shadow-gray-400 hover:shadow-xl transition max-w-[600px] w-full mx-auto" >
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black">{item.model}</h3>
                <div className="mt-3 mb-6 flex flex-wrap gap-2">
                  {item.fuelType.map((type, i) => (
                    <span key={i} className="px-2 sm:px-3 py-1 bg-gray-200 rounded text-xs text-black">
                      {type}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center items-center my-4 sm:my-6">
                  <img
                    src={item.img}
                    alt={item.model}
                    className="w-full max-w-xs sm:max-w-sm h-auto object-contain"/>
                </div>
                <p className="text-black font-semibold text-sm sm:text-base mb-1">{desc[index]}</p>
                <p className="text-xs sm:text-sm text-gray-700 mb-4">From ${price[index]} *</p>
                <div className="text-xs sm:text-sm text-gray-700 space-y-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className='text-black font-semibold'>Body Type:</p> 
                    {allBodyTypesPerModel[index].slice(0, 3).join(", ")}
                  </div>
                  <div>
                    <p className='text-black font-semibold'>Seats:</p> 
                    {allSeats[index].join(", ")}
                  </div>
                  <div>
                    <p className='text-black font-semibold'>Transmission:</p> 
                    Automatic, Manual
                  </div>
                </div>
              </div>
              <button className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition text-sm sm:text-base">
                Configure {item.model}
              </button>
            </NavLink>
          ))}
        </div>
        
        <div className="bg-white rounded p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 mt-10 md:mt-16">
          <div className="flex flex-col items-start text-center md:text-left max-w-xl">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black mb-2">
              Do you need support choosing a model?
            </h2>
            <p className="text-sm sm:text-base text-black">
              Compare different models to help you decide which dream car fits you best.
            </p>
            <NavLink to="/compare" className="w-full md:w-auto">
              <button className="mt-6 md:mt-8 text-sm sm:text-base border border-black px-6 py-2 rounded text-black hover:bg-gray-300 transition cursor-pointer w-full md:w-auto">
                Compare Model
              </button>
            </NavLink>
          </div>
          <div className="w-full max-w-[500px] md:max-w-[600px]">
            <img
              className="w-full h-auto object-contain"
              src="https://configurator.porsche.com/model-start/pictures/model-compare-banner.png"
              alt="Model Compare" />
          </div>
        </div>
        
        <div className='py-8 md:py-12'>
          <p className='text-xs text-gray-800'>*Manufacturer's Suggested Retail Price. Excludes options; taxes; title; registration; delivery, processing and handling fee; dealer charges; potential tariffs. Dealer sets actual selling price.</p>
        </div>
      </section>
    </div>
    </>
  )
}

export default BuiltYourOwn