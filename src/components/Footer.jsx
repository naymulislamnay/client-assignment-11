import React from 'react';
import { Link } from 'react-router';
import Logo from './Logo';

const Footer = () => {
    return (
        <div className="bg-[#360c0c] mt-3">
            <div className="max-w-300 mx-auto pt-5 sm:pt-8 md:pt-12 pb-3 p-2.5">
                <div className="flex justify-between flex-col md:flex-row gap-1.5 text-[12px] text-[#A1A1AA] text-center md:text-left">
                    <div className="w-full md:max-w-[25%] px-1.5">
                        <Link to='/' className="text-[30px] hover:cursor-pointer w-fit md:mx-0">
                            <Logo></Logo>
                        </Link>
                        <p>
                            At BloodBridge, we believe in the power of humanity. This platform brings donors and recipients together to make life-saving moments possible every day. Your support helps build a future filled with hope.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-white text-[15px] font-medium mt-1.5 md:mt-0 mb-0 md:mb-3">Company</h2>
                        <Link to="/about" className="block mt-0 md:mt-2.5 hover:text-white transition-colors">About Us</Link>
                        <Link to="/mission" className="block mt-0 md:mt-2.5 hover:text-white transition-colors">Our Mission</Link>
                        <Link to="/contact" className="block mt-0 md:mt-2.5 hover:text-white transition-colors">Contact Us</Link>
                        <Link to="/team" className="block mt-0 md:mt-2.5 hover:text-white transition-colors">Our Team</Link>
                    </div>

                    <div>
                        <h2 className="text-white text-[15px] font-medium mt-1.5 md:mt-0 mb-0 md:mb-3">Services</h2>
                        <Link to="/donation-requests" className="block mt-0 md:mt-2.5 hover:text-white transition-colors">Find Donors</Link>
                        <Link to="/dashboard/create-request" className="block mt-0 md:mt-2.5 hover:text-white transition-colors">Request Blood</Link>
                        <Link to="/dashboard/funding" className="block mt-0 md:mt-2.5 hover:text-white transition-colors">Emergency Fund</Link>
                        <Link to="/stories" className="block mt-0 md:mt-2.5 hover:text-white transition-colors">Success Stories</Link>
                    </div>

                    <div>
                        <h2 className="text-white text-[15px] font-medium mt-1.5 md:mt-0 mb-0 md:mb-3">Information</h2>
                        <Link to="/privacy" className="block mt-0 md:mt-2.5 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="block mt-0 md:mt-2.5 hover:text-white transition-colors">Terms & Conditions</Link>
                        <Link to="/signup" className="block mt-0 md:mt-2.5 hover:text-white transition-colors">Join Us</Link>
                        <Link to="/faq" className="block mt-0 md:mt-2.5 hover:text-white transition-colors">FAQ</Link>
                    </div>
                </div>



                <hr className="text-[#5e5e5e] mt-4 md:mt-6" />
                <div className="flex flex-col md:flex-row justify-between items-center mt-3 text-[12px] text-[#A1A1AA]">
                    <p>© 2025 BloodBridge. All rights reserved.</p>
                    <div className="flex gap-4 mt-2 md:mt-0">
                        <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
                        <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
                        <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;