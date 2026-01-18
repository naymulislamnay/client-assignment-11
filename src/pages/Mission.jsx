import React from 'react';

const Mission = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h1>
                    <p className="text-xl text-gray-600">Saving lives through innovative blood donation solutions</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-red-600 mb-4">Mission Statement</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        To revolutionize blood donation by creating a comprehensive, accessible, and efficient platform
                        that connects donors with recipients, ensures safe blood transfusions, and builds a sustainable
                        community of life-savers committed to helping those in critical need.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Our Goals</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                Reduce blood shortage by 50% in our service areas
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                Connect 100,000+ donors with recipients in need
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                Ensure 24/7 emergency blood availability
                            </li>
                            <li className="flex items-start">
                                <span className="text-red-500 mr-2">•</span>
                                Maintain 99.9% safety standards in all donations
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">🌟 Our Vision</h3>
                        <p className="text-gray-700 mb-4">
                            A world where no life is lost due to blood shortage, where every person in need
                            has immediate access to safe blood, and where donating blood is as simple as
                            a few clicks on your phone.
                        </p>
                        <p className="text-gray-700">
                            We envision a global network of compassionate donors ready to help at a moment's notice.
                        </p>
                    </div>
                </div>

                <div className="bg-red-50 rounded-lg p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">How We Make a Difference</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🔍</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Smart Matching</h4>
                            <p className="text-gray-600">Advanced algorithms match donors with recipients based on blood type, location, and urgency.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">📱</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Easy Access</h4>
                            <p className="text-gray-600">User-friendly platform accessible 24/7 from any device, anywhere.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🛡️</span>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">Safety First</h4>
                            <p className="text-gray-600">Rigorous safety protocols and verification processes ensure donor and recipient safety.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mission;