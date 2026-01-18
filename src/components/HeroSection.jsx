import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from '../hooks/useAuth';

const HeroSection = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // Hero slides data
    const heroSlides = [
        {
            id: 1,
            title: "Donate Blood,",
            highlight: "Save Lives",
            subtitle: "Your simple act of kindness can give someone a second chance at life. Join our community of heroes today.",
            image: "🩸",
            stats: { number: "1,250+", label: "Lives Saved" },
            bgGradient: "from-red-900 via-red-800 to-red-700"
        },
        {
            id: 2,
            title: "Emergency",
            highlight: "Blood Requests",
            subtitle: "Connect instantly with compatible donors during critical moments. Every second counts when lives are at stake.",
            image: "🚨",
            stats: { number: "24/7", label: "Emergency Support" },
            bgGradient: "from-red-800 via-red-700 to-red-600"
        },
        {
            id: 3,
            title: "Join Our",
            highlight: "Community",
            subtitle: "Be part of a network of 5,000+ active donors making a difference in their communities every day.",
            image: "🤝",
            stats: { number: "5,000+", label: "Active Donors" },
            bgGradient: "from-red-700 via-red-600 to-red-500"
        }
    ];

    // Auto-slide functionality
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    // Animation on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const handleJoinAsDonor = () => {
        if (user) {
            navigate('/dashboard/create-request');
        } else {
            navigate('/signup');
        }
    };

    const handleFindDonors = () => {
        navigate('/donation-requests');
    };

    const handleEmergencyRequest = () => {
        if (user) {
            navigate('/dashboard/create-request');
        } else {
            navigate('/login', {
                state: '/dashboard/create-request',
            });
        }
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const currentSlideData = heroSlides[currentSlide];

    return (
        <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
            {/* Animated Background */}
            <div className={`absolute inset-0 bg-linear-to-br ${currentSlideData.bgGradient} transition-all duration-1000`}>
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-4 h-4 bg-white rounded-full animate-pulse"></div>
                    <div className="absolute top-20 right-20 w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute bottom-10 right-10 w-5 h-5 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Left Content */}
                        <div className={`text-white transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                            {/* Main Heading */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                <span className="block">{currentSlideData.title}</span>
                                <span className="text-red-300 animate-pulse">{currentSlideData.highlight}</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg md:text-xl text-red-100 mb-8 leading-relaxed max-w-lg">
                                {currentSlideData.subtitle}
                            </p>

                            {/* Stats */}
                            <div className="mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 inline-block">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-white">{currentSlideData.stats.number}</div>
                                    <div className="text-red-200 text-sm">{currentSlideData.stats.label}</div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <button
                                    onClick={handleJoinAsDonor}
                                    className="group bg-white text-red-600 hover:bg-red-50 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                                >
                                    <span className="flex items-center justify-center">
                                        Join as Donor
                                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </button>

                                <button
                                    onClick={handleFindDonors}
                                    className="group border-2 border-white text-white hover:bg-white hover:text-red-600 font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    Find Donors
                                </button>
                            </div>

                            {/* Emergency CTA */}
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
                                <button
                                    onClick={handleEmergencyRequest}
                                    className="text-red-200 hover:text-white underline font-medium transition-colors"
                                >
                                    Need Emergency Blood? Click Here
                                </button>
                            </div>
                        </div>

                        {/* Right Content - Visual Element */}
                        <div className={`hidden lg:flex justify-center items-center transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                            <div className="relative">
                                {/* Main Circle */}
                                <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center">
                                    <div className="text-8xl animate-bounce">
                                        {currentSlideData.image}
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-400 rounded-full flex items-center justify-center text-white font-bold animate-pulse">
                                    +
                                </div>
                                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-600 font-bold animate-bounce">
                                    ❤️
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slider Controls */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex space-x-3">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                ? 'bg-white scale-125'
                                : 'bg-white/50 hover:bg-white/75'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex flex-col items-center text-white/70 animate-bounce">
                    <span className="text-sm mb-2">Scroll Down</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>

            {/* Wave Transition to Next Section */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                <svg
                    className="relative block w-full h-20"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-white"
                    ></path>
                </svg>
            </div>
        </section>
    );
};

export default HeroSection;