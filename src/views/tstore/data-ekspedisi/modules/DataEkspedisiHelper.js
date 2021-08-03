import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const DataEkspedisiHelper = () => {
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const fields = [
        {
            key: 'id',
            label: 'No',
            _style: { textAlign: 'center' },
        },
        {
            key: 'nama_ekspedisi',
            label: 'Nama Ekspedisi',
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
    const [dataEkspedisi, setDataEkspedisi] = useState([]);
    const [loadDataEkspedisi, setLoadDataEkspedisi] = useState(true);
    const [currentDataEkspedisi, setCurrentDataEkspedisi] = useState({});
    const [loadCurrentDataEkspedisi, setLoadCurrentDataEkspedisi] = useState(true);
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [formDisabled, setFormDisabled] = useState(false);
    const [color, setColor] = useState('success');
    const [input, setInput] = useState({
        nama_ekspedisi: '',
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
            postDataEkspedisi();
        } else if(action === 'update') {
            updateDataEkspedisi(currentDataEkspedisi.id);
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

    const getDataEkspedisi = async () => {
        await axios.get(`${baseUrl}/ekspedisi`, {
            headers: { 
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            setDataEkspedisi(response.data.result);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataEkspedisi(false);
    }

    const getDataEkspedisiById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/ekspedisi/${id}`, {
            headers: { 
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            const result = response.data.result;
            setCurrentDataEkspedisi(result);

            setInput({
                nama: result.nama,
            });
        })
        .catch(error => {
            console.log(error);
        });

        setLoadCurrentDataEkspedisi(false);

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
                    deleteDataEkspedisi(id);
                }
            });
        }
    }

    const postDataEkspedisi = async () => {
        await axios.post(`${baseUrl}/ekspedisi`, {
            nama_ekspedisi: input.nama_ekspedisi,
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

            getDataEkspedisi();
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

    const updateDataEkspedisi = async id => {
        await axios.put(`${baseUrl}/ekspedisi/${id}`, {
            nama_ekspedisi: input.nama_ekspedisi,
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

            getDataEkspedisi();
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

    const deleteDataEkspedisi = async id => {
        await axios.delete(`${baseUrl}/ekspedisi/${id}`, {
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

            getDataEkspedisi();
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
        dataEkspedisi, setDataEkspedisi,
        loadDataEkspedisi, setLoadDataEkspedisi,
        currentDataEkspedisi, 
        loadCurrentDataEkspedisi,
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
        getDataEkspedisi,
        getDataEkspedisiById
    }
}

export default DataEkspedisiHelper;