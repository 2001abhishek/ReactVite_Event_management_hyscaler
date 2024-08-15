import React, { Fragment, useContext, useState } from 'react';
import myContext from '../../context/data/myContext';
import { BsFillCloudSunFill } from 'react-icons/bs'
import { FiSun } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const context = useContext(myContext)
  const { mode, toggleMode } = context;

  const [open, setOpen] = useState(false)

  const user = JSON.parse(localStorage.getItem('user'))

  // console.log(user)
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear('user');
    navigate('/login');
  }

  const cartItems = useSelector((state) => state.cart)
  const handleCartClick = (event) => {
    if (!user) {
      // Prevent default action if no user is logged in
      event.preventDefault();
      toast.info('Please Login or Signup', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
        onClose: () => {
          navigate('/login'); // Navigate to the login page after the toast is closed
        }

      });
    } else {
      // Handle the cart click action for logged-in users
      // (You can navigate to the cart page or perform other actions here)
    }
  };
  const adminEmails = JSON.parse(import.meta.env.VITE_ADMIN_EMAILS);

  const isAdmin = adminEmails.includes(user?.user?.email);

  return (
    <div className='bg-white sticky top-0 z-50'>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">

                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-900 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    All Events
                  </Link>
                  {user ? <div className="flow-root">
                    <Link to={'/order'} style={{ color: mode === 'dark' ? 'white' : '', }} className="-m-2 block p-2 font-medium text-gray-900">
                      MyTickets
                    </Link>
                  </div> : ""}

                  {isAdmin === true ? <div className="flow-root">
                    <Link to={'/dashboard'} className="-m-2 block p-2 font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      admin
                    </Link>
                  </div> : ""}

                  {user ? <div className="flow-root">
                    <a onClick={logout} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Logout
                    </a>
                  </div> : ""}
                  <div>
                    {!user && (
                      <Link
                        to="/login"
                        className="text-sm font-medium text-gray-700"
                        style={{ color: mode === 'dark' ? 'white' : '' }}
                      >
                        Login
                      </Link>
                    )}
                  </div>
                  <div className="flow-root">
                    <Link to={'/'} className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer">
                      <img
                        className="inline-block w-10 h-10 rounded-full"
                        src="https://img.freepik.com/premium-photo/untitled-artwork_1042628-75632.jpg?w=740"
                        alt="Dan_Abromov" />                                        </Link>
                  </div>
                </div>

                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">

        <nav aria-label="Top" className="bg-gray-100 px-2 sm:px-6 lg:px-8 shadow-xl " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>

          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)} style={{ backgroundColor: mode === 'dark' ? 'rgb(80 82 87)' : '', color: mode === 'dark' ? 'white' : '', }}
              >
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={'/'} className='flex'>
                  <div className="flex ">
                    <h1 className=' text-2xl font-bold font- text-black  px-1 py-1 rounded' style={{ color: mode === 'dark' ? 'white' : '', }}>NextEvent</h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    All Events
                  </Link>
                  {user ? <Link to={'/order'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    MyTickets
                  </Link> : ""}

                  {isAdmin === true ?

                    <Link to={'/dashboard'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                      Admin
                    </Link> : ""}{/* Only can seen by Admin. User unable to see this button */}

                  {user ? <a onClick={logout} className="text-sm font-medium text-gray-700 cursor-pointer  " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Logout
                  </a> : ""}
                  {!user && (
                    <Link
                      to="/login"
                      className="text-sm font-medium text-gray-700"
                      style={{ color: mode === 'dark' ? 'white' : '' }}
                    >
                      Login
                    </Link>
                  )}

                </div>

                
                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <span className="ml-3 block text-sm font-medium" style={{ color: mode === 'dark' ? 'white' : '', }}>
                      {user?.user?.email || 'User'}
                    </span>
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <button className='' onClick={toggleMode}>
                    {/* <MdDarkMode size={35} style={{ color: mode === 'dark' ? 'white' : '' }} /> */}
                    {mode === 'light' ?
                      (<FiSun className='' size={30} />
                      ) : 'dark' ?
                        (<BsFillCloudSunFill size={30} />
                        ) : ''}
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to={'/cart'} className="group -m-2 flex items-center p-2" onClick={handleCartClick} style={{ color: mode === 'dark' ? 'white' : '', }}>
                    <svg style={{ color: mode === 'dark' ? 'white' : '' }}
                      class="w-6 h-6 text-gray-800 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z" />
                    </svg>


                    <span className="ml-2 text-sm font-medium text-gray-700 group-" style={{ color: mode === 'dark' ? 'white' : '', }}>{cartItems.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
