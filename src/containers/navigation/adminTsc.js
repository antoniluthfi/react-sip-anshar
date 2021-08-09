import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faFileAlt,
  faFolder,
  faAddressCard,
  faBook,
  faWindowRestore,
  faHandHolding,
} from "@fortawesome/free-solid-svg-icons";

const adminTsc = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <FontAwesomeIcon icon={faTachometerAlt} className="mr-3 ml-2" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavDropdown",
    name: "Master Data",
    route: "/master-data",
    icon: <FontAwesomeIcon icon={faFolder} className="mr-3 ml-2" />,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Admin TSC",
        icon: <FontAwesomeIcon icon={faAddressCard} className="mr-2 ml-1" />,
        to: "/master-data/admin-tsc",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Pelanggan",
        icon: <FontAwesomeIcon icon={faAddressCard} className="mr-2 ml-1" />,
        to: "/master-data/pelanggan",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Tipe",
        icon: <FontAwesomeIcon icon={faFileAlt} className="mr-2 ml-1" />,
        to: "/master-data/tipe",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Barang & Jasa",
        icon: <FontAwesomeIcon icon={faFileAlt} className="mr-2 ml-1" />,
        to: "/master-data/barang-jasa",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Sandi Transaksi",
        icon: <FontAwesomeIcon icon={faFileAlt} className="mr-2 ml-1" />,
        to: "/master-data/sandi-transaksi",
      },
    ],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Penerimaan Barang",
    to: "/penerimaan-barang",
    icon: <FontAwesomeIcon icon={faHandHolding} className="mr-3 ml-2" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Pengembalian Barang",
    to: "/pengembalian-barang",
    icon: <FontAwesomeIcon icon={faWindowRestore} className="mr-3 ml-2" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Arus Kas",
    to: "/arus-kas",
    icon: <FontAwesomeIcon icon={faBook} className="mr-3 ml-2" />,
  },
];

export default adminTsc;
