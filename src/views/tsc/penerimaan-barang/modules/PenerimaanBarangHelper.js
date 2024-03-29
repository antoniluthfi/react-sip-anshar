import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

const PenerimaanBarangHelper = () => {
  const baseUrl = process.env.REACT_APP_LARAVEL_URL;
  const currentUser = useSelector((state) => state.currentUser);
  const fields = [
    {
      key: "no_service",
      label: "No Service",
      _style: { textAlign: "center" },
    },
    {
      key: "jenis_penerimaan",
      label: "Jenis Penerimaan",
      _style: { textAlign: "center" },
    },
    {
      key: "id_customer",
      label: "Nama Pelanggan",
      _style: { textAlign: "center" },
    },
    {
      key: "id_cabang",
      label: "Cabang",
      _style: { textAlign: "center" },
    },
    {
      key: "estimasi",
      label: "Estimasi",
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
  const [warning, setWarning] = useState(false);
  const [persiapanBarangBaru, setPersiapanBarangBaru] = useState(false);
  const [jasaLainlain, setJasaLainlain] = useState(false);
  const [color, setColor] = useState("success");
  const [dataPenerimaan, setDataPenerimaan] = useState([]);
  const [loadDataPenerimaan, setLoadDataPenerimaan] = useState(true);
  const [currentPenerimaan, setCurrentPenerimaan] = useState({});
  const [loadCurrentPenerimaan, setLoadCurrentPenerimaan] = useState(true);
  const [dataPelanggan, setDataPelanggan] = useState([]);
  const [dataBarangJasa, setDataBarangJasa] = useState([]);
  const [dataTipe, setDataTipe] = useState([]);
  const [dataCabang, setDataCabang] = useState([]);
  const [dataTeknisi, setDataTeknisi] = useState([]);
  const [buttonSubmitName, setButtonSubmitName] = useState("Submit");
  const [buttonVisibility, setButtonVisibility] = useState("d-inline");
  const [formDisabled, setFormDisabled] = useState(false);
  const [modalTitle, setModalTitle] = useState("Tambah Data");
  const [filterLebihDariSatuHari, setFilterLebihDariSatuHari] =
    useState("d-none");
  const [filterCabang, setFilterCabang] = useState("d-none");
  const [input, setInput] = useState({
    jenis_penerimaan: "",
    id_customer: "",
    id_cabang: "",
    id_barang_jasa: "",
    id_barang: "",
    kondisi_barang: "",
    problem: "",
    request: "",
    data_penting: 0,
    estimasi: "",
    sn: "",
    kelengkapan: "",
  });
  const [currentPelanggan, setCurrentPelanggan] = useState({
    id: "",
    name: "",
  });
  const [currentBarangJasa, setCurrentBarangJasa] = useState({
    id: "",
    nama: "",
  });
  const [currentTipe, setCurrentTipe] = useState({
    id: "",
    nama: "",
  });
  const [currentTeknisi, setCurrentTeknisi] = useState([
    {
      id: "",
      name: "",
    },
  ]);
  const [cetakLaporan, setCetakLaporan] = useState({
    dari: "",
    sampai: "",
    cabang: "",
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

  const closeModalHandler = () => {
    if (input.jenis_penerimaan === "Penerimaan Barang Service") {
      setSuccess(false);
    } else if (input.jenis_penerimaan === "Persiapan Barang Baru") {
      setPersiapanBarangBaru(!persiapanBarangBaru);
    } else if (input.jenis_penerimaan === "Jasa Lain-lain") {
      setJasaLainlain(!jasaLainlain);
    }

    setInput({
      jenis_penerimaan: "",
      id_customer: "",
      id_cabang: "",
      id_barang_jasa: "",
      id_barang: "",
      kondisi_barang: "",
      problem: "",
      request: "",
      data_penting: 0,
      estimasi: "",
      sn: "",
      kelengkapan: "",
    });
    setCurrentPelanggan({
      id: "",
      name: "",
    });
    setCurrentBarangJasa({
      id: "",
      nama: "",
    });
    setCurrentTipe({
      id: "",
      nama: "",
    });

    setColor("success");
    setButtonSubmitName("Submit");
    setButtonVisibility(true);
    setFormDisabled(false);
    setModalTitle("Tambah Data");
    setCurrentTeknisi([
      {
        id: "",
        name: "",
      },
    ]);
  };

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const cetakLaporanHandler = (event) => {
    setCetakLaporan({
      ...cetakLaporan,
      [event.target.name]: event.target.value,
    });

    if (
      event.target.name === "filter_lebih_dari_satuhari" &&
      event.target.checked
    ) {
      setFilterLebihDariSatuHari("d-block");
    } else if (
      event.target.name === "filter_lebih_dari_satuhari" &&
      !event.target.checked
    ) {
      setFilterLebihDariSatuHari("d-none");
    }

    if (event.target.name === "filter_cabang" && event.target.checked) {
      setFilterCabang("d-block");
    } else if (event.target.name === "filter_cabang" && !event.target.checked) {
      setFilterCabang("d-none");
    }
  };

  const submitHandler = (action) => {
    if (action === "submit") {
      postDataPenerimaan();
    } else if (action === "update") {
      updateDataPenerimaan(currentPenerimaan.no_service);
    } else if (action === "CetakLaporan") {
      getDataLaporan();
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

  const getDataBarangJasa = async (jenis) => {
    await axios
      .get(`${baseUrl}/barang-jasa/jenis/${jenis}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataBarangJasa(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataTipe = async (kategori) => {
    let url = `${baseUrl}/merek-tipe/kategori/${kategori}`;
    if (kategori === "jasa") {
      url = `${baseUrl}/merek-tipe`;
    }

    await axios
      .get(url, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataTipe(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataTeknisi = async () => {
    await axios
      .get(`${baseUrl}/user/role/teknisi`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataTeknisi(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataPenerimaan = async () => {
    await axios
      .get(`${baseUrl}/penerimaan/user/${currentUser.id}`, {
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataPenerimaan(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadDataPenerimaan(false);
  };

  const getDataPenerimaanById = async (id, actionModal) => {
    await axios
      .get(`${baseUrl}/penerimaan/${id}`, {
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        const result = response.data.result;
        setCurrentPenerimaan(result);

        setInput({
          jenis_penerimaan: result.jenis_penerimaan,
          id_customer: result.id_customer,
          id_cabang: result.id_cabang,
          id_barang_jasa: result.id_barang_jasa,
          id_barang: result.id_barang,
          kondisi_barang: result.kondisi_barang,
          problem: result.problem,
          request: result.request,
          data_penting: result.data_penting,
          estimasi: result.estimasi,
          sn: result.sn,
          kelengkapan: result.kelengkapan,
        });

        setCurrentPelanggan({
          id: result.id_customer,
          name: result.customer.name,
        });

        setCurrentBarangJasa({
          id: result.id_barang_jasa,
          nama: result.barang_jasa.nama,
        });

        setCurrentTipe({
          id: result.id_barang,
          nama: result.barang.nama,
        });

        let teknisi = [];
        result.teknisi_pj.map((item) => {
          teknisi.push({
            id: item.teknisi.id,
            name: item.teknisi.name,
          });
        });
        setCurrentTeknisi(teknisi);

        if (actionModal !== "delete") {
          if (result.jenis_penerimaan === "Penerimaan Barang Service") {
            setSuccess(!success);
          } else if (result.jenis_penerimaan === "Persiapan Barang Baru") {
            setPersiapanBarangBaru(!persiapanBarangBaru);
          } else if (result.jenis_penerimaan === "Jasa Lain-lain") {
            setJasaLainlain(!jasaLainlain);
          }
        }

        if (actionModal === "update") {
          getDataTipe(result.id_barang);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    if (actionModal === "update") {
      setColor("success");
      setButtonSubmitName("Update");
      setButtonVisibility("d-inline");
      setFormDisabled(false);
      setModalTitle("Update Data");
    } else if (actionModal === "view") {
      setColor("info");
      setButtonVisibility("d-none");
      setFormDisabled(true);
      setModalTitle("View Data");
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
          deleteDataPenerimaan(id);
        }
      });
    }

    setLoadCurrentPenerimaan(false);
  };

  const postDataPenerimaan = async () => {
    console.log(input);
    let message = null;
    if (
      (input.jenis_penerimaan === "Penerimaan Barang Service" &&
        !input.id_customer) ||
      (input.jenis_penerimaan === "Persiapan Barang Baru" &&
        !input.id_customer) ||
      (input.jenis_penerimaan === "Jasa Lain-lain" && !input.id_customer)
    )
      message = "Nama pelanggan harus dipilih salah satu!";
    else if (
      (input.jenis_penerimaan === "Penerimaan Barang Service" &&
        !currentBarangJasa.id) ||
      (input.jenis_penerimaan === "Persiapan Barang Baru" &&
        !currentBarangJasa.id) ||
      (input.jenis_penerimaan === "Jasa Lain-lain" && !currentBarangJasa.id)
    )
      message = "Barang Jasa harus dipilih salah satu!";
    else if (
      (input.jenis_penerimaan === "Penerimaan Barang Service" &&
        !input.id_barang) ||
      (input.jenis_penerimaan === "Persiapan Barang Baru" &&
        !input.id_barang) ||
      (input.jenis_penerimaan === "Jasa Lain-lain" && !input.id_barang)
    )
      message = "Tipe barang harus dipilih salah satu!";
    else if (
      input.jenis_penerimaan === "Penerimaan Barang Service" &&
      !input.kondisi_barang
    )
      message = "Kondisi barang harus diisi!";
    else if (
      input.jenis_penerimaan === "Penerimaan Barang Service" &&
      !input.problem
    )
      message = "Problem harus diisi!";
    else if (
      (input.jenis_penerimaan === "Penerimaan Barang Service" && !input.sn) ||
      (input.jenis_penerimaan === "Persiapan Barang Baru" && !input.sn)
    )
      message = "Serial number harus diisi!";

    if (message) {
      Swal.fire("Gagal", message, "error");
    } else {
      await axios
        .post(
          `${baseUrl}/penerimaan`,
          {
            jenis_penerimaan: input.jenis_penerimaan,
            id_admin: currentUser.id,
            id_customer: input.id_customer,
            id_cabang: currentUser.id_cabang,
            id_barang_jasa: currentBarangJasa.id,
            id_barang: input.id_barang,
            kondisi_barang: input.kondisi_barang || "-",
            problem: input.problem || "-",
            request: input.request || "-",
            teknisi: currentTeknisi,
            data_penting: input.data_penting,
            estimasi: input.estimasi,
            sn: input.sn,
            kelengkapan: input.kelengkapan,
          },
          {
            headers: {
              Accept: "application/json",
              authorization: `Bearer ${localStorage.getItem("sip-token")}`,
            },
          }
        )
        .then((response) => {
          Swal.fire("Berhasil", response.data.message, "success");
          getDataPenerimaan();
        })
        .catch((error) => {
          Swal.fire("Gagal", "Data gagal dibuat", "error");
        });

      closeModalHandler();
    }
  };

  const updateDataPenerimaan = async (id) => {
    await axios
      .put(
        `${baseUrl}/penerimaan/${id}`,
        {
          jenis_penerimaan: input.jenis_penerimaan,
          id_admin: currentUser.id,
          id_customer: input.id_customer,
          id_cabang: currentUser.id_cabang,
          id_barang_jasa: currentBarangJasa.id,
          id_barang: input.id_barang,
          kondisi_barang: input.kondisi_barang,
          problem: input.problem,
          permintaan: input.request,
          teknisi: currentTeknisi,
          data_penting: input.data_penting,
          estimasi: input.estimasi,
          sn: input.sn,
          kelengkapan: input.kelengkapan,
        },
        {
          headers: {
            Accept: "application/json",
            authorization: `Bearer ${localStorage.getItem("sip-token")}`,
          },
        }
      )
      .then((response) => {
        Swal.fire("Berhasil", response.data.message, "success");
        getDataPenerimaan();
      })
      .catch((error) => {
        Swal.fire("Gagal", "Data gagal diupdate", "error");
      });

    closeModalHandler();
  };

  const deleteDataPenerimaan = async (id) => {
    await axios
      .delete(`${baseUrl}/penerimaan/${id}`, {
        headers: {
          Accept: "application/json",
          authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        Swal.fire("Berhasil", response.data.message, "success");

        getDataPenerimaan();
      })
      .catch((error) => {
        Swal.fire("Gagal", "Data gagal diupdate", "error");
      });

    closeModalHandler();
  };

  const getDataLaporan = () => {
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
      `${process.env.REACT_APP_LARAVEL_PUBLIC}/laporan-penerimaan/${dari}/${sampai}/${cabang}/${currentUser.id}`
    );
  };

  return {
    fields,
    success,
    setSuccess,
    warning,
    setWarning,
    persiapanBarangBaru,
    setPersiapanBarangBaru,
    jasaLainlain,
    setJasaLainlain,
    dataPenerimaan,
    setDataPenerimaan,
    loadDataPenerimaan,
    setLoadDataPenerimaan,
    dataPelanggan,
    setDataPelanggan,
    dataTipe,
    dataCabang,
    setDataCabang,
    currentTipe,
    setCurrentTipe,
    currentPelanggan,
    setCurrentPelanggan,
    dataBarangJasa,
    setDataBarangJasa,
    currentBarangJasa,
    setCurrentBarangJasa,
    dataTeknisi,
    setDataTeknisi,
    currentTeknisi,
    setCurrentTeknisi,
    currentPenerimaan,
    loadCurrentPenerimaan,
    input,
    setInput,
    cetakLaporan,
    filterLebihDariSatuHari,
    filterCabang,
    color,
    details,
    buttonSubmitName,
    buttonVisibility,
    formDisabled,
    modalTitle,
    toggleDetails,
    getDataPenerimaan,
    getDataPenerimaanById,
    submitHandler,
    changeHandler,
    getDataPelanggan,
    closeModalHandler,
    getDataTipe,
    getDataBarangJasa,
    getDataTeknisi,
    cetakLaporanHandler,
    getDataCabang,
  };
};

export default PenerimaanBarangHelper;
