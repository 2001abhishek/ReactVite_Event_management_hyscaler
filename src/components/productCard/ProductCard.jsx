import React, { useContext, useEffect } from 'react'
import myContext from '../../context/data/myContext'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { addToCart } from '../../redux/cartSlice'

function ProductCard() {
    const context = useContext(myContext)
    const { mode, product, searchkey, filterType, filterPrice, filterDate, filterLocation } = context

    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart)

    // Add to cart
    const buyticket = (event, product) => {
        event.preventDefault()
        event.stopPropagation()
        dispatch(addToCart(product))
        toast('Added to wishlist', { autoClose: 500 })
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) {
            newWindow.opener = null
        }
    }

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1
                        className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
                        style={{ color: mode === 'dark' ? 'white' : '' }}
                    >
                        Checkout Upcoming Events
                    </h1>
                    <div className="h-1 w-20 bg-violet-600 rounded"></div>
                </div>

                <div className="flex flex-wrap -m-4">
                    {product
                        .filter((obj) => obj.title.toLowerCase().includes(searchkey.toLowerCase()))
                        .filter((obj) => {
                            if (!filterType && !filterPrice && !filterDate && !filterLocation) {
                                return true // Show all products if no filters are selected
                            } else {
                                const [minPrice, maxPrice] = filterPrice.split('-').map(Number)
                                return (
                                    (!filterType || obj.category.toLowerCase() === filterType.toLowerCase()) &&
                                    (!filterPrice || (obj.price >= minPrice && obj.price <= maxPrice)) &&
                                    (!filterDate || obj.eventDate === filterDate) &&
                                    (!filterLocation || obj.location.toLowerCase().includes(filterLocation.toLowerCase()))
                                )
                            }
                        })
                        .slice(0, 8)
                        .map((item, index) => {
                            const { title, price, description, imageUrl1, eventDate, location, id } = item
                            return (
                                <div
                                    onClick={() => openInNewTab(`/productinfo/${id}`)}
                                    key={index}
                                    className="p-4 md:w-1/4 drop-shadow-lg"
                                >
                                    <div
                                        className="h-full border-2 hover:shadow-black-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                                        style={{
                                            backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '',
                                            color: mode === 'dark' ? 'white' : '',
                                        }}
                                    >
                                        <div className="flex justify-center cursor-pointer">
                                            <img
                                                className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out"
                                                src={imageUrl1}
                                                alt="event"
                                            />
                                        </div>
                                        <div className="p-5 border-t-2">
                                            <h2
                                                className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                                                style={{ color: mode === 'dark' ? 'white' : '' }}
                                            >
                                                Shopping-Bag
                                            </h2>
                                            <h1
                                                className="title-font text-lg font-medium text-gray-900 mb-3"
                                                style={{ color: mode === 'dark' ? 'white' : '' }}
                                            >
                                                {title}
                                            </h1>
                                            <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                ₹ {price}
                                            </p>
                                            <p className="leading-relaxed mb-1" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                Event Date: {eventDate}
                                            </p>
                                            <p className="leading-relaxed mb-3" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                Location: {location}
                                            </p>
                                            <div className="flex justify-center">
                                                <button
                                                    onClick={(event) => buyticket(event, item)}
                                                    type="button"
                                                    className="focus:outline-none text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
                                                >
                                                    Book a ticket
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </section>
    )
}

export default ProductCard
