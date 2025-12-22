import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Overview = () => {
    const [donationRequests, setDonationRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/donation-requests`)
            .then(res => {
                const sortedData = res.data
                    .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    ).slice(0, 5);
                setDonationRequests(sortedData);
            })
            .catch(err => console.error(err));
    }, []);

    const statusClasses = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Done: 'bg-green-100 text-green-800',
    };

    console.log(donationRequests)

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-8">Welcome Back, Admin!</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border-l-4 border-red-600 shadow">
                    <h4 className="text-gray-500 text-sm font-medium">Total Users</h4>
                    <h2 className="text-2xl font-bold mt-2">1,240</h2>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600 shadow">
                    <h4 className="text-gray-500 text-sm font-medium">Requests</h4>
                    <h2 className="text-2xl font-bold mt-2">856</h2>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-green-600 shadow">
                    <h4 className="text-gray-500 text-sm font-medium">Funds</h4>
                    <h2 className="text-2xl font-bold mt-2">৳45,000</h2>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Recent Requests</h3>
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
                                    Status
                                </th>
                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                    Donation Date
                                </th>
                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {donationRequests.map((request) => (
                                <tr
                                    key={request._id}
                                    className="border-b border-slate-200 hover:bg-slate-50 transition"
                                >
                                    <td className="px-4 py-4 text-slate-700">
                                        {request.recipientName}
                                    </td>

                                    <td className="px-4 py-4 text-slate-700">
                                        {request.recipientDistrict}
                                    </td>

                                    <td className="px-4 py-4 font-bold text-[#f14343]">
                                        {request.bloodGroup}
                                    </td>

                                    <td className="px-4 py-4 font-bold">
                                        <div className={`px-3 py-1 w-fit rounded-full font-semibold text-sm  ${statusClasses[request.donationStatus] || 'bg-blue-100 text-blue-800'}`}>
                                            {request.donationStatus}
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 text-slate-700">
                                        {request.donationDate}
                                    </td>

                                    <td className="px-4 py-4">
                                        <button id={request._id}
                                            onClick={() => navigate(`/donation-request/${request._id}`)}
                                            className="inline-block px-4 py-1.5 text-sm font-semibold text-[#f14343] border border-[#f14343] rounded-lg hover:bg-[#f14343] hover:text-white transition hover:cursor-pointer">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Overview;