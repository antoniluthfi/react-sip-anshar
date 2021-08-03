import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CabangHelper = () => {
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const fields = [
        {
            key: 'id',
            label: 'No',
            _style: { textAlign: 'center' },
        },
        {
            key: 'nama_cabang',
            label: 'Nama Cabang',
            _style: { textAlign: 'center' },
        },
        {
            key: 'email',
            label: 'Email',
            _style: { textAlign: 'center' },
        },
        {
            key: 'nomorhp',
            label: 'Nomor HP',
            _style: { textAlign: 'center' },
        },
        {
            key: 'alamat',
            label: 'Alamat',
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
    const [dataCabang, setDataCabang] = useState([]);
    const [loadDataCabang, setLoadDataCabang] = useState(true);
    const [currentDataCabang, setCurrentDataCabang] = useState({});
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [buttonVisibility, setButtonVisibility] = useState('d-inline');
    const [formDisabled, setFormDisabled] = useState(false);
    const [color, setColor] = useState('success');
    const [input, setInput] = useState({
        nama_cabang: '',
        email: '',
        nomorhp: '',
        alamat: '',
        singkatan: ''
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
            nama_cabang: '',
            email: '',
            nomorhp: '',
            alamat: '',
            singkatan: ''
        });
        setModalTitle('Tambah Data');
        setButtonSubmitName('Submit');
        setButtonVisibility('d-inline');
        setFormDisabled(false);
        setColor('success');
    }

    const submitHandler = action => {
        if(action === 'submit') {
            postDataCabang();
        } else if(action === 'update') {
            updateDataCabang(currentDataCabang.id);
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
                    deleteDataCabang(currentDataCabang.id);
                }
            });
        }

        setInput({
            nama_cabang: '',
            email: '',
            nomorhp: '',
            alamat: '',
            singkatan: ''
        });
        setModalTitle('Tambah Data');
        setButtonSubmitName('Submit');
        setButtonVisibility('d-inline');
        setFormDisabled(false);
        setColor('success');
    }

    const getDataCabang = async () => {
        await axios.get(`${baseUrl}/cabang`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            setDataCabang(response.data.result);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataCabang(false);
    }

    const getDataCabangById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/cabang/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            const result = response.data.result;
            setCurrentDataCabang(result);

            if(actionModal === 'update') {
                setInput({
                    nama_cabang: result.nama_cabang,
                    email: result.email,
                    nomorhp: result.nomorhp,
                    alamat: result.alamat,
                    singkatan: result.singkatan
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
                    deleteDataCabang(id);
                }
            });
        }
    }

    const postDataCabang = async () => {
        await axios.post(`${baseUrl}/cabang`, {
            nama_cabang: input.nama_cabang,
            email: input.email,
            nomorhp: input.nomorhp,
            alamat: input.alamat,
            singkatan: input.singkatan
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
            getDataCabang();
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

    const updateDataCabang = async id => {
        await axios.put(`${baseUrl}/cabang/${id}`, {
            nama_cabang: input.nama_cabang,
            email: input.email,
            nomorhp: input.nomorhp,
            alamat: input.alamat,
            singkatan: input.singkatan
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
            getDataCabang();
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

    const deleteDataCabang = async id => {
        await axios.delete(`${baseUrl}/cabang/${id}`, {
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
            getDataCabang();
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
        dataCabang, setDataCabang,
        loadDataCabang, setLoadDataCabang,
        details,
        input,
        modalTitle,
        buttonSubmitName,
        buttonVisibility,
        formDisabled,
        color,
        toggleDetails,
        changeHandler,
        closeModalHandler,
        submitHandler,
        getDataCabang,
        getDataCabangById
    }
}

export default CabangHelper;