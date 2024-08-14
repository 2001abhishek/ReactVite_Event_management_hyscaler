import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'

function Testimonial() {
    const context = useContext(myContext)
    const { mode } = context
    return (
        <div>
            <section className="text-gray-600 body-font mb-10">
                <div className="container px-5 py-10 mx-auto">
                    <h1 className=' text-center text-3xl font-bold text-black' style={{color: mode === 'dark' ? 'white' : ''}}>Testimonial</h1>
                    <h2 className=' text-center text-2xl font-semibold mb-10' style={{color: mode === 'dark' ? 'white' : ''}}>What our <span className=' text-violet-500'>customers</span> are saying</h2>
                    <div className="flex flex-wrap -m-4">
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://img.freepik.com/premium-photo/girl-with-blue-shirt-with-futuristic-background_818771-283.jpg?w=740" />
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="leading-relaxed">"Shopping-Bag has completely transformed my online shopping experience! The variety of trendy clothing and accessories is unparalleled. The intuitive interface makes browsing a joy, and the quick delivery ensures I get my fashion fix on time. I've recommended it to all my friends!"</p>
                                <span className="inline-block h-1 w-10 rounded bg-violet-500 mt-6 mb-4" />
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Sophie - Fashion Enthusiast</h2>
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="text-gray-500">From California</p>
                            </div>
                        </div>
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://abhishekportfolio-2b33c.web.app/assets/img/perfil.png" />
                                <p  style={{color: mode === 'dark' ? 'white' : ''}}className="leading-relaxed">"As a tech enthusiast, I'm thrilled with Shopping-Bag's electronics section. From cutting-edge gadgets to essential peripherals, they have it all. The seamless checkout process and secure transactions give me peace of mind. Top-notch service and quality products keep me coming back."</p>
                                <span className="inline-block h-1 w-10 rounded bg-violet-500 mt-6 mb-4" />
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Abhishek Ray</h2>
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="text-gray-500">From India</p>
                            </div>
                        </div>
                        <div className="lg:w-1/3 lg:mb-0 p-4">
                            <div className="h-full text-center">
                                <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://media-ccu1-1.cdn.whatsapp.net/v/t61.24694-24/415760626_1764813684022082_7710308838675789036_n.jpg?ccb=11-4&oh=01_AdRiCefcirbB7vVZckhElCb4ZsSb858ipp2N3GAnJHelgg&oe=65B73B0C&_nc_sid=e6ed6c&_nc_cat=103" />
                                <p style={{color: mode === 'dark' ? 'white' : ''}} className="leading-relaxed">"I'm amazed by the exquisite collection of home decor at Shopping-Bag. Redecorating has never been easier! The site's inspirational layout and detailed descriptions helped me find the perfect pieces. The timely delivery and exceptional customer service made my experience delightful."</p>
                                <span className="inline-block h-1 w-10 rounded bg-violet-500 mt-6 mb-4" />
                                <h2 style={{color: mode === 'dark' ? '#ff4162' : ''}} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">Prateek Kumar Panda</h2>
                                <p  style={{color: mode === 'dark' ? 'white' : ''}}className="text-gray-500">From India</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Testimonial