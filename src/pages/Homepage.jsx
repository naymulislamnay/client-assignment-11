import React from 'react';
import HeroSection from '../components/HeroSection';

const Homepage = () => {
    return (
        <div>
            {/* Hero Section */}
            <HeroSection />

            {/* Featured Section */}
            <div className="max-w-7xl mx-auto px-5 py-16 bg-white">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                        Why Choose BloodBridge?
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        We're committed to making blood donation simple, safe, and accessible for everyone
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="group bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                            <span className="text-2xl">🚨</span>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-3">
                            Emergency Help
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            Instant connection with local donors during emergencies. Our 24/7 support ensures help is always available when you need it most.
                        </p>
                    </div>

                    <div className="group bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                            <span className="text-2xl">🆓</span>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-3">
                            Free Registration
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            Donors can register for free and manage their profile easily. No hidden fees, no subscriptions - just a commitment to saving lives.
                        </p>
                    </div>

                    <div className="group bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                            <span className="text-2xl">🔒</span>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-3">
                            Secure & Private
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            Your information is safe with our encrypted cloud storage and strict privacy policies. We protect your data like we protect lives.
                        </p>
                    </div>
                </div>

                {/* Call to Action Section */}
                <div className="mt-16 text-center bg-linear-to-r from-red-50 to-red-100 rounded-2xl p-8 md:p-12">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
                        Ready to Make a Difference?
                    </h3>
                    <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
                        Join thousands of heroes who are already saving lives through blood donation.
                        Your contribution can be the difference between life and death.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105">
                            Become a Donor Today
                        </button>
                        <button className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300">
                            Learn More About Donation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;