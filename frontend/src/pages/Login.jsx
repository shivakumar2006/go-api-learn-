import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/api/AuthApi';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setUser } from '../redux/api/AuthSlice';

const Login = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [login, { isLoading, isError }] = useLoginMutation();

    const [formData, setFormData] = useState({
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

    const handleLogin = async () => {
        try {
            const response = await login(formData).unwrap();
            dispatch(setUser(response))
            navigate("/content")
            toast("login successfull", {
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
            toast.error("login failed!", {
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
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-10">
                    <p className='text-xs tracking-widest text-gray-400 mb-3'>
                        SECURE ACCESS
                    </p>
                    <h2 className='text-3xl font-semibold text-indigo-500 mb-2'>
                        Sign in
                    </h2>
                    <p className='text-gray-500 mb-8'>
                        Access to the Go API endpoints data
                    </p>
                    <div className='space-y-5'>
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
                            className='w-full px-4 py-4 border placeholder:text-gray-500 text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none'
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={isLoading}
                        className='mt-8 w-full py-3 rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 transition cursor-pointer'
                    >
                        {isLoading ? "Signing in..." : "Login"}
                    </button>

                    <p className='mt-6 text-sm text-gray-500 text-center'>
                        Don't have access?{" "}
                        <span
                            onClick={() => navigate("/singup")}
                            className='text-slate-900 font-medium cursor-pointer hover:underline'
                        >
                            Request access
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login