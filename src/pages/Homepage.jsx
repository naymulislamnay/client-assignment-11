import React from 'react';
import { Link } from 'react-router';

const Homepage = () => {
    return (
        <div>
            {/* banner */}
            <div className="py-20 text-center">
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
                            <button className="bg-[#f05b5b] hover:bg-[#f14343] text-white font-semibold px-6 py-3 rounded-lg transition">
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
        </div>
    );
};

export default Homepage;