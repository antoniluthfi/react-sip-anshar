import React, { lazy } from 'react';

const WidgetsDropdown = lazy(() => import('./WidgetsDropdown.js'));

const Dashboard = () => {
    return (
        <>
            <h3></h3>
            <WidgetsDropdown />
        </>
    )
}

export default Dashboard
