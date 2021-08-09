import { lazy } from 'react';

const Dashboard = lazy(() => import('../views/tsc/dashboard/Dashboard'));
const Teknisi = lazy(() => import('../views/tsc/karyawan/teknisi/DataTeknisi'));
const Pengerjaan = lazy(() => import('../views/tsc/pengerjaan/Pengerjaan'));

const teknisiRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/teknisi', name: 'Teknisi', component: Teknisi },
  { path: '/pengerjaan', name: 'Pengerjaan', component: Pengerjaan },
];

export default teknisiRoutes;