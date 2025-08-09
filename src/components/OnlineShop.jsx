import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const OnlineShop = ({ otherData }) => {
  return (
    <section className="w-full bg-white py-18 px-4">
      <h2 className="text-center text-2xl md:text-3xl font-semibold mb-16 text-black">
        Online Shop Highlights
      </h2>
      <Swiper
        slidesPerView={1.2}
        spaceBetween={24}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="w-full pb-10"
        onInit={() => {
          const style = document.createElement("style")
          style.innerHTML = `
            .swiper-button-next,
            .swiper-button-prev {
              color: #C00 !important;
              top: 40%;
            }

            .swiper-pagination-bullet {
              background-color: #ccc !important;
              opacity: 1 !important;
            }

            .swiper-pagination-bullet-active {
              background-color: #C00 !important;
            }
          `;
          document.head.appendChild(style)
        }}
      >
        {otherData?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center justify-start bg-white p-3 rounded-md  transition-all duration-300 h-[340px] text-center">
              <img src={item.img} alt={item.title}  className="w-[200px] h-[150px] object-contain mb-4"/>
              <h3 className="text-sm font-semibold text-black mb-2 h-[40px] overflow-hidden">
                {item.title}
              </h3>
              <p className="text-[10px] text-gray-600 h-[60px] overflow-hidden">
                {item.desc}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default OnlineShop
