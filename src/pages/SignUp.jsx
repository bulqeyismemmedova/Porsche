import { useState } from "react"
import toast from "react-hot-toast"
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import {userSignUP} from "../service/AuthService";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: "",
        password: "",
    })

    const navigate = useNavigate()

    const [passWord2, setPassWord2] = useState(null)
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)

    function handleVal(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSignUp() {
        if (!user.firstName || !user.lastName || !user.email || !user.password) {
            toast.error("Please fill all input fields")
            return
        }
        if (user.password.length < 8) {
            toast.error("Password must be greater than 8")
            return
        }
        if (passWord2 != user.password) {
            toast.error("Password is not correct")
            return
        }

        const enhUser = {
            ...user,
            role: 'user',
            createdAt: new Date().toISOString(),
            isActive: true,
            lastLogin: null
        }
        userSignUP(enhUser)
            .then(item => {
                toast.success("Welcome User")
            })
        navigate("/register/signin")
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
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            />
                           
                            <input
                                onChange={handleVal}
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                            />
                           
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
                            <div className="relative">
                                <input
                                    onChange={(e) => setPassWord2(e.target.value)}
                                    name="passWord2"
                                    type={show2 ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                                />
                                <div
                                    onClick={() => setShow2(!show2)}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                                >
                                    {show2 ? <IoIosEye size={20} /> : <IoIosEyeOff size={20} />}
                                </div>
                            </div>

                            <button
                                onClick={handleSignUp}
                                className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-900 transition duration-200"
                            >
                                Sign Up
                            </button>
                            <p className="text-center text-sm mt-4 text-gray-600">
                                Already have a Porsche ID?{" "}
                                <span
                                    onClick={() => navigate("/register/signin")}
                                    className="text-black font-medium cursor-pointer underline"
                                >
                                    Sign in
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
