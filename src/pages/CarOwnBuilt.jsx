import React, { useContext, useState } from 'react'
import { CarsContext } from '../context/DataContext'
import Loader from '../components/Loader'
import Error from '../components/Error'
import NotCar from '../components/NotCar'
import { useNavigate, useParams } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io"
import { IoClose } from "react-icons/io5"

const FilterSection = ({ title, children }) => (
  <div>
    <p className="text-sm font-semibold mb-3">{title}</p>
    {children}
  </div>
)

const CheckboxList = ({ options, selected, onToggle }) => (
  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
    {options.map((opt, i) => (
      <label key={i} className="flex items-center gap-2 cursor-pointer select-none text-sm">
        <input
          type="checkbox"
          checked={selected.includes(opt)}
          onChange={() => onToggle(opt)}
          className="accent-black w-4 h-4"
        />
        <span>{opt}</span>
      </label>
    ))}
  </div>
)

const CheckboxImageList = ({ options, selected, onToggle, carImg }) => (
  <div className="flex flex-col gap-3">
    {options.map((opt, i) => (
      <label key={i} className="cursor-pointer flex items-center gap-3">
        <input  
          className="accent-black w-4 h-4 flex-shrink-0"
          type="checkbox"
          checked={selected.includes(opt)}
          onChange={() => onToggle(opt)} 
        />
        <img src={carImg[opt]} alt={opt} className="h-12 w-20 object-contain" />
        <span className="text-sm">{opt}</span>
      </label>
    ))}
  </div>
)

