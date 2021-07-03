import { lazy } from 'react';

const Dashboard = lazy(() => import('../views/tsc/dashboard/Dashboard'));
const Pengerjaan = lazy(() => import('../views/tsc/penerimaan-barang/Pengerjaan'));

const adminGudangRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/penerimaan-barang', name: 'Penerimaan Barang', component: Pengerjaan },
];

export default adminGudangRoutes;