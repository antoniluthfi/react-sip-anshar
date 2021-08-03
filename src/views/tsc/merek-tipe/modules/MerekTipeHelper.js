import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const MerekTipeHandler = () => {
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
      key: "kategori",
      label: "Kategori",
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
  const [dataMerekTipe, setDataMerekTipe] = useState([]);
  const [loadDataMerekTipe, setLoadDataMerekTipe] = useState(true);
  const [currentMerekTipe, setCurrentMerekTipe] = useState({});
  const [loadCurrentMerekTipe, setLoadCurrentMerekTipe] = useState(true);
  const [barangJasa, setBarangJasa] = useState([]);
  const [buttonSubmitName, setButtonSubmitName] = useState("Submit");
  const [buttonVisibility, setButtonVisibility] = useState("d-inline");
  const [formDisabled, setFormDisabled] = useState(false);
  const [modalTitle, setModalTitle] = useState("Tambah Data");
  const [input, setInput] = useState({
    nama: "",
    id_barang_jasa: "",
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
      postDataMerekTipe();
    } else if (action === "update") {
      updateDataMerekTipe(currentMerekTipe.id);
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
      id_barang_jasa: "",
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
        setBarangJasa(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMerekTipe = async () => {
    await axios
      .get(`${baseUrl}/merek-tipe`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataMerekTipe(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadDataMerekTipe(false);
  };

  const getDataMerekTipeById = async (id, actionModal) => {
    await axios
      .get(`${baseUrl}/merek-tipe/${id}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        const result = response.data.result;
        setInput({
          nama: result.nama,
          id_barang_jasa: result.id_barang_jasa,
        });

        if (actionModal === "update") {
          setCurrentMerekTipe(result);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadCurrentMerekTipe(false);

    if (actionModal === "update") {
      setSuccess(!success);
      setColor("success");
      setButtonSubmitName("Update");
      setButtonVisibility("d-inline");
      setFormDisabled(false);
      setModalTitle("Update Data");
    } else if (actionModal === "view") {
      setSuccess(!success);
      setColor("success");
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
          deleteDataMerekTipe(id);
        }
      });
    }
  };

  const postDataMerekTipe = async () => {
    let message = null;
    if (!input.nama) message = "Nama harus diisi!";
    else if (!input.id_barang_jasa)
      message = "Kategori harus dipilih salah satu!";

    if (message) {
      Swal.fire("Gagal", message, "error");
    } else {
      await axios
        .post(
          `${baseUrl}/merek-tipe`,
          {
            nama: input.nama,
            id_barang_jasa: input.id_barang_jasa,
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
          getMerekTipe();
        })
        .catch((error) => {
          Swal.fire("Gagal", error.response.data.message, "error");
        });

      closeModalHandler();
    }
  };

  const updateDataMerekTipe = async (id) => {
    let message = null;
    if (!input.nama) message = "Nama harus diisi!";
    else if (!input.id_barang_jasa)
      message = "Kategori harus dipilih salah satu!";

    if (message) {
      Swal.fire("Gagal", message, "error");
    } else {
      await axios
        .put(
          `${baseUrl}/merek-tipe/${id}`,
          {
            nama: input.nama,
            id_barang_jasa: input.id_barang_jasa,
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
          getMerekTipe();
        })
        .catch((error) => {
          Swal.fire("Gagal", error.response.data.message, "error");
        });

      closeModalHandler();
    }
  };

  const deleteDataMerekTipe = async (id) => {
    await axios
      .delete(`${baseUrl}/merek-tipe/${id}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        Swal.fire("Berhasil", response.data.message, "success");
        getMerekTipe();
      })
      .catch((error) => {
        Swal.fire("Gagal", error.response.data.message, "error");
      });

    setInput({
      nama: "",
      id_barang_jasa: "",
    });
  };

  return {
    fields,
    success,
    setSuccess,
    dataMerekTipe,
    setDataMerekTipe,
    loadDataMerekTipe,
    setLoadDataMerekTipe,
    currentMerekTipe,
    setCurrentMerekTipe,
    loadCurrentMerekTipe,
    setLoadCurrentMerekTipe,
    barangJasa,
    setBarangJasa,
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
    getMerekTipe,
    getDataMerekTipeById,
  };
};

export default MerekTipeHandler;
