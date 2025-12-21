import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#FFF5F5]">
            <Navbar></Navbar>
            <div className={`max-w-300 mx-auto w-full grow`}>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;