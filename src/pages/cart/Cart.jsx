import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Modal from '../../components/modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import Footer from '../../components/footer/Footer';

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  
  const [totalAmount, setTotalAmount] = useState(0);
  const [quantities, setQuantities] = useState({});

  // Calculate the total amount whenever cartItems or quantities change
  useEffect(() => {
    let tempTotal = 0;
    cartItems.forEach((item) => {
      const itemQuantity = quantities[item.id] || 1; // Default quantity is 1
      tempTotal += parseInt(item.price) * itemQuantity;
    });
    setTotalAmount(tempTotal);
  }, [cartItems, quantities]);

  const confee = cartItems.length > 0 ? 25 : 0; // Convenience fee is 0 if no items are in the cart
  const grandTotal = confee + totalAmount;

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.warning('ticket removed', {
            autoClose: 100,
            position: toast.POSITION.TOP_CENTER
        });
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Quantity management
  const incrementQuantity = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: (prevQuantities[itemId] || 1) + 1,
    }));
  };

  const decrementQuantity = (itemId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: Math.max((prevQuantities[itemId] || 1) - 1, 1), // Ensure quantity doesn't go below 1
    }));
  };

  // Form state for address details
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const buyNow = async () => {
    // Validation
    if (name === "" || address === "" || pincode === "" || phoneNumber === "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
  
    var options = {
      key: "rzp_test_vHrIQyk0IwY8CO",
      key_secret: "SZT3Z9oWvJFIarrL8xUzfFMv",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "NextEvent",
      description: "for testing purpose",
      handler: async function (response) {
        console.log(response);
        toast.success('Payment Successful');
  
        const paymentId = response.razorpay_payment_id;
  
        // Combine cartItems with their quantities
        const itemsWithQuantities = cartItems.map(item => ({
          ...item,
          quantity: quantities[item.id] || 1, // Default to 1 if not specified
        }));
  
        // Generate a unique ticket ID
        const ticketId = `ticket_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  
        const orderInfo = {
          cartItems: itemsWithQuantities, // Use the combined items and quantities
          addressInfo,
          grandTotal,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId,
          ticketId, // Add the unique ticket ID
        };
  
        try {
          const orderRef = collection(fireDB, 'order');
          await addDoc(orderRef, orderInfo);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
  
    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay);
  };  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="h-screen bg-gray-100 pt-5" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>
        <h1 className="mb-10 text-center text-2xl font-bold">Event Wishlist</h1>
        <div className="container mx-auto px-6 md:grid md:grid-cols-4 md:gap-6 xl:px-0">
          <div className="col-span-3 space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center rounded-lg border drop-shadow-xl bg-white p-6 sm:flex-shrink-0" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '' }}>
                <img src={item.imageUrl1} alt="product-image" className="w-24 h-24 object-cover object-center rounded-lg sm:w-40 sm:h-40" />
                <div className="ml-4 flex-1">
                  <h2 className="text-sm md:text-base font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                  <p className="mt-1 text-sm md:text-base font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Category: {item.category}</p>
                  <p className="mt-1 text-sm md:text-base font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Price: ₹ {item.price}/-</p>
                  <div className="mt-4 flex items-center space-x-4">
                    <button onClick={() => decrementQuantity(item.id)} className="px-2 py-1 bg-gray-300 text-gray-700 rounded">-</button>
                    <p className="text-sm md:text-base font-bold">{quantities[item.id] || 1}</p>
                    <button onClick={() => incrementQuantity(item.id)} className="px-2 py-1 bg-gray-300 text-gray-700 rounded">+</button>
                  </div>
                </div>
                <div onClick={() => deleteCart(item)} className="ml-4 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-1 h-full p-4 bg-gray-300 rounded-lg border drop-shadow-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '' }}>
            <div className="mb-4">
              <h1 className="text-lg font-bold">Payment Details</h1>
              <div className="mt-4">
                <label className="block text-sm font-medium">Name</label>
                <input type="text" className="mt-1 w-full px-4 py-2 bg-white border rounded-md shadow-sm" style={{ color: mode === 'dark' ? 'black' : '' }} value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Address</label>
                <input type="text" className="mt-1 w-full px-4 py-2 bg-white border rounded-md shadow-sm" style={{ color: mode === 'dark' ? 'black' : '' }} value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Pincode</label>
                <input type="text" className="mt-1 w-full px-4 py-2 bg-white border rounded-md shadow-sm" style={{ color: mode === 'dark' ? 'black' : '' }} value={pincode} onChange={(e) => setPincode(e.target.value)} />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Phone Number</label>
                <input type="text" className="mt-1 w-full px-4 py-2 bg-white border rounded-md shadow-sm" style={{ color: mode === 'dark' ? 'black' : '' }} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>
            </div>
            <div className="border-t border-gray-400 my-4"></div>
            <div className="mt-4 flex justify-between text-sm font-semibold">
              <span>Subtotal:</span>
              <span>₹ {totalAmount}/-</span>
            </div>
            <div className="mt-4 flex justify-between text-sm font-semibold">
              <span>Convenience fee:</span>
              <span>₹ {confee}/-</span>
            </div>
            <div className="mt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹ {grandTotal}/-</span>
            </div>
            <button onClick={buyNow} className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none">Checkout</button>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default Cart;
