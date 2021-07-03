import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CCreateElement,
    CSidebar,
    CSidebarBrand,
    CSidebarNav,
    CSidebarNavDivider,
    CSidebarNavTitle,
    CSidebarMinimizer,
    CSidebarNavDropdown,
    CSidebarNavItem,
    CLabel
} from '@coreui/react'

// sidebar nav config
import adminGudangNavigation from './navigation/adminGudang';
import marketingNavigation from './navigation/marketing'; 

const TheSidebar = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentUser);
    const show = useSelector(state => state.sidebarShow.sidebarShow);

    const [navigation, setNavigation] = useState([]);

    const getCurrentUser = async () => {
        const user = await currentUser;
        if(user.hak_akses === 'admin gudang') {
            setNavigation(adminGudangNavigation);
        } else if(user.hak_akses === 'marketing') {
            setNavigation(marketingNavigation);
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <CSidebar
            show={show}
            onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
        >
            <CSidebarBrand className="d-md-down-none" to="/">
                <img src="https://drive.google.com/thumbnail?id=12ubasd0uZrQ3LFlQ3Hw1mG4Q8ORLZ3Ao" alt="logo" height="35" width="35" />
                <CLabel className="ml-2 mt-2" style={{ fontSize: 18 }}>CV. Twincom Group</CLabel>
            </CSidebarBrand>
            <CSidebarNav>

                <CCreateElement
                    items={navigation}
                    components={{
                        CSidebarNavDivider,
                        CSidebarNavDropdown,
                        CSidebarNavItem,
                        CSidebarNavTitle
                    }}
                />
            </CSidebarNav>
            <CSidebarMinimizer className="c-d-md-down-none"/>
        </CSidebar>
    )
}

export default React.memo(TheSidebar)
