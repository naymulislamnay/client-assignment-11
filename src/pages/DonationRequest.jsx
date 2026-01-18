import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import ScrollToTop from '../components/ScrollToTop';

const DonationRequest = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [donationRequests, setDonationRequests] = useState([]);
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [sortBy, setSortBy] = useState('donationDate');
    const [sortOrder, setSortOrder] = useState('asc');

    // Filter options
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const statusOptions = ['pending', 'done', 'urgent'];

    const handleCreateRequest = () => {
        if (user) {
            navigate('/dashboard/create-request');
        } else {
            navigate('/login', {
                state: '/dashboard/create-request',
            });
        }
    };

    const statusConfig = {
        pending: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800',
            icon: '⏳',
            label: 'Pending'
        },
        done: {
            bg: 'bg-green-100',
            text: 'text-green-800',
            icon: '✅',
            label: 'Completed'
        },
        urgent: {
            bg: 'bg-red-100',
            text: 'text-red-800',
            icon: '🚨',
            label: 'Urgent'
        }
    };

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

    // Fetch donation requests
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/donation-requests`);
                setDonationRequests(response.data);
                setFilteredRequests(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load donation requests');
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
        setSortOrder('asc');
    };

    // Get unique locations for filter dropdown
    const uniqueLocations = [...new Set(donationRequests.map(request => request.recipientDistrict))];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading donation requests...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Requests</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                Blood Donation Requests
                            </h1>
                            <p className="text-gray-600">Find and respond to blood donation requests in your area</p>
                        </div>
                        <div className="mt-4 md:mt-0">
                            <button
                                onClick={handleCreateRequest}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                <span className="flex items-center">
                                    <span className="text-lg mr-2">➕</span>
                                    Create Request
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">Search & Filter</h2>
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
                                            {statusConfig[status]?.label || status}
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
                </div>

                {/* Results Section */}
                {filteredRequests.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
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
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredRequests.map((request) => {
                            const currentStatus = statusConfig[request.donationStatus] || statusConfig.pending;
                            const bloodTypeColor = bloodTypeColors[request.bloodGroup] || 'bg-gray-100 text-gray-800';

                            return (
                                <div
                                    key={request._id}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                                >
                                    {/* Card Header */}
                                    <div className="p-6 pb-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`inline-flex items-center px-3 py-1 rounded-full ${currentStatus.bg} ${currentStatus.text}`}>
                                                <span className="mr-1">{currentStatus.icon}</span>
                                                <span className="text-sm font-medium">{currentStatus.label}</span>
                                            </div>
                                            {request.donationStatus === 'urgent' && (
                                                <div className="animate-pulse">
                                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                                        URGENT
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {request.recipientName}
                                        </h3>

                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <span className="text-gray-500 text-sm w-20">Blood:</span>
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${bloodTypeColor}`}>
                                                    🩸 {request.bloodGroup}
                                                </span>
                                            </div>

                                            <div className="flex items-center">
                                                <span className="text-gray-500 text-sm w-20">Location:</span>
                                                <span className="text-gray-900 font-medium">📍 {request.recipientDistrict}</span>
                                            </div>

                                            <div className="flex items-center">
                                                <span className="text-gray-500 text-sm w-20">Date:</span>
                                                <span className="text-gray-900 font-medium">
                                                    📅 {new Date(request.donationDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>

                                            <div className="flex items-center">
                                                <span className="text-gray-500 text-sm w-20">Hospital:</span>
                                                <span className="text-gray-900 font-medium text-sm">🏥 {request.hospitalName}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Footer */}
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                        <button
                                            onClick={() => navigate(`/donation-request/${request._id}`)}
                                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                                        >
                                            View Details & Donate
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <ScrollToTop />
        </div>
    );
};

export default DonationRequest;