import React from 'react';

const Stories = () => {
    const successStories = [
        {
            id: 1,
            title: "Emergency Surgery Success",
            donor: "Anonymous Donor",
            recipient: "Maria S.",
            bloodType: "O-",
            date: "December 2024",
            story: "Maria needed emergency surgery after a car accident. Thanks to our platform, we found a compatible O- donor within 30 minutes. The surgery was successful and Maria is now fully recovered.",
            image: "/public/default-Profile.png"
        },
        {
            id: 2,
            title: "Cancer Treatment Support",
            donor: "John D.",
            recipient: "8-year-old Alex",
            bloodType: "A+",
            date: "November 2024",
            story: "Young Alex was undergoing chemotherapy and needed regular blood transfusions. John became a regular donor, providing the support Alex needed throughout his treatment. Alex is now in remission.",
            image: "/public/default-Profile.png"
        },
        {
            id: 3,
            title: "Childbirth Complications",
            donor: "Sarah M.",
            recipient: "Jennifer L.",
            bloodType: "B-",
            date: "October 2024",
            story: "Jennifer experienced complications during childbirth and needed an immediate blood transfusion. Sarah, a new mother herself, donated blood that helped save both Jennifer and her baby.",
            image: "/public/default-Profile.png"
        },
        {
            id: 4,
            title: "Motorcycle Accident Recovery",
            donor: "Community Drive",
            recipient: "Robert K.",
            bloodType: "AB+",
            date: "September 2024",
            story: "Robert was in a severe motorcycle accident requiring multiple units of blood. Our community came together, and 5 donors contributed to his recovery. Robert is now back to work and riding again.",
            image: "/public/default-Profile.png"
        }
    ];

    const impactStats = [
        { number: "1,250+", label: "Lives Saved" },
        { number: "5,000+", label: "Active Donors" },
        { number: "3,500+", label: "Successful Donations" },
        { number: "24/7", label: "Emergency Support" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h1>
                    <p className="text-xl text-gray-600">Real stories of lives saved through blood donation</p>
                </div>

                {/* Impact Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    {impactStats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                            <div className="text-3xl font-bold text-red-600 mb-2">{stat.number}</div>
                            <div className="text-gray-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Success Stories */}
                <div className="space-y-8">
                    {successStories.map((story) => (
                        <div key={story.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="md:flex">
                                <div className="md:w-1/3">
                                    <img
                                        src={story.image}
                                        alt="Success story"
                                        className="w-full h-64 md:h-full object-cover"
                                    />
                                </div>
                                <div className="md:w-2/3 p-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-2xl font-semibold text-gray-900">{story.title}</h2>
                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                                            {story.bloodType}
                                        </span>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                                        <div>
                                            <span className="font-medium text-gray-700">Donor:</span>
                                            <span className="ml-2 text-gray-600">{story.donor}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Recipient:</span>
                                            <span className="ml-2 text-gray-600">{story.recipient}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Date:</span>
                                            <span className="ml-2 text-gray-600">{story.date}</span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-700">Blood Type:</span>
                                            <span className="ml-2 text-gray-600">{story.bloodType}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-700 leading-relaxed">{story.story}</p>

                                    <div className="mt-6 flex items-center text-sm text-gray-500">
                                        <span className="mr-4">❤️ Life Saved</span>
                                        <span>🙏 Community Impact</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-12 bg-red-50 rounded-lg p-8 text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Be Part of the Next Success Story</h2>
                    <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                        Every donation has the potential to save a life. Join our community of heroes and make a difference today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
                            Become a Donor
                        </button>
                        <button className="border border-red-600 text-red-600 px-8 py-3 rounded-lg hover:bg-red-50 transition-colors font-medium">
                            Request Blood
                        </button>
                    </div>
                </div>

                {/* Share Your Story */}
                <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Share Your Story</h3>
                    <p className="text-gray-600 text-center mb-6">
                        Have you been helped by BloodBridge or want to share your donation experience? We'd love to hear from you.
                    </p>
                    <div className="text-center">
                        <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                            Submit Your Story
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stories;