const CarOwnBuilt = () => {
  const { data, loader, error } = useContext(CarsContext)
  const { modelName } = useParams()
  const navigate = useNavigate()
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const [filters, setFilters] = useState({
    modelVariant: [],
    transmission: [],
    performance: "All",
    price: "All"
  })

  if (loader) return <Loader />
  if (error) return <Error />

  const cars = data.filter(c => c.model === modelName)
  const variants = [...new Set(cars.map(item => item.modelVariant))]
  const transmissions = [...new Set(cars.flatMap(item => item.transmission))]

  const carImg = {}
  cars.forEach(car => {
    if (!carImg[car.modelVariant]) {
      carImg[car.modelVariant] = car.imgDetail1
    }
  })

  const uniquePrices = [...new Set(cars.map(item => item.price))].sort((a, b) => a - b)
  const priceOptions = [
    { value: "All", label: "All" },
    ...uniquePrices.map(p => ({
      value: p.toString(),
      label: `$${(p * 1000).toLocaleString()}`
    }))
  ]

  const toggleFilter = (item, value) => {
    setFilters(prev => ({
      ...prev,
      [item]: prev[item].includes(value)
        ? prev[item].filter(v => v !== value)
        : [...prev[item], value]
    }))
  }

  const resetFilters = () => {
    setFilters({ modelVariant: [], transmission: [], performance: "All", price: "All" })
  }

  const filteredCars = cars.filter(car => {
    const variantMatch = filters.modelVariant.length === 0 || filters.modelVariant.includes(car.modelVariant)
    const transmissionMatch = filters.transmission.length === 0 || car.transmission.some(t => filters.transmission.includes(t))
    const performanceMatch = filters.performance === "All" || parseFloat(car.acceleration) <= parseFloat(filters.performance)
    const priceMatch = filters.price === "All" || car.price <= parseFloat(filters.price)
    return variantMatch && transmissionMatch && performanceMatch && priceMatch
  })

  const renderFilters = (isMobile = false) => (
    <div className={`space-y-6 ${isMobile ? 'p-4' : 'pr-6'}`}>
      <FilterSection title="Model variant">
        <CheckboxImageList
          options={variants}
          selected={filters.modelVariant}
          onToggle={(v) => toggleFilter("modelVariant", v)}
          carImg={carImg}
        />
      </FilterSection>

      <FilterSection title="Transmission">
        <CheckboxList
          options={transmissions}
          selected={filters.transmission}
          onToggle={(v) => toggleFilter("transmission", v)}
        />
      </FilterSection>

      <FilterSection title="Performance (0-60 mph under)">
        <select 
          className="w-fit px-3 py-2 border rounded text-sm"
          value={filters.performance}
          onChange={(e) => setFilters(prev => ({ ...prev, performance: e.target.value }))}
        >
          <option value="All">All</option>
          <option value="5">Under 5s</option>
          <option value="4">Under 4s</option>
          <option value="3.5">Under 3.5s</option>
        </select>
      </FilterSection>

      <FilterSection title="Price up to">
        <select
          className="w-fit px-3 py-2 border rounded text-sm"
          value={filters.price}
          onChange={(e) => setFilters(prev => ({ ...prev, price: e.target.value }))}
        >
          {priceOptions.map(p => (
            <option key={p.value} value={p.value} className='bg-gray-100'>{p.label}</option>
          ))}
        </select>
      </FilterSection>

      <button
        className="text-sm bg-gray-200 w-full py-2 rounded hover:bg-gray-300 transition"
        onClick={resetFilters}
      >
        Reset All Filters
      </button>

      {isMobile && (
        <button 
          className="w-full bg-black text-white py-2 rounded mt-4"
          onClick={() => setMobileFilterOpen(false)}
        >
          Apply Filters
        </button>
      )}
    </div>
  )

  return (
    <div className="bg-gray-100 min-h-screen">
      {mobileFilterOpen && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
            <h3 className="text-xl font-semibold">Filters</h3>
            <button 
              onClick={() => setMobileFilterOpen(false)}
              className="p-1"
            >
              <IoClose size={24} />
            </button>
          </div>
          {renderFilters(true)}
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 pt-28 pb-16">
        <div 
          onClick={() => navigate("/built")} 
          className="flex items-center gap-1 cursor-pointer mb-6 text-sm sm:text-base"
        >
          <IoIosArrowRoundBack size={20} />
          <span>Back to model line selection</span>
        </div>

        <div className="flex justify-between items-start gap-4 mb-8 flex-col">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
              Which {modelName} would you like to configure?
            </h2>
          </div>
          <button
            className="lg:hidden bg-black text-white px-4 py-2 rounded text-sm"
            onClick={() => setMobileFilterOpen(true)}
          >
            Filter
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-32 overflow-y-auto max-h-[calc(100vh-180px)]">
              {renderFilters()}
            </div>
          </div>

          <main className="flex-1">
            {variants
              .filter(variant => filters.modelVariant.length === 0 || filters.modelVariant.includes(variant))
              .map((variant, idx) => {
                const carsOfVariant = filteredCars.filter(car => car.modelVariant === variant)
                if (carsOfVariant.length === 0) return null

                return (
                  <div key={idx} className="mb-10">
                    <h3 className="text-xl font-semibold mb-4">{variant}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                      {carsOfVariant.map((car, i) => (
                        <div 
                          key={i} 
                          className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col h-full"
                        >
                          <div className="flex-grow">
                            <div className="mb-3 flex gap-2 flex-wrap">
                              <span className='bg-gray-200 px-2 py-1 rounded text-xs'>{car.fuelType}</span>
                              <span className='bg-gray-200 px-2 py-1 rounded text-xs'>{car.year}</span>
                            </div>
                            <img 
                              src={car.imgDetail1} 
                              alt={car.modelVariant} 
                              className="w-full h-40 object-contain mb-4" 
                            />
                            <h3 className="font-semibold text-lg mb-1">{car.modelName} {car.modelVariant}</h3>
                            <p className="text-sm text-gray-600 mb-1">${(car.price * 1000).toLocaleString()}</p>
                            <p className="text-sm font-medium">{car.motorPower} hp</p>
                            <p className="text-sm text-gray-700">{car.acceleration} s (0–60 mph)</p>
                            <p className="text-sm text-gray-700 mb-2">{car.topSpeed} mph</p>
                            <p className="text-xs text-gray-500 mb-3">{car.transmission.join(" · ")}</p>
                          </div>
                          <button 
                            className="bg-black text-white text-sm px-4 py-2 rounded w-full hover:bg-gray-800 transition mt-auto"
                          >
                            Build Your Porsche
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            {filteredCars.length === 0 && <NotCar />}
          </main>
        </div>
      </div>
    </div>
  )
}

export default CarOwnBuilt