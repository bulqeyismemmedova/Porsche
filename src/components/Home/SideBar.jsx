import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";
import { CarsContext } from "../../context/DataContext";

const SideBar = ({ sideBar, setSideBar }) => {
  const menu = [
    "Models",
    "Shopping Tools",
    "Porsche Shop",
    "Services",
    "Experience",
  ];
  const { model } = useContext(CarsContext)

  const [selectedMenu, setSelectedMenu] = useState(menu[0]);

  const navigator = useNavigate()
  const content = {
    "Shopping Tools": [
      { title: "Build Your Own", path: "/built" },
      { title: "Compare Models", path: "/compare" },
      { title: "New & Used Inventory", path: "/new-used-inventory" },
      { title: "Current Vehicle Offers", path: "/current-offers" },
      { title: "Certified Pre-Owned & Warranty", path: "/pre-owned-warranty" },
      { title: "Porsche Financial Services", path: "/financial-services" },
      { title: "E-Mobility & E-Performance", path: "/e-mobility" },
    ],
    "Services": [
      { title: "Original Accessories", path: "/original-accessories" },
      { title: "Individualization", path: "/individualization" },
      { title: "Online Bill Payment", path: "/basket" },
      { title: "Delivery Programs", path: "/delivery-programs" },
      { title: "Porsche Protection Plan", path: "/protection-plan" },
      { title: "Service & Maintenance", path: "/service-maintenance" },
      { title: "Classic – Service & Parts", path: "/classic-service-parts" },
      { title: "Recall Information", path: "/recall-information" },
    ],
    
    "Experience": [
      { title: "Motorsport", path: "/motorsport" },
      { title: "Experience Center Atlanta", path: "/atlanta" },
      { title: "Experience Center Los Angeles", path: "/los-angeles" },
      { title: "Track Experience Birmingham", path: "/birmingham" },
      { title: "Travel Experience", path: "/travel" },
      { title: "E-Zentrum", path: "/e-zentrum" },
      { title: "Stories – People. Passion. Places.", path: "/stories" },
      { title: "Christophorus – The Porsche Magazine", path: "/christophorus" },
      { title: "Porsche Communities", path: "/communities" },
      { title: "Golf", path: "/golf" },
      { title: "Museum", path: "/museum" },
    ],
  }
  

  return (
    <>
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-40 ${sideBar ? "block opacity-100" : "hidden opacity-0"}`}
        onClick={() => setSideBar(false)} />
      <div className={`fixed top-0 left-0 h-screen w-[85%] sm:w-[70%] md:w-[60%] lg:w-[50%] bg-white z-50 flex flex-col md:flex-row transition-transform duration-500 shadow-2xl ${sideBar ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="w-full md:w-[35%] p-4 border-b md:border-b-0 md:border-r border-gray-200 text-sm text-black relative pt-10">
          <div>
          <button className="absolute top-3 right-3 text-gray-600 hover:text-red-600 md:hidden block"
            onClick={() => setSideBar(false)}>
            <RxCross2 size={22} />
          </button>
          <ul className="space-y-4 mt-2">
            {menu.map((item, i) => (
              <li key={i}
                onClick={() => setSelectedMenu(item)}
                className={`cursor-pointer hover:bg-neutral-100 py-1 px-2 rounded transition `}>
                {item}
              </li>
            ))}
          </ul>
          
          </div>
          
        </div>
        <div className="w-full p-4 overflow-y-auto relative text-black bg-gray-100">
          <button className="absolute top-3 right-3 text-gray-600 hover:text-red-600 md:block hidden"
            onClick={() => setSideBar(false)}>
            <RxCross2 size={22} />
          </button>
          <div className="pt-8">
            {selectedMenu === "Models" ? (
              <div className="flex flex-col items-center justify-center gap-3">
                {model.map((car, i) => (
                  <NavLink
                    key={i}
                    to={`/models/${car.model}`}
                    className="flex flex-col gap-2 p-5 mb-3 items-start cursor-pointer hover:bg-white duration-300 nax-w-[300px]"
                    onClick={() => setSideBar(false)}
                  >
                    <h3 className="font-semibold text-lg text-left">{car.model}</h3>
                    <div>
                      <img
                        src={car.img}
                        alt={car.model}
                        className="w-full max-w-sm h-22 object-contain"
                      />
                      <div>
                        {car.fuelType.map((type, i) => (
                          <span key={i} className="mr-1 px-2 py-0.5 bg-gray-200 rounded text-xs">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
            ) : Array.isArray(content[selectedMenu]) ? (
              <ul className="space-y-2 list-none">
                {content[selectedMenu].map(({ title, path }, i) => (
                  <li key={i}>
                    <NavLink
                      to={path}
                      className="block py-2 px-3 rounded hover:bg-neutral-200 transition text-sm font-semibold "
                      onClick={() => setSideBar(false)}>
                      {title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm"></p>
            )}
          </div>
          
        </div>
      </div>
    </>
  );
};

export default SideBar;
