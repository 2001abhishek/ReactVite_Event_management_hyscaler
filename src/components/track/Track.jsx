import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'
import { AiOutlineTransaction } from "react-icons/ai";
import { LiaTachometerAltSolid } from "react-icons/lia";
import { BiSolidOffer } from "react-icons/bi";



function Track() {
    const context = useContext(myContext)
    const { toggleMode, mode } = context
    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 md:py-5  mx-auto">
                    <div className="flex flex-wrap -m-4 text-center">
                        <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                            <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                <svg className="text-cyan-600 w-12 h-12 mb-3 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <AiOutlineTransaction />
                                </svg>
                                <h2 className="title-font font-medium text-lg text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Safe Transaction</h2>
                                <p className="leading-relaxed">Support varius payment method.
                                </p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                            <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100  px-4 py-6 rounded-lg" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-cyan-600 w-12 h-12 mb-3 inline-block">
                                <LiaTachometerAltSolid />
                                </svg>
                                <h2 className="title-font font-medium text-lg text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Fast Booking</h2>
                                <p className="leading-relaxed">We support Globally .
                                </p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                            <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-cyan-600 w-12 h-12 mb-3 inline-block">
                                <BiSolidOffer />
                                </svg>

                                <h2 className="title-font font-medium text-lg text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Exciting Offers</h2>
                                <p className="leading-relaxed">We provide amazing offers & discounts</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Track