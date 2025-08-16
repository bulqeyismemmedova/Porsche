import React, { useState } from 'react'
import { CgArrowsExchange } from "react-icons/cg"
import { FaPlus, FaMinus } from "react-icons/fa6"

const CompareCars = ({ firstCar, secondCar, setFirstCar, setSecondCar, sidebar, setSideBar }) => {

  const [openDetail, setOpenDetail] = useState([])

  const toggleDetail = (categoryKey) => {
    if (openDetail.includes(categoryKey)) {
      setOpenDetail(item => item.filter(key => key !== categoryKey))
    } else {
      setOpenDetail(item => [...item, categoryKey])
    }
  }


  const cars = [firstCar, secondCar]

  const categoryTitles = {
    motorTitle: 'Motor',
    performance: 'Performance',
    body: 'Body',
    capacityes: 'Capacities',
    service: 'Service'
  }

  const handleGearChange = (index, value) => {
    if (index === 0) {
      setFirstCar({ ...firstCar, gearType: value })
    } else {
      setSecondCar({ ...secondCar, gearType: value })
    }
  }

  function handleChange(car) {
    if (car === firstCar) {
      setFirstCar(null)
      setSideBar(!sidebar)
    } else {
      setSecondCar(null)
      setSideBar(!sidebar)
    }
  }

  function handleBack() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const findValBody = (car, label) =>
    car?.body?.find((d) =>
      d.title?.toLowerCase().includes(label.toLowerCase())
    )?.value || "-"

  const findValMotor = (car, label) =>
    car?.motorTitle?.find((d) =>
      d.title?.toLowerCase().includes(label.toLowerCase())
    )?.value || "-"

  return (
    <section className="px-4 py-10 bg-white w-full max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 w-full">
        {cars.map((car, index) => (
          car && (
            <div key={index} className="w-full lg:w-1/2 relative p-3">
              <button onClick={() => handleChange(car)} className='absolute -top-6 right-0 hover:bg-gray-100 px-2 py-1 flex items-center gap-1 font-semibold'>
                Change model <CgArrowsExchange size={25} />
              </button>
              <img src={car?.imgDetail1} alt={car?.modelName} className="mx-auto mb-6 max-h-[120px] object-contain" />
              <h2 className="text-2xl mt-10 font-semibold text-center lg:text-left">{car?.modelName}</h2>
              <p className="text-gray-600 mb-2 text-sm text-center lg:text-left">From ${(car.price * 1000).toLocaleString()}</p>
              <p className="text-sm text-gray-500 mb-4 text-center lg:text-left">Gear type</p>
              <div className="flex flex-col items-start gap-3 mb-6 pl-0 lg:pl-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={car?.gearType === 'PDK'}
                    onChange={() => handleGearChange(index, 'PDK')}
                  />
                  <span className="text-[14px]">7-speed Porsche Doppelkupplung (PDK)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={car?.gearType === 'Manual'}
                    onChange={() => handleGearChange(index, 'Manual')}
                  />
                  <span className="text-[14px]">6-speed Manual Transmission with Sport Chrono Package</span>
                </label>
              </div>
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <button className="bg-black w-full md:w-[250px] text-white text-sm px-6 py-3 rounded hover:bg-gray-800 transition">
                  Build Your Porsche
                </button>
                <button className="border w-full md:w-[250px] text-sm px-6 py-3 rounded hover:bg-gray-100 transition">
                  Basket
                </button>
              </div>
              <p className="text-sm text-gray-800 mt-4 text-center lg:text-left">
                {car?.gearType === 'PDK' ? 'PDK (Automatic)' : 'Manual'} · {car?.drive}
              </p>
            </div>
          )
        ))}
      </div>
      <div className="flex justify-center flex-col items-center mt-[130px] px-4">
        <h2 className="text-center text-[28px] md:text-[34px] font-bold tracking-wide mb-8">
          Technical Data
        </h2>
        <div className="w-full max-w-6xl space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 rounded-lg overflow-hidden ">
            <p className=" w-full md:w-1/3 text-gray-600 text-[16px] font-medium p-4 text-center">
              Engine
            </p>
            {cars.map(item => (
              <div
                key={item.id}
                className="w-full md:w-1/3 text-center font-semibold p-4"
              >
                {item.fuelType}
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between  border-gray-200 rounded-lg overflow-hidden border-b">
            <p className=" w-full md:w-1/3 text-gray-600 text-[16px] font-medium p-4 text-center">
              Drivetrain
            </p>
            {cars.map(item => (
              <div
                key={item.id}
                className="w-full md:w-1/3 text-center font-semibold p-4"
              >
                {item.drive}
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between  border-gray-200 rounded-lg overflow-hidden border-b">
            <p className=" w-full md:w-1/3 text-gray-600 text-[16px] font-medium p-4 text-center">
              Transmission
            </p>
            {cars.map(item => (
              <div
                key={item.id}
                className="w-full md:w-1/3 text-center font-semibold p-4"
              >
                {item.transmission.join(",")}
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between  border-gray-200 rounded-lg overflow-hidden border-b">
            <p className=" w-full md:w-1/3 text-gray-600 text-[16px] font-medium p-4 text-center">
              Number of seats
            </p>
            {cars.map(item => (
              <div
                key={item.id}
                className="w-full md:w-1/3 text-center font-semibold p-4"
              >
                {item.seats}
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between  border-gray-200 rounded-lg overflow-hidden border-b">
            <p className=" w-full md:w-1/3 text-gray-600 text-[16px] font-medium p-4 text-center">
              Maximum power combustion engine
            </p>
            {cars.map(item => (
              <div
                key={item.id}
                className="w-full md:w-1/3 text-center font-semibold p-4"
              >
                220kW/{item.power} hp
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between  border-gray-200 rounded-lg overflow-hidden border-b">
            <p className=" w-full md:w-1/3 text-gray-600 text-[16px] font-medium p-4 text-center">
              Acceleration 0-60 mph with Sport Chrono Package
            </p>
            {cars.map(item => (
              <div
                key={item.id}
                className="w-full md:w-1/3 text-center font-semibold p-4"
              >
                {item.acceleration} sec
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between  border-gray-200 rounded-lg overflow-hidden border-b">
            <p className=" w-full md:w-1/3 text-gray-600 text-[16px] font-medium p-4 text-center">
              Top track speed
            </p>
            {cars.map(item => (
              <div
                key={item.id}
                className="w-full md:w-1/3 text-center font-semibold p-4"
              >
                {item.speed} mph
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between  border-gray-200 rounded-lg overflow-hidden border-b">
            <p className=" w-full md:w-1/3 text-gray-600 text-[16px] font-medium p-4 text-center">
              Maximum engine power
            </p>
            <div className="w-full md:w-1/3 text-center font-semibold p-4">
              {findValMotor(firstCar, "Max. engine power")}
            </div>
            <div className="w-full md:w-1/3 text-center font-semibold p-4">
              {findValMotor(secondCar, "Max. engine power")}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between  border-gray-200 rounded-lg overflow-hidden border-b">
            <p className=" w-full md:w-1/3 text-gray-600 text-[16px] font-medium p-4 text-center">
              Number of cylinders
            </p>
            <div className="w-full md:w-1/3 text-center font-semibold p-4">
              {findValMotor(firstCar, "Number of cylinders")}
            </div>
            <div className="w-full md:w-1/3 text-center font-semibold p-4">
              {findValMotor(secondCar, "Number of cylinders")}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between  border-gray-200 rounded-lg overflow-hidden border-b">
            <p className=" w-full md:w-1/3 text-gray-600 text-[16px] font-medium p-4 text-center">
              Displacement
            </p>
            <div className="w-full md:w-1/3 text-center font-semibold p-4">
              {findValMotor(firstCar, "Displacement")}
            </div>
            <div className="w-full md:w-1/3 text-center font-semibold p-4">
              {findValMotor(secondCar, "Displacement")}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between  border-gray-200 rounded-lg overflow-hidden border-b">
            <p className=" w-full md:w-1/3 text-gray-600 text-[16px] font-medium p-4 text-center">
              Length / Width / Height
            </p>
            <div className="w-full md:w-1/3 text-center font-semibold p-4">
              {findValBody(firstCar, "Length")} x{" "}
              {findValBody(firstCar, "Width")} x{" "}
              {findValBody(firstCar, "Height")}
            </div>
            <div className="w-full md:w-1/3 text-center font-semibold p-4">
              {findValBody(secondCar, "Length")} x{" "}
              {findValBody(secondCar, "Width")} x{" "}
              {findValBody(secondCar, "Height")}
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center flex-col items-center mt-[130px] px-2'>
        {
          Object.keys(categoryTitles).map((categoryKey) => (
            <div key={categoryKey} className='w-full max-w-6xl mt-10 '>
              <div className='border-b border-gray-200 py-3 '>
                <button
                  onClick={() => toggleDetail(categoryKey)}
                  className="text-black flex items-center gap-1 justify-start"
                >
                  <p className='text-black uppercase font-semibold'>
                    {categoryTitles[categoryKey]}
                  </p>
                  <div className="text-black">
                    {openDetail.includes(categoryKey) ? <FaMinus size={12} /> : <FaPlus size={12} />}
                  </div>
                </button>
              </div>
              {(firstCar?.[categoryKey] || secondCar?.[categoryKey] || []).map((_, index) => {
                const firstValue = firstCar?.[categoryKey]?.[index]?.value || '-'
                const secondValue = secondCar?.[categoryKey]?.[index]?.value || '-'
                const title = firstCar?.[categoryKey]?.[index]?.title || secondCar?.[categoryKey]?.[index]?.title || '-'
                return (
                  openDetail.includes(categoryKey) && (
                    <div key={index} className='flex flex-col md:flex-row items-center justify-between border-b border-gray-200 py-4'>
                      <div className="w-full md:w-1/3 text-sm text-gray-500 mb-2 md:mb-0 text-center md:text-left">
                        {title}
                      </div>
                      <div className="w-full md:w-1/3 text-center font-semibold">
                        {firstValue}
                      </div>
                      <div className="w-full md:w-1/3 text-center font-semibold">
                        {secondValue}
                      </div>
                    </div>
                  )
                )
              })}
            </div>
          ))
        }
      </div>
      <div className='flex justify-center flex-col items-center mt-[130px] px-2'>
        <h2 className='text-center text-[26px] md:text-[32px] font-semibold'>Standard Equipment</h2>
        <div className='w-full max-w-6xl mt-10'>
          {[{ left: "2.0-Liter Turbocharged Boxer 4", right: "2.0-Liter Turbocharged Boxer 4" },
          { left: "7-speed Porsche Doppelkupplung (PDK)", right: "7-speed Porsche Doppelkupplung (PDK)" },
          { left: "18” Cayman Wheels", right: "20” 718 Spyder Wheels in High Gloss Black" },
          { left: "Bi-Xenon™ Headlights with Porsche Dynamic Light System (PDLS)", right: "-" },
          { left: "Sound Package Plus", right: "Sound Package Plus" }].map((item, index) => (
            <div key={index} className='flex flex-col md:flex-row items-center justify-between border-b border-gray-200 py-4'>
              <div className="w-full md:w-1/2 text-center font-semibold">{item.left}</div>
              <div className="w-full md:w-1/2 text-center font-semibold">{item.right}</div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-center flex-col items-center mt-[130px] px-2'>
        <h2 className='text-center text-[26px] md:text-[32px] mb-5 font-semibold'>Sound</h2>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 w-full max-w-7xl mx-auto">
          {cars.map((car, i) => (
            <div key={i} className="w-full lg:w-1/2 relative p-3">
              <div className='bg-gray-100 rounded p-6'>
                <h2 className="text-xl mb-10 font-semibold text-center">{car?.modelName}</h2>
                <img src={car?.imgDetail1} alt={car?.modelName} className="mx-auto mb-6 max-h-[120px] object-contain" />
                <audio controls  controlsList="nodownload" className="w-full">
                  <source src="https://ia902807.us.archive.org/12/items/car-engines/18%20Porsche%20911%20GT3.mp3" type="audio/mpeg" />
                </audio>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-center flex-col items-center mt-[130px] mb-[60px] px-2'>
        <h2 className='text-center text-[26px] md:text-[32px] mb-2 font-semibold'>Decision made?</h2>
        <button onClick={handleBack} className='hover:bg-gray-100 px-2 py-1 flex items-center gap-1 font-semibold mb-6'>Back to top</button>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 w-full max-w-7xl mx-auto">
          {cars.map((car, index) => (
            car && (
              <div key={index} className="w-full lg:w-1/2 relative p-3">
                <img src={car?.imgDetail1} alt={car?.modelName} className="mx-auto mb-6 max-h-[120px] object-contain" />
                <h2 className="text-2xl mt-10 font-semibold text-center lg:text-left">{car?.modelName}</h2>
                <p className="text-gray-600 mb-2 text-sm text-center lg:text-left">From ${(car.price * 1000).toLocaleString()}</p>
                <p className="text-sm text-gray-500 mb-4 text-center lg:text-left">Gear type</p>
                <div className="flex flex-col items-start gap-3 mb-6 pl-0 lg:pl-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={car?.gearType === 'PDK'}
                      onChange={() => handleGearChange(index, 'PDK')}
                    />
                    <span className="text-[14px]">7-speed Porsche Doppelkupplung (PDK)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={car?.gearType === 'Manual'}
                      onChange={() => handleGearChange(index, 'Manual')}
                    />
                    <span className="text-[14px]">6-speed Manual Transmission with Sport Chrono Package</span>
                  </label>
                </div>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                  <button className="bg-black w-full md:w-[250px] text-white text-sm px-6 py-3 rounded hover:bg-gray-800 transition">
                    Build Your Porsche
                  </button>
                  <button className="border w-full md:w-[250px] text-sm px-6 py-3 rounded hover:bg-gray-100 transition">
                    Basket
                  </button>
                </div>
                <p className="text-sm text-gray-800 mt-4 text-center lg:text-left">
                  {car?.gearType === 'PDK' ? 'PDK (Automatic)' : 'Manual'} · {car?.drive}
                </p>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  )
}

export default CompareCars
