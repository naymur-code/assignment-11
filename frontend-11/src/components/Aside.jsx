import React from 'react';
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

const Aside = () => {


    const menu = [
        { name: "Dashboard", icon: HomeIcon, to: '/dashboard/main' },
        { name: "Add Product", icon: ClipboardDocumentListIcon, to: '/dashboard/add-product' },
        { name: "Mange Product", icon: ClipboardDocumentListIcon, to: '/dashboard/mange-product' },
        { name: "Users", icon: UsersIcon, to: '/users' },
    
    ];
    return (
        <div>
            <aside className="h-screen  bg-gray-900 text-gray-100 flex flex-col">
                {/* Logo */}
                <div className="px-6 py-4 text-2xl font-bold border-b border-gray-800">
                    AdminPanel
                </div>

                {/* Menu */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {menu.map((item) => (
                        <NavLink
                            to={item.to}
                            key={item.name}
                            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
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