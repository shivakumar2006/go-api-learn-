import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../redux/api/AuthApi';
import { toast } from 'react-toastify';

const Signup = () => {

    const navigate = useNavigate();

    const [signup, { isLoading, isError }] = useSignupMutation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    };

    const handleSignup = async () => {
        try {
            await signup(formData).unwrap();
            navigate("/login");
            toast("Signup successfull", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        } catch (error) {
            toast.error("Signup failed", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }

    return (
        <div className='min-h-screen bg-[#F7F7F8] flex justify-center items-center px-6'>
            <div className='w-full max-w-md'>
                <div className='bg-white rounded-2xl shadow-xl border border-gray-200 p-10'>
                    <p className='text-xs tracking-widest text-slate-900 mb-3'>
                        REQUEST ACCESS
                    </p>
                    <h2 className='text-3xl font-semibold text-indigo-500 mb-2'>
                        Sign up
                    </h2>
                    <p className='text-gray-500 mb-8'>
                        Access to the Go API endpoints data
                    </p>

                    <div className='space-y-5'>
                        <input
                            name='name'
                            type="text"
                            onChange={handleChange}
                            value={formData.name}
                            placeholder='Full name'
                            className='w-full px-4 py-3 border placeholder:text-gray-500 text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none'
                        />
                        <input
                            name='email'
                            type='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Email'
                            className='w-full px-4 py-3 border placeholder:text-gray-500 text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none'
                        />
                        <input
                            name='password'
                            type='password'
                            value={formData.password}
                            onChange={handleChange}
                            placeholder='Password'
                            className='w-full px-4 py-3 border placeholder:text-gray-500 text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none'
                        />
                    </div>

                    <button
                        onClick={handleSignup}
                        disabled={isLoading}
                        className='mt-8 w-full py-3 rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 transition cursor-pointer'
                    >
                        {isLoading ? "Signing up..." : "Create account"}
                    </button>

                    <p className='mt-6 text-sm text-gray-500 text-center'>
                        Dont have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className='text-slate-900 font-medium cursor-pointer hover:underline'
                        >
                            Sign in
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup