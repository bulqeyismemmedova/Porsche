import React, { useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { FaPlus, FaMinus } from "react-icons/fa6"

const SpecSection = ({ title, data }) => {
  const [open, setOpen] = useState(false)
   return (
    <div className="border-b border-gray-300">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full py-4 text-sm font-medium"
      >
        {title}
        <div className="text-gray-400">{open ? <FaMinus size={12} /> : <FaPlus size={12} />}</div>
      </button>
      {open && (
        <div className="space-y-2 pb-4 text-[13px] text-black">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.title}</span>
              <span className="font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const TechnicalSpecs = ({ car, specs, setSpecs }) => {

  const findVal = (label) =>
    car?.body?.find((d) => d.title.toLowerCase().includes(label.toLowerCase()))?.value || "-"
  return (
    <>
      
      <div
        className={`fixed inset-0  bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          specs ? "block opacity-100" : "hidden opacity-0"
        }`}
        onClick={() => setSpecs(false)}
      />
      <div
  className={`fixed top-0 right-0 h-screen w-[100%] md:w-[60%] lg:w-[50%] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-500 transform ${
    specs ? "translate-x-0" : "translate-x-full"
  }`}
>

       
        <div className="flex items-center justify-between px-6 py-4">
          <p className="text-[16px] text-gray-500">{car?.modelName || "Model Name"}</p>
          <button
            className="text-gray-600 hover:text-red-600"
            onClick={() => setSpecs(false)}
          >
            <RxCross2 size={22} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-4 text-black">
          <h3 className="font-semibold text-[20px] mb-6">Technical Specs</h3>

        
          <div className="bg-[#f5f5f5] rounded-md p-4 flex flex-col sm:flex-row items-center gap-4 mb-8">
            <img
              src="https://images-porsche.imgix.net/-/media/D60E94917D0E44F49C83A7921ED3E97B_76691C7647844586AAA7489B0B99C919_taycan-cross-turismo-technical-top-view?w=1450&h=700&q=85&crop=faces%2Centropy%2Cedges&auto=format"
              alt="Top View"
              className="w-[60%] sm:w-[45%] object-contain"
            />
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm w-full sm:w-[55%]">
              <div>
                <p className="text-gray-500">Height</p>
                <p className="font-bold">{findVal("height")}</p>
              </div>
              <div>
                <p className="text-gray-500">Length</p>
                <p className="font-bold">{findVal("length")}</p>
              </div>
              <div>
                <p className="text-gray-500">Wheelbase</p>
                <p className="font-bold">{findVal("wheelbase")}</p>
              </div>
              <div>
                <p className="text-gray-500">Width w/ mirrors folded</p>
                <p className="font-bold">{findVal("mirrors folded")}</p>
              </div>
            </div>
          </div>
          {car.motorTitle &&<SpecSection title="Motor" data={car?.motorTitle} />}
          {car.performance &&<SpecSection title="Performance" data={car?.performance} />}
          {car.body &&<SpecSection title="Body" data={car?.body} />}
          {car.capacityes &&<SpecSection title="Capacities" data={car?.capacityes} />}
          {car.service &&<SpecSection title="Service and Warranty" data={car?.service} />}
          {car.terrain && <SpecSection title="Terrarin" data={car?.terrarin} />}
          <div className="mt-8">
            <button className="bg-black text-white text-xs px-4 py-2 rounded-sm hover:bg-gray-900 transition">
              Build Your Porsche
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TechnicalSpecs
