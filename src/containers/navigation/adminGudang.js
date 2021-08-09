import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faFileAlt,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";

const adminGudang = [
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
    name: "Barang",
    route: "/barang",
    icon: <FontAwesomeIcon icon={faFolder} className="mr-3 ml-2" />,
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Stok Barang",
        icon: <FontAwesomeIcon icon={faFileAlt} className="mr-2" />,
        to: "/barang/stok-barang",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Kategori Barang",
        icon: <FontAwesomeIcon icon={faFileAlt} className="mr-2" />,
        to: "/barang/kategori-barang",
      },
    ],
  },
];

export default adminGudang;
