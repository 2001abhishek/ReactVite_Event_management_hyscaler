import React, { useContext, useEffect } from 'react'
import Filter from '../../components/filter/Filter'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';
import Footer from '../../components/footer/Footer'

function Allproducts() {
    const context = useContext(myContext)
    const { mode, product, searchkey, filterType,
        filterPrice} = context

    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart);
    console.log(cartItems)

    const addCart = (event, product) => {
        event.preventDefault(); // Prevent the default behavior of the click event
        event.stopPropagation(); // Prevent click event from propagating
        dispatch(addToCart(product));
        toast('Added to wishlist', { 
            autoClose: 500,
            position: toast.POSITION.TOP_CENTER 
        });
    };
    

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) {
            newWindow.opener = null;
        }
    };

    return (
        <Layout>
            <Filter />
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-8 md:py-16 mx-auto">
                   

                    <div className="flex flex-wrap -m-4">
                        {product.filter((obj) => obj.title.toLowerCase().includes(searchkey))
                            .filter((obj) => obj.category.toLowerCase().includes(filterType))
                            .filter((obj) => obj.price.includes(filterPrice)).map((item, index) => {
                                const { title, price, description, imageUrl1, id } = item;
                                return (
                                    <Link to={`/productinfo/${id}`} target="_blank" key={index} className="p-4 md:w-1/4  drop-shadow-lg " >
                                        <div className="h-full border-2 hover:shadow-black-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out    border-gray-200 border-opacity-60 rounded-2xl overflow-hidden" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                            <div className="flex justify-center cursor-pointer" >
                                                <img className=" rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110  duration-300 ease-in-out" src={imageUrl1} alt="blog" />
                                            </div>
                                            <div className="p-5 border-t-2">
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>Shopping-Bag</h2>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3" style={{ color: mode === 'dark' ? 'white' : '', }}>{title}</h1>
                                                {/* <p className="leading-relaxed mb-3">{item.description.}</p> */}
                                                <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{price}</p>
                                                <div className=" flex justify-center">
                                                    <button type="button"
                                                        onClick={(event) => addCart(event, item)}
                                                        className="focus:outline-none text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full  py-2">Book a ticket</button>

                                                </div>
                                            </div>

                                        </div>
                                    </Link>
                                )
                            })}
                    </div>
                </div>
                <Footer />
            </section >
        </Layout>
    )
}

export default Allproducts