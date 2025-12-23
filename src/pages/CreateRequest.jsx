import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';

const CreateRequest = () => {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
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
        donationStatus: 'pending',
        donorEmail: ''
    });

    const [divisions, setDivisions] = useState([]);
    const [selectedDivisionId, setSelectedDivisionId] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedDistrictId, setSelectedDistrictId] = useState('');
    const [upazilas, setUpazilas] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/all-divisions`)
            .then(res => res.json())
            .then(data => setDivisions(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (!selectedDivisionId) return;

        fetch(`${import.meta.env.VITE_API_URL}/districts?divisionId=${selectedDivisionId}`)
            .then(res => res.json())
            .then(data => setDistricts(data))
            .catch(err => console.error(err));
    }, [selectedDivisionId]);

    useEffect(() => {
        if (!selectedDistrictId) return;

        fetch(`${import.meta.env.VITE_API_URL}/upazilas?districtId=${selectedDistrictId}`)
            .then(res => res.json())
            .then(data => setUpazilas(data))
            .catch(err => console.error(err));
    }, [selectedDistrictId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?.email) {
            Swal.fire('Error', 'You must be logged in to create a request.', 'error');
            return;
        }

        try {
            const payload = {
                ...formData,
                requesterEmail: user.email,
                donorEmail: ''
            };

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/donation-requests`, payload);

            if (response.data.success) {
                Swal.fire('Success', 'Donation request created successfully!', 'success');
                setFormData({
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
                    donationStatus: 'pending',
                    donorEmail: ''
                });
                setSelectedDivisionId('');
                setSelectedDistrictId('');
                setDistricts([]);
                setUpazilas([]);
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', error.response?.data?.message || 'Failed to create request', 'error');
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
            <h2 className="text-3xl font-bold mb-6 text-center text-red-600">Create Donation Request</h2>
            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-2 gap-2">
                    {/* Recipient Name */}
                    <div>
                        <label className="block font-semibold mb-1">Recipient Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="recipientName"
                            value={formData.recipientName}
                            onChange={handleChange}
                            placeholder="Recipient Name"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                            required
                        />
                    </div>


                    {/* Blood Group */}

                    <div>
                        <label className="block font-semibold mb-1">Blood Group <span className="text-red-500">*</span></label>
                        <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                            required
                        >
                            <option value="">Select Blood Group</option>
                            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                                <option key={bg} value={bg}>{bg}</option>
                            ))}
                        </select>
                    </div>


                    {/* Division */}
                    <div>
                        <label className="block font-semibold mb-1">Division <span className="text-red-500">*</span></label>
                        <select
                            value={selectedDivisionId}
                            onChange={(e) => {
                                const divId = e.target.value;
                                const division = divisions.find(d => d.id === divId);
                                setSelectedDivisionId(divId);
                                setFormData(prev => ({
                                    ...prev,
                                    recipientDivision: division?.name || '',
                                    recipientDistrict: '',
                                    recipientUpazila: ''
                                }));
                                setDistricts([]);
                                setUpazilas([]);
                            }}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                            required
                        >
                            <option value="">Select Division</option>
                            {divisions.map(d => (
                                <option key={d._id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* District */}
                    <div>
                        <label className="block font-semibold mb-1">District <span className="text-red-500">*</span></label>
                        <select
                            value={selectedDistrictId}
                            onChange={(e) => {
                                const distId = e.target.value;
                                const district = districts.find(d => d.id === distId);
                                setSelectedDistrictId(distId);
                                setFormData(prev => ({
                                    ...prev,
                                    recipientDistrict: district?.name || '',
                                    recipientUpazila: ''
                                }));
                                setUpazilas([]);
                            }}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                            disabled={!districts.length}
                            required
                        >
                            <option value="">Select District</option>
                            {districts.map(d => (
                                <option key={d._id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Upazila */}
                    <div>
                        <label className="block font-semibold mb-1">Upazila <span className="text-red-500">*</span></label>
                        <select
                            name="recipientUpazila"
                            value={formData.recipientUpazila}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                            disabled={!upazilas.length}
                            required
                        >
                            <option value="">Select Upazila</option>
                            {upazilas.map(u => (
                                <option key={u._id} value={u.name}>{u.name}</option>
                            ))}
                        </select>
                    </div>


                    {/* Full Address */}
                    <div>
                        <label className="block font-semibold mb-1">Full Address</label>
                        <input
                            type="text"
                            name="fullAddress"
                            value={formData.fullAddress}
                            onChange={handleChange}
                            placeholder="Full Address"
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                        />
                    </div>

                    {/* Hospital Name */}
                    <div>
                        <label className="block font-semibold mb-1">Hospital Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="hospitalName"
                            value={formData.hospitalName}
                            onChange={handleChange}
                            placeholder="Hospital Name"
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                        />
                    </div>

                    {/* Contact Number */}
                    <div>
                        <label className="block font-semibold mb-1">Contact Number <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            placeholder="Contact Number"
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                        />
                    </div>

                    {/* Donation Date */}
                    <div>
                        <label className="block font-semibold mb-1">Donation Date <span className="text-red-500">*</span></label>
                        <input
                            type="date"
                            name="donationDate"
                            value={formData.donationDate}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                        />
                    </div>

                    {/* Donation Time */}
                    <div>
                        <label className="block font-semibold mb-1">Donation Time <span className="text-red-500">*</span></label>
                        <input
                            type="time"
                            name="donationTime"
                            value={formData.donationTime}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                        />
                    </div>
                </div>



                {/* Request Message */}
                <div className='mt-3'>
                    <label className="block font-semibold mb-1">Request Message</label>
                    <textarea
                        name="requestMessage"
                        value={formData.requestMessage}
                        onChange={handleChange}
                        placeholder="Request Message"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                        rows={4}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition transform hover:scale-105"
                >
                    Create Request
                </button>
            </form>
        </div>
    );
};

export default CreateRequest;
