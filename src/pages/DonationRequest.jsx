import React from 'react';

const DonationRequest = () => {
    return (
        <div className="max-w-7xl mx-auto mt-10 px-5">
            <div className='flex justify-between items-center mb-5'>
                <h2 className="text-xl font-semibold text-slate-800">
                    Pending Blood Requests
                </h2>
                <button className="px-2 md:px-3 lg:px-4 py-1 md:py-2 h-fit rounded-lg bg-[#f05b5b] hover:bg-[#f14343] text-white font-semibold shadow text-[14px] md:text-[16px] hover:cursor-pointer">
                    Create a Donation Request
                </button>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b-2 border-slate-200">
                            <th className="px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                Recipient
                            </th>
                            <th className="px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                Location
                            </th>
                            <th className="px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                Blood Group
                            </th>
                            <th className="px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                Date
                            </th>
                            <th className="px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-b border-slate-200 hover:bg-slate-50 transition">
                            <td className="px-4 py-4 text-slate-700">
                                Rahim
                            </td>

                            <td className="px-4 py-4 text-slate-700">
                                Dhaka, Mirpur
                            </td>

                            <td className="px-4 py-4 font-bold text-[#f14343]">
                                O+
                            </td>

                            <td className="px-4 py-4 text-slate-700">
                                12 Jan 2025
                            </td>

                            <td className="px-4 py-4">
                                <button
                                    className="inline-block px-4 py-1.5 text-sm font-semibold text-[#f14343] border border-[#f14343] rounded-lg hover:bg-[#f14343] hover:text-white hover:cursor-pointer transition"
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>

                        {/* second Row */}
                        <tr className="border-b border-slate-200 hover:bg-slate-50 transition">
                            <td className="px-4 py-4 text-slate-700">
                                Rahim
                            </td>

                            <td className="px-4 py-4 text-slate-700">
                                Dhaka, Mirpur
                            </td>

                            <td className="px-4 py-4 font-bold text-[#f14343]">
                                O+
                            </td>

                            <td className="px-4 py-4 text-slate-700">
                                12 Jan 2025
                            </td>

                            <td className="px-4 py-4">
                                <button
                                    className="inline-block px-4 py-1.5 text-sm font-semibold text-[#f14343] border border-[#f14343] rounded-lg hover:bg-[#f14343] hover:text-white hover:cursor-pointer transition"
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DonationRequest;