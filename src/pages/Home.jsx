import React, { useContext } from 'react'
import { CarsContext } from '../context/DataContext'
import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { CiSearch } from "react-icons/ci";
import OnlineShop from '../components/Home/OnlineShop';

function Home() {
  const navigate = useNavigate()
  const { data, otherData, error, loader } = useContext(CarsContext)
  const models = [
    {
      model: "911",
      fuelType: ["Gasoline"],
      desc: "The iconic, rear-engine sports car with exceptional performance.",
      price: "132,300",
      img: "https://porsche.imgix.net/-/media/1A0123EB8FEF44728C80D8DC0F9743E2_9499BB4D0F194050BD4560ADB6432C39_Nevada---Mobile?iar=0&w=407&ar=9%3A16&q=85&auto=format%201x,https://porsche.imgix.net/-/media/1A0123EB8FEF44728C80D8DC0F9743E2_9499BB4D0F194050BD4560ADB6432C39_Nevada---Mobile?iar=0&w=407&ar=9%3A16&q=45&dpr=2&auto=format%202x"
    },
    {
      model: "718",
      fuelType: ["Gasoline"],
      desc: "The mid-engine sports car for two made for pure driving pleasure.",
      price: "75,400",
      img: "https://porsche.imgix.net/-/media/ED7B67BEEAD349D788345A5F86AFB8E7_D715C6400DDD4106B877CCA6AB2B7A5B_BX24I3HOX0040_mobile?iar=0&w=407&ar=9%3A16&q=85&auto=format%201x,https://porsche.imgix.net/-/media/ED7B67BEEAD349D788345A5F86AFB8E7_D715C6400DDD4106B877CCA6AB2B7A5B_BX24I3HOX0040_mobile?iar=0&w=407&ar=9%3A16&q=45&dpr=2&auto=format%202x"
    },
    {
      model: "Taycan",
      fuelType: ["Electric"],
      desc: "The pure expression of an electric sports car.",
      price: "103,900",
      img: "https://porsche.imgix.net/-/media/D9BCCD47AD06466B9983590E273D5DE8_4EC11FECCEB1402FA010F344C028CE77_NEW-Taycan---Mobile?iar=0&w=407&ar=9%3A16&q=85&auto=format%201x,https://porsche.imgix.net/-/media/D9BCCD47AD06466B9983590E273D5DE8_4EC11FECCEB1402FA010F344C028CE77_NEW-Taycan---Mobile?iar=0&w=407&ar=9%3A16&q=45&dpr=2&auto=format%202x"
    },
    {
      model: "Panamera",
      fuelType: ["Gasoline", "Hybrid"],
      desc: "The sports car sedan for an active lifestyle with highest comfort.",
      price: "110,100",
      img: "https://porsche.imgix.net/-/media/B768914D594948D5A6F6D413CA4F68BC_B4EB530014D7472DAEF0F91CA2120334_NEW-Panamera---Mobile?iar=0&w=407&ar=9%3A16&q=85&auto=format%201x,https://porsche.imgix.net/-/media/B768914D594948D5A6F6D413CA4F68BC_B4EB530014D7472DAEF0F91CA2120334_NEW-Panamera---Mobile?iar=0&w=407&ar=9%3A16&q=45&dpr=2&auto=format%202x"
    },
    {
      model: "Macan",
      fuelType: ["Gasoline", "Electric"],
      desc: "All-electric SUV with impressive E‑Performance.",
      price: "78,000",
      img: "https://porsche.imgix.net/-/media/77EB2C62CE774603BC3F3E7608D825B4_B15900D011F04A95994B0724CD421D8B_Berlin---Mobile?iar=0&w=407&ar=9%3A16&q=85&auto=format%201x,https://porsche.imgix.net/-/media/77EB2C62CE774603BC3F3E7608D825B4_B15900D011F04A95994B0724CD421D8B_Berlin---Mobile?iar=0&w=407&ar=9%3A16&q=45&dpr=2&auto=format%202x"
    },
    {
      model: "Cayenne",
      fuelType: ["Gasoline", "Hybrid"],
      desc: "The versatile SUV with sports car performance and up to five seats.",
      price: "88,800",
      img: "https://porsche.imgix.net/-/media/7F1AD532955347949B29A4D9C29A4C27_23377A1E50F640948CA45B9948AE2C76_Cayenne---Mobile?iar=0&w=407&ar=9%3A16&q=85&auto=format%201x,https://porsche.imgix.net/-/media/7F1AD532955347949B29A4D9C29A4C27_23377A1E50F640948CA45B9948AE2C76_Cayenne---Mobile?iar=0&w=407&ar=9%3A16&q=45&dpr=2&auto=format%202x"
    }
  ]

  if (loader) return <Loader />
  if (error) return <Error />

  return (
    <>
      <section className="w-full relative pb-20">
        {/* Hero Section */}
        <div className="bg_img">
          <div className="flex flex-col container gap-4 justify-center items-start xs:items-center min-h-[100vh] md:min-h-[130vh] text-[#fbfcff] px-4">
            <h1 className="text-3xl font-semibold md:text-6xl lg:text-7xl leading-tight text-left xs:text-center">
              Some feelings never <br className="hidden sm:block"/>fade
            </h1>
            <p className="mt-4 border border-white px-3 md:px-6 py-2 text-xs md:text-base text-left xs:text-center">
              Porsche. There is no substitute
            </p>
          </div>
        </div>

        {/* Featured */}
        <div className='flex flex-col sm:flex-row gap-5 justify-center items-center my-12 md:my-[100px] px-4'>
          {[
            {
              model: "911 Targa 4 GTS",
              img: "https://porsche.imgix.net/-/media/6D22EB7B1CA24913B97A2DBC047D9244_13443DC58AC446F68D1256759BB2CE69_01---992-Targa-4-GTS?h=2880&iar=0&w=300&ar=4%3A3&q=80&crop=faces%2Centropy%2Cedges&auto=format",
              path: "models/911/911%20Targa%204GTS"
            },
            {
              model: "Cayenne S Coupe",
              img: "https://images-porsche.imgix.net/-/media/CACDD3E65F6246DBA31AE6B27514ED94_FC7F385FE974415FB72EEF8EED0D0FE5_MA22T3BOX0002-KV-macan-side?w=2560&h=1834&q=85&crop=faces%2Centropy%2Cedges&auto=format",
              path: "models/Cayenne/Cayenne%20S%20Coupe"
            },
            {
              model: "Macan 4",
              img: "https://porsche.imgix.net/-/media/A2D7EEE983F8431C897DF50E18A5A923_CFBEA18340A4413D996BE454619CD698_02---Macan-4?h=2880&iar=0&w=600&ar=4%3A3&q=80&crop=faces%2Centropy%2Cedges&auto=format",
              path: "models/Macan/Macan%204%20Electric"
            }
          ].map((car, index) => (
            <div 
              key={index}
              onClick={() => navigate(car.path)}
              className='h-[200px] w-full sm:w-[300px]  relative cursor-pointer overflow-hidden rounded-xl transform transition duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-xl'
            >
              <img 
                className='w-full h-full object-cover rounded-xl z-0'
                src={car.img}
                alt={car.model} 
              />
              <div className='absolute inset-0 bg-black/30 rounded-xl z-10'></div>
              <div className='flex items-center justify-between absolute bottom-0 left-3 right-3 text-white z-20 px-2 py-1 rounded-b-xl'>
                <p className='text-sm md:text-base'>{car.model}</p>
                <IoIosArrowRoundForward size={25} />
              </div>
            </div>
          ))}
        </div>

        {/* Models Section */}
        <div className="w-full px-4 py-12 bg-white">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 md:mb-10">Models</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {models.map((car, index) => (
              <div 
                key={index} 
                className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <img 
                  src={car.img} 
                  alt={car.model} 
                  className="w-full h-[500px] sm:h-[450px] md:h-[500px] object-cover" 
                />
                <div className="absolute top-3 left-5 text-white z-10">
                  <p className="text-2xl md:text-3xl font-bold text-black mb-2">{car.model}</p>
                  <span className="text-xs bg-black/40 px-2 py-1 rounded my-8 w-fit">
                    {car.fuelType.join(" , ")}
                  </span>
                </div>
                <div className="absolute bottom-0 p-4 text-white bg-gradient-to-t from-black/70 via-black/30 to-transparent w-full">
                  <p className="text-[16px] md:text-[18px]">{car.desc}</p>
                  {car.price && (
                    <p className="text-xs my-2 font-semibold">From $ {car.price}</p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-2 mt-3">
                    <button 
                      onClick={() => navigate(`built/${car.model}`)} 
                      className="bg-white text-black border border-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded transition hover:bg-gray-100"
                    >
                      Build your {car.model}
                    </button>
                    <button 
                      onClick={() => navigate(`models/${car.model}`)} 
                      className="bg-black text-white border border-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded transition hover:bg-white hover:text-black"
                    >
                      All {car.model} models
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className='text-center text-[11px] py-6 px-4'>
            *Manufacturer's Suggested Retail Price. Excludes options; taxes; title; registration; delivery, processing and handling fee; dealer charges; potential tariffs. Dealer sets actual selling price.
          </p>
        </div>

        {/* Porsche Center Section */}
        <div className="flex justify-center items-center px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-xl overflow-hidden shadow-md">
            <div className="bg-[#0F0F10] text-white flex flex-col justify-center p-6 md:p-8 md:w-1/2">
              <h2 className="text-[18px] md:text-[20px] font-semibold mb-3">Find Your Porsche Center</h2>
              <p className="text-[10px] md:text-[12px] mb-5 leading-relaxed">
                A Porsche Center, and your dream Porsche vehicle, may be closer than you<br className="hidden sm:block"/>
                think. Search our Porsche Center network for the location closest to you.
              </p>
              <button className="bg-white text-black border border-white px-4 py-2 text-xs font-semibold rounded transition hover:bg-gray-100 w-fit">
                Search now
              </button>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://porsche.imgix.net/-/media/F3D689BF517843DF9F9E79F5AFD86008_0D6016CEDC714793879B0E14411AB9C1_16-9_dealer_search_new?iar=0&w=865&ar=16%3A9&q=85&auto=format"
                alt="Porsche Center"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className='flex justify-center items-center mt-12 md:mt-[100px]'>
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-4 md:px-6 py-6 bg-white">
            <div className="w-full md:w-1/2 mt-6 md:mt-0 px-3 md:px-4">
              <h2 className="text-xl md:text-2xl font-semibold leading-snug mb-2">
                Find your new or pre-owned<br/>Porsche.
              </h2>
              <p className="text-xs md:text-sm text-gray-800 mb-4 leading-snug">
                Making it easy to find your dream Porsche.<br className="hidden sm:block"/> Enter your location and browse the best car offers available near you.
              </p>

              <label htmlFor="location" className="block text-[10px] md:text-xs text-gray-800 mb-3">
                Enter a location for your search
              </label>
              <div className="relative max-w-xs md:max-w-sm">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xs"><CiSearch size={15} /></span>
                <input
                  id="location"
                  type="text"
                  placeholder="Enter City or ZIP Code"
                  className="w-full pl-8 pr-2 py-1.5 md:py-2 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
              <img
                src="https://porsche.imgix.net/-/media/DBB5B21ECE2947CB8771FD9948199CD3_D4A989FDCF784F618352F5B1DC7E15C6_Enhanced-Finder?h=2120&iar=0&w=900&ar=4%3A3&q=80&crop=faces%2Centropy%2Cedges&auto=format"
                alt="Porsche Cars"
                className="w-full max-w-md h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Online Shop Section */}
        <div className='flex items-center justify-center mt-12 md:mt-[100px] px-4'>
          <OnlineShop otherData={otherData} />
        </div>

        {/* Discover Section */}
        <div className='flex flex-col gap-5 justify-center items-center my-12 md:my-[100px] px-4'>
          <h2 className="text-3xl md:text-4xl font-semibold text-center">Discover</h2>
          <div className='flex flex-col md:flex-row gap-5 md:gap-7 justify-center items-center w-full max-w-6xl'>
            {[
              {
                title: "Travel & Experience",
                img: "https://porsche.imgix.net/-/media/CC3E01768A9348549F184A925089E1BE_4256E9AE9BB446E8839A47ED4BAF9196_16-9_PCNA-Experience_1920x1080?iar=0&w=407&ar=16%3A9&q=85&auto=format%201x,https://porsche.imgix.net/-/media/CC3E01768A9348549F184A925089E1BE_4256E9AE9BB446E8839A47ED4BAF9196_16-9_PCNA-Experience_1920x1080?iar=0&w=407&ar=16%3A9&q=45&dpr=2&auto=format%202x"
              },
              {
                title: "Porsche Approved",
                img: "https://porsche.imgix.net/-/media/D398CF647E9D4843B6DEA6DA91B7B9C9_00922164F22F4FC09A396D79A507001D_16-9_PCNA-Approved_1920x1080?iar=0&w=407&ar=16%3A9&q=85&auto=format%201x,https://porsche.imgix.net/-/media/D398CF647E9D4843B6DEA6DA91B7B9C9_00922164F22F4FC09A396D79A507001D_16-9_PCNA-Approved_1920x1080?iar=0&w=407&ar=16%3A9&q=45&dpr=2&auto=format%202x"
              },
              {
                title: "Motorsport Experience",
                img: "https://porsche.imgix.net/-/media/F5EBDC2AEC9B4C2AB10D859644717DCD_E06EC38C42794985861CA38E379EF295_IMSA_24h_of_Daytona_Porsche_963_01467_desktop?iar=0&w=407&ar=16%3A9&q=85&auto=format 1x,https://porsche.imgix.net/-/media/F5EBDC2AEC9B4C2AB10D859644717DCD_E06EC38C42794985861CA38E379EF295_IMSA_24h_of_Daytona_Porsche_963_01467_desktop?iar=0&w=407&ar=16%3A9&q=45&dpr=2&auto=format2x"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className='h-[200px] sm:h-[230px] w-full md:w-[300px] lg:w-[350px] relative cursor-pointer overflow-hidden rounded-xl transform transition duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-xl'
              >
                <img 
                  className='w-full h-full object-cover rounded-xl z-0'
                  src={item.img}
                  alt={item.title}
                />
                <div className='absolute inset-0 bg-black/30 rounded-xl z-10'></div>
                <div className='flex items-center justify-between absolute bottom-0 left-3 right-3 text-white z-20 px-2 py-1 rounded-b-xl'>
                  <p className='text-sm md:text-base'>{item.title}</p>
                  <IoIosArrowRoundForward size={25} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home