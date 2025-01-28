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
            <form className="bg-white p-8 rounded-2xl w-96" onSubmit={handleRegister}>
                <div className="text-3xl text-black mb-2">Register</div>

                {/* Name Field */}
                <div className="flex flex-col mb-4">
                <label className="font-semibold text-gray-700">Name</label>
                <div className="flex items-center border text-black border-gray-300 rounded-lg mt-2">
                    <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your Name"
                    className="w-full h-full px-3 py-2 border-none focus:outline-none rounded-lg"
                    type="text"
                    />
                </div>
                </div>

                {/* Contact Number Field */}
                <div className="flex flex-col mb-4">
                <label className="font-semibold text-gray-700">Mobile Number</label>
                <div className="flex items-center border text-black border-gray-300 rounded-lg mt-2 pl-2">
                    +91
                    <input
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your Mobile Number"
                    className="w-3/4 h-full px-3 py-2 border-none focus:outline-none rounded-lg"
                    type="tel"
                    pattern="[0-9]{10}"
                    />
                </div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col mb-4">
                <label className="font-semibold text-gray-700">Email</label>
                <div className="flex items-center border text-black border-gray-300 rounded-lg mt-2">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    viewBox="0 0 32 32"
                    height={20}
                    className="ml-3"
                    >
                    <g data-name="Layer 3" id="Layer_3">
                        <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
                    </g>
                    </svg>
                    <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your Email"
                    className="w-full h-full px-3 py-2 border-none focus:outline-none rounded-lg"
                    type="email"
                    />
                </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col mb-4">
                <label className="font-semibold text-gray-700">Password</label>
                <div className="flex items-center border text-black border-gray-300 rounded-lg mt-2">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    viewBox="-64 0 512 512"
                    height={20}
                    className="ml-3"
                    >
                    <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                    <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
                    </svg>
                    <input
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your Password"
                    className="w-full h-full px-3 py-2 border-none focus:outline-none rounded-lg"
                    type="password"
                    />
                </div>
                </div>

                {/* Confirm Password Field */}
                <div className="flex flex-col mb-4">
                <label className="font-semibold text-gray-700">
                    Confirm Password
                </label>
                <div className="flex items-center border text-black border-gray-300 rounded-lg mt-2">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    viewBox="-64 0 512 512"
                    height={20}
                    className="ml-3"
                    >
                    <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                    <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
                    </svg>
                    <input
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="Confirm your Password"
                    className="w-full h-full px-3 py-2 border-none focus:outline-none rounded-lg"
                    type="password"
                    />
                </div>
                </div>

                {/* User Type Dropdown */}
                <div className="flex flex-col mb-4">
                <label className="font-semibold text-gray-700">User Type</label>
                <div className="flex items-center border text-black border-gray-300 rounded-lg mt-2">
                    <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full h-full px-3 py-2 border-none focus:outline-none rounded-lg"
                    >
                    <option value="">Select User Type</option>
                    <option value="farmer">Farmer</option>
                    <option value="transporter">Transporter</option>
                    <option value="business">Business</option>
                    </select>
                </div>
                </div>

                {/* Sign Up Button */}
                <button className="w-full bg-gray-800 text-white font-medium py-2 rounded-lg mb-4">
                Sign Up
                </button>

                {/* Sign In Link */}
                <p className="text-center text-sm text-gray-700 mb-4">
                Already have an account?{" "}
                <button
                    className="text-blue-600 cursor-pointer"
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
