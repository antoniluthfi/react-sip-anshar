import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import KategoriBarang from '../KategoriBarang';

const KategoriBarangHelper = () => {
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const fields = [
        {
            key: 'id',
            label: 'No',
            _style: { textAlign: 'center' },
        },
        {
            key: 'nama_kategori',
            label: 'Kategori',
            _style: { textAlign: 'center' },
        },
        {
            key: 'show_details',
            label: '',
            _style: { width: '1%' },
            sorter: false,
            filter: false
        }
    ];

    const [success, setSuccess] = useState(false);
    const [dataKategori, setDataKategori] = useState([]);
    const [loadDataKategori, setLoadDataKategori] = useState(true);
    const [currentDataKategori, setCurrentDataKategori] = useState({});
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [color, setColor] = useState('success');
    const [purchasingOptions, setPurchasingOptions] = useState([]);
    const [currentPurchasing, setCurrentPurchasing] = useState({
        name: ''
    });
    const [input, setInput] = useState({
        nama_kategori: '',
        id_purchasing: '',
    });
    const [details, setDetails] = useState([]);

    const toggleDetails = (index) => {
        const position = details.indexOf(index)
        let newDetails = details.slice()
        if (position !== -1) {
            newDetails.splice(position, 1)
        } else {
            newDetails = [...details, index]
        }
        setDetails(newDetails)
    }

    const changeHandler = event => {
        setInput({
            ...input, [event.target.name]: event.target.value
        });
    }

    const closeModalHandler = action => {
        if(action === 'submit' || action === 'update') {
            setSuccess(!success);
        }

        setInput({
            nama_kategori: '',
            id_purchasing: '',
        });
        setModalTitle('Tambah Data');
        setButtonSubmitName('Submit');
        setButtonVisibility('d-inline');
        setFormDisabled(false);
        setColor('success');
    }

    const submitHandler = action => {
        if(action === 'submit') {
            postDataKategori();
        } else if(action === 'update') {
            updateDataKategori(currentDataKategori.id);
        } else if(action === 'delete') {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(result => {
                if (result.isConfirmed) {
                    deleteDataKategori(currentDataKategori.id);
                }
            });
        }

        setInput({
            nama_kategori: '',
            id_purchasing: '',
        });
        setModalTitle('Tambah Data');
        setButtonSubmitName('Submit');
        setButtonVisibility('d-inline');
        setFormDisabled(false);
        setColor('success');
    }

    const getDataKategori = async () => {
        await axios.get(`${baseUrl}/kategori-barang`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            setDataKategori(response.data.result);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataKategori(false);
    }

    const getDataKategoriById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/kategori-barang/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            setCurrentDataKategori(response.data.result);

            if(actionModal === 'update') {
                setInput({
                    nama_kategori: response.data.result.nama_kategori,
                    id_purchasing: response.data.result.id_purchasing
                });
            }
        })
        .catch(error => {
            console.log(error);
        });

        if(actionModal === 'update') {
            setModalTitle('Update Data');
            setButtonSubmitName('Update');
            setSuccess(!success);
        } else if(actionModal === 'view') {
            setModalTitle('Data');
            setButtonVisibility('d-none');
            setFormDisabled(true);
            setColor('info');
        } else if(actionModal === 'delete') {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(result => {
                if (result.isConfirmed) {
                    deleteDataKategori(id);
                }
            });
        }
    }

    const getPurchasing = async () => {
        await axios.get(`${baseUrl}/user/role/purchasing`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            setPurchasingOptions(response.data.result);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const postDataKategori = async () => {
        console.log(input);
        await axios.post(`${baseUrl}/kategori-barang`, {
            nama_kategori: input.nama_kategori,
            id_purchasing: input.id_purchasing,
        },
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );
            getDataKategori();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });

        closeModalHandler('submit');
    }

    const updateDataKategori = async id => {
        await axios.put(`${baseUrl}/kategori-barang/${id}`, {
            nama_kategori: input.nama_kategori,
            id_purchasing: input.id_purchasing,
        },
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );
            getDataKategori();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });

        closeModalHandler('update');
    }

    const deleteDataKategori = async id => {
        await axios.delete(`${baseUrl}/kategori-barang/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );
            getDataKategori();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });
    }

    return {
        fields,
        success, setSuccess,
        dataKategori,
        loadDataKategori,
        details,
        input, setInput,
        modalTitle,
        buttonSubmitName,
        buttonVisibility,
        formDisabled,
        color,
        purchasingOptions,
        currentPurchasing, setCurrentPurchasing,
        toggleDetails,
        changeHandler,
        closeModalHandler,
        submitHandler,
        getDataKategori,
        getDataKategoriById,
        getPurchasing
    }
}

export default KategoriBarangHelper;