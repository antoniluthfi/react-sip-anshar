import React, { lazy } from 'react';

const WidgetsDropdown = lazy(() => import('./WidgetsDropdown.js'));

const Dashboard = () => {
    return (
        <WidgetsDropdown />
    )
}

export default Dashboard
