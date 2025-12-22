import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';

const DonationRequest = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [donationRequests, setDonationRequests] = useState([]);

    const handleCreateRequest = () => {
        if (user) {
            navigate('/dashboard/create-request');
        } else {
            navigate('/login', {
                state: '/dashboard/create-request',
            });
        }
    };


    const statusClasses = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Done: 'bg-green-100 text-green-800',
    };


    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/donation-requests`)
            .then(res => setDonationRequests(res.data))
            .catch(err => console.error(err));
    }, []);


    return (
        <div className="max-w-7xl mx-auto mt-10 px-5">
            <div className='flex justify-between items-center mb-5'>
                <h2 className="text-xl font-semibold text-slate-800">
                    Blood Donation Requests
                </h2>
                <button onClick={handleCreateRequest} className="px-2 md:px-3 lg:px-4 py-1 md:py-2 h-fit rounded-lg bg-[#f05b5b] hover:bg-[#f14343] text-white font-semibold shadow text-[14px] md:text-[16px] hover:cursor-pointer">
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
    );
};

export default DonationRequest;