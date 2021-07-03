import { lazy } from 'react';

const Dashboard = lazy(() => import('../views/tsc/dashboard/Dashboard'));
const PenerimaanBarang = lazy(() => import('../views/tsc/penerimaan-barang/PenerimaanBarang'));
const PengembalianBarang = lazy(() => import('../views/tsc/pengembalian-barang/PengembalianBarang'));
const ArusKas = lazy(() => import('../views/tsc/arus-kas/ArusKas'));

const adminGudangRoutes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/penerimaan-barang', name: 'Penerimaan Barang', component: PenerimaanBarang },
  { path: '/pengembalian-barang', name: 'Pengembalian Barang', component: PengembalianBarang },
  { path: '/arus-kas', name: 'Arus Kas', component: ArusKas },
];

export default adminGudangRoutes;