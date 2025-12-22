import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Profile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <main className="main-content flex justify-center items-center h-screen">
                <p className="text-gray-500 text-xl">Loading profile...</p>
            </main>
        );
    }

    if (!userData) {
        return (
            <main className="main-content flex justify-center items-center h-screen">
                <p className="text-red-500 text-xl">Failed to load user data.</p>
            </main>
        );
    }

    return (
        <main className="main-content p-6">
            <h2 className="text-2xl font-bold mb-6">Profile</h2>
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <img
                        src={userData.photoURL || '/default-Profile.png'}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-2 border-red-600"
                    />
                    <div className="flex-1 space-y-2">
                        <h3 className="text-2xl font-semibold">{userData.name}</h3>
                        <p className="text-gray-500">Email: <span className='text-black font-semibold'>{userData.email}</span></p>
                        <p className="text-gray-500">Role: <span className='text-black font-semibold'>{userData.role}</span></p>
                        <p className="text-gray-500">Blood Group: <span className='text-black font-semibold'>{userData.bloodGroup}</span></p>
                        <p className="text-gray-500">Division: <span className='text-black font-semibold'>{userData.division}</span></p>
                        <p className="text-gray-500">District: <span className='text-black font-semibold'>{userData.district}</span></p>
                        <p className="text-gray-500">Upazila: <span className='text-black font-semibold'>{userData.upazila}</span></p>
                        <p className="text-gray-400 text-sm">
                            Joined: <span className='text-black font-semibold'>{new Date(userData.createdAt).toLocaleDateString()}</span>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;