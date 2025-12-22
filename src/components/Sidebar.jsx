import React from 'react';
import { NavLink } from 'react-router';
import useRole from '../hooks/useRole';
import Logo from './Logo';

const Sidebar = () => {
    const { role } = useRole();

    return (
        <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col p-6 gap-2 sticky top-0 h-screen">
            {/* Header */}
            <div className="mb-6">
                <NavLink to='/'>
                    <div className="flex items-center gap-2 text-2xl font-extrabold text-red-600 mb-2">
                        <Logo></Logo>
                    </div>
                </NavLink>
                <h2 className="text-white font-semibold text-lg">Control Panel</h2>
            </div>

            {/* General Links */}
            <h3 className="text-white text-xs uppercase tracking-wider mb-2 mt-4">General</h3>
            <NavLink
                to="/dashboard/overview"
                className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-slate-800 text-white' : 'hover:bg-slate-800'
                    }`
                }
            >
                📊 Overview
            </NavLink>
            <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-slate-800 text-white' : 'hover:bg-slate-800'
                    }`
                }
            >
                👤 Profile
            </NavLink>
            <NavLink
                to="/dashboard/my-requests"
                className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-slate-800 text-white' : 'hover:bg-slate-800'
                    }`
                }
            >
                🩸 My Requests
            </NavLink>
            <NavLink
                to="/dashboard/create-request"
                className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-slate-800 text-white' : 'hover:bg-slate-800'
                    }`
                }
            >
                ➕ Create Request
            </NavLink>

            {/* Admin Links */}
            {role === 'admin' && (
                <>
                    <h3 className="text-white text-xs uppercase tracking-wider mt-6 mb-2">Administration</h3>
                    <NavLink
                        to="/dashboard/all-users"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-slate-800 text-white' : 'hover:bg-slate-800'
                            }`
                        }
                    >
                        👥 All Users
                    </NavLink>
                    <NavLink
                        to="/dashboard/all-requests"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-slate-800 text-white' : 'hover:bg-slate-800'
                            }`
                        }
                    >
                        📋 All Requests
                    </NavLink>
                    <NavLink
                        to="/dashboard/funding"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-slate-800 text-white' : 'hover:bg-slate-800'
                            }`
                        }
                    >
                        💰 Funding
                    </NavLink>
                </>
            )}
        </aside>
    );
};

export default Sidebar;