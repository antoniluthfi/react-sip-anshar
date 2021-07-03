import { lazy } from 'react';

const Dashboard = lazy(() => import('../views/tstore/dashboard/Dashboard'));
const StokBarang = lazy(() => import('../views/tstore/stok-barang/StokBarang'));

const adminGudangRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/stok-barang', name: 'Stok Barang', component: StokBarang },
];

export default adminGudangRoutes;
