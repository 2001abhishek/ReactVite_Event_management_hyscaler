import React, { useContext } from 'react';
import myContext from '../../../context/data/myContext';

function UpdateProduct() {
    const context = useContext(myContext);
    const { products, setProducts, updateProduct } = context;

    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-900'>
            <div className='bg-gray-800 px-10 py-10 rounded-xl shadow-lg max-w-lg w-full mx-4 sm:mx-6 md:mx-8'>
                <h1 className='text-center text-white text-xl mb-4 font-bold'>Edit Event...</h1>
                <div>
                    <input
                        type="text"
                        value={products.title}
                        onChange={(e) => setProducts({ ...products, title: e.target.value })}
                        name='title'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='event title'
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name='price'
                        value={products.price}
                        onChange={(e) => setProducts({ ...products, price: e.target.value })}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='ticket price'
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name='imageUrl1'
                        value={products.imageUrl1}
                        onChange={(e) => setProducts({ ...products, imageUrl1: e.target.value })}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='event imageUrl1'
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name='imageUrl2'
                        value={products.imageUrl2}
                        onChange={(e) => setProducts({ ...products, imageUrl2: e.target.value })}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='event imageUrl2'
                    />
                </div>
                <div>
                    <input
                        type="date"
                        name='eventDate'
                        value={products.eventDate}
                        onChange={(e) => setProducts({ ...products, eventDate: e.target.value })}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Event Date'
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name='location'
                        value={products.location}
                        onChange={(e) => setProducts({ ...products, location: e.target.value })}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Location'
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name='category'
                        value={products.category}
                        onChange={(e) => setProducts({ ...products, category: e.target.value })}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='category'
                    />
                </div>
                <div>
                    <textarea
                        cols="20"
                        rows="5"
                        name='description'
                        value={products.description}
                        onChange={(e) => setProducts({ ...products, description: e.target.value })}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='event Description'>
                    </textarea>
                </div>
                <div className='flex justify-center mb-3'>
                    <button
                        onClick={updateProduct}
                        className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;
