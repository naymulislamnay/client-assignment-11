import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import ScrollToTop from '../components/ScrollToTop';

const CreateRequest = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        donorEmail: '',
        urgencyLevel: 'normal'
    });

    const [divisions, setDivisions] = useState([]);
    const [selectedDivisionId, setSelectedDivisionId] = useState('');
    const [districts, setDistricts] = useState([]);
    const [selectedDistrictId, setSelectedDistrictId] = useState('');
    const [upazilas, setUpazilas] = useState([]);

    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
    const urgencyLevels = [
        { value: 'normal', label: 'Normal', icon: '📅', color: 'blue' },
        { value: 'urgent', label: 'Urgent', icon: '⚡', color: 'orange' },
        { value: 'critical', label: 'Critical', icon: '🚨', color: 'red' }
    ];

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

    // Fetch divisions on component mount
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/all-divisions`)
            .then(res => res.json())
            .then(data => setDivisions(data))
            .catch(err => console.error(err));
    }, []);

    // Fetch districts when division changes
    useEffect(() => {
        if (!selectedDivisionId) return;

        fetch(`${import.meta.env.VITE_API_URL}/districts?divisionId=${selectedDivisionId}`)
            .then(res => res.json())
            .then(data => setDistricts(data))
            .catch(err => console.error(err));
    }, [selectedDivisionId]);

    // Fetch upazilas when district changes
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

    const handleBloodGroupSelect = (bloodGroup) => {
        setFormData(prev => ({ ...prev, bloodGroup }));
    };

    const handleUrgencySelect = (urgency) => {
        setFormData(prev => ({
            ...prev,
            urgencyLevel: urgency,
            donationStatus: urgency === 'critical' ? 'urgent' : 'pending'
        }));
    };

    const validateStep = (step) => {
        switch (step) {
            case 1:
                return formData.recipientName && formData.bloodGroup && formData.urgencyLevel;
            case 2:
                return formData.recipientDivision && formData.recipientDistrict && formData.recipientUpazila;
            case 3:
                return formData.hospitalName && formData.donationDate && formData.donationTime && formData.contactNumber;
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 4));
        } else {
            Swal.fire('Incomplete', 'Please fill in all required fields before proceeding.', 'warning');
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?.email) {
            Swal.fire('Error', 'You must be logged in to create a request.', 'error');
            return;
        }

        if (!validateStep(3)) {
            Swal.fire('Incomplete', 'Please fill in all required fields.', 'warning');
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = {
                ...formData,
                requesterEmail: user.email,
                donorEmail: ''
            };

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/donation-requests`, payload);

            if (response.data.success) {
                await Swal.fire({
                    title: 'Success!',
                    text: 'Your blood donation request has been created successfully!',
                    icon: 'success',
                    confirmButtonColor: '#dc2626'
                });

                navigate('/donation-requests');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', error.response?.data?.message || 'Failed to create request', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStepIndicator = () => (
        <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step <= currentStep
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}>
                        {step < currentStep ? '✓' : step}
                    </div>
                    {step < 4 && (
                        <div className={`w-16 h-1 mx-2 ${step < currentStep ? 'bg-red-600' : 'bg-gray-200'
                            }`} />
                    )}
                </div>
            ))}
        </div>
    );

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Patient Information</h2>
                <p className="text-gray-600">Tell us about the patient who needs blood</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Patient Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="recipientName"
                        value={formData.recipientName}
                        onChange={handleChange}
                        placeholder="Enter patient's full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Enter contact number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                    Blood Group Required <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                    {bloodGroups.map((group) => (
                        <button
                            key={group}
                            type="button"
                            onClick={() => handleBloodGroupSelect(group)}
                            className={`p-4 rounded-lg border-2 font-semibold transition-all hover:scale-105 ${formData.bloodGroup === group
                                    ? bloodTypeColors[group] || 'bg-red-100 text-red-800 border-red-300'
                                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            🩸 {group}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                    Urgency Level <span className="text-red-500">*</span>
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                    {urgencyLevels.map((level) => (
                        <button
                            key={level.value}
                            type="button"
                            onClick={() => handleUrgencySelect(level.value)}
                            className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${formData.urgencyLevel === level.value
                                    ? `bg-${level.color}-100 text-${level.color}-800 border-${level.color}-300`
                                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            <div className="text-2xl mb-2">{level.icon}</div>
                            <div className="font-semibold">{level.label}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Location Details</h2>
                <p className="text-gray-600">Where is the patient located?</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Division <span className="text-red-500">*</span>
                    </label>
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        required
                    >
                        <option value="">Select Division</option>
                        {divisions.map(d => (
                            <option key={d._id} value={d.id}>{d.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        District <span className="text-red-500">*</span>
                    </label>
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        disabled={!districts.length}
                        required
                    >
                        <option value="">Select District</option>
                        {districts.map(d => (
                            <option key={d._id} value={d.id}>{d.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upazila <span className="text-red-500">*</span>
                    </label>
                    <select
                        name="recipientUpazila"
                        value={formData.recipientUpazila}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        disabled={!upazilas.length}
                        required
                    >
                        <option value="">Select Upazila</option>
                        {upazilas.map(u => (
                            <option key={u._id} value={u.name}>{u.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address
                </label>
                <textarea
                    name="fullAddress"
                    value={formData.fullAddress}
                    onChange={handleChange}
                    placeholder="Enter complete address with landmarks"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Hospital & Schedule</h2>
                <p className="text-gray-600">When and where should donors come?</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleChange}
                    placeholder="Enter hospital or clinic name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    required
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Donation Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        name="donationDate"
                        value={formData.donationDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="time"
                        name="donationTime"
                        value={formData.donationTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        required
                    />
                </div>
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Additional Message</h2>
                <p className="text-gray-600">Any additional information for potential donors</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message to Donors (Optional)
                </label>
                <textarea
                    name="requestMessage"
                    value={formData.requestMessage}
                    onChange={handleChange}
                    placeholder="Share any additional details, medical condition, or heartfelt message that might help donors understand the urgency..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
            </div>

            {/* Summary Card */}
            <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Summary</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><span className="font-medium">Patient:</span> {formData.recipientName}</div>
                    <div><span className="font-medium">Blood Group:</span> {formData.bloodGroup}</div>
                    <div><span className="font-medium">Location:</span> {formData.recipientDistrict}</div>
                    <div><span className="font-medium">Hospital:</span> {formData.hospitalName}</div>
                    <div><span className="font-medium">Date:</span> {formData.donationDate}</div>
                    <div><span className="font-medium">Time:</span> {formData.donationTime}</div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Create Blood Donation Request
                    </h1>
                    <p className="text-xl text-gray-600">
                        Help us connect you with potential blood donors
                    </p>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {renderStepIndicator()}

                    <form onSubmit={handleSubmit}>
                        {currentStep === 1 && renderStep1()}
                        {currentStep === 2 && renderStep2()}
                        {currentStep === 3 && renderStep3()}
                        {currentStep === 4 && renderStep4()}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={`px-6 py-3 rounded-lg font-semibold transition-all ${currentStep === 1
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                Previous
                            </button>

                            {currentStep < 4 ? (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
                                >
                                    Next Step
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`px-8 py-3 font-semibold rounded-lg transition-all transform hover:scale-105 ${isSubmitting
                                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                            : 'bg-red-600 hover:bg-red-700 text-white'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating Request...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <span className="mr-2">🩸</span>
                                            Create Request
                                        </span>
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Help Section */}
                <div className="mt-8 bg-blue-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-start">
                        <div className="shrink-0">
                            <span className="text-2xl">💡</span>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
                            <p className="text-blue-800 mb-4">
                                If you need immediate assistance or have questions about creating a request,
                                our support team is here to help.
                            </p>
                            <button
                                onClick={() => navigate('/contact')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ScrollToTop />
        </div>
    );
};

export default CreateRequest;