import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

const toggle = (option, list, setList) => {
  setList(prev =>
    prev.includes(option)
      ? prev.filter(item => item !== option)
      : [...prev, option]
  )
}

const ChooseCar = ({ data, sidebar, setSideBar, firstCar, setFirstCar, secondCar, setSecondCar }) => {
  const [selectedModel, setSelectedModel] = useState("All")
  const [body, setBody] = useState([])
  const [engine, setEngine] = useState([])
  const [filterOpen, setFilterOpen] = useState(false)

  const allModelName = ["All", ...new Set(data.map(item => item.model))]
  const bodyDesign = [...new Set(data.map(item => item.bodyDesign))]
  const engineType = [...new Set(data.map(item => item.fuelType))]
  const modelVariants = [...new Set(data.map(item => item.modelVariant))]

  const resetFilters = () => {
    setSelectedModel("All")
    setBody([])
    setEngine([])
  }

  const filteredData = data.filter(car => {
    const modelMatch = selectedModel === "All" || car.model === selectedModel
    const bodyMatch = body.length === 0 || body.includes(car.bodyDesign)
    const engineMatch = engine.length === 0 || engine.includes(car.fuelType)
    return modelMatch && bodyMatch && engineMatch
  })

  function handleCarSelect(car) {
    if (firstCar?.id === car.id) {
      setFirstCar(null)
      return
    }
    if (secondCar?.id === car.id) {
      setSecondCar(null)
      return
    }
    if (!firstCar) {
      setFirstCar(car)
    } else if (!secondCar) {
      setSecondCar(car)
    } else {
      setFirstCar(secondCar)
      setSecondCar(car)
    }
  }

  function handleCompare() {
    if (firstCar && secondCar) {
      setSideBar(false)
    }
  }

  return (
    <>
      <div onClick={() => setSideBar(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          sidebar ? "block opacity-100" : "hidden opacity-0"
        }`} />
      <div className={`fixed top-0 right-0 h-screen w-full md:w-[90%] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-700 ease-in-out transform ${
          sidebar ? "translate-x-0" : "translate-x-full"
        }`} >
        <div className="flex items-center justify-between px-6 py-4 border-b z-[100]">
          <div className="flex flex-col">
            <h2 className="text-3xl font-semibold mb-1">Choose two Porsche models</h2>
            <p className="text-sm text-gray-600">{filteredData.length} available models</p>
          </div>
          <button onClick={() => setSideBar(false)} className="text-gray-600 hover:text-red-600">
            <RxCross2 size={24} />
          </button>
        </div>
        <div className="lg:hidden my-6 px-6">
          <button onClick={() => setFilterOpen(true)} className="bg-black text-white px-4 py-2 rounded text-sm flex items-center gap-2" >
            Filter
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 p-6 overflow-y-auto mt-3">
          <div className="hidden lg:block max-w-xs w-full overflow-y-auto">
            <p className="text-sm font-semibold mb-3">Models</p>
            <div className="space-y-3 pr-2">
              {allModelName.map(model => (
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
            <div className="mt-6">
              <p className="text-sm font-semibold mb-3">Body Type</p>
              <div className="space-y-2">
                {bodyDesign.map(option => (
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
            <div className="mt-6">
              <p className="text-sm font-semibold mb-3">Engine Type</p>
              <div className="space-y-2">
                {engineType.map(option => (
                  <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={engine.includes(option)}
                      onChange={() => toggle(option, engine, setEngine)}
                      className="accent-black"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <button onClick={resetFilters} className="mt-10 text-sm border border-black px-6 py-2 rounded hover:bg-gray-200" >
              Reset Filters
            </button>
          </div>
          <div className="flex-1">
            {modelVariants.map(variant => {
              const variantCars = filteredData.filter(car => car.modelVariant === variant)
              if (variantCars.length === 0) return null
              return (
                <div key={variant} className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">{variant} models</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {variantCars.map((car, i) => (
                      <div  key={i} onClick={() => handleCarSelect(car)}className={`bg-gray-100 rounded-xl p-4 md:p-5 cursor-pointer transition-all hover:shadow-lg ${
                          firstCar?.id === car.id || secondCar?.id === car.id
                            ? "border border-black"
                            : "border border-gray-200"
                        }`} >
                        <div className="text-xs mb-2 flex gap-2">
                          <span className="bg-white text-black px-2 py-1 rounded">{car.fuelType}</span>
                          <span className="bg-white text-black px-2 py-1 rounded">{car.year}</span>
                        </div>
                        <img src={car.imgDetail1} alt={car.modelName} className="w-full h-32 object-contain mb-4 px-1" />
                        <h3 className="text-lg mb-1 font-semibold w-full">{car.modelName}</h3>
                        <p className="text-xs text-gray-700 mb-4">From ${(car.price * 1000).toLocaleString()}</p>
                        <div className="mb-2">
                          <p className="text-black font-semibold text-[15px]">Power: {car.power} hp</p>
                          <span className="text-gray-700 text-xs">Maximum power combustion engine</span>
                        </div>
                        <div className="mb-2">
                          <p className="text-black font-semibold text-[15px]">{car.acceleration} sec</p>
                          <span className="text-gray-700 text-xs">Acceleration 0-60 mph with Sport Chrono Package</span>
                        </div>
                        <div className="mb-2">
                          <p className="text-black font-semibold text-[15px]">{car.speed} mph</p>
                          <span className="text-gray-700 text-xs">Top track speed</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          PDK {car.transmission.join("/")} , {car.drive}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="bg-white startShadow">
          <button onClick={handleCompare}className={`text-sm m-6 rounded py-3 px-6 transition ${
              firstCar && secondCar
                ? "bg-black text-white border border-black hover:bg-gray-800"
                : "bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed"
            }`}>
            Start Comparison (2)
          </button>
        </div>
      </div>
      {filterOpen && (
        <div className="fixed inset-0 z-50 bg-white p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-white py-4">
            <h3 className="text-lg font-semibold">Filters</h3>
            <button onClick={() => setFilterOpen(false)} className="text-2xl font-light p-2 -mr-2">
              <RxCross2 />
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold mb-3">Models</p>
              <div className="space-y-2">
                {allModelName.map(model => (
                  <label key={model} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="mobile-model"
                      checked={selectedModel === model}
                      onChange={() => setSelectedModel(model)}
                      className="accent-black" />
                    <span>{model}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-3">Body Type</p>
              <div className="space-y-2">
                {bodyDesign.map(option => (
                  <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={body.includes(option)}
                      onChange={() => toggle(option, body, setBody)}
                      className="accent-black" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-3">Engine Type</p>
              <div className="space-y-2">
                {engineType.map(option => (
                  <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={engine.includes(option)}
                      onChange={() => toggle(option, engine, setEngine)}
                      className="accent-black"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg flex gap-3">
              <button  onClick={resetFilters} className="flex-1 bg-gray-200 text-sm py-3 rounded text-black" >
                Reset Filters
              </button>
              <button onClick={() => setFilterOpen(false)} className="flex-1 bg-black text-white py-3 rounded text-sm" >
                Show {filteredData.length} {filteredData.length === 1 ? 'model' : 'models'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChooseCar
