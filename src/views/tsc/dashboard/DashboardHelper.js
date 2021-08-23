import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

const DashboardHelper = () => {
  const baseUrl = process.env.REACT_APP_LARAVEL_URL;
  const cetakLaporanUrl = process.env.REACT_APP_LARAVEL_PUBLIC;
  const currentUser = useSelector((state) => state.currentUser);

  const [dataCabang, setDataCabang] = useState([]);
  const [dataOpsi, setDataOpsi] = useState([]);
  const [filterLebihDariSatuHari, setFilterLebihDariSatuHari] =
    useState("d-none");
  const [filterCabang, setFilterCabang] = useState("d-none");
  const [cetakLaporan, setCetakLaporan] = useState({
    jenis: "",
    kode: "",
    dari: "",
    sampai: "",
    cabang: "",
  });

  const getDataOpsi = async (jenis) => {
    let url = "";
    if (jenis === "tts") {
      url = `${baseUrl}/penerimaan/list/no-service`;
    } else if (jenis === "nota-servis") {
      url = `${baseUrl}/pengembalian/list/no-service`;
    }

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
  };

  const getDataCabang = async () => {
    await axios
      .get(`${baseUrl}/cabang`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataCabang(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cetakLaporanHandler = (e) => {
    if (e.target.name === "jenis" && e.target.value) {
      setDataOpsi([]);
      setCetakLaporan({
        ...cetakLaporan,
        jenis: e.target.value,
        kode: "",
      });

      getDataOpsi(e.target.value);
    } else {
      setCetakLaporan({
        ...cetakLaporan,
        [e.target.name]: e.target.value,
      });
    }

    if (e.target.name === "filter_lebih_dari_satuhari" && e.target.checked) {
      setFilterLebihDariSatuHari("d-block");
    } else if (
      e.target.name === "filter_lebih_dari_satuhari" &&
      !e.target.checked
    ) {
      setFilterLebihDariSatuHari("d-none");
    }

    if (e.target.name === "filter_cabang" && e.target.checked) {
      setFilterCabang("d-block");
    } else if (e.target.name === "filter_cabang" && !e.target.checked) {
      setFilterCabang("d-none");
    }
  };

  const submitHandler = (action) => {
    if (action === "pelanggan") {
      window.open(
        `${cetakLaporanUrl}/laporan/pelanggan/data-pelanggan2/user/${currentUser.name}`
      );
    } else if (action === "tts") {
      if (!cetakLaporan.kode) {
        Swal.fire("Gagal", "Nomor servis harus diisi!", "error");
      } else {
        window.open(
          `${cetakLaporanUrl}/tanda-terima-service/${cetakLaporan.kode}`
        );
      }
    } else if (action === "nota-servis") {
      if (!cetakLaporan.kode) {
        Swal.fire("Gagal", "Nomor servis harus diisi!", "error");
      } else {
        window.open(`${cetakLaporanUrl}/nota-service/${cetakLaporan.kode}`);
      }
    } else if (action === "arus-kas") {
      let dari;
      let sampai;
      let cabang;

      if (!cetakLaporan.dari) {
        dari = "x";
      } else {
        dari = cetakLaporan.dari;
      }

      if (!cetakLaporan.sampai) {
        sampai = "x";
      } else {
        sampai = cetakLaporan.sampai;
      }

      if (!cetakLaporan.cabang) {
        cabang = currentUser.id_cabang;
      } else {
        cabang = cetakLaporan.cabang;
      }

      window.open(
        `${cetakLaporanUrl}/laporan-arus-kas/${dari}/${sampai}/${cabang}/${currentUser.name}`
      );
    }
  };

  return {
    dataCabang,
    dataOpsi,
    setDataCabang,
    filterLebihDariSatuHari,
    filterCabang,
    cetakLaporan,
    setCetakLaporan,
    getDataCabang,
    cetakLaporanHandler,
    submitHandler,
  };
};

export default DashboardHelper;
