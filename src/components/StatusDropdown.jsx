import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import useAxiosSecure from "../hooks/useAxiosSecure";

const statusStyles = {
    true: "bg-green-100 text-green-700 border-green-300",
    false: "bg-red-100 text-red-700 border-red-300",
};

const StatusDropdown = ({ user, refetch }) => {
    const { user: loggedUser } = useAuth();
    const { role } = useRole();
    const axiosSecure = useAxiosSecure();
    const [updating, setUpdating] = useState(false);

    if (role !== "admin") {
        return (
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[user.status]}`}>
                {user.status ? "Active" : "Blocked"}
            </span>
        );
    }

    // Admin cannot block self
    if (user.email === loggedUser.email) {
        return (
            <span
                title="You cannot change your own status"
                className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyles[user.status]}`}
            >
                {user.status ? "Active" : "Blocked"}
            </span>
        );
    }

    const handleChange = async (e) => {
        const newStatus = e.target.value === "true";
        if (newStatus === user.status) return;

        const result = await Swal.fire({
            title: "Are you sure?",
            text: `Do you want to ${newStatus ? "activate" : "block"} this user?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#64748b",
            confirmButtonText: "Yes, confirm",
        });

        if (!result.isConfirmed) return;

        try {
            setUpdating(true);

            await axiosSecure.patch(`/users/status/${user.email}`, {
                requesterEmail: loggedUser.email,
                status: newStatus,
            });

            Swal.fire({
                icon: "success",
                title: "Updated!",
                text: "User status updated successfully",
                timer: 1400,
                showConfirmButton: false,
            });

            refetch();
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to update user status", "error");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <select
            value={user.status.toString()}
            onChange={handleChange}
            disabled={updating}
            className={`border px-1 py-1 rounded-full text-sm font-semibold cursor-pointer ${statusStyles[user.status]}`}
        >
            {/* Current status */}
            <option value={user.status.toString()} disabled>
                {user.status ? "Active" : "Blocked"}
            </option>

            {/* Other option */}
            {user.status !== true && <option value="true">Active</option>}
            {user.status !== false && <option value="false">Blocked</option>}
        </select>
    );

};

export default StatusDropdown;
