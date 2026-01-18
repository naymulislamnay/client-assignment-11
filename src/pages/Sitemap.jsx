import React from 'react';
import { Link } from 'react-router';

const Sitemap = () => {
    const siteStructure = [
        {
            title: "Main Pages",
            links: [
                { name: "Home", path: "/" },
                { name: "Donation Requests", path: "/donation-requests" },
                { name: "Login", path: "/login" },
                { name: "Sign Up", path: "/signup" }
            ]
        },
        {
            title: "Company Information",
            links: [
                { name: "About Us", path: "/about" },
                { name: "Our Mission", path: "/mission" },
                { name: "Our Team", path: "/team" },
                { name: "Contact Us", path: "/contact" }
            ]
        },
        {
            title: "Services & Features",
            links: [
                { name: "Find Donors", path: "/donation-requests" },
                { name: "Request Blood", path: "/dashboard/create-request" },
                { name: "Emergency Fund", path: "/dashboard/funding" },
                { name: "Success Stories", path: "/stories" }
            ]
        },
        {
            title: "Dashboard (Logged In Users)",
            links: [
                { name: "Dashboard Overview", path: "/dashboard" },
                { name: "My Profile", path: "/dashboard/profile" },
                { name: "My Requests", path: "/dashboard/my-requests" },
                { name: "Create Request", path: "/dashboard/create-request" },
                { name: "All Users", path: "/dashboard/all-users" },
                { name: "All Requests", path: "/dashboard/all-requests" },
                { name: "Funding", path: "/dashboard/funding" }
            ]
        },
        {
            title: "Legal & Support",
            links: [
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms & Conditions", path: "/terms" },
                { name: "FAQ", path: "/faq" },
                { name: "Sitemap", path: "/sitemap" },
                { name: "Accessibility", path: "/accessibility" },
                { name: "Cookie Policy", path: "/cookies" }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Sitemap</h1>
                    <p className="text-xl text-gray-600">Navigate through all pages on BloodBridge</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {siteStructure.map((section, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                                {section.title}
                            </h2>
                            <ul className="space-y-3">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link
                                            to={link.path}
                                            className="text-red-600 hover:text-red-800 hover:underline transition-colors flex items-center"
                                        >
                                            <span className="mr-2">→</span>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Quick Access</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">For New Users</h3>
                            <div className="space-y-2">
                                <Link to="/signup" className="block text-red-600 hover:text-red-800 transition-colors">
                                    → Create Account
                                </Link>
                                <Link to="/about" className="block text-red-600 hover:text-red-800 transition-colors">
                                    → Learn About Us
                                </Link>
                                <Link to="/faq" className="block text-red-600 hover:text-red-800 transition-colors">
                                    → Frequently Asked Questions
                                </Link>
                                <Link to="/contact" className="block text-red-600 hover:text-red-800 transition-colors">
                                    → Contact Support
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">For Existing Users</h3>
                            <div className="space-y-2">
                                <Link to="/login" className="block text-red-600 hover:text-red-800 transition-colors">
                                    → Login to Dashboard
                                </Link>
                                <Link to="/donation-requests" className="block text-red-600 hover:text-red-800 transition-colors">
                                    → Browse Donation Requests
                                </Link>
                                <Link to="/dashboard/create-request" className="block text-red-600 hover:text-red-800 transition-colors">
                                    → Create Blood Request
                                </Link>
                                <Link to="/dashboard/profile" className="block text-red-600 hover:text-red-800 transition-colors">
                                    → Manage Profile
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center text-gray-600">
                    <p>Last updated: January 19, 2025</p>
                    <p className="mt-2">
                        Can't find what you're looking for?
                        <Link to="/contact" className="text-red-600 hover:text-red-800 ml-1">Contact us</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sitemap;