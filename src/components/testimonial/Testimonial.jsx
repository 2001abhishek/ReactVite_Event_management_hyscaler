import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';

function Testimonial() {
    const context = useContext(myContext);
    const { mode } = context;

    return (
        <div>
            <section className="text-gray-600 body-font mb-10">
                <div className="container px-5 py-10 mx-auto">
                    <h1 className='text-center text-3xl font-bold text-black' style={{ color: mode === 'dark' ? 'white' : '' }}>
                        What Our Users Say
                    </h1>
                    <h2 className='text-center text-2xl font-semibold mb-10' style={{ color: mode === 'dark' ? 'white' : '' }}>
                        Testimonials from <span className='text-cyan-500'>Event Organizers</span>
                    </h2>
                    <div className="flex flex-wrap -m-4">
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img
                                    alt="testimonial"
                                    className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                                    src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/150"
                                />
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="leading-relaxed">
                                    "Our Event Management System has revolutionized the way we organize events. The user-friendly interface and comprehensive features make event planning seamless. From ticketing to attendee engagement, everything is handled efficiently. Highly recommended!"
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-cyan-500 mt-6 mb-4" />
                                <h2 style={{ color: mode === 'dark' ? '#ff4162' : '' }} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                                    Alex Johnson - Event Organizer
                                </h2>
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="text-gray-500">
                                    From New York
                                </p>
                            </div>
                        </div>
                        <div className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                            <div className="h-full text-center">
                                <img
                                    alt="testimonial"
                                    className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/150"
                                />
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="leading-relaxed">
                                    "The comprehensive features of this system, from event creation to ticket management, have streamlined our entire workflow. The support team is responsive and helpful, ensuring that every event runs smoothly. A must-have for any event organizer!"
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-cyan-400 mt-6 mb-4" />
                                <h2 style={{ color: mode === 'dark' ? '#ff4162' : '' }} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                                    Jamie Lee - Event Planner
                                </h2>
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="text-gray-500">
                                    From San Francisco
                                </p>
                            </div>
                        </div>
                        <div className="lg:w-1/3 lg:mb-0 p-4">
                            <div className="h-full text-center">
                                <img
                                    alt="testimonial"
                                    className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                                    src="https://images.pexels.com/photos/12098225/pexels-photo-12098225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/150"
                                />
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="leading-relaxed">
                                    "Organizing events has never been easier. The system's intuitive design and robust features make managing events and engaging with attendees a breeze. It's a game-changer for our organization!"
                                </p>
                                <span className="inline-block h-1 w-10 rounded bg-cyan-400 mt-6 mb-4" />
                                <h2 style={{ color: mode === 'dark' ? '#ff4162' : '' }} className="text-gray-900 font-medium title-font tracking-wider text-sm uppercase">
                                    Morgan Davis - Event Coordinator
                                </h2>
                                <p style={{ color: mode === 'dark' ? 'white' : '' }} className="text-gray-500">
                                    From Chicago
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Testimonial;
