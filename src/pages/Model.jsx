import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { CarsContext } from '../context/DataContext'
import Loader from '../components/Loader'
import Error from '../components/Error'
import NotCar from '../components/NotCar'
import { IoMdClose } from "react-icons/io";

const Model = () => {
  const { data, loader, error } = useContext(CarsContext)
  const { modelName } = useParams()
  const [filterOpen, setFilterOpen] = useState(false)

  const allModels = ['All', ...new Set(data.map(item => item.model))]
  const [selectedModel, setSelectedModel] = useState(modelName || 'All')
  const [body, setBody] = useState([])
  const [fuel, setFuel] = useState([])
  const [drive, setDrive] = useState([])
  const [seats, setSeats] = useState([])

  useEffect(() => {
    setSelectedModel(allModels.includes(modelName) ? modelName : 'All')
  }, [modelName])

  const toggle = (value, list, setList) => {
    setList(list.includes(value) ? list.filter(i => i !== value) : [...list, value])
  }

  const resetFilters = () => {
    setBody([])
    setFuel([])
    setDrive([])
    setSeats([])
    setSelectedModel('All')
  }

  const getFilteredCars = (exclude) => {
    return data.filter(car =>
      (selectedModel === 'All' || car.model === selectedModel) &&
      (exclude === 'body' || !body.length || body.includes(car.bodyDesign)) &&
      (exclude === 'fuel' || !fuel.length || fuel.includes(car.fuelType)) &&
      (exclude === 'drive' || !drive.length || drive.includes(car.drive)) &&
      (exclude === 'seats' || !seats.length || seats.includes(car.seats))
    )
  }

  if (loader) return <Loader />
  if (error) return <Error />

  const cars = data.filter(car =>
    (selectedModel === 'All' || car.model === selectedModel) &&
    (!body.length || body.includes(car.bodyDesign)) &&
    (!fuel.length || fuel.includes(car.fuelType)) &&
    (!drive.length || drive.includes(car.drive)) &&
    (!seats.length || seats.includes(car.seats))
  )

  const variants = [...new Set(cars.map(c => c.modelVariant))]
  const bodyOptions = [...new Set(getFilteredCars('body').map(c => c.bodyDesign))]
  const fuelOptions = [...new Set(getFilteredCars('fuel').map(c => c.fuelType))]
  const driveOptions = [...new Set(getFilteredCars('drive').map(c => c.drive))]
  const seatOptions = [...new Set(getFilteredCars('seats').map(c => c.seats))]

  return (
    <div className='bg-gray-100 min-h-screen'>
      <section className="container mx-auto px-4 sm:px-6 pt-24 pb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Model overview</h2>
        <div className="lg:hidden mb-6">
          <button 
            onClick={() => setFilterOpen(true)} 
            className="bg-black text-white px-4 py-2 rounded text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 xl:gap-10">
          <div className="hidden lg:block w-full lg:w-72  py-6 ">
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3">Models</p>
              <div className="space-y-2">
                {allModels.map(model => (
                  <label key={model} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="model"
                      checked={selectedModel === model}
                      onChange={() => setSelectedModel(model)}
                      className="accent-black"
                    />
                    <span>{model}</span>
                  </label>
                ))}
              </div>
            </div>
            {bodyOptions.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3">Body Design</p>
                <div className="space-y-2">
                  {bodyOptions.map(option => (
                    <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={body.includes(option)}
                        onChange={() => toggle(option, body, setBody)}
                        className="accent-black"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            {fuelOptions.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3">Fuel Type</p>
                <div className="space-y-2">
                  {fuelOptions.map(option => (
                    <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={fuel.includes(option)}
                        onChange={() => toggle(option, fuel, setFuel)}
                        className="accent-black"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            {driveOptions.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3">Drive</p>
                <div className="space-y-2">
                  {driveOptions.map(option => (
                    <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={drive.includes(option)}
                        onChange={() => toggle(option, drive, setDrive)}
                        className="accent-black"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            {seatOptions.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold mb-3">Seats</p>
                <div className="space-y-2">
                  {seatOptions.map(option => (
                    <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={seats.includes(option)}
                        onChange={() => toggle(option, seats, setSeats)}
                        className="accent-black"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <button 
              onClick={resetFilters} 
              className="mt-4 w-full text-sm border border-black p-2 text-black text-center rounded hover:bg-gray-100 transition-colors" >
              Reset Filters
            </button>
          </div>
          <div className="flex-1">
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
              <h3 className="text-xl font-semibold">
                {selectedModel === 'All' ? 'All Models' : `${selectedModel} Models`}
                {cars.length > 0 && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({cars.length} {cars.length === 1 ? 'model' : 'models'})
                  </span>
                )}
              </h3>
              <NavLink 
                to="/compare" 
                className="text-sm text-black hover:underline flex items-center gap-1"  >
                Compare models
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </NavLink>
            </div>
            {cars.length === 0 ? (
              <NotCar resetFilters={resetFilters} />
            ) : (
              variants.map(variant => {
                const carsInVariant = cars.filter(c => c.modelVariant === variant)
                if (!carsInVariant.length) return null
                return (
                  <div key={variant} className="mb-10">
                    <h4 className="text-lg font-semibold mb-4">{variant}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {carsInVariant.map(car => (
                        <NavLink 
                          to={`/models/${car.model}/${encodeURIComponent(car.modelName)}`} 
                          key={car.id}
                          className="hover:scale-[1.02] transition-transform duration-200"                        >
                          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-md h-full flex flex-col">
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded mb-2 w-fit">{car.fuelType}</span>
                            <img  src={car.imgDetail1}  alt={car.modelName}  className="h-32 sm:h-40 w-full object-contain mb-4"                            />
                            <h4 className="font-semibold text-sm sm:text-base">{car.modelName}</h4>
                            <p className="text-xs sm:text-sm text-gray-600 mb-3">From ${car.price}00</p>
                            <div className="text-xs sm:text-sm text-gray-800 space-y-1 mb-4">
                              <p><b>{car.acceleration}</b> – 0-60 mph</p>
                              <p><b>{car.power}</b> – Power</p>
                              <p><b>{car.speed}</b> – Top Speed</p>
                            </div>
                            <div className="flex gap-2 mt-auto">
                              <button className="bg-black text-white text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-gray-800 transition-colors">
                                Select
                              </button>
                              <button className="border border-black text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded hover:bg-gray-100 transition-colors">
                                Compare
                              </button>
                            </div>
                          </div>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
        {filterOpen && (
          <div className="fixed inset-0 z-50 bg-white p-6 overflow-y-auto transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-white py-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button 
                onClick={() => setFilterOpen(false)}
                className="text-2xl font-light p-2 -mr-2" >
               <IoMdClose />

              </button>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold mb-3">Models</p>
                <div className="space-y-2">
                  {allModels.map(model => (
                    <label key={model} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="mobile-model"
                        checked={selectedModel === model}
                        onChange={() => setSelectedModel(model)}
                        className="accent-black"
                      />
                      <span>{model}</span>
                    </label>
                  ))}
                </div>
              </div>
              {bodyOptions.length > 0 && (
                <div>
                  <p className="text-sm font-semibold mb-3">Body Design</p>
                  <div className="space-y-2">
                    {bodyOptions.map(option => (
                      <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={body.includes(option)}
                          onChange={() => toggle(option, body, setBody)}
                          className="accent-black"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {fuelOptions.length > 0 && (
                <div>
                  <p className="text-sm font-semibold mb-3">Fuel Type</p>
                  <div className="space-y-2">
                    {fuelOptions.map(option => (
                      <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={fuel.includes(option)}
                          onChange={() => toggle(option, fuel, setFuel)}
                          className="accent-black"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {driveOptions.length > 0 && (
                <div>
                  <p className="text-sm font-semibold mb-3">Drive</p>
                  <div className="space-y-2">
                    {driveOptions.map(option => (
                      <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={drive.includes(option)}
                          onChange={() => toggle(option, drive, setDrive)}
                          className="accent-black"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {seatOptions.length > 0 && (
                <div>
                  <p className="text-sm font-semibold mb-3">Seats</p>
                  <div className="space-y-2">
                    {seatOptions.map(option => (
                      <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={seats.includes(option)}
                          onChange={() => toggle(option, seats, setSeats)}
                          className="accent-black"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg flex gap-3">
                <button 
                  onClick={resetFilters} 
                  className="flex-1 bg-gray-200 text-sm py-3 rounded text-black" >
                  Reset Filters
                </button>
                <button 
                  onClick={() => setFilterOpen(false)} 
                  className="flex-1 bg-black text-white py-3 rounded text-sm" >
                  Show {cars.length} {cars.length === 1 ? 'model' : 'models'}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default Model