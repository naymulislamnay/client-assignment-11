import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Loader from '../components/Loader';
import ScrollToTop from '../components/ScrollToTop';
import { useNavigate } from 'react-router';

const Profile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user?.email) {
            axiosSecure
                .get(`/users/${encodeURIComponent(user.email)}`)
                .then(res => {
                    setUserData(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user, axiosSecure]);

    // Blood type colors
    const bloodTypeColors = {
        'A+': 'bg-red-100 text-red-800 border-red-200',
        'A-': 'bg-red-200 text-red-900 border-red-300',
        'B+': 'bg-blue-100 text-blue-800 border-blue-200',
        'B-': 'bg-blue-200 text-blue-900 border-blue-300',
        'AB+': 'bg-purple-100 text-purple-800 border-purple-200',
        'AB-': 'bg-purple-200 text-purple-900 border-purple-300',
        'O+': 'bg-green-100 text-green-800 border-green-200',
        'O-': 'bg-green-200 text-green-900 border-green-300'
    };

    // Role colors
    const roleColors = {
        'admin': 'bg-red-100 text-red-800',
        'donor': 'bg-green-100 text-green-800',
        'volunteer': 'bg-blue-100 text-blue-800'
    };

    // Mock statistics (in a real app, these would come from API)
    const userStats = {
        totalDonations: 5,
        totalRequests: 3,
        livesImpacted: 15,
        joinedDays: Math.floor((new Date() - new Date(userData?.createdAt)) / (1000 * 60 * 60 * 24)) || 0
    };

    if (loading) return <Loader></Loader>;

    if (!userData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h2>
                    <p className="text-gray-600 mb-6">Failed to load user profile data.</p>
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
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
                    <p className="text-gray-600">Manage your BloodBridge profile and donation history</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            {/* Cover Background */}
                            <div className="h-32 bg-linear-to-r from-red-600 via-red-700 to-red-800 relative">
                                <div className="absolute inset-0 bg-black/20"></div>
                                <div className="absolute top-4 right-4">
                                    <button
                                        onClick={() => setIsEditing(!isEditing)}
                                        className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors backdrop-blur-sm"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Profile Content */}
                            <div className="px-8 pb-8">
                                {/* Profile Picture */}
                                <div className="relative -mt-16 mb-6">
                                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                                        <img
                                            src={userData.photoURL || '/public/default-Profile.png'}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                                        <span className="text-white text-xs">✓</span>
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="space-y-4">
                                    <div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                            {userData.name}
                                        </h2>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${roleColors[userData.role] || 'bg-gray-100 text-gray-800'}`}>
                                                {userData.role === 'admin' && '👑'}
                                                {userData.role === 'donor' && '🩸'}
                                                {userData.role === 'volunteer' && '🤝'}
                                                <span className="ml-1 capitalize">{userData.role}</span>
                                            </span>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border-2 ${bloodTypeColors[userData.bloodGroup] || 'bg-gray-100 text-gray-800 border-gray-200'}`}>
                                                🩸 {userData.bloodGroup}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Email</p>
                                                <p className="font-medium text-gray-900">{userData.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V6a2 2 0 012-2h4a2 2 0 012 2v1m-6 0h8m-9 0h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Member Since</p>
                                                <p className="font-medium text-gray-900">
                                                    {new Date(userData.createdAt).toLocaleDateString('en-US', {
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Location Info */}
                                    <div className="p-4 bg-linear-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                            <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Location Details
                                        </h3>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Division</p>
                                                <p className="font-semibold text-gray-900">{userData.division}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">District</p>
                                                <p className="font-semibold text-gray-900">{userData.district}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Upazila</p>
                                                <p className="font-semibold text-gray-900">{userData.upazila}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <button
                                    onClick={() => navigate('/dashboard/create-request')}
                                    className="flex items-center p-4 bg-red-50 hover:bg-red-100 rounded-xl transition-colors group"
                                >
                                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold text-gray-900">Create Request</h4>
                                        <p className="text-sm text-gray-600">Request blood donation</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => navigate('/dashboard/my-requests')}
                                    className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
                                >
                                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold text-gray-900">My Requests</h4>
                                        <p className="text-sm text-gray-600">View your requests</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => navigate('/donation-requests')}
                                    className="flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors group"
                                >
                                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold text-gray-900">Find Donors</h4>
                                        <p className="text-sm text-gray-600">Browse donation requests</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => navigate('/dashboard/funding')}
                                    className="flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors group"
                                >
                                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold text-gray-900">Emergency Fund</h4>
                                        <p className="text-sm text-gray-600">Financial assistance</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Stats & Activity */}
                    <div className="space-y-6">
                        {/* Statistics Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Your Impact</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                                            <span className="text-white font-bold">🩸</span>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-gray-600">Total Donations</p>
                                            <p className="text-2xl font-bold text-gray-900">{userStats.totalDonations}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                            <span className="text-white font-bold">📋</span>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-gray-600">Requests Made</p>
                                            <p className="text-2xl font-bold text-gray-900">{userStats.totalRequests}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                                            <span className="text-white font-bold">❤️</span>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-gray-600">Lives Impacted</p>
                                            <p className="text-2xl font-bold text-gray-900">{userStats.livesImpacted}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                                            <span className="text-white font-bold">📅</span>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-gray-600">Days Active</p>
                                            <p className="text-2xl font-bold text-gray-900">{userStats.joinedDays}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Achievement Badge */}
                        <div className="bg-linear-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl shadow-lg p-6 text-white">
                            <div className="text-center">
                                <div className="text-4xl mb-3">🏆</div>
                                <h3 className="text-xl font-bold mb-2">Life Saver</h3>
                                <p className="text-yellow-100 text-sm">
                                    You've made a significant impact in your community through blood donation!
                                </p>
                            </div>
                        </div>

                        {/* Blood Compatibility Info */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Blood Compatibility</h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">Can donate to:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {userData.bloodGroup === 'O-' && (
                                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">All blood types</span>
                                        )}
                                        {userData.bloodGroup === 'O+' && (
                                            <>
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">O+</span>
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">A+</span>
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">B+</span>
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">AB+</span>
                                            </>
                                        )}
                                        {(userData.bloodGroup === 'A+' || userData.bloodGroup === 'A-') && (
                                            <>
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">A+</span>
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">AB+</span>
                                            </>
                                        )}
                                        {(userData.bloodGroup === 'B+' || userData.bloodGroup === 'B-') && (
                                            <>
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">B+</span>
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">AB+</span>
                                            </>
                                        )}
                                        {(userData.bloodGroup === 'AB+' || userData.bloodGroup === 'AB-') && (
                                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">AB+</span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-2">Can receive from:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {userData.bloodGroup === 'AB+' && (
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">All blood types</span>
                                        )}
                                        {userData.bloodGroup === 'O+' && (
                                            <>
                                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">O+</span>
                                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">O-</span>
                                            </>
                                        )}
                                        {userData.bloodGroup === 'O-' && (
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">O-</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ScrollToTop />
        </div>
    );
};

export default Profile;