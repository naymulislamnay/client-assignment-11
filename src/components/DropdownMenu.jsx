import { useState, useEffect, useRef } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const DropdownMenu = ({ request, handleDelete, handleEditRequest }) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();


    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={menuRef} className="relative inline-block text-left">

            {/* Open / close button */}
            <button
                onClick={() => setOpen(!open)}
                className="p-2 bg-white rounded-full shadow hover:cursor-pointer"
            >
                <HiDotsVertical className="text-xl" />
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-25 bg-white rounded-lg shadow-lg z-50">
                    <ul className="py-1">
                        <li>
                            <button
                                className="w-full text-left px-2 py-1 hover:bg-gray-400 hover:cursor-pointer flex gap-1.5 items-center"
                                onClick={() => {
                                    handleEditRequest(request);
                                    setOpen(false)
                                }}
                            >
                                <CiEdit size={18} /> Edit
                            </button>
                        </li>
                        <li>
                            <button
                                className="w-full text-left px-2 py-1 hover:bg-gray-400 hover:cursor-pointer flex gap-1.5 items-center"
                                onClick={() => {
                                    handleDelete(request._id);
                                    setOpen(false)
                                }}
                            >
                                <MdDelete size={18}></MdDelete> Delete
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;