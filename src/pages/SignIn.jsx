import { useState } from "react"
import toast from "react-hot-toast"
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../service/AuthService";

export default function SignIn() { 
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  function handleVal(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleLogin() {
    if (!user.email || !user.password) {
      toast.error("Please fill all input fields")
      return;
    }

    userLogin(user)  
      .then((item) => {
        toast.success("Login successful");
        localStorage.setItem("user", JSON.stringify(item))
        navigate("/register/profil")
        setUser({
          email: "",
          password: "",
        });
      })
      .catch(() => toast.error("Incorrect email or password."))
  }


    return (
        <>
            <div className="flex min-h-screen">
                <div className="hidden lg:block lg:w-2/3 bg_img_login bg-cover bg-center" />
                <div className="w-full lg:w-1/3 flex flex-col justify-center items-center px-10 py-12 bg-white">
                    <div className="max-w-sm w-full">
                    <h2 className="text-2xl font-semibold text-black mb-6 text-center">PORSCHE</h2>
                        <h2 className="text-2xl font-semibold text-black mb-6">Welcome! Log in with your Porsche ID</h2>

                        
                        <div className="space-y-4">
                            
                            
                            <input
                                onChange={handleVal}
                                name="email"
                                type="email"
                                placeholder="Email"
                                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <div className="relative">
                                <input
                                    onChange={handleVal}
                                    name="password"
                                    type={show ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                <div
                                    onClick={() => setShow(!show)}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                                >
                                    {show ? <IoIosEye size={20} /> : <IoIosEyeOff size={20} />}
                                </div>
                            </div>
                            
                            <button
                                onClick={handleLogin}
                                className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-900 transition duration-200"
                            >
                                Sign In
                            </button>
                            <p className="text-center text-sm mt-4 text-gray-600">
                                Already have a Porsche ID?{" "}
                                <span
                                    onClick={() => navigate("/register/signup")}
                                    className="text-black font-medium cursor-pointer underline"
                                >
                                    Sign Up
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
