import React, { useState } from 'react';

const Cookies = () => {
    const [cookiePreferences, setCookiePreferences] = useState({
        essential: true, // Always required
        functional: true,
        analytics: false,
        marketing: false
    });

    const handlePreferenceChange = (type) => {
        if (type === 'essential') return; // Essential cookies cannot be disabled

        setCookiePreferences(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    const savePreferences = () => {
        // Here you would typically save preferences to localStorage or send to server
        localStorage.setItem('cookiePreferences', JSON.stringify(cookiePreferences));
        alert('Cookie preferences saved successfully!');
    };

    const acceptAll = () => {
        const allAccepted = {
            essential: true,
            functional: true,
            analytics: true,
            marketing: true
        };
        setCookiePreferences(allAccepted);
        localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
        alert('All cookies accepted!');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
                        <p className="text-gray-600">Last updated: January 19, 2025</p>
                    </div>

                    <div className="prose max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What Are Cookies?</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>
                                    Cookies are small text files that are stored on your device when you visit our website.
                                    They help us provide you with a better experience by remembering your preferences,
                                    keeping you logged in, and helping us understand how you use our service.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h2>

                            <div className="space-y-6">
                                <div className="border border-gray-200 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-medium text-gray-900">Essential Cookies</h3>
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Required</span>
                                    </div>
                                    <p className="text-gray-700 mb-3">
                                        These cookies are necessary for the website to function properly. They enable core
                                        functionality such as security, network management, and accessibility.
                                    </p>
                                    <div className="text-sm text-gray-600">
                                        <p><strong>Examples:</strong> Authentication tokens, session management, security features</p>
                                        <p><strong>Duration:</strong> Session or up to 1 year</p>
                                    </div>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-medium text-gray-900">Functional Cookies</h3>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={cookiePreferences.functional}
                                                onChange={() => handlePreferenceChange('functional')}
                                                className="mr-2"
                                            />
                                            <span className="text-sm">Enable</span>
                                        </label>
                                    </div>
                                    <p className="text-gray-700 mb-3">
                                        These cookies enable enhanced functionality and personalization, such as remembering
                                        your preferences, language settings, and providing personalized content.
                                    </p>
                                    <div className="text-sm text-gray-600">
                                        <p><strong>Examples:</strong> Language preferences, theme settings, location data</p>
                                        <p><strong>Duration:</strong> Up to 1 year</p>
                                    </div>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-medium text-gray-900">Analytics Cookies</h3>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={cookiePreferences.analytics}
                                                onChange={() => handlePreferenceChange('analytics')}
                                                className="mr-2"
                                            />
                                            <span className="text-sm">Enable</span>
                                        </label>
                                    </div>
                                    <p className="text-gray-700 mb-3">
                                        These cookies help us understand how visitors interact with our website by collecting
                                        and reporting information anonymously. This helps us improve our service.
                                    </p>
                                    <div className="text-sm text-gray-600">
                                        <p><strong>Examples:</strong> Google Analytics, page views, user behavior</p>
                                        <p><strong>Duration:</strong> Up to 2 years</p>
                                    </div>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-medium text-gray-900">Marketing Cookies</h3>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={cookiePreferences.marketing}
                                                onChange={() => handlePreferenceChange('marketing')}
                                                className="mr-2"
                                            />
                                            <span className="text-sm">Enable</span>
                                        </label>
                                    </div>
                                    <p className="text-gray-700 mb-3">
                                        These cookies are used to deliver advertisements more relevant to you and your interests.
                                        They may also be used to limit the number of times you see an advertisement.
                                    </p>
                                    <div className="text-sm text-gray-600">
                                        <p><strong>Examples:</strong> Social media pixels, advertising networks</p>
                                        <p><strong>Duration:</strong> Up to 1 year</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Cookies</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>We may also use third-party services that set cookies on our behalf:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                                    <li><strong>Social Media Platforms:</strong> For social sharing and login functionality</li>
                                    <li><strong>Payment Processors:</strong> For secure payment processing</li>
                                    <li><strong>Customer Support:</strong> For chat and support functionality</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>You can control cookies in several ways:</p>

                                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Browser Settings</h3>
                                <p>Most browsers allow you to:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>View and delete cookies</li>
                                    <li>Block cookies from specific sites</li>
                                    <li>Block third-party cookies</li>
                                    <li>Clear all cookies when you close the browser</li>
                                </ul>

                                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Our Cookie Preferences</h3>
                                <p>Use the controls above to customize your cookie preferences for BloodBridge.</p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Impact of Disabling Cookies</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>Disabling certain cookies may impact your experience:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Essential cookies:</strong> The website may not function properly</li>
                                    <li><strong>Functional cookies:</strong> You may lose personalized settings</li>
                                    <li><strong>Analytics cookies:</strong> We cannot improve our service based on usage data</li>
                                    <li><strong>Marketing cookies:</strong> You may see less relevant advertisements</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>If you have questions about our use of cookies, please contact us:</p>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p><strong>Email:</strong> privacy@bloodbridge.com</p>
                                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                                    <p><strong>Address:</strong> 123 Health Street, Medical City, MC 12345</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Cookie Preference Controls */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Cookie Preferences</h3>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={acceptAll}
                                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Accept All Cookies
                            </button>
                            <button
                                onClick={savePreferences}
                                className="border border-red-600 text-red-600 px-6 py-2 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                Save My Preferences
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cookies;