import React from 'react'
import { useNavigate } from 'react-router-dom';

export const AddBasket = () => {
    const navigate = useNavigate()
    return (
        <section className='bg-gray-100 pt-[60px] md:pt-0'>
            <div className="flex flex-col items-center justify-center h-screen text-center px-4">
          <h2 className="text-2xl font-bold mb-2">No car in your basket</h2>
          <p className="text-gray-600 mb-6 max-w-md">
            You have not added any Porsche to your basket yet. Please add a car to continue your inquiry.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            Add a car
          </button>
        </div>
        </section>
      );
}
