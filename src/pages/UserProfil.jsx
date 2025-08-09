import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    setUser(localUser || {});
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg_img_user">
      <div className="w-full max-w-md border border-gray-200 rounded-2xl shadow-xl p-8 z-[100] bg-gray-300">
        <h2 className="text-2xl font-semibold text-center text-black tracking-wide mb-8">
          My Porsche ID
        </h2>

        <div className="space-y-4 text-[15px] text-gray-800 font-light">
          <div className="flex justify-between border-b pb-2 border-gray-200">
            <span className="text-gray-500">First Name</span>
            <span>{user.firstName || "—"}</span>
          </div>
          <div className="flex justify-between border-b pb-2 border-gray-200">
            <span className="text-gray-500">Last Name</span>
            <span>{user.lastName || "—"}</span>
          </div>
          <div className="flex justify-between pb-2">
            <span className="text-gray-500">Email</span>
            <span>{user.email || "—"}</span>
          </div>
        </div>

        <button
          onClick={handleLogOut}
          className="mt-8 w-full bg-black text-white py-2 rounded-xl font-medium hover:bg-gray-900 transition duration-200"
        >
          Log Out
        </button>
        <button
          onClick={()=>navigate("/")}
          className="mt-8 w-full bg-black text-white py-2 rounded-xl font-medium hover:bg-gray-900 transition duration-200"
        >
          Home
        </button>
      </div>
    </div>
  );
}
