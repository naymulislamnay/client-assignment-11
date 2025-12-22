import React, { useState } from 'react';
import axios from 'axios';

const CreateDonationModal = ({ isOpen, onClose, onCreated }) => {
    const [formData, setFormData] = useState({
        requesterEmail: '',
        recipientName: '',
        recipientDivision: '',
        recipientDistrict: '',
        recipientUpazila: '',
        hospitalName: '',
        fullAddress: '',
        bloodGroup: '',
        donationDate: '',
        donationTime: '',
        contactNumber: '',
        requestMessage: '',
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.post(`${import.meta.env.VITE_API_URL}/donation-requests`, formData);
        onCreated();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-[500px]">
                <input name="requesterEmail" placeholder="Requester Email" onChange={handleChange} required />
                <input name="recipientName" placeholder="Recipient Name" onChange={handleChange} required />
                <input name="recipientDivision" placeholder="Division" onChange={handleChange} />
                <input name="recipientDistrict" placeholder="District" onChange={handleChange} />
                <input name="recipientUpazila" placeholder="Upazila" onChange={handleChange} />
                <input name="hospitalName" placeholder="Hospital" onChange={handleChange} />
                <input name="bloodGroup" placeholder="Blood Group" onChange={handleChange} required />
                <input type="date" name="donationDate" onChange={handleChange} required />
                <input type="time" name="donationTime" onChange={handleChange} required />
                <textarea name="requestMessage" onChange={handleChange} />
                <button className="bg-red-600 text-white w-full mt-3 py-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateDonationModal;