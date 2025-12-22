import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const DonationDetails = () => {
    const { id } = useParams();
    const [donationDetails, setDonationDetails] = useState({});
    const [requester, setRequester] = useState(null);
    const [donor, setDonor] = useState(null);

    const statusClasses = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Done: 'bg-green-100 text-green-800',
    };

    useEffect(() => {
        // Fetch donation request first
        axios.get(`${import.meta.env.VITE_API_URL}/donation-request/${id}`)
            .then(async res => {
                setDonationDetails(res.data);

                const { requesterId, donorId } = res.data;

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
            })
            .catch(err => console.error(err));
    }, [id]);

    return (
        <div className="max-w-3xl mx-auto mt-12 p-4">
            <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6">
                <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Request Details</h2>
                    <span className={`px-3 py-1 rounded-full font-semibold text-sm  ${statusClasses[donationDetails.donationStatus] || 'bg-blue-100 text-blue-800'}`}>
                        Status: {donationDetails.donationStatus}
                    </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <p><span className="font-semibold">Recipient:</span> {donationDetails.recipientName}</p>
                    <p><span className="font-semibold">District:</span> {donationDetails.recipientDistrict}</p>
                    <p><span className="font-semibold">Upazila:</span> {donationDetails.recipientUpazila}</p>
                    <p><span className="font-semibold">Hospital:</span> {donationDetails.hospitalName}</p>
                    <p className="sm:col-span-2"><span className="font-semibold">Address:</span> {donationDetails.fullAddress}</p>
                    <p><span className="font-semibold">Blood Group:</span> {donationDetails.bloodGroup}</p>
                    <p><span className="font-semibold">Donation Date:</span> {donationDetails.donationDate}</p>
                    <p><span className="font-semibold">Donation Time:</span> {donationDetails.donationTime}</p>
                    <p className="sm:col-span-2"><span className="font-semibold">Contact Number:</span> {donationDetails.contactNumber}</p>
                    <p className="sm:col-span-2"><span className="font-semibold">Message:</span> {donationDetails.requestMessage}</p>
                </div>

                {/* Requester & Donor Details */}
                <div className='flex'>
                    {requester && (
                        <div className="mb-6 w-1/2">
                            <h3 className="text-xl font-bold mb-2">Requester Details</h3>
                            <p><span className="font-semibold">Name:</span> {requester.name}</p>
                            <p><span className="font-semibold">Email:</span> {requester.email}</p>
                        </div>
                    )}
                    {donor && (
                        <div className="mb-6">
                            <h3 className="text-xl font-bold mb-2">Donor Details</h3>
                            <p><span className="font-semibold">Name:</span> {donor.name}</p>
                            <p><span className="font-semibold">Email:</span> {donor.email}</p>
                            <p><span className="font-semibold">Blood Group:</span> {donor.bloodGroup}</p>
                            <p><span className="font-semibold">Division:</span> {donor.division}</p>
                            <p><span className="font-semibold">District:</span> {donor.district}</p>
                            <p><span className="font-semibold">Upazila:</span> {donor.upazila}</p>
                        </div>
                    )}
                </div>

                <button
                    className={`w-full text-white font-semibold py-3 rounded-lg transition-colors hover:cursor-pointer ${donor ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                    disabled={!!donor}
                >
                    {donor ? 'Donor Found Already' : 'I Want to Donate'}
                </button>

            </div>
        </div>
    );
};

export default DonationDetails;