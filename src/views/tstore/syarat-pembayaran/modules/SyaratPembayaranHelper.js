import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const SyaratPembayaranHelper = () => {
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const fields = [
        {
            key: 'id',
            label: 'No',
            _style: { textAlign: 'center' },
        },
        {
            key: 'nama',
            label: 'Syarat Pembayaran',
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
    const [dataSyaratPembayaran, setDataSyaratPembayaran] = useState([]);
    const [loadDataSyaratPembayaran, setLoadDataSyaratPembayaran] = useState(true);
    const [currentDataSyaratPembayaran, setCurrentDataSyaratPembayaran] = useState({});
    const [loadCurrentDataSyaratPembayaran, setLoadCurrentDataSyaratPembayaran] = useState(true);
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [formDisabled, setFormDisabled] = useState(false);
    const [color, setColor] = useState('success');
    const [input, setInput] = useState({
        nama: '',
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

    const changeHandler = e => {
        setInput({
            ...input, [e.target.name]: e.target.value
        });
    }

    const submitHandler = action => {
        if(action === 'submit') {
            postDataSyaratPembayaran();
        } else if(action === 'update') {
            updateDataSyaratPembayaran(currentDataSyaratPembayaran.id);
        }
    }

    const closeModalHandler = () => {
        setSuccess(!success);
        setInput({
            nama: '',
        });
        setModalTitle('Tambah Data');
        setColor('success');
        setButtonSubmitName('Submit');
        setFormDisabled(false);
    }

    const getDataSyaratPembayaran = async () => {
        await axios.get(`${baseUrl}/syarat-pembayaran`, {
            headers: { 
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            setDataSyaratPembayaran(response.data.result);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataSyaratPembayaran(false);
    }

    const getDataSyaratPembayaranById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/syarat-pembayaran/${id}`, {
            headers: { 
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            const result = response.data.result;
            setCurrentDataSyaratPembayaran(result);

            setInput({
                nama: result.nama,
            });
        })
        .catch(error => {
            console.log(error);
        });

        setLoadCurrentDataSyaratPembayaran(false);

        if(actionModal === 'update') {
            setModalTitle('Update Data');
            setColor('success');
            setButtonSubmitName('Update');
            setFormDisabled(false);
            setSuccess(!success);
        } else if(actionModal === 'view') {
            setModalTitle('Data');
            setColor('info');
            setFormDisabled(true);
            setSuccess(!success);
        } else if(actionModal === 'delete') {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteDataSyaratPembayaran(id);
                }
            });
        }
    }

    const postDataSyaratPembayaran = async () => {
        await axios.post(`${baseUrl}/syarat-pembayaran`, {
            nama: input.nama,
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

            getDataSyaratPembayaran();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });

        closeModalHandler();
    }

    const updateDataSyaratPembayaran = async id => {
        await axios.put(`${baseUrl}/syarat-pembayaran/${id}`, {
            nama: input.nama,
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

            getDataSyaratPembayaran();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });

        closeModalHandler();
    }

    const deleteDataSyaratPembayaran = async id => {
        await axios.delete(`${baseUrl}/syarat-pembayaran/${id}`, {
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

            getDataSyaratPembayaran();
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
        dataSyaratPembayaran,
        loadDataSyaratPembayaran,
        currentDataSyaratPembayaran,
        loadCurrentDataSyaratPembayaran,
        modalTitle,
        buttonSubmitName,
        formDisabled,
        color,
        input,
        details,
        toggleDetails,
        changeHandler,
        submitHandler,
        closeModalHandler,
        getDataSyaratPembayaran,
        getDataSyaratPembayaranById
    }
}

export default SyaratPembayaranHelper;