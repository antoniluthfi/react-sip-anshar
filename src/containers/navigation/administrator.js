import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTachometerAlt,
    faCodeBranch,
    faFolder,
    faFileAlt,
    faLongArrowAltRight,
    faAddressCard,
    faBook,
    faShippingFast,
    faMoneyBill,
    faPiggyBank,
    faMoneyCheckAlt,
    faTools
} from '@fortawesome/free-solid-svg-icons'

const administratorNavigation =  [
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
        _tag: 'CSidebarNavDropdown',
        name: 'Master Data',
        route: '/master-data',
        icon: <FontAwesomeIcon icon={faFolder} className="mr-3 ml-2" />,
        _children: [
            {
                _tag: 'CSidebarNavDropdown',
                name: 'Barang',
                icon: <FontAwesomeIcon icon={faFileAlt} className="mr-2" />,
                route: '/master-data/barang',
                _children: [
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Stok Barang',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/barang/stok-barang',
                    },    
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Kategori Barang',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/barang/kategori-barang',
                    },    
                ]
            },
            {
                _tag: 'CSidebarNavItem',
                name: 'Data Cabang',
                icon: <FontAwesomeIcon icon={faCodeBranch} className="mr-2" />,
                to: '/master-data/data-cabang',
            },      
            {
                _tag: 'CSidebarNavItem',
                name: 'Data Bank',
                icon: <FontAwesomeIcon icon={faPiggyBank} className="mr-2" />,
                to: '/master-data/data-bank',
            },      
            {
                _tag: 'CSidebarNavDropdown',
                name: 'Karyawan',
                icon: <FontAwesomeIcon icon={faAddressCard} className="mr-2" />,
                route: '/master-data/karyawan',
                _children: [
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Data Administrator',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/karyawan/data-administrator',
                    },    
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Data Admin Gudang',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/karyawan/data-admin-gudang',
                    },    
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Data Marketing',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/karyawan/data-marketing',
                    },    
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Data Purchasing',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/karyawan/data-purchasing',
                    },    
                ]
            },      
            {
                _tag: 'CSidebarNavDropdown',
                name: 'Pelanggan',
                icon: <FontAwesomeIcon icon={faAddressCard} className="mr-2" />,
                route: '/master-data/pelanggan',
                _children: [
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Data User',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/pelanggan/data-user',
                    },    
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Data Reseller',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/pelanggan/data-reseller',
                    },    
                ]
            },  
            {
                _tag: 'CSidebarNavDropdown',
                name: 'Lain-lain',
                icon: <FontAwesomeIcon icon={faTools} className="mr-2" />,
                route: '/master-data/lain-lain',
                _children: [
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Syarat Pembayaran',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/lain-lain/syarat-pembayaran',
                    },    
                    {
                        _tag: 'CSidebarNavItem',
                        name: 'Data Ekspedisi',
                        icon: <FontAwesomeIcon icon={faLongArrowAltRight} className="mr-2 ml-3" />,
                        to: '/master-data/lain-lain/data-ekspedisi',
                    },    
                ]
            },  
        ]
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

export default administratorNavigation
