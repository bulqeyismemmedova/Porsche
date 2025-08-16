import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Performance = ({ car }) => {
    const [activeTab, setActiveTab] = useState("engine");

    const tabData = {
        engine: car.engine || [],
        power: car.powerTras || [],
        chassis: car.chassis || [],
    };

    return (
        <section className="w-full relative text-white mt-[100px]">
            {car?.bgImg && (
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{
                        backgroundImage: `url("${car.bgImg}")`,
                        opacity: 0.3,
                    }}
                />
            )}
            <div className="relative z-10 bg-black bg-opacity-80 min-h-screen flex flex-col">
                <div className="w-full h-[480px] bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${car.bgImg})` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent flex flex-col justify-center px-8 md:px-20 pb-16 text-white">
                        <h2 className="text-2xl md:text-4xl font-bold mb-3">
                            Fast, powerful, quick-witted. Unequivocally a boxer.
                        </h2>
                        <p className="max-w-3xl text-sm md:text-base opacity-80 leading-relaxed">
                            What is it that makes the 718 models so special? Their performance,
                            their handling, their design, their spaciousness with two luggage
                            compartments. But most of all: A mid-engine layout that makes all this
                            possible in the first place.
                        </p>
                    </div>
                </div>
                <div className="bg-[#0f0f0f] text-white text-sm md:text-base px-8 md:px-20 pt-6 pb-3 flex-shrink-0">
                    <div className="flex gap-6 justify-center">
                        <button onClick={() => setActiveTab("engine")}
                            className={`${activeTab === "engine" ? "opacity-100 underline" : "opacity-60"
                                } transition hover:opacity-100`}>
                            Engine
                        </button>
                        <button onClick={() => setActiveTab("power")}
                            className={`${activeTab === "power" ? "opacity-100 underline" : "opacity-60"
                                } transition hover:opacity-100`}>
                            Power transmission
                        </button>
                        <button
                            onClick={() => setActiveTab("chassis")}
                            className={`${activeTab === "chassis" ? "opacity-100 underline" : "opacity-60"} transition hover:opacity-100`}>
                            Chassis
                        </button>
                    </div>
                </div>
                <div className="bg-white px-8 md:px-20 py-12 flex-grow">
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={24}
                        slidesPerView={1.1}
                        pagination={{ clickable: true }}
                        navigation
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 16,
                            },
                            640: {
                                slidesPerView: 1.2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 1.8,
                                spaceBetween: 24,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 32,
                            },
                        }}
                        className="pb-6"
                    >
                        {tabData[activeTab]?.map((item, idx) => (
                            <SwiperSlide key={idx} className="h-full flex">
                                <div className="bg-[#f4f4f4] rounded-xl shadow-md overflow-hidden flex flex-col w-full max-h-[400px] min-h-[400px]">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-full h-48 md:h-56 object-contain p-4"
                                        loading="lazy"
                                    />
                                    <div className="p-4 flex-grow flex flex-col text-black">
                                        <h3 className="text-base md:text-lg font-semibold mb-2">
                                            {item.title}.
                                        </h3>
                                        <p className="text-sm text-gray-700 leading-relaxed flex-grow">
                                            {item.desc.slice(0,200)}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default Performance;
