import React from 'react';

const Terms = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
                        <p className="text-gray-600">Last updated: January 19, 2025</p>
                    </div>

                    <div className="prose max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>
                                    By accessing and using BloodBridge ("the Service"), you accept and agree to be bound by
                                    the terms and provision of this agreement. If you do not agree to abide by the above,
                                    please do not use this service.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>BloodBridge is a platform that connects blood donors with recipients in need. Our services include:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Donor registration and profile management</li>
                                    <li>Blood request posting and matching</li>
                                    <li>Emergency blood request notifications</li>
                                    <li>Donation coordination and scheduling</li>
                                    <li>Community features and success story sharing</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
                            <div className="text-gray-700 space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">For Donors</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Provide accurate and truthful medical information</li>
                                    <li>Meet all eligibility requirements for blood donation</li>
                                    <li>Follow all medical screening and safety protocols</li>
                                    <li>Notify us of any changes in health status</li>
                                    <li>Respect the privacy and confidentiality of recipients</li>
                                </ul>

                                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">For Recipients</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Provide accurate medical information and documentation</li>
                                    <li>Work with qualified medical professionals</li>
                                    <li>Respect the privacy and anonymity of donors</li>
                                    <li>Use the service only for legitimate medical needs</li>
                                    <li>Follow all medical advice and protocols</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Medical Disclaimer</h2>
                            <div className="text-gray-700 space-y-4">
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                    <p className="font-medium text-yellow-800">Important Medical Notice</p>
                                    <p className="text-yellow-700 mt-2">
                                        BloodBridge is a coordination platform only. We do not provide medical services,
                                        medical advice, or medical treatment. All blood donations and transfusions must
                                        be conducted through qualified medical facilities and professionals.
                                    </p>
                                </div>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>We do not screen, test, or process blood donations</li>
                                    <li>All medical decisions must be made by qualified healthcare providers</li>
                                    <li>Users are responsible for verifying medical compatibility</li>
                                    <li>Emergency situations require immediate medical attention</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Privacy and Data Protection</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>
                                    Your privacy is important to us. Please review our Privacy Policy, which also governs
                                    your use of the Service, to understand our practices.
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>We collect and use information as described in our Privacy Policy</li>
                                    <li>Medical information is handled with strict confidentiality</li>
                                    <li>You control what information is shared with other users</li>
                                    <li>We implement security measures to protect your data</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Prohibited Uses</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>You may not use our Service:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                                    <li>To violate any international, federal, provincial, or state regulations or laws</li>
                                    <li>To transmit or procure the sending of any advertising or promotional material</li>
                                    <li>To impersonate or attempt to impersonate another person</li>
                                    <li>To engage in any other conduct that restricts or inhibits anyone's use of the Service</li>
                                    <li>For commercial blood trading or selling</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>
                                    BloodBridge and its affiliates will not be liable for any indirect, incidental,
                                    special, consequential, or punitive damages, including without limitation, loss of
                                    profits, data, use, goodwill, or other intangible losses.
                                </p>
                                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                                    <p className="font-medium text-red-800">Important Limitation</p>
                                    <p className="text-red-700 mt-2">
                                        We are not responsible for medical outcomes, complications, or adverse events
                                        related to blood donations or transfusions arranged through our platform.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Account Termination</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
                                <p>Upon termination, your right to use the Service will cease immediately.</p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to Terms</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>
                                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                                    If a revision is material, we will try to provide at least 30 days notice prior to any
                                    new terms taking effect.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Information</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>If you have any questions about these Terms & Conditions, please contact us:</p>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p><strong>Email:</strong> legal@bloodbridge.com</p>
                                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                                    <p><strong>Address:</strong> 123 Health Street, Medical City, MC 12345</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Terms;