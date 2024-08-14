import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext'
import Loader from '../../components/loader/Loader'
import Footer from '../../components/footer/Footer'

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid
  const context = useContext(myContext);
  const { mode, loading, order } = context;

  function truncateDescription(description) {
    const words = description.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '. . .';
    }
    return description;
  }

  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ?
        (<>
          <div className="h-full pt-10">
            {
              order.filter(obj => obj.userid === userid).map((order) => {
                return (
                  <div key={order.orderId} className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    {
                      order.cartItems.map((item, index) => {
                        return (
                          <div key={index} className="rounded-lg md:w-2/3">
                            <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
                              <img src={item.imageUrl1} alt="product-image" className="w-full rounded-lg sm:w-40" />
                              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                <div className="mt-5 sm:mt-0">
                                  <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                                  <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{truncateDescription(item.description)}</p>
                                  <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}><b>₹ {order.grandTotal}/-</b></p>
                                  <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}><b>Date: </b>{order.addressInfo.date}</p>
                                  <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}><b>Quantity: </b>{item.quantity}</p>
                                  <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}><b>Ticket: </b>{order.ticketId}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </>)
        :
        (
          <h2 className='text-center text-2xl text-black'>No booking Event Yet</h2>
        )
      }
      <Footer />
    </Layout>
  )
}

export default Order;
