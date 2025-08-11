import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const PorscheModelSlider = ({ data, car }) => {
    const models = data.filter(item => item.model === car.model)
    const bodyTypes = [...new Set(models.map(item => item.bodyDesign))]
    const [activeBody, setActiveBody] = useState(bodyTypes[0])

    const filtered = models.filter(item => item.bodyDesign === activeBody)

    return (
        <div className="container px-4 py-16">

            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
                Which {car.model} is the right one for you?
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-10 text-lg sm:text-xs">
                {bodyTypes.map((body) => (
                    <button key={body} onClick={() => setActiveBody(body)} className={`pb-1 border-b-2 w-fit transition-all ${activeBody === body
                                ? "border-black font-semibold text-black"
                                : "border-transparent text-gray-500 hover:text-black"
                            }`}>
                        {body}
                    </button>
                ))}
            </div>
            <div className="relative pb-20">
                <div className="swiper-button-prev-custom absolute -left-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 bg-white shadow-md rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </div>
                <div className="swiper-button-next-custom absolute -right-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 bg-white shadow-md rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={32}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1.2 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                    navigation={{
                        nextEl: ".swiper-button-next-custom",
                        prevEl: ".swiper-button-prev-custom",
                    }}
                    pagination={{ 
                        
                        clickable: true}}
                    
                >
                    {filtered.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="bg-white border-gray-300 border rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col p-5 h-full">
                                <div className="text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1 w-fit mb-2">
                                    {item.fuelType}
                                </div>
                                <div className="my-5 h-36 flex justify-center items-center">
                                    <img
                                        src={item.imgDetail1}
                                        alt={item.modelName}
                                        className="max-h-full object-contain"
                                    />
                                </div>
                                <h3 className="text-base font-semibold mb-1">{item.modelName}</h3>
                                <p className="text-sm text-gray-600 mb-3">From ${item.price}00</p>
                                <div className="text-sm text-gray-700 space-y-1 mb-5">
                                    <div className="flex flex-col">
                                        <p className="text-black font-semibold text-[18px]">{item.acceleration} s</p>
                                        <p className="text-gray-400">0–60 mph:</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-black font-semibold text-[18px]">{item.power} hp</p>
                                        <p className="text-gray-400">Max power:</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-black font-semibold text-[18px]">{item.speed} mph</p>
                                        <p className="text-gray-400">Top speed:</p>
                                    </div>
                                   
                                </div>
                                <div className="mt-auto flex gap-2">
                                    <button className="bg-black text-white px-2 py-1 md:px-4 md:py-2 text-sm rounded hover:bg-gray-900 transition">
                                        Configure
                                    </button>
                                    <button className="border border-gray-300 px-2 py-1 md:px-4 md:py-2 text-sm rounded hover:bg-gray-100 transition">
                                        Technical Data
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default PorscheModelSlider;
