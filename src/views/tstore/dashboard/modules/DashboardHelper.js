import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const DashboardHelper = () => {
  const baseUrl = process.env.REACT_APP_LARAVEL_URL;
  const cetakLaporanUrl = process.env.REACT_APP_LARAVEL_PUBLIC;
  const currentUser = useSelector((state) => state.currentUser);
  const [warning, setWarning] = useState(false);
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
  const [dataOpsi, setDataOpsi] = useState([]);
  const [cetakLaporan, setCetakLaporan] = useState({
    jenis: "",
    kode: "",
  });

  const cetakLaporanHandler = (e) => {
    if (e.target.name === "jenis" && e.target.value) {
      setDataOpsi([]);
      getDataOpsi(e.target.value);

      setCetakLaporan({
        jenis: e.target.value,
        kode: "",
      });
    } else {
      setCetakLaporan({
        ...cetakLaporan,
        [e.target.name]: e.target.value,
      });
    }
  };

  const getCurrentUser = async () => {
    await currentUser;
    if (currentUser.hak_akses === "admin gudang") {
      getPemasukanHarian(`${baseUrl}/faktur-penjualan/pemasukan/harian/all`);
      getPemasukanBulanan(`${baseUrl}/faktur-penjualan/pemasukan/bulanan/all`);
      getDataPemasukanPerKategori(
        `${baseUrl}/faktur-penjualan/pemasukan/per/kategori-barang/all`
      );
    } else if (currentUser.hak_akses === "marketing") {
      getPemasukanHarian(
        `${baseUrl}/faktur-penjualan/pemasukan/harian/${currentUser.id}`
      );
      getPemasukanBulanan(
        `${baseUrl}/faktur-penjualan/pemasukan/bulanan/${currentUser.id}`
      );
      getDataPemasukanPerKategori(
        `${baseUrl}/faktur-penjualan/pemasukan/per/kategori-barang/${currentUser.id}`
      );
    }
  };

  const getDataOpsi = async (jenis) => {
    let url = "";
    if (jenis === "pesanan-penjualan") {
      url = `${baseUrl}/pesanan-penjualan/list/kode-pesanan`;
    } else if (jenis === "pengiriman-pesanan") {
      url = `${baseUrl}/pengiriman-pesanan/list/kode-pengiriman`;
    } else if (jenis === "faktur-penjualan") {
      url = `${baseUrl}/faktur-penjualan/list/no-faktur`;
    }

    if (url) {
      await axios
        .get(url, {
          headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
          },
        })
        .then((response) => {
          setDataOpsi(response.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
        if (response.data.result) {
          setPemasukanHarian(response.data.result[0].pemasukan);
        }
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

  const submitHandler = (action) => {
    if (action === "stok-barang") {
      window.open(
        `${cetakLaporanUrl}/laporan/barang/stok-barang/user/${currentUser.name}`
      );
    } else if (action === "pelanggan-user") {
      window.open(
        `${cetakLaporanUrl}/laporan/pelanggan/data-pelanggan/role/user/user/${currentUser.name}`
      );
    } else if (action === "pelanggan-reseller") {
      window.open(
        `${cetakLaporanUrl}/laporan/pelanggan/data-pelanggan/role/reseller/user/${currentUser.name}`
      );
    } else if (action === "pesanan-penjualan") {
      if (!cetakLaporan.kode) {
        Swal.fire("Gagal", "Nomor sales order harus diisi!", "error");
      } else {
        window.open(
          `${cetakLaporanUrl}/laporan/transaksi/pesanan-penjualan/id/${cetakLaporan.kode}`
        );
      }
    } else if (action === "pengiriman-pesanan") {
      if (!cetakLaporan.kode) {
        Swal.fire("Gagal", "Nomor delivery order harus diisi!", "error");
      } else {
        window.open(
          `${cetakLaporanUrl}/laporan/transaksi/pengiriman-pesanan/id/${cetakLaporan.kode}`
        );
      }
    } else if (action === "faktur-penjualan") {
      if (!cetakLaporan.kode) {
        Swal.fire("Gagal", "Nomor faktur penjualan harus diisi!", "error");
      } else {
        window.open(
          `${cetakLaporanUrl}/laporan/transaksi/faktur-penjualan/id/${cetakLaporan.kode}`
        );
      }
    }
  };

  return {
    warning,
    setWarning,
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
    cetakLaporan,
    setCetakLaporan,
    dataOpsi,
    setLoadPenjualanBarang,
    getCurrentUser,
    cetakLaporanHandler,
    submitHandler,
  };
};

export default DashboardHelper;
