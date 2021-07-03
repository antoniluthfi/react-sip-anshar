import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const DataBankHelper = () => {
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const fields = [
        {
            key: 'id',
            label: 'No',
            _style: { textAlign: 'center' },
        },
        {
            key: 'nama_bank',
            label: 'Nama Bank',
            _style: { textAlign: 'center' },
        },
        {
            key: 'norekening',
            label: 'Nomor Rekening',
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
    const [dataBank, setDataBank] = useState([]);
    const [loadDataBank, setLoadDataBank] = useState(true);
    const [currentDataBank, setCurrentDataBank] = useState({});
    const [loadCurrentDataBank, setLoadCurrentDataBank] = useState(true);
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [formDisabled, setFormDisabled] = useState(false);
    const [color, setColor] = useState('success');
    const [input, setInput] = useState({
        nama_bank: '',
        norekening: ''
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
            postDataBank();
        } else if(action === 'update') {
            updateDataBank(currentDataBank.id);
        }
    }

    const closeModalHandler = () => {
        setSuccess(!success);
        setInput({
            nama_bank: '',
            norekening: ''    
        });
        setModalTitle('Tambah Data');
        setColor('success');
        setButtonSubmitName('Submit');
        setFormDisabled(false);
    }

    const getDataBank = async () => {
        await axios.get(`${baseUrl}/bank`, {
            headers: { 
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            setDataBank(response.data.result);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataBank(false);
    }

    const getDataBankById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/bank/${id}`, {
            headers: { 
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            const result = response.data.result;
            setCurrentDataBank(result);

            setInput({
                nama_bank: result.nama_bank,
                norekening: result.norekening        
            });
        })
        .catch(error => {
            console.log(error);
        });

        setLoadCurrentDataBank(false);

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
                    deleteDataBank(id);
                }
            });
        }
    }

    const postDataBank = async () => {
        await axios.post(`${baseUrl}/bank`, {
            nama_bank: input.nama_bank,
            norekening: input.norekening
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

            getDataBank();
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

    const updateDataBank = async id => {
        await axios.put(`${baseUrl}/bank/${id}`, {
            nama_bank: input.nama_bank,
            norekening: input.norekening
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

            getDataBank();
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

    const deleteDataBank = async id => {
        await axios.delete(`${baseUrl}/bank/${id}`, {
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

            getDataBank();
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
        dataBank,
        loadDataBank,
        currentDataBank,
        loadCurrentDataBank,
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
        getDataBank,
        getDataBankById
    }
}

export default DataBankHelper;