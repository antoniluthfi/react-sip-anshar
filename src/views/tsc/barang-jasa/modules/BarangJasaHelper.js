import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BarangJasaHandler = () => {
  const baseUrl = process.env.REACT_APP_LARAVEL_URL;
  const fields = [
    {
      key: "id",
      label: "No",
      _style: { textAlign: "center" },
    },
    {
      key: "nama",
      label: "Nama",
      _style: { textAlign: "center" },
    },
    {
      key: "jenis",
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
  const [dataBarangJasa, setDataBarangJasa] = useState([]);
  const [loadDataBarangJasa, setLoadDataBarangJasa] = useState(true);
  const [currentBarangJasa, setCurrentBarangJasa] = useState({});
  const [buttonSubmitName, setButtonSubmitName] = useState("Submit");
  const [buttonVisibility, setButtonVisibility] = useState("d-inline");
  const [formDisabled, setFormDisabled] = useState(false);
  const [modalTitle, setModalTitle] = useState("Tambah Data");
  const [input, setInput] = useState({
    nama: "",
    jenis: "",
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
      postDataBarangJasa();
    } else if (action === "update") {
      updateDataBarangJasa(currentBarangJasa.id);
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
      nama: "",
      jenis: "",
    });
  };

  const getBarangJasa = async () => {
    await axios
      .get(`${baseUrl}/barang-jasa`, {
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

    setLoadDataBarangJasa(false);
  };

  const getDataBarangJasaById = async (id, actionModal) => {
    await axios
      .get(`${baseUrl}/barang-jasa/${id}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        const result = response.data.result;
        setInput({
          nama: result.nama,
          jenis: result.jenis,
        });

        if (actionModal === "update") {
          setCurrentBarangJasa(result);
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
          deleteDataBarangJasa(id);
        }
      });
    }
  };

  const postDataBarangJasa = async () => {
    let message = null;
    if (!input.nama) message = "Nama barang jasa harus diisi!";
    else if (!input.jenis)
      message = "Jenis barang jasa harus dipilih salah satu!";

    if (message) {
      Swal.fire("Gagal", message, "error");
    } else {
      await axios
        .post(
          `${baseUrl}/barang-jasa`,
          {
            nama: input.nama,
            jenis: input.jenis,
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
          getBarangJasa();
        })
        .catch((error) => {
          Swal.fire("Gagal", error.response.data.message, "error");
        });

      closeModalHandler();
    }
  };

  const updateDataBarangJasa = async (id) => {
    let message = null;
    if (!input.nama) message = "Nama barang jasa harus diisi!";
    else if (!input.jenis)
      message = "Jenis barang jasa harus dipilih salah satu!";

    if (message) {
      Swal.fire("Gagal", message, "error");
    } else {
      await axios
        .put(
          `${baseUrl}/barang-jasa/${id}`,
          {
            nama: input.nama,
            jenis: input.jenis,
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
          getBarangJasa();
        })
        .catch((error) => {
          Swal.fire("Gagal", error.response.data.message, "error");
        });

      closeModalHandler();
    }
  };

  const deleteDataBarangJasa = async (id) => {
    await axios
      .delete(`${baseUrl}/barang-jasa/${id}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        Swal.fire("Berhasil", response.data.message, "success");
        getBarangJasa();
      })
      .catch((error) => {
        Swal.fire("Gagal", error.response.data.message, "error");
      });

    setInput({
      nama: "",
      jenis: "",
    });
  };

  return {
    fields,
    success,
    setSuccess,
    dataBarangJasa,
    setDataBarangJasa,
    loadDataBarangJasa,
    setLoadDataBarangJasa,
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
    getBarangJasa,
    getDataBarangJasaById,
  };
};

export default BarangJasaHandler;
