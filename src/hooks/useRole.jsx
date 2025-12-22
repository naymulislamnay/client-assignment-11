import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: role, isLoading: isRoleLoading } = useQuery({
        enabled: !loading && !!user?.email,
        queryKey: ['role', user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/users/${user.email}/role`);
            return result.data?.role || 'user';
        },
    })

    return [role, isRoleLoading];
};
export default useRole;