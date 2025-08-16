import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = ({ car }) => {
  return (
    <section className="px-4 py-24 sm:py-28 md:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        {car.modelName}
      </h2>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          480: {
            slidesPerView: 1.1,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 1.3,
            spaceBetween: 24,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 28,
          },
          1024: {
            slidesPerView: 2.8,
            spaceBetween: 32,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 36,
          },
        }}
        className="!swiper-pagination-bullets !swiper-pagination-horizontal"
      >
        {car.highlightsPhoto.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-black text-white rounded-xl overflow-hidden shadow-lg h-75 md:h-[30rem]">
              <img
                src={item}
                alt={`highlight-${index}`}
                className="w-full h-full  object-cover"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>
        {`
          .swiper-pagination-bullet {
            background-color: #ef4444;
            opacity: 0.8;
            width: 12px;
            height: 12px;
            margin: 0 6px !important;
            transition: opacity 0.3s ease;
          }
          .swiper-pagination-bullet-active {
            opacity: 1;
          }
          .swiper-button-next::after,
          .swiper-button-prev::after {
            color: #ef4444;
            font-size: 22px;
            font-weight: bold;
            padding: 0 16px;
          }
          .swiper-button-next,
          .swiper-button-prev {
            width: 44px;
            height: 44px;
            top: 50%;
            transform: translateY(-50%);
          }
          @media (max-width: 768px) {
            .swiper-button-next,
            .swiper-button-prev {
              width: 36px;
              height: 36px;
            }
          }
        `}
      </style>
    </section>
  );
};

export default Slider;
