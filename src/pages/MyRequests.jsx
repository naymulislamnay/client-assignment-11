import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';
import DropdownMenu from '../components/DropdownMenu';
import { useNavigate } from 'react-router';
import Loader from '../components/Loader';

const MyRequests = () => {
    const { user } = useAuth();
    const [myRequests, setMyRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.email) return;

        const fetchRequests = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests/requester`, {
                    params: { requesterEmail: user.email }
                });
                setMyRequests(response.data);
            } catch (error) {
                console.error(error);
                Swal.fire('Error', 'Failed to fetch your donation requests', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [user]);

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
                        setMyRequests(prev => prev.filter(req => req._id !== id));

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

    if (loading) return <Loader></Loader>;

    if (!myRequests.length) return <p className="text-center mt-4">No donation requests found.</p>;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-8">All Requests</h2>

            <div className="bg-white p-6 rounded-lg shadow">
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
                            {myRequests.map((request) => (
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

                                    <td className="px-0 py-4 text-slate-700">
                                        <DropdownMenu request={request} handleDelete={deleteDonationRequest} ></DropdownMenu>
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

export default MyRequests;