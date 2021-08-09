import { lazy } from "react";

const Dashboard = lazy(() => import("../views/tsc/dashboard/Dashboard"));
const PenerimaanBarang = lazy(() =>
  import("../views/tsc/penerimaan-barang/PenerimaanBarang")
);
const PengembalianBarang = lazy(() =>
  import("../views/tsc/pengembalian-barang/PengembalianBarang")
);
const ArusKas = lazy(() => import("../views/tsc/arus-kas/ArusKas"));
const AdminTSC = lazy(() => import("../views/tsc/karyawan/admin-tsc/DataAdminTsc"));
const Pelanggan = lazy(() => import("../views/tsc/pelanggan/DataPelanggan"));
const MerekTipe = lazy(() => import("../views/tsc/merek-tipe/MerekTipe"));
const BarangJasa = lazy(() => import("../views/tsc/barang-jasa/BarangJasa"));
const SandiTransaksi = lazy(() =>
  import("../views/tsc/sandi-transaksi/SandiTransaksi")
);

const adminGudangRoutes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },

  { path: "/master-data", name: "Master Data", exact: true },
  { path: "/master-data/admin-tsc", name: "Admin TSC", component: AdminTSC },
  { path: "/master-data/pelanggan", name: "Pelanggan", component: Pelanggan },
  { path: "/master-data/tipe", name: "Tipe", component: MerekTipe },
  {
    path: "/master-data/barang-jasa",
    name: "Barang & Jasa",
    component: BarangJasa,
  },
  {
    path: "/master-data/sandi-transaksi",
    name: "Sandi Transaksi",
    component: SandiTransaksi,
  },

  {
    path: "/penerimaan-barang",
    name: "Penerimaan Barang",
    component: PenerimaanBarang,
  },
  {
    path: "/pengembalian-barang",
    name: "Pengembalian Barang",
    component: PengembalianBarang,
  },
  { path: "/arus-kas", name: "Arus Kas", component: ArusKas },
];

export default adminGudangRoutes;
