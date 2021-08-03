import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const DataUserHelper = () => {
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
      key: "email",
      label: "Email",
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
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      sorter: false,
      filter: false,
    },
  ];

  const [success, setSuccess] = useState(false);
  const [color, setColor] = useState("success");
  const [buttonSubmitName, setButtonSubmitName] = useState("Submit");
  const [buttonVisibility, setButtonVisibility] = useState("d-inline");
  const [modalTitle, setModalTitle] = useState("Tambah Data");
  const [dataUser, setDataUser] = useState([]);
  const [loadDataUser, setLoadDataUser] = useState(true);
  const [currentDataUser, setCurrentDataUser] = useState({});
  const [loadCurrentDataUser, setLoadCurrentDataUser] = useState(true);
  const [dataCabang, setDataCabang] = useState([]);
  const [loadDataCabang, setLoadDataCabang] = useState(true);
  const [formDisabled, setFormDisabled] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    nomorhp: "",
    alamat: "",
    id_cabang: "",
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
    setModalTitle("Tambah Data");
    setButtonVisibility("d-inline");
    setButtonSubmitName("Submit");
    setFormDisabled(false);
    setInput({
      name: "",
      email: "",
      nomorhp: "",
      alamat: "",
      id_cabang: "",
    });
  };

  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (action) => {
    if (action === "submit") {
      postDataUser();
    } else if (action === "update") {
      updateDataUser(currentDataUser.id);
    }
  };

  const getDataUser = async () => {
    await axios
      .get(`${baseUrl}/user/role/pelanggan`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        setDataUser(response.data.result);
        getDataCabang();
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadDataUser(false);
  };

  const getDataUserById = async (id, actionModal) => {
    await axios
      .get(`${baseUrl}/user/${id}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        const result = response.data.result;
        setCurrentDataUser(result);

        if (actionModal === "update") {
          setInput({
            name: result.name,
            email: result.email,
            nomorhp: result.nomorhp,
            alamat: result.alamat,
            id_cabang: result.id_cabang,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setLoadCurrentDataUser(false);

    if (actionModal === "view") {
      setButtonVisibility("d-none");
      setFormDisabled(true);
      setColor("info");
      setModalTitle("Data");
      setSuccess(!success);
    } else if (actionModal === "update") {
      setButtonVisibility("d-inline");
      setButtonSubmitName("Update");
      setFormDisabled(false);
      setColor("success");
      setModalTitle("Update Data");
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
          deleteDataUser(id);
        }
      });
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

    setLoadDataCabang(false);
  };

  const postDataUser = async () => {
    await axios
      .post(
        `${baseUrl}/user`,
        {
          name: input.name,
          email: input.email,
          nomorhp: input.nomorhp,
          hak_akses: "pelanggan",
          alamat: input.alamat,
          id_cabang: 1,
          password: input.name,
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

        getDataUser();
      })
      .catch((error) => {
        Swal.fire("Gagal", error.message, "error");
      });

    closeModalHandler();
  };

  const updateDataUser = async (id) => {
    await axios
      .put(
        `${baseUrl}/user/${id}`,
        {
          name: input.name,
          email: input.email,
          nomorhp: input.nomorhp,
          alamat: input.alamat,
          id_cabang: 1,
          password: input.name,
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
        getDataUser();
      })
      .catch((error) => {
        Swal.fire("Gagal", error.message, "error");
      });

    closeModalHandler();
  };

  const deleteDataUser = async (id) => {
    await axios
      .delete(`${baseUrl}/user/${id}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        Swal.fire("Berhasil", response.data.message, "success");
        getDataUser();
      })
      .catch((error) => {
        Swal.fire("Gagal", error.message, "error");
      });
  };

  return {
    fields,
    success,
    setSuccess,
    color,
    buttonSubmitName,
    buttonVisibility,
    modalTitle,
    dataUser,
    loadDataUser,
    dataCabang,
    loadDataCabang,
    formDisabled,
    input,
    details,
    toggleDetails,
    closeModalHandler,
    changeHandler,
    submitHandler,
    getDataUser,
    getDataUserById,
  };
};

export default DataUserHelper;
