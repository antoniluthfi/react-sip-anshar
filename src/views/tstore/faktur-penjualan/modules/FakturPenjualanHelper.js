import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const FakturPenjualanHelper = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const baseUrl = process.env.REACT_APP_LARAVEL_URL;
  const fields = [
    {
      key: "id",
      label: "No",
      _style: { textAlign: "center" },
    },
    {
      key: "name",
      label: "Nama",
      _style: { textAlign: "center" },
    },
    {
      key: "no_faktur",
      label: "No Faktur",
      _style: { textAlign: "center" },
    },
    {
      key: "kode_pesanan",
      label: "Kode Pesanan",
      _style: { textAlign: "center" },
    },
    {
      key: "created_at",
      label: "Tanggal Faktur",
      _style: { textAlign: "center" },
    },
    {
      key: "metode_pembayaran",
      label: "Metode Pembayaran",
      _style: { textAlign: "center" },
    },
    {
      key: "bank",
      label: "Bank",
      _style: { textAlign: "center" },
    },
    {
      key: "nominal",
      label: "Total Faktur",
      _style: { textAlign: "center" },
    },
    {
      key: "terhutang",
      label: "Terhutang",
      _style: { textAlign: "center" },
    },
    {
      key: "total_biaya",
      label: "Total Biaya",
      _style: { textAlign: "center" },
    },
    {
      key: "status",
      label: "Status",
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
  const [warning, setWarning] = useState(false);
  const [dataFaktur, setDataFaktur] = useState([]);
  const [loadDataFaktur, setLoadDataFaktur] = useState(true);
  const [currentDataFaktur, setCurrentDataFaktur] = useState({});
  const [loadCurrentDataFaktur, setLoadCurrentDataFaktur] = useState(true);
  const [dataBank, setDataBank] = useState([]);
  const [loadDataBank, setLoadDataBank] = useState(true);
  const [dataMarketing, setDataMarketing] = useState([]);
  const [buttonSubmitName, setButtonSubmitName] = useState("update");
  const [bankVisibility, setBankVisibility] = useState("d-none");
  const [terhutangVisibility, setTerhutangVisibility] = useState("d-none");
  const [nominalVisibility, setNominalVisibility] = useState("d-none");
  const [filterLebihDariSatuHari, setFilterLebihDariSatuHari] =
    useState("d-none");
  const [filterMarketing, setFilterMarketing] = useState("d-none");
  const [input, setInput] = useState({
    id_bank: "",
    metode_pembayaran: "",
    nominal: "",
    terhutang: "",
    dp: "",
  });
  const [cetakLaporan, setCetakLaporan] = useState({
    dari: "",
    sampai: "",
    marketing: "",
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

    if (e.target.name === "metode_pembayaran" && e.target.value === "Cash") {
      setBankVisibility("d-none");
    } else if (
      e.target.name === "metode_pembayaran" &&
      e.target.value === "Transfer"
    ) {
      setBankVisibility("d-block");
    }

    if (e.target.name === "dp" && e.target.value === "JT") {
      setNominalVisibility("d-block");
    } else if (e.target.name === "dp" && e.target.value === "Lunas") {
      setNominalVisibility("d-none");
    }

    if (e.target.name === "nominal" && e.target.value) {
      setTerhutangVisibility("d-block");
    }
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

    if (event.target.name === "filter_marketing" && event.target.checked) {
      setFilterMarketing("d-block");
    } else if (
      event.target.name === "filter_marketing" &&
      !event.target.checked
    ) {
      setFilterMarketing("d-none");
    }
  };

  const closeModalHandler = (action) => {
    if (action === "update" || action === "submit") {
      setSuccess(!success);
    } else if (action === "view") {
      setInfo(!info);
    }

    setInput({
      id_bank: "",
      metode_pembayaran: "",
      nominal: "",
      terhutang: "",
      dp: "",
    });
  };

  const submitHandler = (action) => {
    if (action === "update") {
      updateDataFakturPenjualan(currentDataFaktur.no_faktur);
    } else if (action === "lunasi") {
      postDataFaktur();
    } else if (action === "CetakLaporan") {
      getDataLaporan();
    }
  };

  const getDataMarketing = async () => {
    await axios
      .get(`${baseUrl}/user/role/marketing`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataMarketing(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCurrentUser = async () => {
    getDataFakturPenjualan(
      `${baseUrl}/faktur-penjualan/marketing/${currentUser.id}`
    );
  };

  const getDataFakturPenjualan = async (url) => {
    await axios
      .get(url, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataFaktur(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadDataFaktur(false);
  };

  const getDataFakturPenjualanById = async (no_faktur, actionModal) => {
    await axios
      .get(`${baseUrl}/faktur-penjualan/${no_faktur}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        const result = response.data.result;
        setCurrentDataFaktur(result);

        if (actionModal === "update") {
          setInput({
            id_bank: result.id_bank,
            metode_pembayaran: result.metode_pembayaran,
            nominal: !result.nominal ? "" : `Rp. ${result.nominal}`,
            terhutang: !result.terhutang ? "" : result.terhutang,
          });
        } else if (actionModal === "lunasi") {
          setInput({
            id_bank: result.id_bank,
            metode_pembayaran: result.metode_pembayaran,
            nominal: `Rp. ${result.terhutang}`,
            terhutang: !result.terhutang ? "" : result.terhutang,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadCurrentDataFaktur(false);

    if (actionModal === "update") {
      setButtonSubmitName("update");
      setSuccess(!success);
    } else if (actionModal === "view") {
      setInfo(!info);
    } else if (actionModal === "lunasi") {
      setButtonSubmitName("lunasi");
      setSuccess(!success);
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
          deleteDataFakturPenjualan(no_faktur);
        }
      });
    }
  };

  const getDataBank = async () => {
    await axios
      .get(`${baseUrl}/bank`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataBank(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadDataBank(false);
  };

  const postDataFaktur = async () => {
    let message = "";
    if (!input.metode_pembayaran)
      message = "Metode pembayaran harus dipilih salah satu!";
    else if (input.metode_pembayaran === "Transfer" && !input.id_bank)
      message = "Bank harus dipilih salah satu!";
    else if (!input.dp) message = "Metode pelunasan harus dipilih salah satu!";
    else if (input.dp === "JT" && !input.nominal)
      message = "Nominal harus diisi!";

    if (message) {
      Swal.fire("Gagal", message, "error");
    } else {
      let nominal;
      if (input.dp === "JT") {
        if (
          input.nominal.indexOf(".") !== -1 ||
          input.nominal.indexOf(",") !== -1
        ) {
          nominal = input.nominal.replace(/[^a-z\d\s]+/gi, "");
          nominal = nominal.split("Rp ");
          nominal = nominal[1];
        } else {
          nominal = input.nominal;
        }
      } else {
        nominal = currentDataFaktur.pesanan_penjualan.total_harga;
      }

      await axios
        .post(
          `${baseUrl}/faktur-penjualan`,
          {
            id_bank: input.id_bank,
            no_faktur: currentDataFaktur.no_faktur,
            metode_pembayaran: input.metode_pembayaran,
            nominal: nominal,
            terhutang:
              parseInt(currentDataFaktur.pesanan_penjualan.total_harga) -
              parseInt(nominal),
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
        })
        .catch((error) => {
          Swal.fire("Gagal", error.message, "error");
        });

      closeModalHandler("submit");
    }
  };

  const updateDataFakturPenjualan = async (no_faktur) => {
    let message = "";
    if (!input.metode_pembayaran)
      message = "Metode pembayaran harus dipilih salah satu!";
    else if (input.metode_pembayaran === "Transfer" && !input.id_bank)
      message = "Bank harus dipilih salah satu!";
    else if (!input.dp) message = "Metode pelunasan harus dipilih salah satu!";
    else if (input.dp === "JT" && !input.nominal)
      message = "Nominal harus diisi!";

    if (message) {
      Swal.fire("Gagal", message, "error");
    } else {
      let nominal;
      if (input.dp === "JT") {
        if (
          input.nominal.indexOf(".") !== -1 ||
          input.nominal.indexOf(",") !== -1
        ) {
          nominal = input.nominal.replace(/[^a-z\d\s]+/gi, "");
          nominal = nominal.split("Rp ");
          nominal = nominal[1];
        } else {
          nominal = input.nominal;
        }
      } else {
        nominal = currentDataFaktur.pesanan_penjualan.total_harga;
      }

      await axios
        .put(
          `${baseUrl}/faktur-penjualan/${no_faktur}`,
          {
            id_bank: input.id_bank,
            metode_pembayaran: input.metode_pembayaran,
            nominal: nominal,
            terhutang:
              parseInt(currentDataFaktur.pesanan_penjualan.total_harga) -
              parseInt(nominal),
          },
          {
            headers: {
              Accept: "Application/json",
              Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
            },
          }
        )
        .then((response) => {
          getDataFakturPenjualan(
            `${baseUrl}/faktur-penjualan/marketing/${currentUser.id}`
          );

          Swal.fire("Berhasil", response.data.message, "success");
        })
        .catch((error) => {
          Swal.fire("Gagal", error.message, "error");
        });

      closeModalHandler("update");
    }
  };

  const deleteDataFakturPenjualan = async (no_faktur) => {
    await axios
      .delete(`${baseUrl}/faktur-penjualan/${no_faktur}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        getDataFakturPenjualan(
          `${baseUrl}/faktur-penjualan/marketing/${currentUser.id}`
        );

        Swal.fire("Berhasil", response.data.message, "success");
      })
      .catch((error) => {
        Swal.fire("Gagal", error.message, "error");
      });
  };

  const getDataLaporan = () => {
    let dari;
    let sampai;
    let marketing;

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

    if (!cetakLaporan.marketing) {
      marketing = currentUser.id;
    } else {
      marketing = cetakLaporan.marketing;
    }

    window.open(
      `${process.env.REACT_APP_LARAVEL_PUBLIC}/laporan-faktur-penjualan/${dari}/${sampai}/${marketing}`
    );
  };

  return {
    fields,
    success,
    info,
    warning,
    setWarning,
    dataFaktur,
    setDataFaktur,
    loadDataFaktur,
    setLoadDataFaktur,
    dataBank,
    setDataBank,
    loadDataBank,
    setLoadDataBank,
    dataMarketing,
    setDataMarketing,
    currentDataFaktur,
    loadCurrentDataFaktur,
    bankVisibility,
    terhutangVisibility,
    nominalVisibility,
    buttonSubmitName,
    input,
    cetakLaporan,
    filterLebihDariSatuHari,
    filterMarketing,
    details,
    toggleDetails,
    changeHandler,
    closeModalHandler,
    submitHandler,
    getCurrentUser,
    getDataFakturPenjualanById,
    getDataBank,
    cetakLaporanHandler,
    getDataMarketing,
  };
};

export default FakturPenjualanHelper;
