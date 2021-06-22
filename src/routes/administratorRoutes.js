import { lazy } from 'react';

const Dashboard = lazy(() => import('../views/administrator/dashboard/Dashboard'));
const StokBarang = lazy(() => import('../views/administrator/stok-barang/StokBarang'));
const Cabang = lazy(() => import('../views/administrator/data-cabang/Cabang'));
const Bank = lazy(() => import('../views/administrator/data-bank/DataBank'));
const KategoriBarang = lazy(() => import('../views/administrator/kategori-barang/KategoriBarang'));
const Marketing = lazy(() => import('../views/administrator/karyawan/Marketing'));
const DataAdministrator = lazy(() => import('../views/administrator/karyawan/DataAdministrator'));
const DataAdminGudang = lazy(() => import('../views/administrator/karyawan/DataAdminGudang'));
const DataPurchasing = lazy(() => import('../views/administrator/karyawan/DataPurchasing'));
const DataUser = lazy(() => import('../views/administrator/pelanggan/DataUser'));
const DataReseller = lazy(() => import('../views/administrator/pelanggan/DataReseller'));
const SyaratPembayaran = lazy(() => import('../views/administrator/syarat-pembayaran/SyaratPembayaran'));
const DataEkspedisi = lazy(() => import('../views/administrator/data-ekspedisi/DataEkspedisi'));
const PesananPenjualan = lazy(() => import('../views/administrator/pesanan-penjualan/PesananPenjualan'));
const PengirimanPesanan = lazy(() => import('../views/administrator/pengiriman-pesanan/PengirimanPesanan'));
const FakturPenjualan = lazy(() => import('../views/administrator/faktur-penjualan/FakturPenjualan'));

const administratorRoutes = [
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
  { path: '/master-data/karyawan/data-administrator', name: 'Data Administrator', component: DataAdministrator },
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

export default administratorRoutes;
