import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useRole from '../hooks/useRole';
import Swal from 'sweetalert2';
import DropdownMenu from '../components/DropdownMenu';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import ScrollToTop from '../components/ScrollToTop';

const Overview = () => {
    const [allDonationRequests, setAllDonationRequests] = useState([]);
    const [donationRequests, setDonationRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { role } = useRole();

    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch users
                if (user?.email) {
                    const usersResponse = await axiosSecure.get('/users', {
                        params: { email: user.email }
                    });
                    setUsers(usersResponse.data);
                }

                // Fetch donation requests
                const requestsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests`);
                const sortedData = requestsResponse.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setAllDonationRequests(sortedData);
                setDonationRequests(sortedData.slice(0, 6));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, axiosSecure]);

    // Calculate statistics
    const stats = {
        totalUsers: users.length,
        totalRequests: allDonationRequests.length,
        pendingRequests: allDonationRequests.filter(req => req.donationStatus === 'pending').length,
        completedRequests: allDonationRequests.filter(req => req.donationStatus === 'done').length,
        urgentRequests: allDonationRequests.filter(req => req.donationStatus === 'urgent').length,
        totalFunds: 45000,
        thisMonthRequests: allDonationRequests.filter(req => {
            const requestDate = new Date(req.createdAt);
            const currentDate = new Date();
            return requestDate.getMonth() === currentDate.getMonth() &&
                requestDate.getFullYear() === currentDate.getFullYear();
        }).length
    };

    // Blood group distribution
    const bloodGroupStats = allDonationRequests.reduce((acc, req) => {
        acc[req.bloodGroup] = (acc[req.bloodGroup] || 0) + 1;
        return acc;
    }, {});

    const bloodTypeColors = {
        'A+': 'bg-red-100 text-red-800',
        'A-': 'bg-red-200 text-red-900',
        'B+': 'bg-blue-100 text-blue-800',
        'B-': 'bg-blue-200 text-blue-900',
        'AB+': 'bg-purple-100 text-purple-800',
        'AB-': 'bg-purple-200 text-purple-900',
        'O+': 'bg-green-100 text-green-800',
        'O-': 'bg-green-200 text-green-900'
    };

    const statusClasses = {
        pending: 'bg-yellow-100 text-yellow-800',
        done: 'bg-green-100 text-green-800',
        urgent: 'bg-red-100 text-red-800',
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
                        setDonationRequests(prev => prev.filter(req => req._id !== id));
                        setAllDonationRequests(prev => prev.filter(req => req._id !== id));
                        Swal.fire("Deleted!", "Request has been removed.", "success");
                    }
                } catch (error) {
                    console.error('Failed to delete request:', error);
                    Swal.fire("Error", "Failed to delete request.", "error");
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                Welcome Back, {user?.displayName || 'User'}! 👋
                            </h1>
                            <p className="text-gray-600">Here's what's happening with BloodBridge today</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Last updated: {new Date().toLocaleTimeString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-600 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Users</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalUsers}</p>
                                <p className="text-green-600 text-sm mt-1">
                                    <span className="inline-flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                        Active community
                                    </span>
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-600 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Total Requests</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalRequests}</p>
                                <p className="text-blue-600 text-sm mt-1">
                                    <span className="inline-flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        All time
                                    </span>
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-600 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Pending Requests</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingRequests}</p>
                                <p className="text-yellow-600 text-sm mt-1">
                                    <span className="inline-flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Awaiting donors
                                    </span>
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-600 hover:shadow-xl transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm font-medium">Emergency Fund</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">৳{stats.totalFunds.toLocaleString()}</p>
                                <p className="text-green-600 text-sm mt-1">
                                    <span className="inline-flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                        Available
                                    </span>
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Secondary Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Request Status</h3>
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Completed</span>
                                <span className="text-sm font-semibold text-green-600">{stats.completedRequests}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Pending</span>
                                <span className="text-sm font-semibold text-yellow-600">{stats.pendingRequests}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Urgent</span>
                                <span className="text-sm font-semibold text-red-600">{stats.urgentRequests}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">This Month</h3>
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-9 0h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" />
                                </svg>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-gray-900">{stats.thisMonthRequests}</p>
                            <p className="text-sm text-gray-600 mt-1">New requests</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Blood Groups</h3>
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                <span className="text-red-600 font-bold">🩸</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {Object.entries(bloodGroupStats).slice(0, 3).map(([bloodGroup, count]) => (
                                <div key={bloodGroup} className="flex items-center justify-between">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${bloodTypeColors[bloodGroup] || 'bg-gray-100 text-gray-800'}`}>
                                        {bloodGroup}
                                    </span>
                                    <span className="text-sm font-semibold text-gray-900">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button
                            onClick={() => navigate('/dashboard/create-request')}
                            className="flex flex-col items-center p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors group"
                        >
                            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">Create Request</span>
                        </button>

                        <button
                            onClick={() => navigate('/dashboard/all-requests')}
                            className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
                        >
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">All Requests</span>
                        </button>

                        <button
                            onClick={() => navigate('/dashboard/all-users')}
                            className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group"
                        >
                            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">Manage Users</span>
                        </button>

                        <button
                            onClick={() => navigate('/dashboard/funding')}
                            className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group"
                        >
                            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform mb-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">Emergency Fund</span>
                        </button>
                    </div>
                </div>

                {/* Recent Requests Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900">Recent Requests</h3>
                            {(role === 'admin' || role === 'volunteer') && (
                                <button
                                    onClick={() => navigate('/dashboard/all-requests')}
                                    className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
                                >
                                    View All →
                                </button>
                            )}
                        </div>
                    </div>

                    {donationRequests.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Recent Requests</h3>
                            <p className="text-gray-600">There are no donation requests at the moment.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                            Recipient
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                            Location
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                            Blood Group
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                            Date
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                            Action
                                        </th>
                                        {role === 'admin' && (
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                                Manage
                                            </th>
                                        )}
                                    </tr>
                                </thead>

                                <tbody>
                                    {donationRequests.map((request) => (
                                        <tr
                                            key={request._id}
                                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">
                                                    {request.recipientName}
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-gray-700">
                                                {request.recipientDistrict}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${bloodTypeColors[request.bloodGroup] || 'bg-gray-100 text-gray-800'}`}>
                                                    🩸 {request.bloodGroup}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusClasses[request.donationStatus] || 'bg-blue-100 text-blue-800'}`}>
                                                    {request.donationStatus === 'pending' && '⏳'}
                                                    {request.donationStatus === 'done' && '✅'}
                                                    {request.donationStatus === 'urgent' && '🚨'}
                                                    <span className="ml-1 capitalize">{request.donationStatus}</span>
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-gray-700">
                                                {new Date(request.donationDate).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </td>

                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => navigate(`/donation-request/${request._id}`)}
                                                    className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
                                                >
                                                    View Details
                                                </button>
                                            </td>

                                            {role === 'admin' && (
                                                <td className="px-6 py-4">
                                                    <DropdownMenu request={request} handleDelete={deleteDonationRequest} />
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <ScrollToTop />
        </div>
    );
};

export default Overview;