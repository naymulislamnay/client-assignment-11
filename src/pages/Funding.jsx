import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import ScrollToTop from '../components/ScrollToTop';
import Swal from 'sweetalert2';
import axios from 'axios';

const Funding = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [fundingStats, setFundingStats] = useState({
        totalFund: 0,
        availableFund: 0,
        disbursedThisMonth: 0,
        totalBeneficiaries: 0,
        pendingRequests: 0,
        approvedRequests: 0
    });
    const [recentDisbursements, setRecentDisbursements] = useState([]);
    const [userApplications, setUserApplications] = useState([]);
    const [donationAmount, setDonationAmount] = useState('');
    const [donationType, setDonationType] = useState('one-time');
    const [assistanceForm, setAssistanceForm] = useState({
        patientName: '',
        medicalCondition: '',
        hospitalName: '',
        requiredAmount: '',
        urgencyLevel: 'normal',
        contactNumber: '',
        description: '',
        documents: null
    });

    // Fetch funding data on component mount
    useEffect(() => {
        const fetchFundingData = async () => {
            try {
                setLoading(true);

                // Fetch funding statistics
                const statsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/funding/stats`);
                setFundingStats(statsResponse.data);

                // Fetch recent disbursements
                const disbursementsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/funding/disbursements?limit=5`);
                setRecentDisbursements(disbursementsResponse.data);

                // Fetch user's applications if logged in
                if (user?.email) {
                    const applicationsResponse = await axiosSecure.get(`/funding/applications/user/${user.email}`);
                    setUserApplications(applicationsResponse.data);
                }
            } catch (error) {
                console.error('Error fetching funding data:', error);
                // Set default values if API fails
                setFundingStats({
                    totalFund: 450000,
                    availableFund: 387500,
                    disbursedThisMonth: 62500,
                    totalBeneficiaries: 156,
                    pendingRequests: 12,
                    approvedRequests: 144
                });
                setRecentDisbursements([
                    {
                        _id: '1',
                        patientName: 'Sarah Ahmed',
                        amount: 15000,
                        medicalCondition: 'Emergency Surgery',
                        disbursedAt: '2025-01-15',
                        status: 'completed'
                    },
                    {
                        _id: '2',
                        patientName: 'Mohammad Rahman',
                        amount: 25000,
                        medicalCondition: 'Cancer Treatment',
                        disbursedAt: '2025-01-12',
                        status: 'completed'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchFundingData();
    }, [user, axiosSecure]);

    // Mock funding data (in real app, this would come from API)
    const fundingPrograms = [
        {
            title: 'Emergency Medical Fund',
            description: 'Immediate financial assistance for critical medical emergencies requiring blood transfusion.',
            maxAmount: '৳50,000',
            eligibility: 'Critical patients with blood-related emergencies',
            icon: '🚨',
            color: 'red'
        },
        {
            title: 'Treatment Support Fund',
            description: 'Ongoing financial support for patients undergoing long-term blood-related treatments.',
            maxAmount: '৳100,000',
            eligibility: 'Patients with chronic blood disorders',
            icon: '🏥',
            color: 'blue'
        },
        {
            title: 'Community Health Fund',
            description: 'Support for community blood drives and health awareness programs.',
            maxAmount: '৳25,000',
            eligibility: 'Community organizations and health initiatives',
            icon: '🤝',
            color: 'green'
        },
        {
            title: 'Research & Development Fund',
            description: 'Funding for blood-related medical research and technology development.',
            maxAmount: '৳200,000',
            eligibility: 'Medical researchers and healthcare institutions',
            icon: '🔬',
            color: 'purple'
        }
    ];

    const handleFormChange = (e) => {
        const { name, value, files } = e.target;
        setAssistanceForm(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleAssistanceSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire('Error', 'You must be logged in to apply for assistance', 'error');
            navigate('/login');
            return;
        }

        // Basic validation
        if (!assistanceForm.patientName || !assistanceForm.medicalCondition || !assistanceForm.requiredAmount) {
            Swal.fire('Error', 'Please fill in all required fields', 'error');
            return;
        }

        try {
            const formData = new FormData();

            // Add form fields
            Object.keys(assistanceForm).forEach(key => {
                if (key === 'documents' && assistanceForm[key]) {
                    formData.append('documents', assistanceForm[key]);
                } else if (key !== 'documents') {
                    formData.append(key, assistanceForm[key]);
                }
            });

            // Add user information
            formData.append('applicantEmail', user.email);
            formData.append('applicantName', user.displayName || user.name);

            const response = await axiosSecure.post('/funding/applications', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                await Swal.fire({
                    title: 'Application Submitted!',
                    text: 'Your funding assistance request has been submitted successfully. Our team will review it within 24-48 hours.',
                    icon: 'success',
                    confirmButtonColor: '#dc2626'
                });

                // Reset form
                setAssistanceForm({
                    patientName: '',
                    medicalCondition: '',
                    hospitalName: '',
                    requiredAmount: '',
                    urgencyLevel: 'normal',
                    contactNumber: '',
                    description: '',
                    documents: null
                });

                // Refresh user applications
                const applicationsResponse = await axiosSecure.get(`/funding/applications/user/${user.email}`);
                setUserApplications(applicationsResponse.data);
            }
        } catch (error) {
            console.error('Error submitting application:', error);
            Swal.fire('Error', error.response?.data?.message || 'Failed to submit application', 'error');
        }
    };

    const handleDonation = async () => {
        if (!user) {
            Swal.fire('Error', 'You must be logged in to make a donation', 'error');
            navigate('/login');
            return;
        }

        if (!donationAmount || donationAmount < 100) {
            Swal.fire('Error', 'Minimum donation amount is ৳100', 'error');
            return;
        }

        try {
            const donationData = {
                amount: parseFloat(donationAmount),
                type: donationType,
                donorEmail: user.email,
                donorName: user.displayName || user.name
            };

            const response = await axiosSecure.post('/funding/donations', donationData);

            if (response.data.success) {
                await Swal.fire({
                    title: 'Thank You!',
                    text: `Your donation of ৳${donationAmount} has been processed successfully. You will receive a confirmation email shortly.`,
                    icon: 'success',
                    confirmButtonColor: '#dc2626'
                });

                setDonationAmount('');

                // Refresh funding stats
                const statsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/funding/stats`);
                setFundingStats(statsResponse.data);
            }
        } catch (error) {
            console.error('Error processing donation:', error);
            Swal.fire('Error', error.response?.data?.message || 'Failed to process donation', 'error');
        }
    };

    const urgencyLevels = [
        { value: 'normal', label: 'Normal', color: 'blue', icon: '📅' },
        { value: 'urgent', label: 'Urgent', color: 'orange', icon: '⚡' },
        { value: 'critical', label: 'Critical', color: 'red', icon: '🚨' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Emergency Funding & Financial Assistance
                    </h1>
                    <p className="text-gray-600">
                        Supporting our community with financial assistance for blood-related medical emergencies
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white rounded-2xl shadow-lg mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            {[
                                { id: 'overview', label: 'Fund Overview', icon: '📊' },
                                { id: 'programs', label: 'Funding Programs', icon: '💰' },
                                { id: 'apply', label: 'Apply for Assistance', icon: '📝' },
                                { id: 'donate', label: 'Contribute to Fund', icon: '❤️' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                        ? 'border-red-500 text-red-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <span className="mr-2">{tab.icon}</span>
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-8">
                                {loading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <div className="text-center">
                                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
                                            <p className="text-gray-600">Loading funding data...</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Fund Statistics */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            <div className="bg-linear-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                                                        <span className="text-white text-xl">💰</span>
                                                    </div>
                                                    <span className="text-red-600 text-sm font-medium">Total Fund</span>
                                                </div>
                                                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                                    ৳{fundingStats.totalFund.toLocaleString()}
                                                </h3>
                                                <p className="text-red-700 text-sm">Accumulated since inception</p>
                                            </div>

                                            <div className="bg-linear-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                                                        <span className="text-white text-xl">✅</span>
                                                    </div>
                                                    <span className="text-green-600 text-sm font-medium">Available</span>
                                                </div>
                                                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                                    ৳{fundingStats.availableFund.toLocaleString()}
                                                </h3>
                                                <p className="text-green-700 text-sm">Ready for disbursement</p>
                                            </div>

                                            <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                                        <span className="text-white text-xl">👥</span>
                                                    </div>
                                                    <span className="text-blue-600 text-sm font-medium">Beneficiaries</span>
                                                </div>
                                                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                                                    {fundingStats.totalBeneficiaries}
                                                </h3>
                                                <p className="text-blue-700 text-sm">Lives supported</p>
                                            </div>
                                        </div>

                                        {/* Recent Disbursements */}
                                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                                            <div className="px-6 py-4 border-b border-gray-200">
                                                <h3 className="text-xl font-bold text-gray-900">Recent Disbursements</h3>
                                            </div>
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {recentDisbursements.map((disbursement) => (
                                                            <tr key={disbursement.id} className="hover:bg-gray-50">
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="font-medium text-gray-900">{disbursement.patientName}</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                                                    {disbursement.medicalCondition || disbursement.condition}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <span className="font-semibold text-green-600">
                                                                        ৳{disbursement.amount.toLocaleString()}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                                                                    {new Date(disbursement.disbursedAt || disbursement.date).toLocaleDateString()}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${disbursement.status === 'completed'
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : 'bg-yellow-100 text-yellow-800'
                                                                        }`}>
                                                                        {disbursement.status}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Fund Usage Chart Placeholder */}
                                        <div className="bg-white rounded-2xl border border-gray-200 p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-6">Fund Allocation</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-600">Emergency Cases</span>
                                                        <span className="font-semibold">45%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div className="bg-red-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-600">Treatment Support</span>
                                                        <span className="font-semibold">35%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-600">Community Programs</span>
                                                        <span className="font-semibold">15%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                                                    </div>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-600">Research & Development</span>
                                                        <span className="font-semibold">5%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Programs Tab */}
                        {activeTab === 'programs' && (
                            <div className="space-y-6">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Funding Programs</h2>
                                    <p className="text-gray-600 max-w-2xl mx-auto">
                                        We offer various funding programs to support different medical needs and community initiatives related to blood donation and healthcare.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {fundingPrograms.map((program, index) => (
                                        <div key={index} className={`bg-white rounded-2xl border-2 border-${program.color}-200 p-6 hover:shadow-lg transition-shadow`}>
                                            <div className="flex items-center mb-4">
                                                <div className={`w-12 h-12 bg-${program.color}-100 rounded-lg flex items-center justify-center mr-4`}>
                                                    <span className="text-2xl">{program.icon}</span>
                                                </div>
                                                <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                                            </div>
                                            <p className="text-gray-600 mb-4">{program.description}</p>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-500">Maximum Amount:</span>
                                                    <span className={`text-sm font-semibold text-${program.color}-600`}>{program.maxAmount}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-500">Eligibility:</span>
                                                    <span className="text-sm text-gray-700 text-right flex-1 ml-2">{program.eligibility}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setActiveTab('apply')}
                                                className={`w-full mt-4 bg-${program.color}-600 hover:bg-${program.color}-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors`}
                                            >
                                                Apply for This Program
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Apply Tab */}
                        {activeTab === 'apply' && (
                            <div className="max-w-4xl mx-auto">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Apply for Financial Assistance</h2>
                                    <p className="text-gray-600">
                                        Fill out this form to request financial assistance for medical emergencies or treatments.
                                    </p>
                                </div>

                                {/* User's Previous Applications */}
                                {user && userApplications.length > 0 && (
                                    <div className="mb-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
                                        <h3 className="text-lg font-semibold text-blue-900 mb-4">Your Previous Applications</h3>
                                        <div className="space-y-3">
                                            {userApplications.slice(0, 3).map((application) => (
                                                <div key={application._id} className="flex items-center justify-between bg-white p-4 rounded-lg">
                                                    <div>
                                                        <p className="font-medium text-gray-900">{application.patientName}</p>
                                                        <p className="text-sm text-gray-600">{application.medicalCondition}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-semibold text-gray-900">৳{application.requiredAmount}</p>
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${application.status === 'approved' ? 'bg-green-100 text-green-800' :
                                                                application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                                    'bg-yellow-100 text-yellow-800'
                                                            }`}>
                                                            {application.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleAssistanceSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Patient Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="patientName"
                                                value={assistanceForm.patientName}
                                                onChange={handleFormChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                                                value={assistanceForm.contactNumber}
                                                onChange={handleFormChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Medical Condition <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="medicalCondition"
                                                value={assistanceForm.medicalCondition}
                                                onChange={handleFormChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Hospital/Clinic Name
                                            </label>
                                            <input
                                                type="text"
                                                name="hospitalName"
                                                value={assistanceForm.hospitalName}
                                                onChange={handleFormChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Required Amount (৳) <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                name="requiredAmount"
                                                value={assistanceForm.requiredAmount}
                                                onChange={handleFormChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-4">
                                                Urgency Level <span className="text-red-500">*</span>
                                            </label>
                                            <div className="grid grid-cols-3 gap-3">
                                                {urgencyLevels.map((level) => (
                                                    <button
                                                        key={level.value}
                                                        type="button"
                                                        onClick={() => setAssistanceForm(prev => ({ ...prev, urgencyLevel: level.value }))}
                                                        className={`p-3 rounded-lg border-2 transition-all ${assistanceForm.urgencyLevel === level.value
                                                            ? `border-${level.color}-300 bg-${level.color}-50`
                                                            : 'border-gray-200 hover:border-gray-300'
                                                            }`}
                                                    >
                                                        <div className="text-xl mb-1">{level.icon}</div>
                                                        <div className="text-sm font-medium">{level.label}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Detailed Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={assistanceForm.description}
                                            onChange={handleFormChange}
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                            placeholder="Please provide detailed information about the medical condition, treatment required, and why financial assistance is needed..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Supporting Documents
                                        </label>
                                        <input
                                            type="file"
                                            name="documents"
                                            onChange={handleFormChange}
                                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            Upload medical reports, prescriptions, or other relevant documents (PDF, Images, Word documents)
                                        </p>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h4 className="font-semibold text-blue-900 mb-2">📋 Required Documents:</h4>
                                        <ul className="text-sm text-blue-800 space-y-1">
                                            <li>• Medical certificate or doctor's prescription</li>
                                            <li>• Hospital estimate or treatment cost breakdown</li>
                                            <li>• Patient's ID copy and contact information</li>
                                            <li>• Any previous medical reports (if applicable)</li>
                                        </ul>
                                    </div>

                                    <div className="flex justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => setAssistanceForm({
                                                patientName: '',
                                                medicalCondition: '',
                                                hospitalName: '',
                                                requiredAmount: '',
                                                urgencyLevel: 'normal',
                                                contactNumber: '',
                                                description: '',
                                                documents: null
                                            })}
                                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Reset Form
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                                        >
                                            Submit Application
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Donate Tab */}
                        {activeTab === 'donate' && (
                            <div className="max-w-4xl mx-auto">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Contribute to Emergency Fund</h2>
                                    <p className="text-gray-600">
                                        Your contribution helps us provide financial assistance to those in need of blood-related medical care.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Donation Options */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-gray-900">Quick Donation</h3>

                                        <div className="grid grid-cols-2 gap-4">
                                            {[500, 1000, 2500, 5000].map((amount) => (
                                                <button
                                                    key={amount}
                                                    onClick={() => setDonationAmount(amount.toString())}
                                                    className={`p-4 border-2 rounded-lg transition-colors text-center ${donationAmount === amount.toString()
                                                        ? 'border-red-500 bg-red-50'
                                                        : 'border-gray-200 hover:border-red-500 hover:bg-red-50'
                                                        }`}
                                                >
                                                    <div className="text-2xl font-bold text-gray-900">৳{amount}</div>
                                                    <div className="text-sm text-gray-600">One-time</div>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="space-y-4">
                                            <label className="block text-sm font-medium text-gray-700">Custom Amount</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-3 text-gray-500">৳</span>
                                                <input
                                                    type="number"
                                                    placeholder="Enter amount"
                                                    value={donationAmount}
                                                    onChange={(e) => setDonationAmount(e.target.value)}
                                                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="block text-sm font-medium text-gray-700">Donation Type</label>
                                            <div className="space-y-2">
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="donationType"
                                                        value="one-time"
                                                        checked={donationType === 'one-time'}
                                                        onChange={(e) => setDonationType(e.target.value)}
                                                        className="mr-3"
                                                    />
                                                    <span>One-time donation</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="donationType"
                                                        value="monthly"
                                                        checked={donationType === 'monthly'}
                                                        onChange={(e) => setDonationType(e.target.value)}
                                                        className="mr-3"
                                                    />
                                                    <span>Monthly recurring donation</span>
                                                </label>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleDonation}
                                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                                        >
                                            Donate Now
                                        </button>
                                    </div>

                                    {/* Impact Information */}
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold text-gray-900">Your Impact</h3>

                                        <div className="space-y-4">
                                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                                <div className="flex items-center mb-2">
                                                    <span className="text-2xl mr-3">💰</span>
                                                    <span className="font-semibold text-red-900">৳500</span>
                                                </div>
                                                <p className="text-red-800 text-sm">Can cover basic blood testing for one patient</p>
                                            </div>

                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <div className="flex items-center mb-2">
                                                    <span className="text-2xl mr-3">🏥</span>
                                                    <span className="font-semibold text-blue-900">৳2,500</span>
                                                </div>
                                                <p className="text-blue-800 text-sm">Can support emergency blood transfusion costs</p>
                                            </div>

                                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                                <div className="flex items-center mb-2">
                                                    <span className="text-2xl mr-3">❤️</span>
                                                    <span className="font-semibold text-green-900">৳10,000</span>
                                                </div>
                                                <p className="text-green-800 text-sm">Can fund complete treatment for a critical patient</p>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 rounded-lg p-6">
                                            <h4 className="font-semibold text-gray-900 mb-3">Why Donate?</h4>
                                            <ul className="space-y-2 text-sm text-gray-700">
                                                <li className="flex items-start">
                                                    <span className="text-green-500 mr-2">✓</span>
                                                    100% of donations go directly to patient care
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-500 mr-2">✓</span>
                                                    Tax-deductible contributions
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-500 mr-2">✓</span>
                                                    Transparent fund usage reporting
                                                </li>
                                                <li className="flex items-start">
                                                    <span className="text-green-500 mr-2">✓</span>
                                                    Direct impact on saving lives
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ScrollToTop />
        </div>
    );
};

export default Funding;