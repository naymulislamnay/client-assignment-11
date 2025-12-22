import React from 'react';
import { Link } from 'react-router';

const Homepage = () => {
    return (
        <div>
            {/* banner */}
            <div className="py-20 text-center bg-white">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-5xl font-extrabold mb-6 text-[#360c0c]">
                        Donate Blood,
                        <span className="text-[#f05b5b]"> Save Lives</span>
                    </h1>

                    <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-8">
                        Your simple act of kindness can give someone a second chance at life.
                        Join our community today.
                    </p>

                    <div className="flex justify-center gap-4">
                        <Link to='/signup'>
                            <button className="bg-[#f05b5b] hover:bg-[#f14343] text-white font-semibold px-6 py-3 rounded-lg transition hover:cursor-pointer">
                                Join as Donor
                            </button>
                        </Link>

                        {/* <button
                            className="border border-[#f05b5b] text-[#f05b5b] hover:bg-red-50 font-semibold px-6 py-3 rounded-lg transition"
                        >
                            Search Donors
                        </button> */}
                    </div>
                </div>
            </div>


            {/* featured Section */}
            <div className="max-w-7xl mx-auto px-5 py-16">
                <h2 className="mb-8 text-2xl font-bold text-slate-800">
                    Featured Section
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">
                            Emergency Help
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Instant connection with local donors during emergencies.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">
                            Free Registration
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Donors can register for free and manage their profile easily.
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">
                            Secure Data
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Your information is safe with our encrypted cloud storage.
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Homepage;