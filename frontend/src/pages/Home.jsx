import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

    const handlenavigate = () => {
        navigate("/login");
    }

    return (
        <div className='w-full min-h-screen flex justify-center items-center'>
            <div className='transition-transform duration-400 hover:scale-105'>
                <button
                    onClick={handlenavigate}
                    className='w-50 h-12 rounded-3xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold cursor-pointer transition-colors duration-400 shadow-xl'
                >
                    Start
                </button>
            </div>
        </div>
    )
}

export default Home