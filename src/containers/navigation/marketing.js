import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTachometerAlt,
    faFileAlt,
    faBook,
    faShippingFast,
    faMoneyBill
} from '@fortawesome/free-solid-svg-icons'

const marketing =  [
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
        icon: <FontAwesomeIcon icon={faFileAlt} className="mr-3 ml-2" />,
    },   
    {
        _tag: 'CSidebarNavItem',
        name: 'Pesanan Penjualan',
        to: '/pesanan-penjualan',
        icon: <FontAwesomeIcon icon={faBook} className="mr-3 ml-2" />,
    },   
    {
        _tag: 'CSidebarNavItem',
        name: 'Pengiriman Pesanan',
        to: '/pengiriman-pesanan',
        icon: <FontAwesomeIcon icon={faShippingFast} className="mr-3 ml-2" />,
    },   
    {
        _tag: 'CSidebarNavItem',
        name: 'Faktur Penjualan',
        to: '/faktur-penjualan',
        icon: <FontAwesomeIcon icon={faMoneyBill} className="mr-3 ml-2" />,
    },   
]

export default marketing;
