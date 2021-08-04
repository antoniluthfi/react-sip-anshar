import { useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";

const ArusKasHelper = () => {
  const baseUrl = process.env.REACT_APP_LARAVEL_URL;
  const currentUser = useSelector((state) => state.currentUser);
  const fields = [
    {
      key: "id",
      label: "No Pembayaran",
      _style: { textAlign: "center" },
    },
    {
      key: "id_admin",
      label: "Admin",
      _style: { textAlign: "center" },
    },
    {
      key: "id_cabang",
      label: "Cabang",
      _style: { textAlign: "center" },
    },
    {
      key: "nominal",
      label: "Nominal",
      _style: { textAlign: "center" },
    },
    {
      key: "total_biaya",
      label: "Total Biaya",
      _style: { textAlign: "center" },
    },
    {
      key: "masuk",
      label: "Status Kas",
      _style: { textAlign: "center" },
    },
    {
      key: "status_pembayaran",
      label: "Status Pembayaran",
      _style: { textAlign: "center" },
    },
    {
      key: "keterangan",
      label: "Keterangan",
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
  const [view, setView] = useState(false);
  const [color, setColor] = useState("success");
  const [warning, setWarning] = useState(false);
  const [filterLebihDariSatuHari, setFilterLebihDariSatuHari] =
    useState("d-none");
  const [filterCabang, setFilterCabang] = useState("d-none");
  const [filterShift, setFilterShift] = useState("d-none");
  const [dataArusKas, setDataArusKas] = useState([]);
  const [sandiTransaksi, setSandiTransaksi] = useState([]);
  const [dataCabang, setDataCabang] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonSubmitName, setButtonSubmitName] = useState("Submit");
  const [buttonVisibility, setButtonVisibility] = useState("d-inline");
  const [formDisabled, setFormDisabled] = useState(false);
  const [modalTitle, setModalTitle] = useState("Tambah Data");
  const [input, setInput] = useState({
    id: "",
    id_sandi_transaksi: "",
    id_admin: "",
    id_cabang: "",
    nominal: "",
    total_biaya: "",
    sisa_biaya: "",
    masuk: "",
    status_pembayaran: "",
    keterangan: "",
  });
  const [cetakLaporan, setCetakLaporan] = useState({
    dari: "",
    sampai: "",
    cabang: "",
    shift: "",
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

    if (event.target.name === "filter_shift" && event.target.checked) {
      setFilterShift("d-block");
    } else if (event.target.name === "filter_shift" && !event.target.checked) {
      setFilterShift("d-none");
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
      id: "",
      id_sandi_transaksi: "",
      id_admin: "",
      id_cabang: "",
      nominal: "",
      total_biaya: "",
      sisa_biaya: "",
      masuk: "",
      status_pembayaran: "",
      keterangan: "",
    });
  };

  const submitHandler = (action) => {
    if (action === "submit") {
      postArusKas();
    } else if (action === "update") {
      updateArusKas(input.id);
    } else if (action === "CetakLaporan") {
      getDataLaporan();
    }
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
        setSandiTransaksi(response.data.result);
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

  const getArusKas = async () => {
    await axios
      .get(`${baseUrl}/arus-kas`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataArusKas(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  const getArusKasById = async (id, actionModal) => {
    await axios
      .get(`${baseUrl}/arus-kas/${id}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        const result = response.data.result;
        setInput({
          id: id,
          id_sandi_transaksi: result.id_sandi_transaksi,
          id_admin: result.id_admin,
          id_cabang: result.id_cabang,
          nominal: result.nominal,
          total_biaya: result.total_biaya,
          sisa_biaya: result.sisa_biaya,
          masuk: result.masuk,
          status_pembayaran: result.status_pembayaran,
          keterangan: result.keterangan,
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
          deleteArusKas(id);
        }
      });
    }
  };

  const postArusKas = async () => {
    let nominal = input.nominal.replace(/[^a-z\d\s]+/gi, "");
    nominal = nominal.split("Rp ")[1];

    let total_biaya = input.total_biaya.replace(/[^a-z\d\s]+/gi, "");
    total_biaya = total_biaya.split("Rp ")[1];

    let status_pembayaran = 0;
    if (parseInt(nominal) >= parseInt(total_biaya)) {
      nominal = total_biaya;
      status_pembayaran = 1;
    }

    let message = null;
    if (!input.nominal) message = "Nominal harus diisi";
    else if (!input.total_biaya) message = "Total biaya harus diisi";
    else if (!input.id_sandi_transaksi)
      message = "Sandi transaksi harus dipilih salah satu";
    else if (!input.keterangan) message = "Keterangan harus diisi";

    if (message) {
      Swal.fire("Gagal", message, "error");
    } else {
      await axios
        .post(
          `${baseUrl}/arus-kas`,
          {
            id_sandi_transaksi: input.id_sandi_transaksi,
            id_admin: currentUser.id,
            id_cabang: currentUser.cabang.id,
            nominal: nominal,
            total_biaya: total_biaya,
            sisa_biaya: input.sisa_biaya || 0,
            status_pembayaran: status_pembayaran,
            keterangan: input.keterangan,
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
          getArusKas();
        })
        .catch((error) => {
          Swal.fire("Gagal", error.response.data.message, "error");
        });

      closeModalHandler();
    }
  };

  const updateArusKas = async (id) => {
    let nominal = input.nominal.replace(/[^a-z\d\s]+/gi, "");
    nominal = nominal.split("Rp ")[1];

    let total_biaya = input.total_biaya.replace(/[^a-z\d\s]+/gi, "");
    total_biaya = total_biaya.split("Rp ")[1];

    let status_pembayaran = 0;
    if (parseInt(nominal) >= parseInt(total_biaya)) {
      nominal = total_biaya;
      status_pembayaran = 1;
    }

    let message = null;
    if (!input.nominal) message = "Nominal harus diisi";
    else if (!input.total_biaya) message = "Total biaya harus diisi";
    else if (!input.id_sandi_transaksi)
      message = "Sandi transaksi harus dipilih salah satu";
    else if (!input.keterangan) message = "Keterangan harus diisi";

    if (message) {
      Swal.fire("Gagal", message, "error");
    } else {
      await axios
        .put(
          `${baseUrl}/arus-kas/${id}`,
          {
            id_sandi_transaksi: input.id_sandi_transaksi,
            id_admin: input.id_admin,
            id_cabang: input.id_cabang,
            nominal: nominal,
            total_biaya: total_biaya,
            sisa_biaya: input.sisa_biaya,
            masuk: input.masuk,
            status_pembayaran: status_pembayaran,
            keterangan: input.keterangan,
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
          getArusKas();
        })
        .catch((error) => {
          Swal.fire("Gagal", error.response.data.message, "error");
        });

      closeModalHandler();
    }
  };

  const deleteArusKas = async (id) => {
    await axios
      .delete(`${baseUrl}/arus-kas/${id}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        Swal.fire("Berhasil", response.data.message, "success");
        getArusKas();
      })
      .catch((error) => {
        Swal.fire("Gagal", error.response.data.message, "error");
      });
  };

  const getDataLaporan = () => {
    let dari;
    let sampai;
    let cabang;
    let shift;

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

    if (!cetakLaporan.shift) {
      shift = "x";
    } else {
      shift = cetakLaporan.shift;
    }

    window.open(
      `${process.env.REACT_APP_LARAVEL_PUBLIC}/laporan-arus-kas/${dari}/${sampai}/${cabang}/${shift}/${currentUser.name}`
    );
  };

  return {
    currentUser,
    fields,
    success,
    setSuccess,
    view,
    color,
    warning,
    setWarning,
    dataArusKas,
    setDataArusKas,
    isLoading,
    setIsLoading,
    sandiTransaksi,
    setSandiTransaksi,
    dataCabang,
    setDataCabang,
    buttonSubmitName,
    buttonVisibility,
    formDisabled,
    modalTitle,
    input,
    cetakLaporan,
    setCetakLaporan,
    details,
    filterLebihDariSatuHari,
    filterCabang,
    filterShift,
    toggleDetails,
    changeHandler,
    closeModalHandler,
    getArusKas,
    getArusKasById,
    submitHandler,
    getSandiTransaksi,
    getDataLaporan,
    getDataCabang,
    cetakLaporanHandler,
  };
};

export default ArusKasHelper;
