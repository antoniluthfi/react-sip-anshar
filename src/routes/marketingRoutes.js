import { lazy } from 'react';

const Dashboard = lazy(() => import('../views/tstore/dashboard/Dashboard'));
const StokBarang = lazy(() => import('../views/tstore/stok-barang/StokBarang'));
const Cabang = lazy(() => import('../views/tstore/data-cabang/Cabang'));
const Bank = lazy(() => import('../views/tstore/data-bank/DataBank'));
const KategoriBarang = lazy(() => import('../views/tstore/kategori-barang/KategoriBarang'));
const Marketing = lazy(() => import('../views/tstore/karyawan/Marketing'));
const DataAdminGudang = lazy(() => import('../views/tstore/karyawan/DataAdminGudang'));
const DataPurchasing = lazy(() => import('../views/tstore/karyawan/DataPurchasing'));
const DataUser = lazy(() => import('../views/tstore/pelanggan/DataUser'));
const DataReseller = lazy(() => import('../views/tstore/pelanggan/DataReseller'));
const SyaratPembayaran = lazy(() => import('../views/tstore/syarat-pembayaran/SyaratPembayaran'));
const DataEkspedisi = lazy(() => import('../views/tstore/data-ekspedisi/DataEkspedisi'));
const PesananPenjualan = lazy(() => import('../views/tstore/pesanan-penjualan/PesananPenjualan'));
const PengirimanPesanan = lazy(() => import('../views/tstore/pengiriman-pesanan/PengirimanPesanan'));
const FakturPenjualan = lazy(() => import('../views/tstore/faktur-penjualan/FakturPenjualan'));

const marketingRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/master-data', name: 'Master Data', exact: true },
  { path: '/master-data/data-cabang', name: 'Data Cabang', component: Cabang },
  { path: '/master-data/data-bank', name: 'Data Bank', component: Bank },

  { path: '/master-data/barang', name: 'Barang', exact: true },
  { path: '/master-data/barang/stok-barang', name: 'Stok', component: StokBarang },
  { path: '/master-data/barang/kategori-barang', name: 'Kategori', component: KategoriBarang },

  { path: '/master-data/karyawan', name: 'Karyawan', exact: true },
  { path: '/master-data/karyawan/data-marketing', name: 'Data Marketing', component: Marketing },
  { path: '/master-data/karyawan/data-admin-gudang', name: 'Data Admin Gudang', component: DataAdminGudang },
  { path: '/master-data/karyawan/data-purchasing', name: 'Data Purchasing', component: DataPurchasing },

  { path: '/master-data/pelanggan', name: 'Pelanggan', exact: true },
  { path: '/master-data/pelanggan/data-user', name: 'Data User', component: DataUser },
  { path: '/master-data/pelanggan/data-reseller', name: 'Data Reseller', component: DataReseller },

  { path: '/master-data/lain-lain', name: 'Lain-lain', exact: true},
  { path: '/master-data/lain-lain/syarat-pembayaran', name: 'Syarat Pembayaran', component: SyaratPembayaran },
  { path: '/master-data/lain-lain/data-ekspedisi', name: 'Data Ekspedisi', component: DataEkspedisi }, 

  { path: '/pesanan-penjualan', name: 'Pesanan Penjualan', component: PesananPenjualan },
  { path: '/pengiriman-pesanan', name: 'Pengiriman Pesanan', component: PengirimanPesanan },
  { path: '/faktur-penjualan', name: 'Faktur Penjualan', component: FakturPenjualan }
];

export default marketingRoutes;
