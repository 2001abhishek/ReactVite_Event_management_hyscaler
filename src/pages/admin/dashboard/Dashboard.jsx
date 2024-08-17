import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';
import DashboardTab from './DashboardTab';
import { MdOutlineEventNote } from "react-icons/md";
import { IoTicketSharp } from "react-icons/io5";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { ImUsers } from "react-icons/im";

function Dashboard() {
    const context = useContext(myContext);
    const { mode, product, user, order } = context;
    const [totalEarnings, setTotalEarnings] = useState(0);

    const totalProducts = product ? product.length : 0;
    const totalUser = user ? user.length : 0;
    const totalOrders = order ? order.length : 0;

    useEffect(() => {
        if (order) {
            const total = order.reduce((acc, curr) => acc + (curr.grandTotal || 0), 0);
            setTotalEarnings(total);
        }
    }, [order]);

    return (
        <Layout>
            <section className="text-gray-600 body-font mt-10 mb-10">
                <div className="container px-5 mx-auto mb-10">
                    <div className="flex flex-wrap -m-4 text-center">
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className=" border-2 hover:shadow-violet-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                                 style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                <div className="text-cyan-700 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                    <MdOutlineEventNote size={50} />
                                </div>
                                <h2 className="title-font font-medium text-3xl text-black fonts1" style={{ color: mode === 'dark' ? 'white' : '' }}>{totalProducts}</h2>
                                <p className="text-cyan-700 font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total Events</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className=" border-2 hover:shadow-violet-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                                 style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                <div className="text-cyan-700 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                    <IoTicketSharp size={50} />
                                </div>
                                <h2 className="title-font font-medium text-3xl text-black fonts1" style={{ color: mode === 'dark' ? 'white' : '' }}>{totalOrders}</h2>
                                <p className="text-cyan-700 font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total Selling Users</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className=" border-2 hover:shadow-violet-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                                 style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                <div className="text-cyan-700 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                    <ImUsers size={50} />
                                </div>
                                <h2 className="title-font font-medium text-3xl text-black fonts1" style={{ color: mode === 'dark' ? 'white' : '' }}>{totalUser}</h2>
                                <p className="text-cyan-700 font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total Users</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className=" border-2 hover:shadow-violet-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                                 style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>
                                <div className="text-cyan-700 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                    <FaMoneyCheckAlt size={50} />
                                </div>
                                <h2 className="title-font font-medium text-3xl text-black fonts1" style={{ color: mode === 'dark' ? 'white' : '' }}>{totalEarnings.toFixed(2)}</h2>
                                <p className="text-cyan-700 font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total Earning</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <DashboardTab />
        </Layout>
    );
}

export default Dashboard;
