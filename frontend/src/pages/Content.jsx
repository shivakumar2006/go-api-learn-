import React from 'react';
import { useGetAllQuery } from '../redux/api/RestApi';
import { Link } from 'react-router-dom';

const Content = () => {
    const { data, isLoading, isError } = useGetAllQuery();

    if (isLoading) return <p>Loading...</p>

    console.log("content data: ", data);
    return (
        <div className='min-h-screen bg-[#F7F7F8] flex justify-around items-center flex-wrap'>
            {data?.map((item, index) => (
                <Link key={item.id} to={`/rest/${item.id}`}>
                    <div key={index} className='w-100 px-6 py-5 rounded-2xl shadow-xl flex items-center justify-center flex-col gap-3 cursor-pointer'>
                        <p className='text-2xl font-bold'>id:{item.id}</p>
                        <p className='text-2xl'>Title: {item.title}</p>
                        <p className='text-2xl'>Price: {item.price}</p>
                        <p className='text-2xl'>stock: {item.stock}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Content;