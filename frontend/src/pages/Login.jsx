import React from 'react'

const Login = () => {
    return (
        <div className='w-full bg-gray-50 min-h-screen flex justify-center items-center'>
            <div className='w-130 bg-white h-120 shadow-2xl rounded-xl flex flex-col items-center gap-5 p-5'>
                <p className='text-2xl text-indigo-500 font-bold'>Login form</p>
                <form>
                    <p>Email</p>
                    <input
                        type="email"
                        placeholder='Email'
                        className="w-100 h-10 border rounded-xl placeholder:text-gray-400 pl-5" />
                </form>
            </div>
        </div>
    )
}

export default Login