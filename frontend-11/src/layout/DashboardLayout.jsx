import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../components/Aside';

const DashboardLayout = () => {
    return (
        <div className='flex'>
            <div className='w-64'>
                <Aside />
            </div>

            <div className="w-full">
                <Outlet className="w-3/4" />
            </div>

        </div>
    );
};

export default DashboardLayout;