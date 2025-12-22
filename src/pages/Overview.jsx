import React from 'react';

const Overview = () => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-8">Welcome Back, Admin!</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg border-l-4 border-red-600 shadow">
                    <h4 className="text-gray-500 text-sm font-medium">Total Users</h4>
                    <h2 className="text-2xl font-bold mt-2">1,240</h2>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600 shadow">
                    <h4 className="text-gray-500 text-sm font-medium">Requests</h4>
                    <h2 className="text-2xl font-bold mt-2">856</h2>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-green-600 shadow">
                    <h4 className="text-gray-500 text-sm font-medium">Funds</h4>
                    <h2 className="text-2xl font-bold mt-2">৳45,000</h2>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Recent Requests</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Blood</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4">Patient A</td>
                                <td className="px-6 py-4">O+</td>
                                <td className="px-6 py-4">
                                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">In Progress</span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-700">Delete</button>
                                </td>
                            </tr>

                            <tr>
                                <td className="px-6 py-4">Patient B</td>
                                <td className="px-6 py-4">A-</td>
                                <td className="px-6 py-4">
                                    <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">Done</span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-700">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Overview;