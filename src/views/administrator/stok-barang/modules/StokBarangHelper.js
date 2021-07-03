import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const StokBarangHelper = () => {
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const fields = [
        {
            key: 'id',
            label: 'No',
            _style: { textAlign: 'center' },
        },
        {
            key: 'nama_barang',
            label: 'Nama Barang',
            _style: { textAlign: 'center' },
        },
        {
            key: 'kategori',
            label: 'Kategori',
            _style: { textAlign: 'center' },
        },
        {
            key: 'berat',
            label: 'Berat',
            _style: { textAlign: 'center' },
        },
        {
            key: 'harga_user',
            label: 'Harga User',
            _style: { textAlign: 'center' },
        },
        {
            key: 'harga_reseller',
            label: 'Harga Reseller',
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
    const [info, setInfo] = useState(false);
    const [openModalPaket, setOpenModalPaket] = useState(false);
    const [dataBarang, setDataBarang] = useState([]);
    const [dataCabang, setDataCabang] = useState([]);
    const [loadDataBarang, setLoadDataBarang] = useState(true);
    const [currentStokBarang, setCurrentStokBarang] = useState([]);
    const [loadCurrentStokBarang, setLoadCurrentStokBarang] = useState(true);
    const [dataKategoriBarang, setDataKategoriBarang] = useState([]);
    const [loadDataKategoriBarang, setLoadDataKategoriBarang] = useState(true);
    const [dataBarangNonPaket, setDataBarangNonPaket] = useState([]);
    const [loadDataBarangNonPaket, setLoadDataBarangNonPaket] = useState(true);
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [currentUser, setCurrentUser] = useState({});
    const [input, setInput] = useState({
        nama_barang: '',
        kategori: '',
        berat: '',
        harga_user: '',
        harga_reseller: '',
        paket: ''
    });
    const [inputPaket, setInputPaket] = useState([
        { id_paket: '', id_barang: '' },
    ]);
    const [maxInputCabang, setMaxInputCabang] = useState(0);
    const [inputCabang, setInputCabang] = useState([{
        id_cabang: '',
        stok_tersedia: '',
        stok_dapat_dijual: ''
    }]);
    const [currentPaket, setCurrentPaket] = useState([{ nama_barang: '' }]);
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

    const paketChangeHandler = (event, index) => {
        const values = [...inputPaket];
        values[index][event.target.name] = event.target.value;
        setInputPaket(values);
    }

    const addPaketHandler = () => {
        setInputPaket([...inputPaket, { id_paket: '', id_barang: ''}]);
        setCurrentPaket([...currentPaket, { nama_barang: '' }]);
    }

    const removePaketHandler = index => {
        const values = [...inputPaket];
        values.splice(index, 1);
        setInputPaket(values);

        const a = [...currentPaket];
        a.splice(index, 1);
        setCurrentPaket(a);
    }

    const closeModalHandler = action => {
        if(action === 'submit' || action === 'update') {
            setSuccess(!success);
        } else if(action === 'view') {
            setInfo(!info);
        }

        setButtonSubmitName('Submit');
        setModalTitle('Tambah Data');
        setInput({
            nama_barang: '',
            kategori: '',
            berat: '',
            harga_user: '',
            harga_reseller: '',
            paket: ''
        });
    }

    const submitHandler = action => {
        setInput({
            nama_barang: '',
            kategori: '',
            berat: '',
            harga_user: '',
            harga_reseller: '',
            paket: ''
        });

        if(action === 'submit') {
            postStokBarang();
        } else if(action === 'update') {
            updateStokBarang(currentStokBarang.id);
        } else if(action === 'paket') {
            postDataPaket(currentStokBarang.id);
        } else if(action === 'delete') {
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
                    deleteStokBarang(currentStokBarang.id);
                }
            });
        }
    }

    const getCurrentUser = async () => {
        await axios.get(`${baseUrl}/user/my/profile`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            setCurrentUser(response.data.result);
            getStokBarang();
        })
        .catch(error => {
            console.log(error);
        });
    }

    const getDataCabang = async () => {
        await axios.get(`${baseUrl}/cabang`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            const result = response.data.result;
            setDataCabang(result);
            setMaxInputCabang(result.length);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const getStokBarang = async () => {
        await axios.get(`${baseUrl}/stok-barang`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            setDataBarang(response.data.result);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataBarang(false);
    }

    const getStokBarangById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/stok-barang/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            const result = response.data.result;
            setCurrentStokBarang(result);

            if(actionModal === 'update') {
                setInput({
                    nama_barang: result.nama_barang,
                    kategori: result.id_kategori,
                    berat: result.berat,
                    harga_user: result.harga_user,
                    harga_reseller: result.harga_reseller,
                    paket: result.paket,      
                });

                let stok_cabang = [];
                result.detail_stok_barang.forEach((detail) => {
                    stok_cabang.push({
                        id_cabang: detail.id_cabang,
                        stok_tersedia: detail.stok_tersedia,
                        stok_dapat_dijual: detail.stok_dapat_dijual
                    })
                });
                setInputCabang(stok_cabang);
            }

            if(actionModal === 'paket') {
                let value = [];
                if(result.paket != null) {
                    result.paket.map((item) => {
                        item.id_paket = result.id;
                        value.push(item);
                    });
                } else {
                    let obj = {
                        id_paket: result.id,
                        id_barang: ''
                    };
                    value.push(obj);
                }

                setInputPaket(value);
            }
        })
        .catch(error => {
            console.log(error);
        });

        setLoadCurrentStokBarang(false);

        if(actionModal === 'update') {
            setModalTitle('Update Data');
            setButtonSubmitName('Update');
            setSuccess(!success);
        } else if(actionModal === 'view') {
            setModalTitle('Data');
            setInfo(!info);
        } else if(actionModal === 'paket') {
            setOpenModalPaket(!openModalPaket);
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
                    deleteStokBarang(id);
                }
            });
        } else if(actionModal === 'deletePaket') {
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
                    deletePaket(id);
                }
            });
        }
    }

    const getDataKategoriBarang = async () => {
        await axios.get(`${baseUrl}/kategori-barang`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            setDataKategoriBarang(response.data.result);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataKategoriBarang(false);
    }

    const getDataBarangNonPaket = async () => {
        await axios.get(`${baseUrl}/stok-barang/jenis/non-paket`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            setDataBarangNonPaket(response.data.result);
        })
        .catch(error => {
            console.log(error);
        });

        setLoadDataBarangNonPaket(false);
    }

    const postStokBarang = async () => {
        let harga_user;
        let harga_reseller;
        if(input.harga_user != currentStokBarang.harga_user) {
            if(input.harga_user.indexOf(',') !== -1 || input.harga_user.indexOf('.') !== -1) {
                harga_user = input.harga_user.replace(/[^a-z\d\s]+/gi, "");
                harga_user = harga_user.split('Rp ');
                harga_user = harga_user[1];
            } else {
                harga_user = input.harga_user;
            }
        } else {
            harga_user = input.harga_user;
        }

        if(input.harga_reseller != currentStokBarang.harga_reseller) {
            if(input.harga_reseller.indexOf('.') != -1 || input.harga_reseller.indexOf(',') != -1) {
                harga_reseller = input.harga_reseller.replace(/[^a-z\d\s]+/gi, "");
                harga_reseller = harga_reseller.split('Rp ');
                harga_reseller = harga_reseller[1];
            } else {
                harga_reseller = input.harga_reseller;
            }
        } else {
            harga_reseller = input.harga_reseller;
        }

        // validate input stok cabang
        const stokCabang = Array.from(new Set(inputCabang.map((x) => x.id_cabang)))
                            .map((id) => {
                                return {
                                    id_cabang: id, 
                                    stok_tersedia: inputCabang.find((s) => s.id_cabang).stok_tersedia,
                                    stok_dapat_dijual: inputCabang.find((s) => s.id_cabang).stok_dapat_dijual
                                }
                            });

        await axios.post(`${baseUrl}/stok-barang`, {
            nama_barang: input.paket == 1 ? `Paket ${input.nama_barang}` : input.nama_barang,
            id_kategori: input.kategori,
            berat: input.berat,
            harga_user: harga_user,
            harga_reseller: harga_reseller,
            paket: input.paket,   
            detail: stokCabang
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
            getStokBarang();
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

    const postDataPaket = async () => {
        await axios.post(`${baseUrl}/paket-barang`, {
            payload: inputPaket
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

            getStokBarang();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });

        setOpenModalPaket(!openModalPaket);
    }

    const updateStokBarang = async (id) => {
        let harga_user;
        let harga_reseller;
        if(input.harga_user != currentStokBarang.harga_user) {
            if(input.harga_user.indexOf('.') !== -1 || input.harga_reseller.indexOf(',') !== -1) {
                harga_user = input.harga_user.replace(/[^a-z\d\s]+/gi, "");
                harga_user = harga_user.split('Rp ');
                harga_user = harga_user[1];
            } else {
                harga_user = input.harga_user;
            }
        } else {
            harga_user = input.harga_user;
        }

        if(input.harga_reseller != currentStokBarang.harga_reseller) {
            if(input.harga_reseller.indexOf('.') !== -1 || input.harga_reseller.indexOf(',') !== -1) {
                harga_reseller = input.harga_reseller.replace(/[^a-z\d\s]+/gi, "");
                harga_reseller = harga_reseller.split('Rp ');
                harga_reseller = harga_reseller[1];
            } else {
                harga_reseller = input.harga_reseller;
            }
        } else {
            harga_reseller = input.harga_reseller;
        }

        // validate input cabang
        const stokCabang = Array.from(new Set(inputCabang.map((x) => x.id_cabang)))
                            .map((id) => {
                                return {
                                    id_cabang: id, 
                                    stok_tersedia: inputCabang.find((s) => s.id_cabang).stok_tersedia,
                                    stok_dapat_dijual: inputCabang.find((s) => s.id_cabang).stok_dapat_dijual
                                }
                            });

        await axios.put(`${baseUrl}/stok-barang/${id}`, {
            nama_barang: input.paket == 1 ? `Paket ${input.nama_barang}` : input.nama_barang,
            id_kategori: input.kategori,
            berat: input.berat,
            harga_user: harga_user,
            harga_reseller: harga_reseller,
            paket: input.paket,
            detail: stokCabang
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
            getStokBarang();
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

    const deleteStokBarang = async (id) => {
        await axios.delete(`${baseUrl}/stok-barang/${id}`, {
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
            getStokBarang();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });
    }

    const deletePaket = async id => {
        await axios.delete(`${baseUrl}/paket-barang/${id}`, {
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
            getStokBarang();
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });
    }

    const addInput = () => {
        if(inputCabang.length < maxInputCabang) {
            const value = [...inputCabang];
            value.push({
                id_cabang: '',
                stok_tersedia: '',
                stok_dapat_dijual: ''
            });
            setInputCabang(value);
        }
    }

    const removeInput = (index) => {
        const value = [...inputCabang];
        value.splice(index, 1);
        setInputCabang(value);
    }

    return {
        fields,
        success, setSuccess,
        info,
        openModalPaket,
        dataBarang, setDataBarang,
        dataCabang, setDataCabang,
        setMaxInputCabang,
        loadDataBarang,
        currentUser,
        dataKategoriBarang, setDataKategoriBarang,
        loadDataKategoriBarang,
        dataBarangNonPaket, setDataBarangNonPaket,
        loadDataBarangNonPaket,
        input,
        inputPaket, setInputPaket,
        inputCabang, setInputCabang,
        currentPaket, setCurrentPaket,
        details,
        currentStokBarang,
        loadCurrentStokBarang,
        modalTitle,
        buttonSubmitName,
        toggleDetails,
        changeHandler,
        closeModalHandler,
        submitHandler,
        paketChangeHandler,
        addPaketHandler,
        removePaketHandler,
        getCurrentUser,
        getStokBarangById,
        getDataKategoriBarang,
        getDataBarangNonPaket,
        addInput,
        removeInput,
        getDataCabang,
    }
}

export default StokBarangHelper;