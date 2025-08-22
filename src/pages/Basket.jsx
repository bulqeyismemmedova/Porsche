import React, { useContext, useEffect, useState } from "react"
import { CarsContext } from "../context/DataContext"
import Loader from "../components/Loader"
import Error from "../components/Error"
import { AddBasket } from "../components/Basket/AddBasket"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import Scroll from "../components/Scroll"

const Basket = () => {
  const [car, setCar] = useState(null)
  const { error, loader } = useContext(CarsContext)
  const [email, setEmail] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const storedCar = localStorage.getItem("car")
    setCar(JSON.parse(storedCar))

  }, [])

  if (loader) return <Loader />
  if (error) return <Error />

  function handlePayment() {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      toast.error("You must have a user account to make payment!")
      navigate("/register/signup")
      return
    }
    const parsedUser = JSON.parse(storedUser)

    if (parsedUser.email === email) {
      localStorage.removeItem("car")
      setCar(null)
      toast.success("Payment successful!")
    } else {
      toast.error("No matching account found. Please enter the correct Email.")
    }
  }

  return (
    <>
    <Scroll/>
      {car ? (
        <section className="bg-gray-100 ">
          <div className="container mx-auto py-[120px] md:pt-[150px] px-4 sm:px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-lg shadow">
                <div className="flex flex-wrap gap-4 sm:gap-6 border-b mb-6 text-sm sm:text-base">
                  <button className="border-b-2 border-black pb-2">Write message</button>
                  <button className="pb-2">Arrange a callback</button>
                  <button className="pb-2">Contact by phone</button>
                </div>
                <h2 className="text-lg sm:text-xl font-bold mb-4">
                  Your inquiry to Porsche Wilmington
                </h2>
                <textarea
                  defaultValue={`Dear Porsche Center, I am interested in this ${car.modelName}.`}
                  className="w-full border rounded-lg p-3 mb-6 text-sm sm:text-base"
                  rows="5"
                />
                <h3 className="text-base sm:text-lg font-semibold mb-4">Your contact details</h3>
                <div className="mb-4">
                  <label className="block text-sm mb-1">Salutation *</label>
                  <select className="w-full border rounded-lg p-2 text-sm sm:text-base">
                    <option>Please select</option>
                    <option>Mr</option>
                    <option>Ms</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">First name *</label>
                    <input type="text" className="w-full border rounded-lg p-2 text-sm sm:text-base" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Last name *</label>
                    <input type="text" className="w-full border rounded-lg p-2 text-sm sm:text-base" />
                  </div>
                </div>
                <div>
                  <div>
                    <label className="block text-sm mb-1 mt-4">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="w-full border rounded-lg p-2 text-sm sm:text-base" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="bg-white h-fit p-3 rounded-lg shadow overflow-hidden">
                  <img src={car.imgDetail1} alt={car.modelName} className="h-32 sm:h-40 w-full object-contain mb-2" />
                  <div className="p-4">
                    <h4 className="font-semibold text-sm sm:text-base">{car.modelName}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3">From ${car.price}00</p>
                    <div className="text-xs sm:text-sm text-gray-800 space-y-1 mb-4">
                      <p><b>{car.acceleration}</b> – Acceleration</p>
                      <p><b>{car.power}</b> – Power</p>
                      <p><b>{car.speed}</b> – Top Speed</p>
                    </div>
                  </div>
                  <div className="border-t p-4 text-xs sm:text-sm">
                    <p className="font-bold">Porsche Wilmington</p>
                    <p>4920 A New Centre Drive</p>
                    <p>Wilmington, NC, 28403</p>
                  </div>
                </div>
                <button
                  onClick={handlePayment}
                  className="bg-black text-white px-5 py-3 rounded text-sm whitespace-nowrap hover:bg-gray-900 transition">
                  Online Bill Payment
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <AddBasket />
      )}
    </>
  )
}

export default Basket
