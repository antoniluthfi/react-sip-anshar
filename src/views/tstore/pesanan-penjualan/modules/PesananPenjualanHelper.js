import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const PesananPenjualanHelper = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const baseUrl = process.env.REACT_APP_LARAVEL_URL;
  const fields = [
    {
      key: "id",
      label: "No",
      _style: { textAlign: "center" },
    },
    {
      key: "kode_pesanan",
      label: "Kode Pesanan",
      _style: { textAlign: "center" },
    },
    {
      key: "name",
      label: "Nama",
      _style: { textAlign: "center" },
    },
    {
      key: "email",
      label: "Email",
      _style: { textAlign: "center" },
    },
    {
      key: "syarat_pembayaran",
      label: "Syarat Pembayaran",
      _style: { textAlign: "center" },
    },
    {
      key: "cabang",
      label: "Cabang",
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
  const [dataPesananPenjualan, setDataPesananPenjualan] = useState([]);
  const [loadDataPesananPenjualan, setLoadDataPesananPenjualan] =
    useState(true);
  const [currentPesananPenjualan, setCurrentPesananPenjualan] = useState({});
  const [loadCurrentDataPesananPenjualan, setLoadCurrentDataPesananPenjualan] =
    useState(true);
  const [dataBarang, setDataBarang] = useState([]);
  const [dataPelanggan, setDataPelanggan] = useState([]);
  const [dataCabang, setDataCabang] = useState([]);
  const [loadDataCabang, setLoadDataCabang] = useState(true);
  const [dataSyaratPembayaran, setDataSyaratPembayaran] = useState([]);
  const [loadDataSyaratPembayaran, setLoadDataSyaratPembayaran] =
    useState(true);
  const [diskonLangsungVisibility, setDiskonLangsungVisibility] =
    useState("d-none");
  const [diskonPersenVisibility, setDiskonPersenVisibility] =
    useState("d-none");
  const [buttonSubmitName, setButtonSubmitName] = useState("Submit");
  const [modalTitle, setModalTitle] = useState("Tambah Data");
  const [input, setInput] = useState({
    user_id: "",
    id_cabang: "",
    diskon_langsung: "",
    diskon_persen: "",
    id_penjual: "",
    keterangan: "",
    id_syarat_pembayaran: "",
  });
  const [inputBarang, setInputBarang] = useState([
    {
      id_barang: "",
      berat: "",
      kuantitas: 1,
      nama_barang: "",
      harga_user: "",
      harga_reseller: "",
      stok_dapat_dijual: "",
      harga_total: 0,
    },
  ]);
  const [currentPelanggan, setCurrentPelanggan] = useState({
    name: "",
    hak_akses: "",
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

  const closeModalHandler = (action) => {
    if (action === "submit" || action === "update") {
      setSuccess(!success);
      setButtonSubmitName("Submit");
      setModalTitle("Tambah Data");
    } else if (action === "view") {
      setInfo(!info);
    }

    setInput({
      user_id: "",
      diskon_langsung: "",
      diskon_persen: "",
      id_penjual: "",
      id_cabang: "",
      keterangan: "",
      id_syarat_pembayaran: "",
    });

    setInputBarang([
      {
        id_barang: "",
        kuantitas: 1,
        berat: "",
        nama_barang: "",
        harga_user: "",
        harga_reseller: "",
        stok_dapat_dijual: "",
        harga_total: 0,
      },
    ]);

    setCurrentPelanggan({
      name: "",
      hak_akses: "",
    });
  };

  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "diskon_langsung" && e.target.value) {
      setDiskonLangsungVisibility("d-block");
      setDiskonPersenVisibility("d-none");

      setInput({
        ...input,
        diskon_langsung: e.target.value,
        diskon_persen: "",
      });
    } else if (e.target.name === "diskon_persen" && e.target.value) {
      setDiskonLangsungVisibility("d-none");
      setDiskonPersenVisibility("d-block");

      setInput({
        ...input,
        diskon_langsung: "",
        diskon_persen: e.target.value,
      });
    }
  };

  const submitHandler = (action) => {
    if (action === "submit") {
      postDataPesananaPenjualan();
    } else if (action === "update") {
      updateDataPesananPenjualan(currentPesananPenjualan.kode_pesanan);
    }
  };

  const getCurrentUser = async () => {
    getDataPesananPenjualan(
      `${baseUrl}/pesanan-penjualan/user/${currentUser.id}`
    );
  };

  const getDataPesananPenjualan = async (url) => {
    await axios
      .get(url, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataPesananPenjualan(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadDataPesananPenjualan(false);
  };

  const getDataPesananPenjualanById = async (id, actionModal) => {
    await axios
      .get(`${baseUrl}/pesanan-penjualan/${id}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        const result = response.data.result;
        setCurrentPesananPenjualan(result);

        if (actionModal === "update") {
          setInput({
            user_id: result.user_id,
            id_cabang: result.id_cabang,
            diskon_persen: "",
            diskon_langsung: result.diskon,
            id_penjual: result.id_penjual,
            keterangan: result.keterangan,
            id_syarat_pembayaran: result.id_syarat_pembayaran,
          });

          setCurrentPelanggan({
            name: result.pelanggan.name,
            hak_akses: result.pelanggan.hak_akses,
          });

          const detailPesananPenjualan = [];
          result.detail_pesanan_penjualan.map((detail) => {
            detailPesananPenjualan.push({
              id_barang: detail.id_barang,
              kuantitas: detail.kuantitas,
              berat: detail.berat,
              nama_barang: detail.barang.nama_barang,
              harga_user: detail.barang.harga_user,
              harga_reseller: detail.barang.harga_reseller,
              stok_dapat_dijual: detail.stok_dapat_dijual,
              harga_total: detail.total_harga,
            });
          });
          setInputBarang(detailPesananPenjualan);

          getDataStokBarang(result.id_cabang);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadCurrentDataPesananPenjualan(false);

    if (actionModal === "update") {
      setSuccess(!success);
      setButtonSubmitName("Update");
      setModalTitle("Update Data");
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
          deleteDataPesananPenjualan(id);
        }
      });
    }
  };

  const getDataPelanggan = async () => {
    await axios
      .get(`${baseUrl}/user/role/pelanggan`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataPelanggan(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataStokBarang = async (id_cabang) => {
    await axios
      .get(`${baseUrl}/stok-barang/data/available/${id_cabang}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataBarang(response.data.result);
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

    setLoadDataCabang(false);
  };

  const getSyaratPembayaran = async () => {
    await axios
      .get(`${baseUrl}/syarat-pembayaran`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataSyaratPembayaran(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadDataSyaratPembayaran(false);
  };

  const postDataPesananaPenjualan = async () => {
    let tipe_diskon = "";
    if (input.diskon_langsung) {
      tipe_diskon = "langsung";
    }

    if (input.diskon_persen) {
      tipe_diskon = "persen";
    }

    const dataBarang = Array.from(
      new Set(inputBarang.map((x) => x.id_barang))
    ).map((id) => inputBarang.filter((s) => s.id_barang === id)[0]);

    await axios
      .post(
        `${baseUrl}/pesanan-penjualan`,
        {
          user_id: input.user_id,
          tipe_diskon: tipe_diskon,
          diskon: input.diskon_langsung || input.diskon_persen || "",
          id_penjual: currentUser.id,
          keterangan: input.keterangan,
          id_syarat_pembayaran: input.id_syarat_pembayaran,
          id_cabang: input.id_cabang,
          barang: dataBarang,
        },
        {
          headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
          },
        }
      )
      .then(() => {
        getDataPesananPenjualan(
          `${baseUrl}/pesanan-penjualan/user/${currentUser.id}`
        );

        Swal.fire("Berhasil", "Data berhasil ditambahkan", "success");
      })
      .catch((error) => {
        Swal.fire("Gagal", error.message, "error");
      });

    closeModalHandler("submit");
  };

  const postDataPengirimanPesanan = async (payload) => {
    await axios
      .post(
        `${baseUrl}/pengiriman-pesanan`,
        {
          kode_pesanan: payload.kode_pesanan,
          user_id: payload.user_id,
          id_marketing: currentUser.id,
          id_cabang: currentUser.cabang.id,
        },
        {
          headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
          },
        }
      )
      .then((response) => {
        getDataPesananPenjualan(
          `${baseUrl}/pesanan-penjualan/user/${currentUser.id}`
        );

        Swal.fire("Berhasil", response.data.message, "success");
      })
      .catch((error) => {
        Swal.fire("Gagal", error.message, "error");
      });
  };

  const postDataFakturPenjualan = async (payload) => {
    await axios
      .post(
        `${baseUrl}/faktur-penjualan`,
        {
          kode_pesanan: payload.kode_pesanan,
          id_marketing: currentUser.id,
          user_id: payload.user_id,
          id_cabang: currentUser.cabang.id,
        },
        {
          headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
          },
        }
      )
      .then((response) => {
        getDataPesananPenjualan(
          `${baseUrl}/pesanan-penjualan/user/${currentUser.id}`
        );

        Swal.fire("Berhasil", response.data.message, "success");
      })
      .catch((error) => {
        Swal.fire("Gagal", error.message, "error");
      });
  };

  const updateDataPesananPenjualan = async (id) => {
    let message = "";
    if (!input.user_id) message = "Nama pelanggan harus diisi!";
    else if (!input.id_syarat_pembayaran)
      message = "Syarat pembayaran harus dipilih salah satu!";

    if (message) {
      Swal.fire("Gagal", message, "error");
    } else {
      let tipe_diskon = "";
      if (input.diskon_langsung) {
        tipe_diskon = "langsung";
      }

      if (input.diskon_persen) {
        tipe_diskon = "persen";
      }

      const dataBarang = Array.from(
        new Set(inputBarang.map((x) => x.id_barang))
      ).map((id) => inputBarang.filter((s) => s.id_barang === id)[0]);

      console.log(inputBarang);
      console.log(dataBarang);

      await axios
        .put(
          `${baseUrl}/pesanan-penjualan/${id}`,
          {
            user_id: input.user_id,
            tipe_diskon: tipe_diskon,
            diskon: input.diskon_langsung || input.diskon_persen || "",
            id_penjual: currentUser.id,
            keterangan: input.keterangan,
            id_syarat_pembayaran: input.id_syarat_pembayaran,
            id_cabang: input.id_cabang,
            barang: dataBarang,
          },
          {
            headers: {
              Accept: "Application/json",
              Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
            },
          }
        )
        .then((response) => {
          getDataPesananPenjualan(
            `${baseUrl}/pesanan-penjualan/user/${currentUser.id}`
          );

          Swal.fire("Berhasil", response.data.message, "success");
        })
        .catch((error) => {
          Swal.fire("Gagal", error.message, "error");
        });

      closeModalHandler("update");
    }
  };

  const deleteDataPesananPenjualan = async (id) => {
    await axios
      .delete(`${baseUrl}/pesanan-penjualan/${id}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        if (currentPesananPenjualan.pengiriman_pesanan) {
          deletePengirimanPesanan(id);
        } else if (currentPesananPenjualan.faktur_penjualan) {
          deleteDataFakturPenjualan(id);
        } else {
          Swal.fire("Berhasil", response.data.message, "success");
        }

        getDataPesananPenjualan(
          `${baseUrl}/pesanan-penjualan/user/${currentUser.id}`
        );
      })
      .catch((error) => {
        Swal.fire("Gagal", error.message, "error");
      });
  };

  const deletePengirimanPesanan = async (id) => {
    await axios
      .delete(`${baseUrl}/pengiriman-pesanan/kode-pesanan/${id}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        getDataPesananPenjualan(
          `${baseUrl}/pesanan-penjualan/user/${currentUser.id}`
        );

        Swal.fire("Berhasil", response.data.message, "success");
      })
      .catch((error) => {
        Swal.fire("Gagal", error.message, "error");
      });
  };

  const deleteDataFakturPenjualan = async (id) => {
    await axios
      .delete(`${baseUrl}/faktur-penjualan/${id}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        getDataPesananPenjualan(
          `${baseUrl}/pesanan-penjualan/user/${currentUser.id}`
        );

        Swal.fire("Berhasil", response.data.message, "success");
      })
      .catch((error) => {
        Swal.fire("Gagal", error.message, "error");
      });
  };

  const addInput = () => {
    const values = [...inputBarang];
    values.push({
      id_barang: "",
      kuantitas: 1,
      berat: "",
      nama_barang: "",
      harga_user: "",
      harga_reseller: "",
      stok_dapat_dijual: "",
      harga_total: 0,
    });
    setInputBarang(values);
  };

  const removeInput = (index) => {
    const values = [...inputBarang];
    values.splice(index, 1);
    setInputBarang(values);
  };

  return {
    fields,
    success,
    setSuccess,
    info,
    setInfo,
    currentUser,
    dataPesananPenjualan,
    loadDataPesananPenjualan,
    currentPesananPenjualan,
    loadCurrentDataPesananPenjualan,
    dataCabang,
    loadDataCabang,
    dataPelanggan,
    currentPelanggan,
    setCurrentPelanggan,
    input,
    setInput,
    inputBarang,
    setInputBarang,
    dataBarang,
    setDataBarang,
    dataSyaratPembayaran,
    loadDataSyaratPembayaran,
    diskonLangsungVisibility,
    diskonPersenVisibility,
    buttonSubmitName,
    modalTitle,
    details,
    toggleDetails,
    closeModalHandler,
    changeHandler,
    submitHandler,
    getCurrentUser,
    getDataPesananPenjualanById,
    getDataStokBarang,
    getDataCabang,
    getDataPelanggan,
    postDataPengirimanPesanan,
    postDataFakturPenjualan,
    getSyaratPembayaran,
    deletePengirimanPesanan,
    deleteDataFakturPenjualan,
    addInput,
    removeInput,
  };
};

export default PesananPenjualanHelper;
