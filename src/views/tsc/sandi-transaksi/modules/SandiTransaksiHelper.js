import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const SandiTransaksiHandler = () => {
  const baseUrl = process.env.REACT_APP_LARAVEL_URL;
  const fields = [
    {
      key: "id",
      label: "No",
      _style: { textAlign: "center" },
    },
    {
      key: "nama_transaksi",
      label: "Nama",
      _style: { textAlign: "center" },
    },
    {
      key: "jenis_transaksi",
      label: "Jenis",
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
  const [color, setColor] = useState("success");
  const [dataSandiTransaksi, setDataSandiTransaksi] = useState([]);
  const [loadDataSandiTransaksi, setLoadDataSandiTransaksi] = useState(true);
  const [currentSandiTransaksi, setCurrentSandiTransaksi] = useState({});
  const [buttonSubmitName, setButtonSubmitName] = useState("Submit");
  const [buttonVisibility, setButtonVisibility] = useState("d-inline");
  const [formDisabled, setFormDisabled] = useState(false);
  const [modalTitle, setModalTitle] = useState("Tambah Data");
  const [input, setInput] = useState({
    nama_transaksi: "",
    jenis_transaksi: "",
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

  const submitHandler = (action) => {
    if (action === "submit") {
      postDataSandiTransaksi();
    } else if (action === "update") {
      updateDataSandiTransaksi(currentSandiTransaksi.id);
    }
  };

  const closeModalHandler = () => {
    setSuccess(!success);
    setColor("success");
    setButtonSubmitName("Submit");
    setButtonVisibility("d-inline");
    setFormDisabled(false);
    setModalTitle("Tambah Data");
    setInput({
      nama_transaksi: "",
      jenis_transaksi: "",
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
        setDataSandiTransaksi(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadDataSandiTransaksi(false);
  };

  const getDataSandiTransaksiById = async (id, actionModal) => {
    await axios
      .get(`${baseUrl}/sandi-transaksi/${id}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        const result = response.data.result;
        setInput({
          nama_transaksi: result.nama_transaksi,
          jenis_transaksi: result.jenis_transaksi,
        });

        if (actionModal === "update") {
          setCurrentSandiTransaksi(result);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    if (actionModal === "update") {
      setSuccess(!success);
      setColor("success");
      setButtonSubmitName("Update");
      setButtonVisibility("d-inline");
      setFormDisabled(false);
      setModalTitle("Update Data");
    } else if (actionModal === "view") {
      setSuccess(!success);
      setColor("info");
      setButtonSubmitName("Submit");
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
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteDataSandiTransaksi(id);
        }
      });
    }
  };

  const postDataSandiTransaksi = async () => {
    let message = null;
    if (!input.nama_transaksi) message = "Nama transaksi harus diisi!";
    else if (!input.jenis_transaksi)
      message = "Jenis transaksi harus dipilih salah satu!";

    if (message) {
      Swal.fire("Gagal", message, "error");
    } else {
      await axios
        .post(
          `${baseUrl}/sandi-transaksi`,
          {
            nama_transaksi: input.nama_transaksi,
            jenis_transaksi: input.jenis_transaksi,
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
          getSandiTransaksi();
        })
        .catch((error) => {
          Swal.fire("Gagal", error.response.data.message, "error");
        });

      closeModalHandler();
    }
  };

  const updateDataSandiTransaksi = async (id) => {
    let message = null;
    if (!input.nama_transaksi) message = "Nama transaksi harus diisi!";
    else if (!input.jenis_transaksi)
      message = "Jenis transaksi harus dipilih salah satu!";

    if (message) {
      Swal.fire("Gagal", message, "error");
    } else {
      await axios
        .put(
          `${baseUrl}/sandi-transaksi/${id}`,
          {
            nama_transaksi: input.nama_transaksi,
            jenis_transaksi: input.jenis_transaksi,
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
          getSandiTransaksi();
        })
        .catch((error) => {
          Swal.fire("Gagal", error.response.data.message, "error");
        });

      closeModalHandler();
    }
  };

  const deleteDataSandiTransaksi = async (id) => {
    await axios
      .delete(`${baseUrl}/sandi-transaksi/${id}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        Swal.fire("Berhasil", response.data.message, "success");
        getSandiTransaksi();
      })
      .catch((error) => {
        Swal.fire("Gagal", error.response.data.message, "error");
      });

    setInput({
      nama_transaksi: "",
      jenis_transaksi: "",
    });
  };

  return {
    fields,
    success,
    setSuccess,
    dataSandiTransaksi,
    setDataSandiTransaksi,
    loadDataSandiTransaksi,
    setLoadDataSandiTransaksi,
    input,
    setInput,
    details,
    color,
    buttonSubmitName,
    buttonVisibility,
    formDisabled,
    modalTitle,
    toggleDetails,
    changeHandler,
    submitHandler,
    closeModalHandler,
    getSandiTransaksi,
    getDataSandiTransaksiById,
  };
};

export default SandiTransaksiHandler;
