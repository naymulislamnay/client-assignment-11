import React from 'react';

const Accessibility = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Accessibility Statement</h1>
                        <p className="text-gray-600">BloodBridge is committed to ensuring digital accessibility for all users</p>
                    </div>

                    <div className="prose max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>
                                    BloodBridge is committed to ensuring that our website and mobile applications are
                                    accessible to all users, including those with disabilities. We strive to provide
                                    an inclusive experience that allows everyone to access our life-saving services.
                                </p>
                                <p>
                                    We are continuously working to improve the accessibility of our platform and ensure
                                    compliance with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Accessibility Features</h2>
                            <div className="text-gray-700 space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Visual Accessibility</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>High contrast color schemes for better readability</li>
                                    <li>Scalable text that can be enlarged up to 200% without loss of functionality</li>
                                    <li>Alternative text descriptions for all images and graphics</li>
                                    <li>Clear visual focus indicators for keyboard navigation</li>
                                    <li>Consistent and logical page layouts</li>
                                </ul>

                                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Motor Accessibility</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Full keyboard navigation support</li>
                                    <li>Large clickable areas for buttons and links</li>
                                    <li>No time-sensitive actions that cannot be extended</li>
                                    <li>Skip navigation links to main content</li>
                                </ul>

                                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Cognitive Accessibility</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Clear and simple language throughout the platform</li>
                                    <li>Consistent navigation and page structure</li>
                                    <li>Error messages that clearly explain what went wrong</li>
                                    <li>Form labels and instructions that are easy to understand</li>
                                </ul>

                                <h3 className="text-lg font-medium text-gray-900 mt-6 mb-2">Hearing Accessibility</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Captions for all video content</li>
                                    <li>Visual alerts in addition to audio notifications</li>
                                    <li>Text alternatives for audio-only content</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Assistive Technology Support</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>Our platform is designed to work with assistive technologies, including:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
                                    <li>Voice recognition software</li>
                                    <li>Switch navigation devices</li>
                                    <li>Magnification software</li>
                                    <li>Alternative keyboards and pointing devices</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Browser and Device Compatibility</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>BloodBridge is compatible with:</p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">Desktop Browsers</h4>
                                        <ul className="list-disc pl-6 space-y-1 text-sm">
                                            <li>Chrome (latest 2 versions)</li>
                                            <li>Firefox (latest 2 versions)</li>
                                            <li>Safari (latest 2 versions)</li>
                                            <li>Edge (latest 2 versions)</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-900 mb-2">Mobile Devices</h4>
                                        <ul className="list-disc pl-6 space-y-1 text-sm">
                                            <li>iOS Safari (latest 2 versions)</li>
                                            <li>Android Chrome (latest 2 versions)</li>
                                            <li>Samsung Internet (latest version)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ongoing Improvements</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>We are continuously working to improve accessibility through:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Regular accessibility audits and testing</li>
                                    <li>User feedback and testing with people with disabilities</li>
                                    <li>Staff training on accessibility best practices</li>
                                    <li>Updates to meet evolving accessibility standards</li>
                                    <li>Integration of accessibility considerations in our development process</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Known Issues</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>We are aware of the following accessibility issues and are working to resolve them:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Some third-party embedded content may not be fully accessible</li>
                                    <li>Complex data tables may need additional navigation support</li>
                                    <li>Some dynamic content updates may not be announced to screen readers</li>
                                </ul>
                                <p>
                                    If you encounter any of these issues or others, please contact our accessibility team
                                    using the information below.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Feedback and Support</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>
                                    We welcome your feedback on the accessibility of BloodBridge. If you encounter
                                    accessibility barriers or have suggestions for improvement, please contact us:
                                </p>
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h4 className="font-medium text-blue-900 mb-3">Accessibility Support Team</h4>
                                    <div className="space-y-2 text-blue-800">
                                        <p><strong>Email:</strong> accessibility@bloodbridge.com</p>
                                        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                                        <p><strong>TTY:</strong> +1 (555) 123-4568</p>
                                        <p><strong>Response Time:</strong> We aim to respond within 2 business days</p>
                                    </div>
                                </div>
                                <p>
                                    When reporting accessibility issues, please include:
                                </p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>The specific page or feature where you encountered the issue</li>
                                    <li>The assistive technology you were using (if applicable)</li>
                                    <li>Your browser and operating system</li>
                                    <li>A description of the problem and what you expected to happen</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Alternative Access</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>
                                    If you are unable to access any content or functionality on our website due to
                                    accessibility barriers, we can provide alternative access methods:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Phone-based assistance for creating accounts and managing requests</li>
                                    <li>Email-based communication for non-urgent matters</li>
                                    <li>Alternative document formats (large print, audio, etc.)</li>
                                    <li>Personal assistance for complex tasks</li>
                                </ul>
                                <p className="text-sm text-gray-600 mt-4">
                                    Last updated: January 19, 2025
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accessibility;