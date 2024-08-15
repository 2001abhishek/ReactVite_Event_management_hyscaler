import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext'
import Herosection from '../../components/herosection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import Footer from '../../components/footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/cartSlice'
import { Link } from 'react-router-dom'
import ChatBox from '../../components/chatbot/ChatBox'

function Home() {
  const dispatch = useDispatch();
  const cartItem = useSelector((state)=> state.cart)

  console.log(cartItem)

  const addCart = () => {
    dispatch(addToCart("shirt"));
  }

  const deleteCart = () => {
    dispatch(deleteFromCart("shirt"));
  }
  return (
    <Layout>
    <Herosection/>
    <Filter/>
    <ProductCard/>
    <div className="flex justify-center -mt-1 mb-4">
        <Link to={'/allproducts'}>
          <button className=' bg-gray-200  hover:scale-110 transition-scale-110 duration-300 ease-in-out px-5 py-2 drop-shadow-2xl rounded-xl'><u>See more</u></button>
        </Link>
      </div>
    <Track/>
    <Testimonial/>
    <Footer/>
    <ChatBox/>
        </Layout>
  )
}

export default Home