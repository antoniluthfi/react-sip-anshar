import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTachometerAlt,
    faFileAlt,
} from '@fortawesome/free-solid-svg-icons'

const adminGudang =  [
    {
        _tag: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: <FontAwesomeIcon icon={faTachometerAlt} className="mr-3 ml-2" />,
        badge: {
            color: 'info',
            text: 'NEW',
        }
    },
    {
        _tag: 'CSidebarNavItem',
        name: 'Stok Barang',
        to: '/stok-barang',
        icon: <FontAwesomeIcon icon={faFileAlt} className="mr-2 ml-3" />,
    },   
]

export default adminGudang;
