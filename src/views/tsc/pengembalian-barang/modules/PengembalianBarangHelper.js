import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

const PengembalianBarangHelper = () => {
  const baseUrl = process.env.REACT_APP_LARAVEL_URL;
  const currentUser = useSelector((state) => state.currentUser);
  const fields = [
    {
      key: "no_pengembalian",
      label: "No Pengembalian",
      _style: { textAlign: "center" },
    },
    {
      key: "no_service",
      label: "No Service",
      _style: { textAlign: "center" },
    },
    {
      key: "id_customer",
      label: "Nama Pelanggan",
      _style: { textAlign: "center" },
    },
    {
      key: "status_pengembalian",
      label: "Status Pengembalian",
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
  const [view, setView] = useState(false);
  const [color, setColor] = useState("success");
  const [dataPengembalian, setDataPengembalian] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataSandi, setDataSandi] = useState([]);
  const [dataCabang, setDataCabang] = useState([]);
  const [buttonSubmitName, setButtonSubmitName] = useState("Submit");
  const [buttonVisibility, setButtonVisibility] = useState("d-inline");
  const [formDisabled, setFormDisabled] = useState(false);
  const [modalTitle, setModalTitle] = useState("Tambah Data");
  const [filterLebihDariSatuHari, setFilterLebihDariSatuHari] =
    useState("d-none");
  const [filterCabang, setFilterCabang] = useState("d-none");
  const [input, setInput] = useState({
    no_service: "",
    no_pengembalian: "",
    status_pengembalian: "",
    customer: "",
    barang_jasa: "",
    nominal: "",
    id_sandi_transaksi: "",
  });
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

  const closeModalHandler = () => {
    setSuccess(!success);
    setView(false);
    setColor("success");
    setButtonSubmitName("Submit");
    setButtonVisibility("d-inline");
    setFormDisabled(false);
    setModalTitle("Tambah Data");
    setInput({
      no_service: "",
      no_pengembalian: "",
      status_pengembalian: "",
      customer: "",
      barang_jasa: "",
      nominal: "",
      id_sandi_transaksi: "",
    });
  };

  const submitHandler = (action) => {
    if (action === "update") {
      updatePengembalian(input.no_pengembalian);
    } else if (action === "CetakLaporan") {
      getDataLaporan();
    }
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

  const getSandiTransaksi = async () => {
    await axios
      .get(`${baseUrl}/sandi-transaksi`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataSandi(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDataPengembalian = async () => {
    await axios
      .get(`${baseUrl}/pengembalian`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataPengembalian(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  const getDataPengembalianById = async (no_pengembalian, actionModal) => {
    await axios
      .get(`${baseUrl}/pengembalian/${no_pengembalian}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        const result = response.data.result;
        console.log(result);

        setInput({
          no_pengembalian: result.no_pengembalian,
          no_service: result.no_service,
          status_pengembalian: result.status_pengembalian,
          customer: result.penerimaan.customer.name,
          barang_jasa: result.penerimaan.barang_jasa.nama,
          nominal: result.penerimaan.pengerjaan.nominal,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    if (actionModal === "update") {
      setSuccess(!success);
      setView(false);
      setButtonSubmitName("Update");
      setButtonVisibility("d-inline");
      setModalTitle("Update Data");
    } else if (actionModal === "view") {
      setSuccess(!success);
      setView(true);
      setColor("info");
      setButtonVisibility("d-none");
      setFormDisabled(true);
      setModalTitle("Data");
    } else if (actionModal === "delete") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reset it!",
      }).then((result) => {
        if (result.isConfirmed) {
          resetDataPengembalian(no_pengembalian);
        }
      });
    }
  };

  const updatePengembalian = async (no_pengembalian) => {
    await axios
      .put(
        `${baseUrl}/pengembalian/${no_pengembalian}`,
        {
          id_sandi_transaksi: input.id_sandi_transaksi,
          status_pengembalian: input.status_pengembalian,
          id_admin: currentUser.id,
          id_cabang: currentUser.cabang.id,
          nominal: input.nominal,
          masuk: 1,
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
        getDataPengembalian();
      })
      .catch((error) => {
        Swal.fire("Gagal", error.response.data.message, "error");
      });

    closeModalHandler();
  };

  const resetDataPengembalian = async (no_pengembalian) => {
    await axios
      .put(
        `${baseUrl}/pengembalian/reset/${no_pengembalian}`,
        {
          status_pengembalian: 0,
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
        getDataPengembalian();
      })
      .catch((error) => {
        Swal.fire("Gagal", error.response.data.message, "error");
      });
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
      `${process.env.REACT_APP_LARAVEL_PUBLIC}/laporan-pengembalian/${dari}/${sampai}/${cabang}/${currentUser.id}`
    );
  };

  return {
    currentUser,
    fields,
    success,
    setSuccess,
    warning,
    setWarning,
    view,
    color,
    dataPengembalian,
    setDataPengembalian,
    isLoading,
    dataSandi,
    setDataSandi,
    setIsLoading,
    dataCabang,
    setDataCabang,
    buttonSubmitName,
    buttonVisibility,
    formDisabled,
    modalTitle,
    input,
    setInput,
    cetakLaporan,
    filterLebihDariSatuHari,
    filterCabang,
    details,
    toggleDetails,
    changeHandler,
    closeModalHandler,
    submitHandler,
    getDataPengembalian,
    getDataPengembalianById,
    getSandiTransaksi,
    cetakLaporanHandler,
    getDataCabang,
  };
};

export default PengembalianBarangHelper;
