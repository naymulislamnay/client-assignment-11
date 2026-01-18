import React from 'react';

const Team = () => {
    const teamMembers = [
        {
            name: "Dr. Sarah Johnson",
            role: "Chief Medical Officer",
            image: "/public/default-Profile.png",
            bio: "15+ years in hematology and blood banking. Leading our medical safety protocols.",
            linkedin: "#"
        },
        {
            name: "Michael Chen",
            role: "CEO & Founder",
            image: "/public/default-Profile.png",
            bio: "Tech entrepreneur passionate about healthcare innovation and saving lives.",
            linkedin: "#"
        },
        {
            name: "Dr. Emily Rodriguez",
            role: "Head of Operations",
            image: "/public/default-Profile.png",
            bio: "Expert in healthcare logistics with 12 years of experience in blood services.",
            linkedin: "#"
        },
        {
            name: "David Kim",
            role: "CTO",
            image: "/public/default-Profile.png",
            bio: "Full-stack developer building scalable healthcare technology solutions.",
            linkedin: "#"
        },
        {
            name: "Lisa Thompson",
            role: "Community Manager",
            image: "/public/default-Profile.png",
            bio: "Building relationships with donors and recipients to strengthen our community.",
            linkedin: "#"
        },
        {
            name: "Dr. James Wilson",
            role: "Quality Assurance Director",
            image: "/public/default-Profile.png",
            bio: "Ensuring the highest standards of safety and quality in all our processes.",
            linkedin: "#"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h1>
                    <p className="text-xl text-gray-600">Dedicated professionals working to save lives every day</p>
                </div>

                <div className="mb-12">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Leadership</h2>
                        <p className="text-gray-700 max-w-3xl mx-auto">
                            Our team combines medical expertise, technology innovation, and passionate commitment
                            to create a platform that saves lives. Each member brings unique skills and experience
                            to ensure BloodBridge operates with the highest standards of safety, efficiency, and compassion.
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                            <div className="p-6 text-center">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-red-600 font-medium mb-3">{member.role}</p>
                                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                                <a
                                    href={member.linkedin}
                                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    <span className="mr-1">🔗</span>
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Join Our Mission</h3>
                        <p className="text-gray-700 mb-4">
                            We're always looking for passionate individuals who want to make a difference
                            in healthcare and save lives through technology.
                        </p>
                        <div className="space-y-2 text-sm text-gray-600">
                            <p>• Medical Professionals</p>
                            <p>• Software Developers</p>
                            <p>• Community Outreach Specialists</p>
                            <p>• Quality Assurance Experts</p>
                        </div>
                        <button className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                            View Open Positions
                        </button>
                    </div>

                    <div className="bg-red-50 rounded-lg p-8">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Values</h3>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <span className="text-red-500 mr-2 mt-1">❤️</span>
                                <div>
                                    <h4 className="font-medium text-gray-900">Compassion</h4>
                                    <p className="text-sm text-gray-600">Every decision is made with empathy and care</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="text-red-500 mr-2 mt-1">🛡️</span>
                                <div>
                                    <h4 className="font-medium text-gray-900">Safety</h4>
                                    <p className="text-sm text-gray-600">Uncompromising commitment to safety standards</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="text-red-500 mr-2 mt-1">🚀</span>
                                <div>
                                    <h4 className="font-medium text-gray-900">Innovation</h4>
                                    <p className="text-sm text-gray-600">Continuously improving through technology</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Team;