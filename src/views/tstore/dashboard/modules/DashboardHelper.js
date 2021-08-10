import { useState } from "react";
import axios from "axios";

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
    await axios
      .get(`${baseUrl}/user/my/profile`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        const result = response.data.result;
        setCurrentUser(result);

        if (result.hak_akses === "admin gudang") {
          getPemasukanHarian(
            `${baseUrl}/faktur-penjualan/pemasukan/harian/all`
          );
          getPemasukanBulanan(
            `${baseUrl}/faktur-penjualan/pemasukan/bulanan/all`
          );
          getDataPemasukanPerKategori(
            `${baseUrl}/faktur-penjualan/pemasukan/per/kategori-barang/all`
          );
        } else if (result.hak_akses === "marketing") {
          getPemasukanHarian(
            `${baseUrl}/faktur-penjualan/pemasukan/harian/${result.id}`
          );
          getPemasukanBulanan(
            `${baseUrl}/faktur-penjualan/pemasukan/bulanan/${result.id}`
          );
          getDataPemasukanPerKategori(
            `${baseUrl}/faktur-penjualan/pemasukan/per/kategori-barang/${result.id}`
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPemasukanHarian = async (url) => {
    await axios
      .get(url, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setPemasukanHarian(response.data.result[0].pemasukan);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadPemasukanHarian(false);
  };

  const getPemasukanBulanan = async (url) => {
    await axios
      .get(url, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setPemasukanBulanan(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadPemasukanBulanan(false);
  };

  const getDataPemasukanPerKategori = async (url) => {
    await axios
      .get(url, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        let aksesoris = 0;
        let laptop = 0;
        let networking = 0;
        let cctv = 0;
        let pc = 0;
        let printer = 0;

        response.data.result.map((item) => {
          item.detail_pesanan_penjualan.map((item2) => {
            if (
              item2.barang.kategori.nama_kategori.toLowerCase() === "aksesoris"
            ) {
              aksesoris += item2.kuantitas;
              setPenjualanAksesoris(aksesoris);
            }
            if (
              item2.barang.kategori.nama_kategori.toLowerCase() === "laptop"
            ) {
              laptop += item2.kuantitas;
              setPenjualanLaptop(laptop);
            }
            if (
              item2.barang.kategori.nama_kategori.toLowerCase() === "networking"
            ) {
              networking += item2.kuantitas;
              setPenjualanNetworking(networking);
            }
            if (item2.barang.kategori.nama_kategori.toLowerCase() === "cctv") {
              cctv += item2.kuantitas;
              setPenjualanCctv(cctv);
            }
            if (item2.barang.kategori.nama_kategori.toLowerCase() === "pc") {
              pc += item2.kuantitas;
              setPenjualanPc(pc);
            }
            if (
              item2.barang.kategori.nama_kategori.toLowerCase() === "printer"
            ) {
              printer += item2.kuantitas;
              setPenjualanPrinter(printer);
            }
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadPenjualanBarang(false);
  };

  return {
    currentUser,
    pemasukanHarian,
    setPemasukanHarian,
    loadPemasukanHarian,
    setLoadPemasukanHarian,
    pemasukanBulanan,
    setPemasukanBulanan,
    loadPemasukanBulanan,
    setLoadPemasukanBulanan,
    penjualanAksesoris,
    setPenjualanAksesoris,
    penjualanLaptop,
    setPenjualanLaptop,
    penjualanCctv,
    setPenjualanCctv,
    penjualanNetworking,
    setPenjualanNetworking,
    penjualanPc,
    setPenjualanPc,
    penjualanPrinter,
    setPenjualanPrinter,
    loadPenjualanBarang,
    setLoadPenjualanBarang,
    getCurrentUser,
  };
};

export default DashboardHelper;
