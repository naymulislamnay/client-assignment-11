import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import RoleDropdown from '../components/RoleDropdown';
import StatusDropdown from '../components/StatusDropdown';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        if (!user?.email) return;

        try {
            setLoading(true);
            const res = await axiosSecure.get('/users', {
                params: { email: user.email }
            });
            setUsers(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [user]);

    if (loading) {
        return <p className="text-center py-10">Loading users...</p>;
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-8">All Users</h2>

            <div className="bg-white p-6 rounded-lg shadow">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b">
                                <th className="py-3 text-center text-xs font-semibold uppercase">Name</th>
                                <th className="py-3 text-center text-xs font-semibold uppercase">Role</th>
                                <th className="py-3 text-center text-xs font-semibold uppercase">Email</th>
                                <th className="py-3 text-center text-xs font-semibold uppercase">Blood</th>
                                <th className="py-3 text-center text-xs font-semibold uppercase">Division</th>
                                <th className="py-3 text-center text-xs font-semibold uppercase">District</th>
                                <th className="py-3 text-center text-xs font-semibold uppercase">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((u) => (
                                <tr
                                    key={u._id}
                                    className="border-b hover:bg-slate-50 transition"
                                >
                                    <td className="py-3 text-center">{u.name}</td>

                                    <td className="py-3 text-center">
                                        <RoleDropdown
                                            user={u}
                                            refetch={fetchUsers}
                                        />
                                    </td>

                                    <td className="py-3 text-center">{u.email}</td>

                                    <td className="py-3 text-center font-bold text-red-500">
                                        {u.bloodGroup}
                                    </td>

                                    <td className="py-3 text-center">{u.division}</td>

                                    <td className="py-3 text-center">{u.district}</td>

                                    <td className="py-3 text-center">
                                        <StatusDropdown user={u} refetch={fetchUsers} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {users.length === 0 && (
                        <p className="text-center py-6 text-gray-500">
                            No users found
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllUsers;