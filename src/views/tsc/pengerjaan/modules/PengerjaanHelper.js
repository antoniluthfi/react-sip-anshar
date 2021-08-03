import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

const PengerjaanHelper = () => {
  const baseUrl = process.env.REACT_APP_LARAVEL_URL;
  const currentUser = useSelector((state) => state.currentUser);
  const fields = [
    {
      key: "no_pengerjaan",
      label: "No Pengerjaan",
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
      key: "id_barang_jasa",
      label: "Barang Jasa",
      _style: { textAlign: "center" },
    },
    {
      key: "progress",
      label: "Progress",
      _style: { textAlign: "center" },
    },
    {
      key: "nominal",
      label: "Biaya Servis",
      _style: { textAlign: "center" },
    },
    {
      key: "status_pengerjaan",
      label: "Status Pengerjaan",
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
  const [dataPengerjaan, setDataPengerjaan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonSubmitName, setButtonSubmitName] = useState("Submit");
  const [buttonVisibility, setButtonVisibility] = useState("d-inline");
  const [formDisabled, setFormDisabled] = useState(false);
  const [modalTitle, setModalTitle] = useState("Tambah Data");
  const [input, setInput] = useState({
    no_service: "",
    barang_jasa: "",
    customer: "",
    no_pengerjaan: "",
    waktu_mulai: "",
    waktu_selesai: "",
    progress: "",
    nominal: "",
    status_pengerjaan: "",
    keterangan: "",
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
    setSuccess(!success);
    setView(false);
    setColor("success");
    setButtonSubmitName("Submit");
    setButtonVisibility("d-inline");
    setFormDisabled(false);
    setModalTitle("Tambah Data");
    setInput({
      no_service: "",
      barang_jasa: "",
      customer: "",
      no_pengerjaan: "",
      waktu_mulai: "",
      waktu_selesai: "",
      progress: "",
      nominal: "",
      status_pengerjaan: "",
      keterangan: "",
    });
  };

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = (action) => {
    if (action === "update") {
      updateDataPengerjaan(input.no_pengerjaan);
    }
  };

  const getDataPengerjaan = async () => {
    await axios
      .get(`${baseUrl}/pengerjaan/teknisi/${currentUser.id}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataPengerjaan(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    setIsLoading(false);
  };

  const getDataPengerjaanById = async (no_pengerjaan, actionModal) => {
    await axios
      .get(`${baseUrl}/pengerjaan/${no_pengerjaan}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        const result = response.data.result;
        setInput({
          no_service: result.penerimaan.no_service,
          barang_jasa: result.penerimaan.barang_jasa.nama,
          customer: result.penerimaan.customer.name,
          no_pengerjaan: result.no_pengerjaan,
          waktu_mulai: result.waktu_mulai,
          waktu_selesai: result.waktu_selesai,
          progress: result.progress,
          nominal: result.nominal,
          status_pengerjaan: result.status_pengerjaan,
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
          deleteDataPengerjaan(no_pengerjaan);
        }
      });
    }
  };

  const updateDataPengerjaan = async (no_pengerjaan) => {
    let status = input.status_pengerjaan;
    if (input.progress == 100) {
      status = 1;
    }

    await axios
      .put(
        `${baseUrl}/pengerjaan/${no_pengerjaan}`,
        {
          waktu_mulai: input.waktu_mulai,
          waktu_selesai: input.waktu_selesai,
          progress: input.progress,
          nominal: input.nominal,
          status_pengerjaan: status,
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
        getDataPengerjaan();
      })
      .catch((error) => {
        Swal.fire("Gagal", error.response.data.message, "error");
      });

    closeModalHandler();
  };

  const deleteDataPengerjaan = async (no_pengerjaan) => {
    await axios
      .put(
        `${baseUrl}/pengerjaan/${no_pengerjaan}`,
        {
          waktu_selesai: 0,
          progress: 0,
          status_pengerjaan: 0,
          keterangan: "",
          nominal: 0,
        },
        {
          headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
          },
        }
      )
      .then((response) => {
        Swal.fire("Berhasil", "Data berhasil direset", "success");
        getDataPengerjaan();
      })
      .catch((error) => {
        Swal.fire("Gagal", error.response.data.message, "error");
      });

    setInput({
      no_service: "",
      barang_jasa: "",
      customer: "",
      no_pengerjaan: "",
      waktu_mulai: "",
      waktu_selesai: "",
      progress: "",
      nominal: "",
      status_pengerjaan: "",
      keterangan: "",
    });
  };

  return {
    fields,
    success,
    setSuccess,
    view,
    color,
    dataPengerjaan,
    setDataPengerjaan,
    isLoading,
    setIsLoading,
    buttonSubmitName,
    buttonVisibility,
    formDisabled,
    modalTitle,
    input,
    setInput,
    details,
    toggleDetails,
    closeModalHandler,
    changeHandler,
    getDataPengerjaan,
    getDataPengerjaanById,
    submitHandler,
  };
};

export default PengerjaanHelper;
