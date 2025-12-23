import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useRole from '../hooks/useRole';
import Swal from 'sweetalert2';
import DropdownMenu from '../components/DropdownMenu';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Overview = () => {
    const [allDonationRequests, setAllDonationRequests] = useState([]);
    const [donationRequests, setDonationRequests] = useState([]);
    const navigate = useNavigate();
    const { role } = useRole();

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [users, setUsers] = useState([]);


    const viewAll = () => navigate('/dashboard/all-requests')

    useEffect(() => {
        if (!user?.email) return;

        axiosSecure.get('/users', {
            params: {
                email: user.email
            }
        })
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [user, axiosSecure]);

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/donation-requests`)
            .then(res => {
                const sortedData = res.data
                    .sort(
                        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    );
                setAllDonationRequests(sortedData);
                setDonationRequests(sortedData.slice(0, 5))
            })
            .catch(err => console.error(err));
    }, []);


    const statusClasses = {
        pending: 'bg-yellow-100 text-yellow-800',
        done: 'bg-green-100 text-green-800',
    };

    const deleteDonationRequest = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to restore this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/donation-request/${id}`);

                    if (response.data.success) {
                        // toast.success('Donation request deleted successfully');
                        setDonationRequests(prev => prev.filter(req => req._id !== id));

                        Swal.fire("Deleted!", "Request has been removed.", "success");
                    }
                } catch (error) {
                    console.error('Failed to delete request:', error);
                    // toast.error(error.response?.data?.message || 'Failed to delete request');
                    Swal.fire("Error", "Failed to delete vehicle.", "error");
                }
            }
        })
    };


    return (
        <div>
            <h2 className="text-2xl font-semibold mb-8">Welcome Back!</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border-l-4 border-red-600 shadow">
                    <h4 className="text-gray-500 text-sm font-medium">Total Users</h4>
                    <h2 className="text-2xl font-bold mt-2">{users.length}</h2>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600 shadow">
                    <h4 className="text-gray-500 text-sm font-medium">Requests</h4>
                    <h2 className="text-2xl font-bold mt-2">{allDonationRequests.length}</h2>
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

                                    {(role === 'admin') && (
                                        <td className="px-0 py-4 text-slate-700">
                                            <DropdownMenu request={request} handleDelete={deleteDonationRequest} ></DropdownMenu>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {(role === 'admin' || role === 'volunteer') && (
                    <div className='flex justify-center'>
                        <button onClick={viewAll} className="mt-5 px-2 md:px-3 lg:px-4 py-1 md:py-2 h-fit rounded-lg bg-[#f05b5b] hover:bg-[#f14343] text-white font-semibold shadow text-[14px] md:text-[16px] hover:cursor-pointer mx-auto">
                            View All
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Overview;