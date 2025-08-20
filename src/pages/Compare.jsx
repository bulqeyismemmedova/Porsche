import React, { useContext, useState } from 'react';
import ChooseCar from '../components/Compare/ChooseCar';
import { CarsContext } from '../context/DataContext';
import Loader from '../components/Loader';
import Error from '../components/Error';
import CompareCars from '../components/Compare/CompareCars';
import Scroll from '../components/Scroll';

const Compare = () => {
  const { data, error, loader } = useContext(CarsContext);
  const [sidebar, setSideBar] = useState(false);
  const [firstCar, setFirstCar] = useState(null)
  const [secondCar, setSecondCar] = useState(null)

  if (loader) return <Loader />;
  if (error) return <Error />;

  return (
    <>
    <Scroll/>
      <section className="">
        <div className='pt-[150px] pb-[50px] bg-gray-100 relative  px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40'>
        <div className="flex flex-col items-center max-w-3xl mx-auto text-center mb-14 px-4">
          <h3 className="text-3xl sm:text-4xl font-bold mb-2">Model Comparison</h3>
          <p className="text-sm sm:text-base text-gray-700">
            Do you need help deciding? Now you can compare your favourites with each other.
          </p>
        </div>
        <div className={`flex justify-center gap-6 mb-8 flex-wrap md:flex-nowrap ${(firstCar && secondCar) ? "hidden": "flex" }`}>
            <button onClick={() => setSideBar(true)} className="bg-black text-white text-xs sm:text-sm px-5 py-3 rounded border border-black hover:opacity-70 transition duration-300 w-full max-w-[180px]" >
              + Select Model
            </button>
            <button onClick={() => setSideBar(true)} className="bg-gray-200 text-black text-xs sm:text-sm px-5 py-3 rounded border border-gray-200 hover:bg-gray-300 transition duration-300 w-full max-w-[180px]">
              + Select Model
            </button>
          </div>

        {sidebar && (
          <ChooseCar sidebar={sidebar} setSideBar={setSideBar} data={data} firstCar={firstCar} setFirstCar={setFirstCar} secondCar={secondCar} setSecondCar={setSecondCar} />
        )}
        
        </div>
        <div className='px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40'>
          {
            firstCar && secondCar && <CompareCars firstCar={firstCar} secondCar={secondCar} setFirstCar={setFirstCar} setSecondCar={setSecondCar} sidebar={sidebar} setSideBar={setSideBar}  />
          }
        </div>
      </section>
    </>
  );
};

export default Compare;
