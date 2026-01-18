import React, { useState } from 'react';

const FAQ = () => {
    const [openItems, setOpenItems] = useState({});

    const toggleItem = (index) => {
        setOpenItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const faqData = [
        {
            category: "General",
            questions: [
                {
                    question: "What is BloodBridge?",
                    answer: "BloodBridge is a digital platform that connects blood donors with recipients in need. We facilitate the coordination of blood donations through a safe, efficient, and user-friendly system."
                },
                {
                    question: "How does BloodBridge work?",
                    answer: "Recipients post blood requests with their requirements, and our system matches them with compatible donors in their area. Donors receive notifications and can choose to help. All actual donations happen through certified medical facilities."
                },
                {
                    question: "Is BloodBridge free to use?",
                    answer: "Yes, BloodBridge is completely free for both donors and recipients. We believe that saving lives should never have a cost barrier."
                }
            ]
        },
        {
            category: "For Donors",
            questions: [
                {
                    question: "Who can donate blood?",
                    answer: "Generally, healthy adults aged 17-65 who weigh at least 110 pounds can donate blood. However, specific eligibility requirements may vary by location and medical history. You'll be screened before each donation."
                },
                {
                    question: "How often can I donate blood?",
                    answer: "You can donate whole blood every 56 days (8 weeks). Platelet donations can be made every 7 days, up to 24 times per year. Our system tracks your donation history to ensure safe intervals."
                },
                {
                    question: "What information do I need to provide?",
                    answer: "You'll need to provide basic personal information, contact details, blood type (if known), location, and answer some health screening questions. All information is kept confidential."
                },
                {
                    question: "Can I choose who receives my blood?",
                    answer: "You can respond to specific requests that match your blood type and location. However, the final matching and distribution is handled by medical professionals to ensure the best outcomes."
                }
            ]
        },
        {
            category: "For Recipients",
            questions: [
                {
                    question: "How do I request blood?",
                    answer: "Create an account, fill out a blood request form with your medical requirements, and our system will notify compatible donors in your area. You'll need medical documentation to verify your need."
                },
                {
                    question: "How quickly can I find a donor?",
                    answer: "Response times vary depending on your blood type, location, and urgency. Common blood types in urban areas typically find matches within hours, while rare types may take longer."
                },
                {
                    question: "What if I need blood urgently?",
                    answer: "Mark your request as 'Emergency' and we'll send immediate notifications to all compatible donors. For life-threatening situations, always contact emergency services first."
                },
                {
                    question: "Do I need to pay donors?",
                    answer: "No, blood donation through BloodBridge is voluntary and unpaid. Donors give blood to help save lives, not for financial compensation."
                }
            ]
        },
        {
            category: "Safety & Medical",
            questions: [
                {
                    question: "Is blood donation safe?",
                    answer: "Yes, blood donation is very safe when done at certified medical facilities. All equipment is sterile and single-use. Donors are screened for health and safety before each donation."
                },
                {
                    question: "How is blood tested for safety?",
                    answer: "All donated blood is tested for infectious diseases including HIV, Hepatitis B & C, and other bloodborne pathogens. Only blood that passes all safety tests is used for transfusions."
                },
                {
                    question: "What happens during the donation process?",
                    answer: "You'll complete a health questionnaire, have a mini-physical exam, then donate blood (usually takes 8-10 minutes). The entire process typically takes about an hour including rest time."
                },
                {
                    question: "Are there any side effects?",
                    answer: "Most people feel fine after donating. Some may experience mild dizziness or fatigue. Serious side effects are rare. Medical staff monitor donors and provide post-donation care instructions."
                }
            ]
        },
        {
            category: "Technical Support",
            questions: [
                {
                    question: "I forgot my password. How do I reset it?",
                    answer: "Click 'Forgot Password' on the login page and enter your email address. We'll send you a secure link to reset your password."
                },
                {
                    question: "How do I update my profile information?",
                    answer: "Log into your account and go to 'Profile Settings'. You can update your contact information, medical details, and notification preferences there."
                },
                {
                    question: "I'm not receiving notifications. What should I do?",
                    answer: "Check your notification settings in your profile, ensure your email address is correct, and check your spam folder. You can also contact our support team for assistance."
                },
                {
                    question: "How do I delete my account?",
                    answer: "Contact our support team at support@bloodbridge.com to request account deletion. We'll remove your personal information while keeping anonymized data for medical research purposes."
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
                    <p className="text-xl text-gray-600">Find answers to common questions about BloodBridge</p>
                </div>

                {/* Quick Contact */}
                <div className="bg-red-50 rounded-lg p-6 mb-8">
                    <div className="text-center">
                        <h2 className="text-lg font-semibold text-red-800 mb-2">Need Immediate Help?</h2>
                        <p className="text-red-700 mb-4">For urgent blood requests or emergency support, contact us directly:</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="tel:+15551234567" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                                📞 Emergency: (555) 911-BLOOD
                            </a>
                            <a href="mailto:support@bloodbridge.com" className="border border-red-600 text-red-600 px-6 py-2 rounded-lg hover:bg-red-50 transition-colors">
                                ✉️ Email Support
                            </a>
                        </div>
                    </div>
                </div>

                {/* FAQ Categories */}
                <div className="space-y-8">
                    {faqData.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="bg-gray-50 px-6 py-4 border-b">
                                <h2 className="text-xl font-semibold text-gray-900">{category.category}</h2>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {category.questions.map((item, itemIndex) => {
                                    const uniqueIndex = `${categoryIndex}-${itemIndex}`;
                                    return (
                                        <div key={itemIndex}>
                                            <button
                                                className="w-full px-6 py-4 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                                                onClick={() => toggleItem(uniqueIndex)}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-lg font-medium text-gray-900 pr-4">
                                                        {item.question}
                                                    </h3>
                                                    <span className="text-gray-400 flex-shrink-0">
                                                        {openItems[uniqueIndex] ? '−' : '+'}
                                                    </span>
                                                </div>
                                            </button>
                                            {openItems[uniqueIndex] && (
                                                <div className="px-6 pb-4">
                                                    <p className="text-gray-700 leading-relaxed">
                                                        {item.answer}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Still Have Questions */}
                <div className="mt-12 bg-white rounded-lg shadow-lg p-8 text-center">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still Have Questions?</h2>
                    <p className="text-gray-600 mb-6">
                        Can't find what you're looking for? Our support team is here to help you 24/7.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
                            Contact Support
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                            Live Chat
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQ;