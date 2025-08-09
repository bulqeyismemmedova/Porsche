import React, { useEffect, useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../components/SideBar';

const Header = () => {
  const [user, setUser] = useState(null)
  const [sideBar, setSideBar] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [isOpen, setIsOpen] = useState(false)

  const textColor = isHome ? 'text-white' : 'text-black';
  const navigate = useNavigate()

  useEffect(() => {
    const LocalUser = JSON.parse(localStorage.getItem("user") || null)
    setUser(LocalUser)
  },[])

  function handleLogOut() {
    localStorage.removeItem("user")
    setUser(null)
    setIsOpen(false)
  }

  return (
    <>
  <header className="absolute top-0  w-full z-50 bg-transparent">
    <div className={`flex items-center container mx-auto justify-between  py-8 transition-colors duration-300 ${isHome ? 'text-white' : 'text-black'}`}>
      <div className="flex items-center gap-4">
        <div onClick={() => setSideBar(true)} className="flex items-center gap-2 text-sm cursor-pointer ml-5 xl:0">
          <RxHamburgerMenu size={20} />
          <span className="hidden sm:inline">Menu</span>
        </div>
        <SideBar sideBar={sideBar} setSideBar={setSideBar} />
      </div>
      <div>
        <NavLink to="/" >
          <img
            src="https://cdn.ui.porsche.com/porsche-design-system/crest/porsche-crest.2245c45@2x.webp"
            alt="Porsche Logo"
            className="h-6 block md:hidden"
          />
        </NavLink>
        <NavLink to="/" className={`text-4xl font-bold hidden md:block homeLink`}>
          PORSCHE
        </NavLink>
      </div>
      <div className="relative font-light mr-5 xl:mr-0">
        <CiUser
          onClick={() => setIsOpen(!isOpen)}
          size={24}
          className="cursor-pointer hover:text-neutral-700 transition"
        />
        {isOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-56 rounded-2xl bg-white border border-gray-200 shadow-xl z-50 overflow-hidden text-[15px] font-light tracking-wide">
            {user?.email && (
              <div className="px-4 py-3 text-neutral-700 text-xs uppercase bg-gray-50 border-b border-gray-200 font-medium">
                {user.email}
              </div>
            )}
            {user ? (
              <>
                <button
                  onClick={() => navigate("register/profil")}
                  className="w-full px-4 py-3 text-left hover:bg-neutral-100 transition duration-200 text-gray-700"
                >
                  My Profile
                </button>
                <button
                  onClick={handleLogOut}
                  className="w-full px-4 py-3 text-left hover:bg-neutral-100 transition duration-200 text-red-500"
                >
                  <span className="tracking-wide">Log Out</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/register/signin")}
                  className="w-full px-4 py-3 text-left hover:bg-neutral-100 transition duration-200 text-gray-700"
                >
                  <span className="tracking-wide">Sign In</span>
                </button>
                <button
                  onClick={() => navigate("/register/signup")}
                  className="w-full px-4 py-3 text-left hover:bg-neutral-100 transition duration-200 text-gray-700"
                >
                  <span className="tracking-wide">Sign Up</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  </header>
</>

  )
}

export default Header;
