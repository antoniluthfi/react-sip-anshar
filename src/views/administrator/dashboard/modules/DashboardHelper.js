import { useState } from 'react';
import axios from 'axios';

const DashboardHelper = () => {
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const [currentUser, setCurrentUser] = useState({});
    const [pemasukanHarian, setPemasukanHarian] = useState(0);
    const [loadPemasukanHarian, setLoadPemasukanHarian] = useState(true);
    const [pemasukanBulanan, setPemasukanBulanan] = useState(0);
    const [loadPemasukanBulanan, setLoadPemasukanBulanan] = useState(false);
    const [penjualanAksesoris, setPenjualanAksesoris] = useState(0);
    const [penjualanLaptop, setPenjualanLaptop] = useState(0);
    const [penjualanNetworking, setPenjualanNetworking] = useState(0);
    const [penjualanCctv, setPenjualanCctv] = useState(0);
    const [penjualanPc, setPenjualanPc] = useState(0);
    const [penjualanPrinter, setPenjualanPrinter] = useState(0);
    const [loadPenjualanBarang, setLoadPenjualanBarang] = useState(false);

    const getCurrentUser = async () => {
        await axios.get(`${baseUrl}/user/my/profile`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            const result = response.data.result;
            setCurrentUser(result);

            if(result.hak_akses === 'administrator' || result.hak_akses === 'admin gudang') {
                getPemasukanHarian(`${baseUrl}/faktur-penjualan/pemasukan/harian/all`);
                getPemasukanBulanan(`${baseUrl}/faktur-penjualan/pemasukan/bulanan/all`);
                getDataPemasukanPerKategori(`${baseUrl}/faktur-penjualan/pemasukan/per/kategori-barang/all`);
            } else if(result.hak_akses === 'marketing') {
                getPemasukanHarian(`${baseUrl}/faktur-penjualan/pemasukan/harian/${result.id}`);
                getPemasukanBulanan(`${baseUrl}/faktur-penjualan/pemasukan/bulanan/${result.id}`);
                getDataPemasukanPerKategori(`${baseUrl}/faktur-penjualan/pemasukan/per/kategori-barang/${result.id}`);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    const getPemasukanHarian = async url => {
        await axios.get(url, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            setPemasukanHarian(response.data.result[0].pemasukan);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadPemasukanHarian(false);
    }

    const getPemasukanBulanan = async url => {
        await axios.get(url, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            setPemasukanBulanan(response.data.result[0].pemasukan);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadPemasukanBulanan(false);
    }

    const getDataPemasukanPerKategori = async url => {
        await axios.get(url, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            response.data.result.map(item => {
                if(item.kategori.toLowerCase() == 'aksesoris') setPenjualanAksesoris(item.total_penjualan);
                if(item.kategori.toLowerCase() == 'laptop') setPenjualanLaptop(item.total_penjualan);
                if(item.kategori.toLowerCase() == 'networking') setPenjualanNetworking(item.total_penjualan);
                if(item.kategori.toLowerCase() == 'cctv') setPenjualanCctv(item.total_penjualan);
                if(item.kategori.toLowerCase() == 'pc') setPenjualanPc(item.total_penjualan);
                if(item.kategori.toLowerCase() == 'printer') setPenjualanPrinter(item.total_penjualan);
            });
        })
        .catch(error => {
            console.log(error);
        });

        setLoadPenjualanBarang(false);
    }

    return {
        currentUser,
        pemasukanHarian,
        loadPemasukanHarian,
        pemasukanBulanan,
        loadPemasukanBulanan,
        penjualanAksesoris,
        penjualanLaptop,
        penjualanCctv,
        penjualanNetworking,
        penjualanPc,
        penjualanPrinter,
        loadPenjualanBarang,
        getCurrentUser,
    }
}

export default DashboardHelper;