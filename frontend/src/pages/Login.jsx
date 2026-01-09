import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

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
                        Access the Go API endpoints data
                    </p>
                    <div className='space-y-5'>
                        <input
                            name='email'
                            type='email'
                            placeholder='Email'
                            className='w-full px-4 py-3 border placeholder:text-gray-500 text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none'
                        />
                        <input
                            name='password'
                            type='password'
                            placeholder='Password'
                            className='w-full px-4 py-4 border placeholder:text-gray-500 text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none'
                        />
                    </div>

                    <button
                        className='mt-8 w-full py-3 rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 transition cursor-pointer'
                    >
                        Login
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