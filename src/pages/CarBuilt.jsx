import React, { useContext, useState, useEffect } from "react"
import { CarsContext } from "../context/DataContext"
import { Swiper, SwiperSlide } from "swiper/react"
import { Thumbs, FreeMode } from "swiper/modules"
import "swiper/css"
import "swiper/css/thumbs"
import "swiper/css/free-mode"
import Scroll from "../components/Scroll"

const CarBuilt = () => {
  const { car } = useContext(CarsContext)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedWheel, setSelectedWheel] = useState(null)
  const [selectedWheelColor, setSelectedWheelColor] = useState(null)
  const [selectedWheelAccessory, setSelectedWheelAccessory] = useState(null)
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [selectedInterior, setSelectedInterior] = useState(null)
  const [defaultImage, setDefaultImage] = useState("")
  const [secontSwiper, setsecontSwiper] = useState(null)
  const [carImages, setCarImages] = useState([])

  const carData = car?.[0]

  const standardColors = carData?.["Exterior Colors"]?.filter((c) => c.type === "standard") || []
  const metallicColors = carData?.["Exterior Colors"]?.filter((c) => c.type === "metallic") || []
  const specialColors = carData?.["Exterior Colors"]?.filter((c) => c.type === "special") || []

  const wheelsTypes = carData?.Wheels?.[0]?.WheelsType || []
  const wheelColors = carData?.Wheels?.[1]?.["Wheel Colors"] || []
  const wheelAccessories = carData?.Wheels?.[2]?.["Wheel Accessories"] || []

  const seats = carData?.Seats || []
  const interiorColors = carData?.["Interior Colors"] || []

  useEffect(() => {
    if (carData?.["Exterior Colors"]?.[0]?.img?.[0]) {
      setDefaultImage(carData["Exterior Colors"][0].img[0])
      setSelectedColor(carData["Exterior Colors"][0])
      setCarImages(carData["Exterior Colors"][0].img)
    }

    if (wheelsTypes?.[1]) setSelectedWheel(wheelsTypes[1])
  }, [carData])

  const handleColorSelect = (color) => {
    setSelectedColor(color)
    setCarImages(color.img)
  }

  const handleWheelSelect = (wheel) => {
    setSelectedWheel(wheel)
      const updatedImages = [...selectedColor.img]
      updatedImages[1] = wheel.carImg
      setCarImages(updatedImages)
  }


  const handleInteriorSelect = (interior) => {
    setSelectedInterior(interior)
    setCarImages((prevImages) => {
      const newImages = [...prevImages]
      newImages[6] = interior.img
      return newImages
    })
  }

  const defaultPrice = carData?.defaultValue || 0
  const totalPrice =defaultPrice + (selectedColor?.price || 0) + (selectedInterior?.price || 0) + (selectedWheel?.price || 0) +  (selectedWheelColor?.price || 0) +  (selectedWheelAccessory?.price || 0) + (selectedSeat?.price || 0)

  return (
    <>
    <Scroll/>
    <div className="mt-[100px] mb-[60px]">
      <div className="border my-10 border-gray-100"></div>
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Swiper */}
          <div className="w-full lg:w-2/3">
            <Swiper modules={[Thumbs]} thumbs={{ swiper: secontSwiper }} className="rounded-2xl object-cover max-h-full max-w-full" spaceBetween={10}>
              {(carImages.length > 0 ? carImages : [defaultImage]).map((img, i) => (
                <SwiperSlide key={i}>
                  <img src={img} alt={selectedColor?.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 " />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper modules={[Thumbs, FreeMode]} onSwiper={setsecontSwiper} slidesPerView={8} spaceBetween={10} watchSlidesProgress freeMode={true} className="mt-4">
              {(carImages.length > 0 ? carImages : [defaultImage]).map((img, i) => (
                <SwiperSlide key={i} className="!h-15">
                  <img src={img} alt="Thumbnail" className="w-full h-full object-contain rounded-lg cursor-pointer border-2 border-gray-200 hover:border-black transition" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right */}
          <div className="w-full lg:w-1/3 space-y-6">
            <h1 className="text-3xl font-bold p-4">{carData?.name}</h1>
            <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Exterior Colors</h2>
              {[
                { title: "Standard Colors", data: standardColors },
                { title: "Metallic Colors", data: metallicColors },
                { title: "Special Colors", data: specialColors },
              ].map(
                (group) =>
                  group.data.length > 0 && (
                    <div key={group.title} className="mb-6">
                      <p className="font-medium mb-2">{group.title}</p>
                      <div className="grid grid-cols-4 gap-3">
                        {group.data.map((color) => (
                          <button key={color.id} onClick={() => handleColorSelect(color)} className={`flex relative flex-col items-center p-2 rounded-lg border-2 transition ${selectedColor?.id === color.id ? "border-black" : "border-gray-300"}`}>
                            <div className="w-full h-8 rounded-md mb-2 border border-gray-200" style={{ backgroundImage: `url(${color.colors})`, backgroundSize: "cover" }}></div>
                            <p className="text-sm font-medium pb-4">{color.name}</p>
                            <p className="text-xs absolute bottom-1 text-gray-500">{color.price > 0 ? `+$${color.price}` : "$0"}</p>
                          </button>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
            {interiorColors.length > 0 && (
              <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Interior Colors</h2>
                <div className="grid grid-cols-4 gap-3">
                  {interiorColors.map((interior, index) => (
                    <button key={index} onClick={() => handleInteriorSelect(interior)} className={`flex flex-col items-center p-2 rounded-lg border-2 transition relative ${selectedInterior?.name === interior.name ? "border-black" : "border-gray-300"}`}>
                      <div className="w-full h-8 rounded-md mb-2 border border-gray-200" style={{ backgroundColor: `${interior.color}`, backgroundSize: "cover" }}></div>
                      <p className="text-xs font-medium pb-4">{interior.name}</p>
                      <p className="text-xs text-gray-500 absolute bottom-1">{interior.price > 0 ? `+$${interior.price}` : "$0"}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Wheels</h2>
              <p className="text-gray-600 mb-4">{selectedWheel?.name || "Select wheels"}</p>
              <div className="flex flex-wrap gap-4">
                {wheelsTypes.map((wheel) => (
                  <div key={wheel.name} onClick={() => handleWheelSelect(wheel)} className={`cursor-pointer p-2 rounded-lg border-2 transition ${selectedWheel?.name === wheel.name ? "border-black" : "border-gray-200"} w-[150px] h-[120px]`}>
                    <div className="flex items-center justify-center"><img src={wheel.img} alt={wheel.name} className="w-14 h-14 object-contain" /></div>
                    <p className="text-xs mt-1">{wheel.name}</p>
                    <p className="text-xs font-medium">{wheel.price > 0 ? `+$${wheel.price}` : "Included"}</p>
                  </div>
                ))}
              </div>
            </div>
            {wheelColors.length > 0 && (
              <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Wheel Colors</h2>
                <div className="flex flex-wrap gap-4">
                  {wheelColors.map((color, index) => (
                    <div key={index} onClick={() => setSelectedWheelColor(color)} className={`cursor-pointer p-2 max-w-[250px] max-h-[250px] rounded-lg border-2 transition ${selectedWheelColor?.title === color.title ? "border-black" : "border-gray-200"}`}>
                      <img src={color.img} alt={color.title} className="max-w-[200px] max-h-[200px] object-contain" />
                      <p className="text-xs mt-1">{color.title}</p>
                      <p className="text-xs font-medium">{color.price > 0 ? `+$${color.price}` : "Included"}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {wheelAccessories.length > 0 && (
              <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Wheel Accessories</h2>
                <div className="flex flex-wrap gap-4">
                  {wheelAccessories.map((accessory, index) => (
                    <div key={index} onClick={() => setSelectedWheelAccessory(accessory)} className={`cursor-pointer p-2 max-w-[250px] max-h-[250px] rounded-lg border-2 transition ${selectedWheelAccessory?.title === accessory.title ? "border-black" : "border-gray-200"}`}>
                      <img src={accessory.img} alt={accessory.title} className="max-w-[200px] max-h-[200px] object-contain" />
                      <p className="text-xs mt-1">{accessory.title}</p>
                      <p className="text-xs font-medium">{accessory.price > 0 ? `+$${accessory.price}` : "Included"}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {seats.length > 0 && (
              <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                <h2 className="text-xl font-semibold mb-4">Seats</h2>
                <div className="flex flex-wrap gap-4">
                  {seats.map((seat, index) => (
                    <div key={index} onClick={() => setSelectedSeat(seat)} className={`cursor-pointer p-2 max-w-[150px] max-h-[200px] rounded-lg border-2 transition ${selectedSeat?.name === seat.name ? "border-black" : "border-gray-200"}`}>
                      <img src={seat.img} alt={seat.name} className="max-w-[100px] max-h-[100px] object-contain" />
                      <p className="text-xs mt-1">{seat.name}</p>
                      <p className="text-xs font-medium">{seat.price > 0 ? `+$${seat.price}` : "Included"}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <p className="text-xl font-bold">Total Price: ${totalPrice}</p>
              <div>
              <p className="text-lg font-medium">Car Price: $75.400 </p>
              <p className="text-gray-600">Deliver Price: $1.495 </p>
              </div>

              {selectedColor && (
                <div>
                  <p className="text-lg font-medium">{selectedColor.name}</p>
                  <p className="text-gray-600">{selectedColor.price > 0 ? `+$${selectedColor.price}` : "Included"}</p>
                </div>
              )}
              {selectedInterior && (
                <div>
                  <p className="text-lg font-medium">{selectedInterior.name}</p>
                  <p className="text-gray-600">{selectedInterior.price > 0 ? `+$${selectedInterior.price}` : "Included"}</p>
                </div>
              )}
              {selectedWheel && (
                <div>
                  <p className="text-lg font-medium">{selectedWheel.name}</p>
                  <p className="text-gray-600">{selectedWheel.price > 0 ? `+$${selectedWheel.price}` : "Included"}</p>
                </div>
              )}
              {selectedWheelColor && (
                <div>
                  <p className="text-lg font-medium">{selectedWheelColor.title}</p>
                  <p className="text-gray-600">{selectedWheelColor.price > 0 ? `+$${selectedWheelColor.price}` : "Included"}</p>
                </div>
              )}
              {selectedWheelAccessory && (
                <div>
                  <p className="text-lg font-medium">{selectedWheelAccessory.title}</p>
                  <p className="text-gray-600">{selectedWheelAccessory.price > 0 ? `+$${selectedWheelAccessory.price}` : "Included"}</p>
                </div>
              )}
              {selectedSeat && (
                <div>
                  <p className="text-lg font-medium">{selectedSeat.name}</p>
                  <p className="text-gray-600">{selectedSeat.price > 0 ? `+$${selectedSeat.price}` : "Included"}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CarBuilt
