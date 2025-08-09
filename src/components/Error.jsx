import React from 'react'
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-white text-black text-center px-4">
        <h1 className="text-[120px] font-bold opacity-10 select-none">404</h1>
        <p className="text-xl md:text-2xl mb-6">The page you are trying to access can not be found.</p>
        <button
          onClick={() => navigate('/')}
          className="border border-black px-6 py-2 rounded hover:bg-black hover:text-white transition"
        >
          To Homepage
        </button>
      </div>
    </>
  )
}

export default Error