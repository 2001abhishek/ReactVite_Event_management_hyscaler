import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useParams } from 'react-router-dom';
import { fireDB } from '../../firebase/FirebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import myContext from '../../context/data/myContext';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import ImageSlider from './ImageSlider';
import Footer from '../../components/footer/Footer';

function ProductInfo() {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const { mode, toggleMode } = context;

    const [products, setProducts] = useState({});
    const params = useParams();

    const getProductData = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", params.id));
            setProducts(productTemp.data());
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getProductData();
    }, []);

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const addCart = (products) => {
        dispatch(addToCart(products));
        toast('Added to cart', { autoClose: 500 });
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const slides = [
        products.imageUrl1,
        products.imageUrl2,
    ];

    const containerStyles = {
        width: "100%",
        height: "400px",
        margin: "0 auto",
    };

    return (
        <Layout>
            <section style={{ color: mode === 'dark' ? 'white' : '' }}
                className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-10 mx-auto">
                    {products &&
                        <div className="lg:flex lg:flex-row mx-auto">
                            <div className="lg:w-1/2 w-full" style={containerStyles}>
                                <ImageSlider slides={slides} />
                            </div>

                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest mb-2">
                                    Get a ticket for
                                </h2>
                                <h1 style={{ color: mode === 'dark' ? 'white' : '' }}
                                    className="text-gray-800 text-3xl title-font font-medium mb-4">
                                    {products.title}
                                </h1>
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium">Event Date:</h3>
                                    <p style={{ color: mode === 'dark' ? 'white' : '' }}
                                        className="text-gray-700">{products.eventDate}</p>
                                </div>
                                <div className="mb-4">
                                    <h3 className="text-lg font-medium">Location:</h3>
                                    <p style={{ color: mode === 'dark' ? 'white' : '' }}
                                        className="text-gray-700">{products.location}</p>
                                </div>
                                <p className="leading-relaxed border-b-2 mb-5 pb-5">
                                    {products.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <span style={{ color: mode === 'dark' ? 'white' : '' }} className="title-font font-medium text-2xl text-gray-900">
                                        Event Price: ₹{products.price}
                                    </span>
                                    <div className="flex">
                                        <button onClick={() => addCart(products)} className="flex ml-auto text-white bg-cyan-700 border-0 py-2 px-6 focus:outline-none hover:bg-cyan-900 rounded">
                                            Get Ticket
                                        </button>
                                        <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                            <svg
                                                fill="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                className="w-5 h-5"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>}
                </div>
                <Footer />
            </section>
        </Layout>
    )
}

export default ProductInfo;
