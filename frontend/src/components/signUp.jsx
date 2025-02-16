import React, { useState } from "react";
import { auth, database } from "./firebase";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { ref, set } from "firebase/database";


const SignUp = ({ setShowSignIn }) => {

    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        email: "",
        password: "",
        confirmPassword: "",
        type: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleToggle = () => {
        setShowSignIn(true);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            await new Promise((resolve) => {
                const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    unsubscribe();
                    resolve(user);
                }
                });
            });

            const currentUser = auth.currentUser;
            if (currentUser) {
                await set(ref(database, "users/" + currentUser.uid), {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.contact,
                    type: formData.type
                });
                alert("User created successfully");
                setShowSignIn(true);
            } else {
                throw new Error("User not found after authentication");
            }
            } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <h1 className="bg-gray-100 text-3xl mb-4">Mandi-Hub</h1>
            <form className="w-100 bg-white p-8 rounded-lg shadow-md" onSubmit={handleRegister}>
            <div className="flex justify-center">
            <div className="text-2xl text-black mb-3">Register</div>
            </div>
                {/* Name Field */}
                <div className="flex flex-col mb-4">
                <label className="font-semibold text-gray-700 text-lg">Name</label>
                <div className="relative flex items-center border border-gray-300 rounded-lg mt-2 shadow-lg transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-xl">
                    
                    {/* User Icon */}
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="absolute left-4 text-gray-500"
                    >
                    <path d="M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 11c-4.418 0-8 3.134-8 7 0 .552.448 1 1 1h14c.552 0 1-.448 1-1 0-3.866-3.582-7-8-7z"/>
                    </svg>

                    <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your Name"
                    className="w-full h-full pl-20 pr-3 py-3 border-none focus:outline-none rounded-lg text-black bg-white transition-all duration-300 text-lg placeholder-gray-500 focus:placeholder-transparent"
                    
                    type="text"
                    />
                </div>
                </div>


                {/* Contact Number Field */}
                <div className="flex flex-col mb-4">
                <label className="font-semibold text-gray-700 text-lg">Mobile Number</label>
                <div className="relative flex items-center border border-gray-300 rounded-lg mt-2 pl-3 shadow-lg transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-xl hover:shadow-lg">
                    <span className="text-gray-600 text-lg font-semibold">📞</span>
                    <input
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your Mobile Number"
                    className="w-full h-full px-8 py-3 border-none focus:outline-none bg-white rounded-lg text-black text-lg transition-all duration-300 placeholder-gray-500 focus:placeholder-transparent"
                    type="tel"
                    pattern="[0-9]{10}"
                    />
                    {/* <span className="absolute right-3 text-gray-400 text-lg">
                    
                    </span> */}
                </div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col mb-4">
                <label className="font-semibold text-gray-700 text-lg">Email</label>
                <div className="relative flex items-center border border-gray-300 rounded-lg mt-2 pl-3 shadow-lg transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-xl hover:shadow-lg">
                    {/* Email Icon */}
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height={22}
                    viewBox="0 0 32 32"
                    className="text-gray-500 mr-2 transition-all duration-300 group-hover:text-blue-500"
                    >
                    <g data-name="Layer 3" id="Layer_3">
                        <path fill="currentColor" d="M30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
                    </g>
                    </svg>
                    
                    {/* Email Input Field */}
                    <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your Email"
                    className="w-full h-full px-8 py-3 border-none focus:outline-none bg-white rounded-lg text-black text-lg transition-all duration-300 placeholder-gray-500 focus:placeholder-transparent"
                    type="email"
                    />
                </div>
                </div>
                        {/* Password Field */}
                    <div className="flex flex-col mb-4">
                    <label className="font-semibold text-gray-700 text-lg">Password</label>
                    <div className="relative flex items-center border border-gray-300 rounded-lg mt-2 pl-3 shadow-lg transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-xl hover:shadow-lg">
                        {/* Password Icon */}
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={22}
                        height={22}
                        viewBox="-64 0 512 512"
                        className="text-gray-500 mr-2 transition-all duration-300 group-hover:text-blue-500"
                        >
                        <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                        <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
                        </svg>

                        {/* Password Input Field */}
                        <input
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your Password"
                        className="w-full h-full px-8 py-3 border-none focus:outline-none bg-white rounded-lg text-black text-lg transition-all duration-300 placeholder-gray-500 focus:placeholder-transparent"
                        type="password"
                        aria-label="Enter your password"
                        />
                    </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="flex flex-col mb-4">
                    <label className="font-semibold text-gray-700 text-lg">Confirm Password</label>
                    <div className="relative flex items-center border border-gray-300 rounded-lg mt-2 pl-3 shadow-lg transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-xl hover:shadow-lg">
                        {/* Confirm Password Icon */}
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={22}
                        height={22}
                        viewBox="-64 0 512 512"
                        className="text-gray-500 mr-2 transition-all duration-300 group-hover:text-blue-500"
                        >
                        <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                        <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
                        </svg>

                        {/* Confirm Password Input Field */}
                        <input
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        placeholder="Confirm your Password"
                        className="w-full h-full px-8 py-3 border-none focus:outline-none bg-white rounded-lg text-black text-lg transition-all duration-300 placeholder-gray-500 focus:placeholder-transparent"
                        type="password"
                        aria-label="Confirm your password"
                        />
                    </div>
                    </div>


                {/* User Type Dropdown */}
                <div className="flex flex-col mb-4">
                <label className="font-semibold text-gray-700 text-lg">User Type</label>
                <div className="relative flex items-center border border-gray-300 rounded-lg mt-2 pl-3 shadow-lg transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-xl hover:shadow-lg">
                    {/* User Type Icon */}
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height={22}
                    viewBox="0 0 24 24"
                    className="text-gray-500 mr-2 transition-all duration-300 group-hover:text-blue-500"
                    >
                    <path
                        fill="currentColor"
                        d="M7 10l5 5l5-5H7z"
                    />
                    </svg>

                    {/* Dropdown Select */}
                    <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full h-full px-3 py-3 border-none focus:outline-none bg-white rounded-lg text-black text-lg transition-all duration-300 placeholder-gray-500">
                    <option value="">Select User Type</option>
                    <option value="farmer">Farmer</option>
                    <option value="transporter">Transporter</option>
                    <option value="business">Business</option>
                    </select>
                </div>
                </div>
                {/* Sign Up Button */}
                <button className="w-full bg-gray-800 text-white font-medium py-3 rounded-lg mb-4 shadow-lg transition-all duration-300 hover:bg-gray-900 hover:shadow-xl active:scale-95">
                Sign Up
                </button>

                {/* Sign In Link */}
                <p className="text-center text-lg text-gray-700 mb-4">
                Already have an account?{" "}
                <button
                    className="text-blue-600 font-semibold text-lg transition-all duration-300 hover:underline hover:text-blue-800 focus:outline-none"
                    onClick={handleToggle}
                >
                    Sign In
                </button>
                </p>

            </form>
        </div>
    );
};

export default SignUp;
