import React from 'react';
import HeroSection from '../components/HeroSection';
import ScrollToTop from '../components/ScrollToTop';
import { Link } from 'react-router';

const Homepage = () => {
    const stats = [
        { number: "1,250+", label: "Lives Saved", icon: "❤️" },
        { number: "5,000+", label: "Active Donors", icon: "🩸" },
        { number: "3,500+", label: "Successful Donations", icon: "🤝" },
        { number: "24/7", label: "Emergency Support", icon: "🚨" }
    ];

    const features = [
        {
            icon: "🚨",
            title: "Emergency Response",
            description: "Instant connection with local donors during critical moments. Our 24/7 support ensures help is always available.",
            color: "red"
        },
        {
            icon: "🔒",
            title: "Secure & Private",
            description: "Your information is protected with bank-level encryption and strict privacy policies.",
            color: "blue"
        },
        {
            icon: "📱",
            title: "Easy to Use",
            description: "Simple, intuitive platform accessible from any device, anywhere, anytime.",
            color: "green"
        },
        {
            icon: "🆓",
            title: "Completely Free",
            description: "No hidden fees, no subscriptions. Just a commitment to saving lives together.",
            color: "purple"
        },
        {
            icon: "🏥",
            title: "Medical Safety",
            description: "All donations follow strict medical protocols and safety standards.",
            color: "orange"
        },
        {
            icon: "🌍",
            title: "Global Network",
            description: "Connect with donors and recipients across multiple locations and regions.",
            color: "teal"
        }
    ];

    const services = [
        {
            title: "Blood Donation Requests",
            description: "Post urgent blood requirements and connect with compatible donors instantly.",
            icon: "🩸",
            link: "/donation-requests"
        },
        {
            title: "Donor Registration",
            description: "Join our community of heroes and help save lives through blood donation.",
            icon: "📝",
            link: "/signup"
        },
        {
            title: "Emergency Support",
            description: "24/7 emergency assistance for critical blood requirements.",
            icon: "🚨",
            link: "/contact"
        },
        {
            title: "Health Screening",
            description: "Comprehensive health checks to ensure safe donation processes.",
            icon: "🏥",
            link: "/about"
        }
    ];

    const bloodTypes = [
        { type: "O+", percentage: "38%", description: "Universal donor for positive blood types" },
        { type: "A+", percentage: "34%", description: "Can donate to A+ and AB+ recipients" },
        { type: "B+", percentage: "9%", description: "Can donate to B+ and AB+ recipients" },
        { type: "AB+", percentage: "3%", description: "Universal recipient, can receive from all" },
        { type: "O-", percentage: "7%", description: "Universal donor for all blood types" },
        { type: "A-", percentage: "6%", description: "Can donate to A+, A-, AB+, AB-" },
        { type: "B-", percentage: "2%", description: "Can donate to B+, B-, AB+, AB-" },
        { type: "AB-", percentage: "1%", description: "Can receive from all negative types" }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Blood Recipient",
            image: "/public/default-Profile.png",
            quote: "BloodBridge saved my life during emergency surgery. The response was incredibly fast and the donors were amazing.",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "Regular Donor",
            image: "/public/default-Profile.png",
            quote: "I've donated blood 15 times through BloodBridge. The platform makes it so easy to help others in need.",
            rating: 5
        },
        {
            name: "Dr. Emily Rodriguez",
            role: "Hospital Administrator",
            image: "/public/default-Profile.png",
            quote: "BloodBridge has revolutionized how we handle blood shortages. It's an invaluable resource for our hospital.",
            rating: 5
        }
    ];

    const blogPosts = [
        {
            title: "The Science Behind Blood Donation",
            excerpt: "Understanding how blood donation works and its impact on both donors and recipients.",
            date: "January 15, 2025",
            readTime: "5 min read",
            image: "/public/default-Profile.png",
            category: "Education"
        },
        {
            title: "Emergency Blood Drive Success Story",
            excerpt: "How our community came together to help during a critical blood shortage last month.",
            date: "January 10, 2025",
            readTime: "3 min read",
            image: "/public/default-Profile.png",
            category: "Success Stories"
        },
        {
            title: "Blood Donation Myths Debunked",
            excerpt: "Separating fact from fiction about blood donation safety and eligibility.",
            date: "January 5, 2025",
            readTime: "4 min read",
            image: "/public/default-Profile.png",
            category: "Health"
        }
    ];

    const faqs = [
        {
            question: "Who can donate blood?",
            answer: "Generally, healthy adults aged 17-65 who weigh at least 110 pounds can donate blood."
        },
        {
            question: "How often can I donate?",
            answer: "You can donate whole blood every 56 days (8 weeks). Our system tracks your donation history."
        },
        {
            question: "Is blood donation safe?",
            answer: "Yes, blood donation is very safe when done at certified medical facilities with sterile equipment."
        },
        {
            question: "How long does the donation process take?",
            answer: "The entire process typically takes about an hour, including registration, screening, and rest time."
        }
    ];

    return (
        <div>
            {/* 1. Hero Section */}
            <HeroSection />

            {/* 2. Statistics Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Impact in Numbers
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Every donation makes a difference. Here's how our community is changing lives.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose BloodBridge?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We're committed to making blood donation simple, safe, and accessible for everyone.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                                <div className="text-4xl mb-6">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Services Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Services
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Comprehensive blood donation services designed to save lives efficiently.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <Link
                                key={index}
                                to={service.link}
                                className="group bg-linear-to-br from-red-50 to-red-100 p-6 rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-300 hover:scale-105"
                            >
                                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                                    {service.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Blood Types Categories */}
            <section className="py-16 bg-red-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Blood Type Compatibility
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Understanding blood types helps us match donors with recipients more effectively.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {bloodTypes.map((blood, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600 mb-2">
                                        {blood.type}
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 mb-3">
                                        {blood.percentage}
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        {blood.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. How It Works Process */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            How BloodBridge Works
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Simple steps to save lives through our platform.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">1️⃣</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Register</h3>
                            <p className="text-gray-600">Create your account and complete your donor profile with medical information.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">2️⃣</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Get Matched</h3>
                            <p className="text-gray-600">Our system matches you with compatible recipients based on blood type and location.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">3️⃣</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Donate</h3>
                            <p className="text-gray-600">Visit an approved medical facility to complete your safe blood donation.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">4️⃣</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-3">Save Lives</h3>
                            <p className="text-gray-600">Your donation helps save lives and makes a real difference in your community.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Testimonials Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            What Our Community Says
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Real stories from donors and recipients who have experienced the power of giving.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                                <div className="flex items-center mb-6">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                                    </div>
                                </div>
                                <div className="flex mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} className="text-yellow-400">⭐</span>
                                    ))}
                                </div>
                                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. Latest Blog Posts */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Latest from Our Blog
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Stay informed with the latest news, stories, and insights about blood donation.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <article key={index} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                                            {post.category}
                                        </span>
                                        <span className="text-sm text-gray-500">{post.readTime}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3 hover:text-red-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500">{post.date}</span>
                                        <Link to="/stories" className="text-red-600 hover:text-red-700 font-medium text-sm">
                                            Read More →
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. FAQ Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Get answers to common questions about blood donation and our platform.
                        </p>
                    </div>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link
                            to="/faq"
                            className="inline-flex items-center text-red-600 hover:text-red-700 font-medium"
                        >
                            View All FAQs
                            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 10. Newsletter Subscription */}
            <section className="py-16 bg-red-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Stay Connected with BloodBridge
                    </h2>
                    <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
                        Get updates on blood drives, emergency requests, and inspiring stories from our community.
                    </p>
                    <div className="max-w-md mx-auto">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-red-300 focus:outline-none"
                            />
                            <button className="bg-white text-red-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg transition-colors">
                                Subscribe
                            </button>
                        </div>
                        <p className="text-red-200 text-sm mt-3">
                            We respect your privacy. Unsubscribe at any time.
                        </p>
                    </div>
                </div>
            </section>

            {/* 11. Emergency Call to Action */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-linear-to-r from-red-50 to-red-100 rounded-2xl p-8 md:p-12">
                        <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-2xl text-white">🚨</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            Need Blood Urgently?
                        </h2>
                        <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
                            Don't wait in critical situations. Our emergency response team is available 24/7
                            to help you find compatible donors immediately.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/dashboard/create-request"
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                            >
                                Request Blood Now
                            </Link>
                            <Link
                                to="/contact"
                                className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300"
                            >
                                Emergency Hotline
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 12. Final Call to Action */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Save Lives?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of heroes who are already making a difference.
                        Your donation can be the difference between life and death.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/signup"
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Become a Donor Today
                        </Link>
                        <Link
                            to="/donation-requests"
                            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300"
                        >
                            Find Blood Requests
                        </Link>
                    </div>
                </div>
            </section>

            {/* Scroll to Top Button */}
            <ScrollToTop />
        </div>
    );
};

export default Homepage;