import React, { useContext, useState } from 'react';
import { CarsContext } from '../context/DataContext';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import NotCar from '../components/NotCar';
import Error from '../components/Error';
import Slider from '../components/Detail/Slider';
import { PiCubeFocusThin } from "react-icons/pi";
import Performance from '../components/Detail/Performance';
import SoundCar from '../components/Detail/SoundCar';
import DetailModel from '../components/Detail/DetailModel';
import TechnicalSpecs from '../components/Detail/TechnicalSpecs';


const Detail = () => {
  const { data, loader, error } = useContext(CarsContext);
  const { carName } = useParams();
  const navigate = useNavigate();
  const[specs, setSpecs]= useState(false)

  const car = data.find((item) => item.modelName === carName)



  if (loader) return <Loader />;
  if (error) return <Error />;
  if (!car) return <NotCar />;

  const getModelSignature = (model) => {
    const signatures = {
      '718': 'https://cdn.ui.porsche.com/porsche-design-system/model-signatures/718.493a9e3.svg',
      '911': 'https://cdn.ui.porsche.com/porsche-design-system/model-signatures/911.b68f913.svg',
      Taycan: 'https://cdn.ui.porsche.com/porsche-design-system/model-signatures/taycan.df444c6.svg',
      Panamera: 'https://cdn.ui.porsche.com/porsche-design-system/model-signatures/panamera.6dae809.svg',
      Macan: 'https://cdn.ui.porsche.com/porsche-design-system/model-signatures/macan.a1844f4.svg',
      Cayenne: 'https://cdn.ui.porsche.com/porsche-design-system/model-signatures/cayenne.2556201.svg',
    };
    return signatures[model] || null;
  };

  const modelSignature = getModelSignature(car.model);

  function handleBasket(){
    navigate('/basket')
    localStorage.setItem("car", JSON.stringify(car))
  }

  return (
    <section className="min-h-screen font-sans bg-white overflow-hidden pb-10">

      <div className="border-b border-gray-300 w-full pt-[90px]" />

      {/* Header Section*/}
      <div className="bg-gray-50 relative">
        <div className="max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8 relative">
          {modelSignature && (
            <div className="absolute inset-0 flex items-center justify-center -top-28 md:-top-[210px] z-0">
              <img
                src={modelSignature}
                alt={`${car.model} logo`}
                className="max-w-[200px] md:max-w-[350px] opacity-15 select-none pointer-events-none"
                draggable={false}
              />
            </div>
          )}
          <div className="relative z-10 flex justify-center mt-12 md:mt-32 max-w-[900px] mx-auto px-4 sm:px-0">
            <img
              src={car.imgDetail1}
              alt={car.modelName}
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </div>
          <p className="text-center mt-10 pb-5 font-semibold text-sm text-black px-4 sm:px-0">
            {car.bodyDesign}
          </p>
        </div>
      </div>

      {/* Model Info */}
      <div className="bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mt-5 relative z-10">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-wide text-[#010205]">
            {car.modelName}
          </h2>
          <span className="inline-block bg-gray-100 text-xs px-2 py-1 rounded mt-4 mb-2">
            {car.fuelType}
          </span>
          <p className="text-xs font-semibold text-black mb-3">From ${car.price}00</p>

          <div className="flex flex-wrap justify-center gap-3 mt-10">
            <button onClick={()=>handleBasket()} className="bg-black text-white px-5 py-3 rounded text-sm whitespace-nowrap hover:bg-gray-900 transition">
              Add to basket
            </button>
            <button
              onClick={() => navigate('/built')}
              className="bg-white border border-black text-black px-5 py-3 rounded text-sm whitespace-nowrap hover:bg-gray-100 transition"
            >
              Build Your Porsche
            </button>
            <button className="bg-white border border-black text-black px-5 py-3 rounded text-sm whitespace-nowrap hover:bg-gray-100 transition">
              New and Used Inventory
            </button>
          </div>

          <p className="text-xs text-gray-800 mt-10 max-w-xl mx-auto">
            *Manufacturer’s Suggested Retail Price. Excludes options; taxes; title; registration; delivery, processing and handling fee; dealer charges; potential tariffs. Dealer sets actual selling price.
          </p>
        </div>
      </div>

      {/* Performance Specs */}
      <div className="bg-white py-20 mt-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-16">
          <div className="flex flex-col gap-16 md:px-10 w-full md:w-auto text-center md:text-left">
            <div>
              <h2 className="text-6xl  text-black">
                {car.acceleration}
                <span className="text-base ml-1">s</span>
              </h2>
              <p className="text-sm text-gray-500 mt-2">0 - 60 mph</p>
            </div>
            <div>
              <h2 className="text-6xl  text-black">
                {car.speed}
                <span className="text-base ml-1">mph</span>
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Top track speed (with summer tires)
              </p>
            </div>
            <button onClick={()=>setSpecs(!specs)} className="w-fit border border-black text-black px-5 py-2 rounded hover:bg-black hover:text-white transition text-sm mt-6 mx-auto md:mx-0">
              Technical Specs
            </button>
            {
              specs && <TechnicalSpecs car={car} specs={specs} setSpecs={setSpecs}/>
            }
          </div>

          <div className="w-full md:w-auto flex justify-center">
            <img
              src={car.imgDetail2}
              alt={`${car.modelName} front view`}
              className="w-full max-w-[500px] object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="px-4 sm:px-6 max-w-7xl mx-auto py-10 flex flex-col items-center font-sans">
        <h1 className="text-5xl italic font-semibold mb-8">{car.model}</h1>
        <div className="w-full max-w-4xl relative px-4 sm:px-0">
          <img
            src={car.imgDetail3[0]}
            alt="Car side view"
            className="rounded-xl w-full object-cover mb-10 max-h-[500px]"
            loading="lazy"
          />

          <div className="md:flex md:items-start gap-6 mb-12 relative">
            <div className="md:w-1/2 z-10 bg-white p-2 md:p-0">
              <h2 className="text-4xl font-semibold mb-2">
                Built for a life centered around sport.
              </h2>
              <p className="text-base text-gray-600 whitespace-pre-line">
                {car.descCar}
              </p>
            </div>
            <div className="md:w-1/2 absolute top-[-200px] right-[-90px] z-0 w-full hidden md:block">
              <img
                src={car.imgDetail3[1]}
                alt="Car detail"
                className="rounded-xl w-full object-cover shadow-lg"
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-[120px] max-w-[600px] mx-auto md:ml-26">
            <img
              src={car.imgDetail3[2]}
              alt="Car rear view"
              className="rounded-xl w-full object-cover max-h-[400px] mt-10"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Slider Section */}
      <div className="px-4 sm:px-6 max-w-7xl mx-auto">
        <Slider car={car} />
      </div>

      {/* Inter */}
      <div className="flex flex-col justify-center items-center gap-6 py-12">
        <h2 className="text-center text-2xl md:text-3xl font-semibold leading-snug">
          With every glance: Fully captivated.
          <br />
          The {car.modelName}
        </h2>
        <div className="relative w-full max-w-5xl rounded-xl overflow-hidden shadow-lg">
          <img src={car.interImg} alt="Interior" className="w-full object-cover" />
          <div className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-4">
            <button className="px-4 py-1 bg-black text-white border border-white rounded hover:bg-white hover:text-black transition text-sm">
              Interior
            </button>
            <button className="px-4 py-1 bg-black text-white border border-white rounded hover:bg-white hover:text-black transition text-sm">
              Exterior
            </button>
          </div>
          <div className="absolute inset-0 sm:flex hidden items-center justify-center ">
            <button className="w-32 h-32 rounded-full bg-gradient-to-br from-zinc-800 to-black opacity-90 hover:opacity-100 text-white flex flex-col items-center justify-center shadow-lg transition">
              <PiCubeFocusThin size={30} />
              <span className="text-sm mt-4">Start 360° view</span>
            </button>
          </div>
        </div>
      </div>
      {/* Performance */}
      <Performance car={car} />
      {/* Sound */}
      <SoundCar />
      {/* Statik page with sound button */}
      <div className='w-full max-w-5xl  mx-auto rounded-xl overflow-hidden shadow-lg mt-24'>
        <div className="static_bg relative sound_bg w-full h-[300px] md:h-[450px]  flex items-center justify-center">
          <div className='absolute top-50%  left-10 text-white'>
            <h2 className="text-xl md:text-4xl font-semibold mb-5">Porsche Connect.</h2>
            <p className="text-xs  mb-6">Porsche Connect is your smart co-pilot for everyday life,<br/> ensuring a unique sports car experience.</p>
            <button className="border border-white text-white md:px-4  px-2 py-2 rounded flex items-center gap-2 hover:bg-gray-100 hover:text-black text-sm">Discover more</button>
          </div>
        </div>
      </div>
      {/* Store */}
      <DetailModel data={data} car={car}/>
      {/* Static */}
      <div className="flex flex-col md:flex-row gap-5 justify-center items-center px-2">
  <div className="relative md:mt-14 w-full md:w-auto">
    <div className="h-[250px] sm:h-[300px] md:h-[500px]">
      <img
        className="w-full h-full object-cover rounded-xl"
        src="https://images-porsche.imgix.net/-/media/D24700B289464E6C90C9BC9CDD8DB027_D2BEB0E039E44BED9F864C7B77963741_TA24Q3EOD0002-taycan-porsche-connect?w=640&ar=3%3A4&q=85&auto=format"
        alt="img1"
      />
    </div>
    <div className="absolute bottom-4 left-4 text-white max-w-[95%]">
      <h2 className="text-[12px] md:text-[14px] font-semibold mb-1">
        Porsche Connect.
      </h2>
      <p className="text-[9px] md:text-[8px] mb-2 leading-tight">
        Porsche Connect enhances the driving experience with a wide range of music and <br className="hidden md:block"/> video streaming options, the integrated Voice Pilot and remote services via the <br className="hidden md:block"/> My Porsche App.
      </p>
      <button className="border border-white text-white px-3 py-1 rounded hover:bg-gray-100 hover:text-black text-[9px] md:text-[10px] transition">
        Discover Porsche Connect
      </button>
    </div>
  </div>

 
  <div className="relative w-full md:w-auto">
    <div className="h-[250px] sm:h-[300px] md:h-[500px]">
      <img
        className="w-full h-full object-cover rounded-xl"
        src="https://images-porsche.imgix.net/-/media/9F4786B01EED4926ADA38F2FAA55893A_6DD01A25B90E4D51A0323BEC8915DF22_taycan-side-view-green?w=640&ar=3%3A4&q=85&auto=format"
        alt="img2"
      />
    </div>
    <div className="absolute bottom-4 left-4 text-white max-w-[95%]">
      <h2 className="text-[12px] md:text-[14px] font-semibold mb-1">
        Paint to Sample
      </h2>
      <p className="text-[9px] md:text-[8px] mb-2 leading-tight">
        Discover Porsche Exclusive Manufaktur's very special exterior colors for your Taycan.
      </p>
      <button className="border border-white text-white px-3 py-1 rounded hover:bg-gray-100 hover:text-black text-[9px] md:text-[10px] transition">
        Discover color choices
      </button>
    </div>
  </div>
</div>

<div className="flex flex-col md:flex-row gap-5 justify-center items-center px-2 mt-6">

  <div className="relative md:mt-14 w-full md:w-auto">
    <div className="h-[250px] sm:h-[300px] md:h-[500px]">
      <img
        className="w-full h-full object-cover rounded-xl"
        src="https://images-porsche.imgix.net/-/media/8A7C847DBCFF42FA96BC3F4AE9C30396_EE91C3B43D724A529F7DC57E9CE71816_EX18MODID0022-porsche-sign-on-leather?w=640&ar=3%3A4&q=85&auto=format"
        alt="img3"
      />
    </div>
    <div className="absolute bottom-4 left-4 text-white max-w-[95%]">
      <h2 className="text-[12px] md:text-[14px] font-semibold mb-1">
        Personalization & Finishing
      </h2>
      <p className="text-[9px] md:text-[8px] mb-2 leading-tight">
        Discover Porsche Exclusive Manufaktur's customization options for the interior <br className="hidden md:block"/> and exterior of your vehicle.
      </p>
      <button className="border border-white text-white px-3 py-1 rounded hover:bg-gray-100 hover:text-black text-[9px] md:text-[10px] transition">
        To Porsche Exclusive Manufaktur
      </button>
    </div>
  </div>

 
  <div className="relative w-full md:w-auto">
    <div className="h-[250px] sm:h-[300px] md:h-[500px]">
      <img
        className="w-full h-full object-cover rounded-xl"
        src="https://images-porsche.imgix.net/-/media/B9D07CDAA7424FB39EF69B1EA19FE09F_C8422592EB0A4E8AB12CEB2B96A65883_SM22MODOX0006-woman-looking-at-phone?w=640&ar=3%3A4&q=85&auto=format"
        alt="img4"
      />
    </div>
    <div className="absolute bottom-4 left-4 text-white max-w-[95%]">
      <h2 className="text-[12px] md:text-[14px] font-semibold mb-1">Contact</h2>
      <p className="text-[9px] md:text-[8px] mb-2 leading-tight">
        Contact an Authorized Porsche Center near you.
      </p>
      <button className="border border-white text-white px-3 py-1 rounded hover:bg-gray-100 hover:text-black text-[9px] md:text-[10px] transition">
        Go to contact form
      </button>
    </div>
  </div>
</div>

      
    


    </section>
  );
};

export default Detail;
