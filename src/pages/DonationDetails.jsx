import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import ScrollToTop from '../components/ScrollToTop';

const DonationDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [donationDetails, setDonationDetails] = useState({});
    const [requester, setRequester] = useState(null);
    const [donor, setDonor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const statusConfig = {
        pending: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800',
            icon: '⏳',
            label: 'Pending',
            description: 'Looking for a compatible donor'
        },
        done: {
            bg: 'bg-green-100',
            text: 'text-green-800',
            icon: '✅',
            label: 'Completed',
            description: 'Donation successfully completed'
        },
        urgent: {
            bg: 'bg-red-100',
            text: 'text-red-800',
            icon: '🚨',
            label: 'Urgent',
            description: 'Critical - needs immediate attention'
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch donation request first
                const donationRes = await axios.get(`${import.meta.env.VITE_API_URL}/donation-request/${id}`);
                setDonationDetails(donationRes.data);

                const { requesterId, donorId } = donationRes.data;

                // Fetch requester details
                if (requesterId) {
                    try {
                        const requesterRes = await axios.get(`${import.meta.env.VITE_API_URL}/users/${requesterId}`);
                        setRequester(requesterRes.data);
                    } catch (err) {
                        console.error("Failed to fetch requester:", err);
                    }
                }

                // Fetch donor details
                if (donorId) {
                    try {
                        const donorRes = await axios.get(`${import.meta.env.VITE_API_URL}/users/${donorId}`);
                        setDonor(donorRes.data);
                    } catch (err) {
                        console.error("Failed to fetch donor:", err);
                    }
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load donation details');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleDonateClick = () => {
        // Handle donation logic here
        console.log('User wants to donate');
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading donation details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Details</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={handleBackClick}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const currentStatus = statusConfig[donationDetails.donationStatus] || statusConfig.pending;
    const bloodTypeColor = bloodTypeColors[donationDetails.bloodGroup] || 'bg-gray-100 text-gray-800';

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-8">
                    <button
                        onClick={handleBackClick}
                        className="inline-flex items-center text-red-600 hover:text-red-700 font-medium mb-4 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Requests
                    </button>

                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                    Blood Donation Request
                                </h1>
                                <p className="text-gray-600">Help save a life by donating blood</p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <div className={`inline-flex items-center px-4 py-2 rounded-full ${currentStatus.bg} ${currentStatus.text}`}>
                                    <span className="text-lg mr-2">{currentStatus.icon}</span>
                                    <div>
                                        <div className="font-semibold">{currentStatus.label}</div>
                                        <div className="text-xs">{currentStatus.description}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Urgent Banner */}
                        {donationDetails.donationStatus === 'urgent' && (
                            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                                <div className="flex">
                                    <div className="shrink-0">
                                        <span className="text-2xl">🚨</span>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">Urgent Request</h3>
                                        <p className="text-sm text-red-700">This patient needs blood urgently. Please respond as soon as possible.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Patient Information */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-2xl">🏥</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Patient Information</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Patient Name</label>
                                        <p className="text-lg font-semibold text-gray-900 mt-1">{donationDetails.recipientName}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Blood Group</label>
                                        <div className="mt-1">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bloodTypeColor}`}>
                                                🩸 {donationDetails.bloodGroup}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Hospital</label>
                                        <p className="text-lg font-semibold text-gray-900 mt-1">{donationDetails.hospitalName}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Donation Date</label>
                                        <p className="text-lg font-semibold text-gray-900 mt-1">
                                            📅 {new Date(donationDetails.donationDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Donation Time</label>
                                        <p className="text-lg font-semibold text-gray-900 mt-1">⏰ {donationDetails.donationTime}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Contact Number</label>
                                        <p className="text-lg font-semibold text-gray-900 mt-1">📞 {donationDetails.contactNumber}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Location Information */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                    <span className="text-2xl">📍</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Location Details</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">District</label>
                                    <p className="text-lg font-semibold text-gray-900 mt-1">{donationDetails.recipientDistrict}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Upazila</label>
                                    <p className="text-lg font-semibold text-gray-900 mt-1">{donationDetails.recipientUpazila}</p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Full Address</label>
                                <p className="text-lg text-gray-900 mt-1 p-4 bg-gray-50 rounded-lg">{donationDetails.fullAddress}</p>
                            </div>
                        </div>

                        {/* Request Message */}
                        {donationDetails.requestMessage && (
                            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                                <div className="flex items-center mb-6">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                                        <span className="text-2xl">💬</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Message from Family</h2>
                                </div>
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                                    <p className="text-gray-800 italic">"{donationDetails.requestMessage}"</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Action Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Take Action</h3>

                            {donor ? (
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">✅</span>
                                    </div>
                                    <h4 className="text-lg font-semibold text-green-800 mb-2">Donor Found!</h4>
                                    <p className="text-green-600 text-sm mb-4">This request has been fulfilled by a generous donor.</p>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-sm text-green-700">Thank you to all who showed interest in helping!</p>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <button
                                        onClick={handleDonateClick}
                                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg mb-4"
                                    >
                                        <span className="flex items-center justify-center">
                                            <span className="text-xl mr-2">❤️</span>
                                            I Want to Donate
                                        </span>
                                    </button>
                                    <p className="text-xs text-gray-500 text-center">
                                        By clicking, you'll be connected with the requester to coordinate the donation.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Requester Information */}
                        {requester && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Requester Details</h3>
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-xl">👤</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{requester.name}</p>
                                        <p className="text-sm text-gray-600">{requester.email}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Donor Information */}
                        {donor && (
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Donor Details</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-xl">🦸</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{donor.name}</p>
                                            <p className="text-sm text-gray-600">{donor.email}</p>
                                        </div>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Blood Group:</span>
                                            <span className="text-sm font-semibold">{donor.bloodGroup}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Location:</span>
                                            <span className="text-sm font-semibold">{donor.district}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Emergency Contact */}
                        <div className="bg-red-50 rounded-2xl shadow-lg p-6 border border-red-200">
                            <h3 className="text-lg font-bold text-red-800 mb-3">Emergency Support</h3>
                            <p className="text-sm text-red-700 mb-4">
                                Need immediate assistance? Our emergency team is available 24/7.
                            </p>
                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                                📞 Call Emergency Hotline
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ScrollToTop />
        </div>
    );
};

export default DonationDetails;