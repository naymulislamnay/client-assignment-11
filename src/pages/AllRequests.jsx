import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import DropdownMenu from '../components/DropdownMenu';
// import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useRole from '../hooks/useRole';

const AllRequests = () => {
    const [donationRequests, setDonationRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { role } = useRole();

    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [sortBy, setSortBy] = useState('donationDate');
    const [sortOrder, setSortOrder] = useState('desc');

    // Filter options
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const statusOptions = ['pending', 'done', 'urgent'];

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests`);
                const sortedData = response.data.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setDonationRequests(sortedData);
                setFilteredRequests(sortedData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    // Filter and search functionality
    useEffect(() => {
        let filtered = [...donationRequests];

        // Text search
        if (searchTerm) {
            filtered = filtered.filter(request =>
                request.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.recipientDistrict.toLowerCase().includes(searchTerm.toLowerCase()) ||
                request.hospitalName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Blood group filter
        if (selectedBloodGroup) {
            filtered = filtered.filter(request => request.bloodGroup === selectedBloodGroup);
        }

        // Status filter
        if (selectedStatus) {
            filtered = filtered.filter(request => request.donationStatus === selectedStatus);
        }

        // Location filter
        if (selectedLocation) {
            filtered = filtered.filter(request =>
                request.recipientDistrict.toLowerCase().includes(selectedLocation.toLowerCase())
            );
        }

        // Date filter
        if (dateFilter) {
            const filterDate = new Date(dateFilter);
            filtered = filtered.filter(request => {
                const requestDate = new Date(request.donationDate);
                return requestDate >= filterDate;
            });
        }

        // Sorting
        filtered.sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'donationDate':
                    aValue = new Date(a.donationDate);
                    bValue = new Date(b.donationDate);
                    break;
                case 'bloodGroup':
                    aValue = a.bloodGroup;
                    bValue = b.bloodGroup;
                    break;
                case 'location':
                    aValue = a.recipientDistrict;
                    bValue = b.recipientDistrict;
                    break;
                case 'status':
                    aValue = a.donationStatus;
                    bValue = b.donationStatus;
                    break;
                case 'recipientName':
                    aValue = a.recipientName;
                    bValue = b.recipientName;
                    break;
                default:
                    aValue = a.donationDate;
                    bValue = b.donationDate;
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredRequests(filtered);
    }, [donationRequests, searchTerm, selectedBloodGroup, selectedStatus, selectedLocation, dateFilter, sortBy, sortOrder]);

    // Clear all filters
    const clearFilters = () => {
        setSearchTerm('');
        setSelectedBloodGroup('');
        setSelectedStatus('');
        setSelectedLocation('');
        setDateFilter('');
        setSortBy('donationDate');
        setSortOrder('desc');
    };

    // Get unique locations for filter dropdown
    const uniqueLocations = [...new Set(donationRequests.map(request => request.recipientDistrict))];

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
                        // Update both arrays
                        setDonationRequests(prev => prev.filter(req => req._id !== id));
                        setFilteredRequests(prev => prev.filter(req => req._id !== id));

                        Swal.fire("Deleted!", "Request has been removed.", "success");
                    }
                } catch (error) {
                    console.error('Failed to delete request:', error);
                    // toast.error(error.response?.data?.message || 'Failed to delete request');
                    Swal.fire("Error", "Failed to delete request.", "error");
                }
            }
        })
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading requests...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">All Requests</h2>
                    <p className="text-gray-600">Manage all blood donation requests in the system</p>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Search & Filter</h3>
                    <button
                        onClick={clearFilters}
                        className="text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
                    >
                        Clear All Filters
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    {/* Search Bar */}
                    <div className="xl:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by name, location, hospital..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Blood Group Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                        <select
                            value={selectedBloodGroup}
                            onChange={(e) => setSelectedBloodGroup(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                            <option value="">All Blood Groups</option>
                            {bloodGroups.map(group => (
                                <option key={group} value={group}>{group}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                            <option value="">All Statuses</option>
                            {statusOptions.map(status => (
                                <option key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Location Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <select
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                            <option value="">All Locations</option>
                            {uniqueLocations.map(location => (
                                <option key={location} value={location}>{location}</option>
                            ))}
                        </select>
                    </div>

                    {/* Date Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Sort Options */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            >
                                <option value="donationDate">Donation Date</option>
                                <option value="bloodGroup">Blood Group</option>
                                <option value="location">Location</option>
                                <option value="status">Status</option>
                                <option value="recipientName">Recipient Name</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <p className="text-sm text-gray-600">
                            Showing {filteredRequests.length} of {donationRequests.length} requests
                        </p>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            {filteredRequests.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Requests Found</h3>
                    <p className="text-gray-600 mb-6">
                        {donationRequests.length === 0
                            ? "There are no donation requests at the moment."
                            : "No requests match your current filters. Try adjusting your search criteria."
                        }
                    </p>
                    {donationRequests.length > 0 && (
                        <button
                            onClick={clearFilters}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
            ) : (
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
                                    {(role === 'admin') && (
                                        <th className="px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                            Manage
                                        </th>
                                    )}
                                </tr>
                            </thead>

                            <tbody>
                                {filteredRequests.map((request) => (
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
                                            {new Date(request.donationDate).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </td>

                                        <td className="px-4 py-4">
                                            <button id={request._id}
                                                onClick={() => navigate(`/donation-request/${request._id}`)}
                                                className="inline-block px-4 py-1.5 text-sm font-semibold text-[#f14343] border border-[#f14343] rounded-lg hover:bg-[#f14343] hover:text-white transition hover:cursor-pointer">
                                                View Details
                                            </button>
                                        </td>

                                        {(role === 'admin') && (
                                            <td className="px-4 py-4 text-slate-700">
                                                <DropdownMenu request={request} handleDelete={deleteDonationRequest} ></DropdownMenu>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllRequests;