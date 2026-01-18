import React from 'react';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                        <p className="text-gray-600">Last updated: January 19, 2025</p>
                    </div>

                    <div className="prose max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>We collect information you provide directly to us, such as when you:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Create an account or profile</li>
                                    <li>Register as a blood donor or recipient</li>
                                    <li>Submit donation requests</li>
                                    <li>Contact us for support</li>
                                    <li>Participate in surveys or feedback</li>
                                </ul>

                                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Personal Information</h3>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Name, email address, phone number</li>
                                    <li>Date of birth, gender, blood type</li>
                                    <li>Medical history relevant to blood donation</li>
                                    <li>Location and address information</li>
                                    <li>Emergency contact information</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>We use the information we collect to:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Match blood donors with recipients</li>
                                    <li>Facilitate blood donation requests and coordination</li>
                                    <li>Verify donor eligibility and medical compatibility</li>
                                    <li>Send notifications about donation opportunities</li>
                                    <li>Provide customer support and respond to inquiries</li>
                                    <li>Improve our services and user experience</li>
                                    <li>Comply with legal and regulatory requirements</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>We may share your information in the following circumstances:</p>

                                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">With Your Consent</h3>
                                <p>We share information when you explicitly consent, such as connecting you with compatible donors or recipients.</p>

                                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Medical Professionals</h3>
                                <p>We may share relevant medical information with healthcare providers involved in the donation process.</p>

                                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Legal Requirements</h3>
                                <p>We may disclose information when required by law or to protect the safety of our users.</p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>We implement appropriate security measures to protect your personal information:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Encryption of sensitive data in transit and at rest</li>
                                    <li>Regular security audits and vulnerability assessments</li>
                                    <li>Access controls and authentication requirements</li>
                                    <li>Staff training on data protection and privacy</li>
                                    <li>Compliance with healthcare data protection standards</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>You have the following rights regarding your personal information:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Access:</strong> Request a copy of your personal information</li>
                                    <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                                    <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                                    <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>We use cookies and similar technologies to:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Remember your preferences and settings</li>
                                    <li>Analyze website usage and performance</li>
                                    <li>Provide personalized content and features</li>
                                    <li>Ensure security and prevent fraud</li>
                                </ul>
                                <p>You can control cookie settings through your browser preferences.</p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p><strong>Email:</strong> privacy@bloodbridge.com</p>
                                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                                    <p><strong>Address:</strong> 123 Health Street, Medical City, MC 12345</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>
                                    We may update this Privacy Policy from time to time. We will notify you of any
                                    material changes by posting the new Privacy Policy on this page and updating
                                    the "Last updated" date.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Privacy;