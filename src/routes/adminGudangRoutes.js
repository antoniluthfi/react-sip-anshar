import { lazy } from "react";

const Dashboard = lazy(() => import("../views/tstore/dashboard/Dashboard"));
const StokBarang = lazy(() => import("../views/tstore/stok-barang/StokBarang"));
const KategoriBarang = lazy(() =>
  import("../views/tstore/kategori-barang/KategoriBarang")
);

const adminGudangRoutes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/barang", name: "Barang", exact: true },
  {
    path: "/barang/stok-barang",
    name: "Stok",
    component: StokBarang,
  },
  {
    path: "/barang/kategori-barang",
    name: "Kategori",
    component: KategoriBarang,
  },
];

export default adminGudangRoutes;
