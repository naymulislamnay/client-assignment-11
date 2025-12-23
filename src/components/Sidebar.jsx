import React from 'react';
import { NavLink } from 'react-router';
import useRole from '../hooks/useRole';
import Logo from './Logo';

const Sidebar = () => {
    const { role } = useRole();

    // Sidebar background color
    const bgColorClass = role === 'admin' ? 'bg-[#360c0c]'
        : role === 'volunteer' ? 'bg-[#070746]' : 'bg-[#022C0C]';

    // Define active and hover colors based on role
    const activeClass = role === 'admin' ? 'bg-[#4e1a1a] text-[#FFD5D5]'
        : role === 'volunteer' ? 'bg-[#1a1a7a] text-[#C5C5FF]' : 'bg-[#034d1a] text-[#B6FFB6]';

    const hoverClass = role === 'admin' ? 'hover:bg-[#4e1a1a]'
        : role === 'volunteer' ? 'hover:bg-[#1a1a7a]' : 'hover:bg-[#034d1a]';

    return (
        <aside className={`w-64 ${bgColorClass} text-slate-300 flex flex-col p-6 gap-2 sticky top-0 h-screen`}>
            {/* Header */}
            <NavLink to='/'>
                <div className="flex items-center gap-2 text-2xl font-extrabold text-red-600">
                    <Logo />
                </div>
            </NavLink>

            <h2 className="text-white font-semibold text-md mt-4">Control Panel</h2>

            {/* General Links */}
            {['overview', 'profile', 'my-requests', 'create-request'].map((path) => {
                const labels = {
                    'overview': '📊 Overview',
                    'profile': '👤 Profile',
                    'my-requests': '🩸 My Requests',
                    'create-request': '➕ Create Request'
                };
                return (
                    <NavLink
                        key={path}
                        to={`/dashboard/${path}`}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? activeClass : hoverClass}`
                        }
                    >
                        {labels[path]}
                    </NavLink>
                );
            })}

            {/* Admin and volunteer Links */}
            {(role === 'admin' || role === 'volunteer') && (
                <>
                    <h3 className="text-white text-xs uppercase tracking-wider mt-6 mb-2">Administration</h3>
                    <NavLink
                        to="/dashboard/all-requests"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? activeClass : hoverClass}`
                        }
                    >
                        📋 All Requests
                    </NavLink>
                </>
            )}

            {/* Admin-only Links */}
            {role === 'admin' && (
                <>
                    <NavLink
                        to="/dashboard/all-users"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? activeClass : hoverClass}`
                        }
                    >
                        👥 All Users
                    </NavLink>
                    <NavLink
                        to="/dashboard/funding"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? activeClass : hoverClass}`
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
