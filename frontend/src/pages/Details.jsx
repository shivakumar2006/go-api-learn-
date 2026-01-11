import React from 'react';
import { useGetAllByIdQuery } from '../redux/api/RestApi';
import { useParams } from 'react-router-dom';

const Details = () => {

    const { id } = useParams();
    const { data, isLoading, isError } = useGetAllByIdQuery(id);

    console.log("data : ", data);

    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <div className='w-100 px-6 py-6 rounded-xl shadow-xl flex flex-col items-center justify-center'>
                <p className='text-2xl font-bold'>id:{data?.id}</p>
                <p className='text-2xl'>Title: {data?.title}</p>
                <p className='text-2xl'>Price: {data?.price}</p>
                <p className='text-2xl'>stock: {data?.stock}</p>
            </div>
        </div>
    )
}

export default Details;