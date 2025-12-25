import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import useAxiosSecure from "../hooks/useAxiosSecure";

const roleStyles = {
    admin: "bg-red-100 text-red-700 border-red-300",
    volunteer: "bg-blue-100 text-blue-700 border-blue-300",
    donor: "bg-green-100 text-green-700 border-green-300",
};

const RoleDropdown = ({ user, refetch }) => {
    const { user: loggedUser } = useAuth();
    const { role } = useRole();
    const axiosSecure = useAxiosSecure();
    const [updating, setUpdating] = useState(false);

    if (role !== "admin") {
        return (
            <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${roleStyles[user.role]
                    }`}
            >
                {user.role}
            </span>
        );
    }


    if (user.email === loggedUser.email) {
        return (
            <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${roleStyles[user.role]
                    }`}
                title="You cannot change your own role"
            >
                {user.role}
            </span>
        );
    }

    const handleChange = async (e) => {
        const newRole = e.target.value;

        if (newRole === user.role) return;

        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Change role from "${user.role}" to "${newRole}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, change it!",
        });

        if (!result.isConfirmed) return;

        try {
            setUpdating(true);

            await axiosSecure.patch(`/users/role/${user.email}`, {
                requesterEmail: loggedUser.email,
                role: newRole,
            });

            Swal.fire({
                icon: "success",
                title: "Updated!",
                text: "User role has been updated successfully.",
                timer: 1500,
                showConfirmButton: false,
            });

            refetch();
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to update role", "error");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <select
            value={user.role}
            onChange={handleChange}
            disabled={updating}
            className={`border px-3 py-1 rounded-full text-sm font-semibold cursor-pointer ${roleStyles[user.role]}`}
        >
            {/* Current role */}
            <option value={user.role} disabled>
                {user.role}
            </option>

            {/* Other options */}
            {user.role !== "donor" && <option value="donor">Donor</option>}
            {user.role !== "volunteer" && <option value="volunteer">Volunteer</option>}
            {user.role !== "admin" && <option value="admin">Admin</option>}
        </select>
    );

};

export default RoleDropdown;
