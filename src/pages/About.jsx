import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">About BloodBridge</h1>
                    <p className="text-xl text-gray-600">Connecting lives through the gift of blood donation</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-12">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Story</h2>
                        <p className="text-gray-700 mb-4">
                            BloodBridge was founded with a simple yet powerful vision: to create a seamless connection
                            between blood donors and those in need. We recognized that in critical moments, finding
                            compatible blood donors can be a race against time.
                        </p>
                        <p className="text-gray-700">
                            Our platform leverages technology to bridge this gap, making it easier for donors to
                            contribute and for patients to receive the life-saving blood they need.
                        </p>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Impact</h2>
                        <div className="space-y-4">
                            <div className="bg-red-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-red-800">Lives Saved</h3>
                                <p className="text-2xl font-bold text-red-600">1,250+</p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-red-800">Active Donors</h3>
                                <p className="text-2xl font-bold text-red-600">5,000+</p>
                            </div>
                            <div className="bg-red-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-red-800">Successful Donations</h3>
                                <p className="text-2xl font-bold text-red-600">3,500+</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Our Values</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">❤️</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Compassion</h3>
                            <p className="text-gray-600">Every donation is an act of love and compassion for fellow human beings.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🤝</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Trust</h3>
                            <p className="text-gray-600">We maintain the highest standards of safety and transparency in all our processes.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">Urgency</h3>
                            <p className="text-gray-600">We understand that time is critical when lives are at stake.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;