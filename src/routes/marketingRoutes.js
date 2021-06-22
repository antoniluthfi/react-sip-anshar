import { lazy } from 'react';

const Dashboard = lazy(() => import('../views/administrator/dashboard/Dashboard'));
const StokBarang = lazy(() => import('../views/administrator/stok-barang/StokBarang'));
const PesananPenjualan = lazy(() => import('../views/administrator/pesanan-penjualan/PesananPenjualan'));
const PengirimanPesanan = lazy(() => import('../views/administrator/pengiriman-pesanan/PengirimanPesanan'));
const FakturPenjualan = lazy(() => import('../views/administrator/faktur-penjualan/FakturPenjualan'));

const marketingRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },

  { path: '/master-data', name: 'Master Data', exact: true },

  { path: '/stok-barang', name: 'Stok', component: StokBarang },
  { path: '/pesanan-penjualan', name: 'Pesanan Penjualan', component: PesananPenjualan },
  { path: '/pengiriman-pesanan', name: 'Pengiriman Pesanan', component: PengirimanPesanan },
  { path: '/faktur-penjualan', name: 'Faktur Penjualan', component: FakturPenjualan }
];

export default marketingRoutes;
