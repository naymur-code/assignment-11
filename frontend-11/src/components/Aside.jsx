import React, { useContext } from 'react';
import '../components/aside.css'
import {
    HomeIcon,
    UsersIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon,
    ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';

const Aside = () => {
    const { role } = useContext(AuthContext)


    return (
        <div>
            <aside className="h-screen  bg-gray-900 text-gray-100 flex flex-col">
                {/* Logo */}
                <div className="px-6 py-4 text-2xl font-bold border-b border-gray-800">
                    AdminPanel
                </div>

                {/* Menu */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <NavLink
                        to="/dashboard/main"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        <HomeIcon className="h-5 w-5" />
                        <span>Dashboard</span>
                    </NavLink>

                    {
                        role == 'donor' && <NavLink
                            to="/dashboard/add-request"
                            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                        >
                            <ClipboardDocumentListIcon className="h-5 w-5" />
                            <span>Add Request</span>
                        </NavLink>

                    }
                    <NavLink
                        to="/dashboard/mange-product"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        <ClipboardDocumentListIcon className="h-5 w-5" />
                        <span>Manage Product</span>
                    </NavLink>

                    {
                        role == 'admin' && <NavLink
                            to="/dashboard/all-users"
                            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                        >
                            <UsersIcon className="h-5 w-5" />
                            <span>All Users</span>
                        </NavLink>
                    }

                    <NavLink
                        to="/users"
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        <UsersIcon className="h-5 w-5" />
                        <span>Users</span>
                    </NavLink>

                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-gray-800">
                    <Link to={'/'} className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-red-600 transition">
                        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                        Back
                    </Link>
                </div>
            </aside>

        </div>
    );
};

export default Aside;