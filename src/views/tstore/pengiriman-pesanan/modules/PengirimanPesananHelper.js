import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";

const PengirimanPesananHelper = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const baseUrl = process.env.REACT_APP_LARAVEL_URL;
  const fields = [
    {
      key: "id",
      label: "No",
      _style: { textAlign: "center" },
    },
    {
      key: "kode_pengiriman",
      label: "Kode Pegiriman",
      _style: { textAlign: "center" },
    },
    {
      key: "name",
      label: "Nama",
      _style: { textAlign: "center" },
    },
    {
      key: "nomorhp",
      label: "Nomor HP",
      _style: { textAlign: "center" },
    },
    {
      key: "alamat",
      label: "Alamat",
      _style: { textAlign: "center" },
    },
    {
      key: "nama_cabang",
      label: "Cabang",
      _style: { textAlign: "center" },
    },
    {
      key: "ekspedisi",
      label: "Ekspedisi",
      _style: { textAlign: "center" },
    },
    {
      key: "ongkir",
      label: "Ongkir",
      _style: { textAlign: "center" },
    },
    {
      key: "keterangan",
      label: "Keterangan",
      _style: { textAlign: "center" },
    },
    {
      key: "tanggal_pengiriman",
      label: "Tanggal Pengiriman",
      _style: { textAlign: "center" },
    },
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState(false);
  const [dataPengirimanPesanan, setDataPengirimanPesanan] = useState([]);
  const [loadDataPengirimanPesanan, setLoadDatapengirimanPesanan] =
    useState(true);
  const [currentDataPengirimanPesanan, setCurrentDataPengirimanPesanan] =
    useState({});
  const [
    loadCurrentDataPengirimanPesanan,
    setLoadCurrentDataPengirimanPesanan,
  ] = useState(true);
  const [dataEkspedisi, setDataEkspedisi] = useState([]);
  const [loadDataEkspedisi, setLoadDataEkspedisi] = useState(true);
  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [dataKota, setDataKota] = useState([]);
  const [dataOngkir, setDataOngkir] = useState([]);
  const [input, setInput] = useState({
    id_marketing: "",
    user_id: "",
    tanggal_pengiriman: "",
    alamat: "",
    ongkir: "0",
    ekspedisi: "",
    id_cabang: "",
    keterangan: "",
    provinsi: "",
    kota: "",
  });
  const [details, setDetails] = useState([]);

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "ekspedisi" && e.target.value) {
      setDataOngkir([]);
      getDataOngkir(e.target.value);
    }
  };

  const submitHandler = (action) => {
    if (action === "update") {
      updateDataPengirimanPesanan(currentDataPengirimanPesanan.kode_pesanan);
    }
  };

  const closeModalHandler = (action) => {
    if (action === "submit" || action === "update") {
      setSuccess(!success);
    } else if (action === "view") {
      setInfo(!info);
    }

    setInput({
      id_marketing: "",
      user_id: "",
      tanggal_pengiriman: "",
      alamat: "",
      ongkir: "0",
      ekspedisi: "",
      id_cabang: "",
      keterangan: "",
      provinsi: "",
      kota: "",
    });
  };

  const getDataProvinsi = async () => {
    await axios
      .get(`${baseUrl}/rajaongkir/provinsi`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataProvinsi(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataKota = async (id_provinsi) => {
    await axios
      .get(`${baseUrl}/rajaongkir/kota/${id_provinsi}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataKota(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataOngkir = async (ekspedisi) => {
    await axios
      .post(
        `${baseUrl}/rajaongkir/ongkir`,
        {
          destination: input.kota,
          ekspedisi: ekspedisi,
          berat: currentDataPengirimanPesanan.pesanan_penjualan.total_berat,
        },
        {
          headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
          },
        }
      )
      .then((response) => {
        setDataOngkir(response.data.result);
      })
      .catch((error) => {
        Swal.fire(
          "Gagal",
          `Tidak dapat menemukan data dari ekspedisi ${ekspedisi.toUpperCase()}. Silahkan pilih ekspedisi lain`,
          "error"
        );
      });
  };

  const getDataPengirimanPesanan = async () => {
    await axios
      .get(`${baseUrl}/pengiriman-pesanan`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataPengirimanPesanan(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadDatapengirimanPesanan(false);
  };

  const getDataPengirimanPesananById = async (id, actionModal) => {
    let kode_pesanan;

    await axios
      .get(`${baseUrl}/pengiriman-pesanan/${id}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        const result = response.data.result;
        console.log(result);
        kode_pesanan = result.kode_pesanan;
        setCurrentDataPengirimanPesanan(result);

        if (actionModal === "update") {
          setInput({
            id_marketing: result.id_marketing,
            user_id: result.user_id,
            tanggal_pengiriman: result.tanggal_pengiriman,
            alamat: result.alamat,
            ongkir: result.ongkir,
            ekspedisi: result.id_ekspedisi,
            id_cabang: result.id_cabang,
            keterangan: result.keterangan,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadCurrentDataPengirimanPesanan(false);

    if (actionModal === "update") {
      setSuccess(!success);
    } else if (actionModal === "view") {
      setInfo(!info);
    } else if (actionModal === "delete") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteDataPengirimanPesanan(kode_pesanan);
        }
      });
    }
  };

  const getDataEkspedisi = async () => {
    await axios
      .get(`${baseUrl}/ekspedisi`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataEkspedisi(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadDataEkspedisi(false);
  };

  const postDataFakturPenjualan = async (payload) => {
    let message = "";
    if (!payload.tanggal_pengiriman) message = "Barang belum dikirimkan!";

    if (message) {
      Swal.fire("Gagal", message, "error");
    } else {
      await axios
        .post(
          `${baseUrl}/faktur-penjualan`,
          {
            kode_pesanan: payload.kode_pesanan,
            id_marketing: currentUser.id,
            user_id: payload.user_id,
            id_cabang: payload.cabang.id,
          },
          {
            headers: {
              Accept: "Application/json",
              Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
            },
          }
        )
        .then((response) => {
          Swal.fire("Berhasil", response.data.message, "success");

          getDataPengirimanPesanan();
        })
        .catch((error) => {
          Swal.fire("Gagal", error.message, "error");
        });
    }
  };

  const updateDataPengirimanPesanan = async (kode_pesanan) => {
    let message = "";
    if (!input.tanggal_pengiriman) message = "Tanggal pengiriman harus diisi!";
    else if (!input.provinsi) message = "Provinsi harus diisi!";
    else if (!input.kota) message = "Kota harus diisi!";
    else if (!input.ekspedisi) message = "Ekspedisi harus dipilih salah satu!";
    else if (!input.ongkir) message = "Ongkir harus diisi!";

    if (message) {
      Swal.fire("Gagal", message, "error");
    } else {
      let ongkir = 0;
      let total_harga = 0;
      if (input.ongkir) {
        if (
          input.ongkir.indexOf(".") !== -1 ||
          input.ongkir.indexOf(",") !== -1
        ) {
          ongkir = input.ongkir.replace(/[^0-9]+/g, "");
          total_harga =
            parseInt(
              currentDataPengirimanPesanan.pesanan_penjualan.total_harga
            ) + parseInt(ongkir);
        } else {
          ongkir = input.ongkir;
          total_harga =
            parseInt(
              currentDataPengirimanPesanan.pesanan_penjualan.total_harga
            ) + parseInt(ongkir);
        }
      }

      await axios
        .put(
          `${baseUrl}/pengiriman-pesanan/${kode_pesanan}`,
          {
            tanggal_pengiriman: input.tanggal_pengiriman,
            alamat:
              input.alamat == null
                ? currentDataPengirimanPesanan.user.alamat
                : input.alamat,
            ongkir: ongkir,
            ekspedisi: input.ekspedisi,
            keterangan: input.keterangan,
            total_harga: total_harga,
          },
          {
            headers: {
              Accept: "Application/json",
              Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
            },
          }
        )
        .then((response) => {
          Swal.fire("Berhasil", response.data.message, "success");

          getDataPengirimanPesanan();
        })
        .catch((error) => {
          Swal.fire("Gagal", error.message, "error");
        });

      closeModalHandler("update");
    }
  };

  const deleteDataPengirimanPesanan = async (id) => {
    await axios
      .put(
        `${baseUrl}/pengiriman-pesanan/${id}`,
        {
          tanggal_pengiriman: "",
          alamat: "",
          ongkir: 0,
          id_ekspedisi: "",
          keterangan: "",
        },
        {
          headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
          },
        }
      )
      .then((response) => {
        Swal.fire("Berhasil", "Data berhasil dihapus", "success");

        getDataPengirimanPesanan();
      })
      .catch((error) => {
        Swal.fire("Gagal", error.message, "error");
      });
  };

  const deleteDataFakturPenjualan = async (no_bukti) => {
    await axios
      .delete(`${baseUrl}/faktur-penjualan/${no_bukti}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        Swal.fire("Berhasil", "Data berhasil dihapus", "success");

        getDataPengirimanPesanan();
      })
      .catch((error) => {
        Swal.fire("Gagal", error.message, "error");
      });
  };

  return {
    fields,
    success,
    info,
    dataPengirimanPesanan,
    setDataPengirimanPesanan,
    loadDataPengirimanPesanan,
    setLoadDatapengirimanPesanan,
    currentDataPengirimanPesanan,
    setCurrentDataPengirimanPesanan,
    loadCurrentDataPengirimanPesanan,
    setLoadCurrentDataPengirimanPesanan,
    dataEkspedisi,
    setDataEkspedisi,
    loadDataEkspedisi,
    setLoadDataEkspedisi,
    dataProvinsi,
    setDataProvinsi,
    dataKota,
    setDataKota,
    dataOngkir,
    setDataOngkir,
    input,
    details,
    toggleDetails,
    changeHandler,
    submitHandler,
    closeModalHandler,
    getDataPengirimanPesanan,
    getDataPengirimanPesananById,
    getDataEkspedisi,
    postDataFakturPenjualan,
    deleteDataFakturPenjualan,
    getDataProvinsi,
    getDataKota,
    getDataOngkir,
  };
};

export default PengirimanPesananHelper;
