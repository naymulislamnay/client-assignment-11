// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        axiosSecure.get('/users', {
            params: {
                email: user.email
            }
        })
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    }, [user, axiosSecure]);

    // const statusClasses = {
    //     pending: 'bg-yellow-100 text-yellow-800',
    //     done: 'bg-green-100 text-green-800',
    // };


    return (
        <div>
            <h2 className="text-2xl font-semibold mb-8">All Users</h2>

            <div className="bg-white p-6 rounded-lg shadow">
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b-2 border-slate-200">
                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                    Name
                                </th>
                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                    Role
                                </th>
                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                    Email
                                </th>
                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                    Blood Group
                                </th>
                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                    Division
                                </th>
                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                    District
                                </th>
                                <th className="px-4 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                                    <td className="px-4 py-4 text-slate-700">
                                        {u.name}
                                    </td>

                                    <td className="px-4 py-4 text-slate-700">
                                        {u.role}
                                    </td>

                                    <td className="px-4 py-4 text-slate-700">
                                        {u.email}
                                    </td>

                                    <td className="px-4 py-4 font-bold text-[#f14343]">
                                        {u.bloodGroup}
                                    </td>

                                    <td className="px-4 py-4 text-slate-700">
                                        {u.division}
                                    </td>

                                    <td className="px-4 py-4 text-slate-700">
                                        {u.district}
                                    </td>

                                    <td className="px-4 py-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${u.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {u.status ? 'Active' : 'Blocked'}
                                        </span>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;