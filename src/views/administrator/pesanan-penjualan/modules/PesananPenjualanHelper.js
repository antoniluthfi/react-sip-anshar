import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const PesananPenjualanHelper = () => {
    const currentUser = useSelector(state => state.currentUser);
    const baseUrl = process.env.REACT_APP_LARAVEL_URL;
    const fields = [
        {
            key: 'id',
            label: 'No',
            _style: { textAlign: 'center' },
        },
        {
            key: 'kode_pesanan',
            label: 'Kode Pesanan',
            _style: { textAlign: 'center' },
        },
        {
            key: 'name',
            label: 'Nama',
            _style: { textAlign: 'center' },
        },
        {
            key: 'email',
            label: 'Email',
            _style: { textAlign: 'center' },
        },
        {
            key: 'nama_barang',
            label: 'Barang',
            _style: { textAlign: 'center' },
        },
        {
            key: 'kuantitas',
            label: 'Jumlah',
            _style: { textAlign: 'center' },
        },
        {
            key: 'syarat_pembayaran',
            label: 'Syarat Pembayaran',
            _style: { textAlign: 'center' },
        },
        {
            key: 'cabang',
            label: 'Cabang',
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
    const [dataPesananPenjualan, setDataPesananPenjualan] = useState([]);
    const [loadDataPesananPenjualan, setLoadDataPesananPenjualan] = useState(true);
    const [currentPesananPenjualan, setCurrentPesananPenjualan] = useState({});
    const [loadCurrentDataPesananPenjualan, setLoadCurrentDataPesananPenjualan] = useState(true);
    const [dataBarang, setDataBarang] = useState([]);
    const [currentHargaBarang, setCurrentHargaBarang] = useState(0);
    const [dataPelanggan, setDataPelanggan] = useState([]);
    const [dataCabang, setDataCabang] = useState([]);
    const [loadDataCabang, setLoadDataCabang] = useState(true);
    const [dataSyaratPembayaran, setDataSyaratPembayaran] = useState([]);
    const [loadDataSyaratPembayaran, setLoadDataSyaratPembayaran] = useState(true);
    const [diskonLangsungVisibility, setDiskonLangsungVisibility] = useState('d-none');
    const [diskonPersenVisibility, setDiskonPersenVisibility] = useState('d-none');
    const [buttonSubmitName, setButtonSubmitName] = useState('Submit');
    const [modalTitle, setModalTitle] = useState('Tambah Data');
    const [rolePelanggan, setRolePelanggan] = useState('');
    const [input, setInput] = useState({
        user_id: '',
        id_barang: '',
        kuantitas: '',
        satuan: 'pcs',
        diskon_langsung: '',
        diskon_persen: '',
        id_penjual: '',
        stok_cabang: '',
        jumlah: '',
        keterangan: '',
        role: '',
        id_syarat_pembayaran: '',
    });
    const [currentNamaBarang, setCurrentNamaBarang] = useState({
        nama_barang: ''
    });
    const [currentPelanggan, setCurrentPelanggan] = useState({
        name: ''
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

    const closeModalHandler = action => {
        if(action === 'submit' || action === 'update') {
            setSuccess(!success);
            setButtonSubmitName('Submit');
            setModalTitle('Tambah Data');
        } else if(action === 'view') {
            setInfo(!info)
        }

        setInput({
            id_barang: '',
            kuantitas: '',
            satuan: 'pcs',
            diskon_langsung: '',
            diskon_persen: '',
            id_penjual: '',
            stok_cabang: '',
            jumlah: '',
            keterangan: '',
            role: '',
            id_syarat_pembayaran: '',
        });

        setCurrentNamaBarang({
            nama_barang: ''
        });
    }

    const changeHandler = e => {
        setInput({
            ...input, [e.target.name]: e.target.value
        });

        if(e.target.name === 'diskon_langsung' && e.target.value != '') {
            setDiskonLangsungVisibility('d-block');
            setDiskonPersenVisibility('d-none');

            setInput({
                ...input, 
                diskon_langsung: e.target.value,
                diskon_persen: ''
            });
        } else if(e.target.name === 'diskon_persen' && e.target.value != '') {
            setDiskonLangsungVisibility('d-none');
            setDiskonPersenVisibility('d-block');

            setInput({
                ...input, 
                diskon_langsung: '',
                diskon_persen: e.target.value
            });
        }

        if(currentUser.hak_akses === 'administrator') {
            if(e.target.name === 'role') {
                getDataStokBarangById(input.id_barang);
            }
        }
    }

    const submitHandler = action => {
        if(action === 'submit') {
            updateStokBarang(input.id_barang, input.stok_cabang, input.kuantitas);
        } else if(action === 'update') {
            updateDataPesananPenjualan(currentPesananPenjualan.id);
        }
    }

    const getCurrentUser = async () => {
        if(currentUser.hak_akses === 'administrator') {
            getDataPesananPenjualan(`${baseUrl}/pesanan-penjualan`);
        } else {
            getDataPesananPenjualan(`${baseUrl}/pesanan-penjualan/user/${currentUser.id}`);
        }
    }

    const getDataPesananPenjualan = async url => {
        await axios.get(url, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            setDataPesananPenjualan(response.data.result);
        })  
        .catch(error => {
            console.log(error);
        });

        setLoadDataPesananPenjualan(false);
    }

    const getDataPesananPenjualanById = async (id, actionModal) => {
        await axios.get(`${baseUrl}/pesanan-penjualan/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            const result = response.data.result;
            getDataStokBarangById(result.id_barang);
            setCurrentPesananPenjualan(result);

            if(actionModal === 'update') {
                setInput({
                    id_barang: result.id_barang,
                    kuantitas: result.kuantitas,
                    satuan: result.satuan,
                    diskon_persen: result.diskon.indexOf('%') == -1 ? '' : result.diskon.replace(/[^0-9]+/g, ""),
                    diskon_langsung: result.diskon.indexOf('%') == -1 ? result.diskon : '',
                    id_penjual: result.id_penjual,
                    stok_cabang: result.stok_cabang,
                    keterangan: result.keterangan,
                    id_syarat_pembayaran: result.id_syarat_pembayaran,
                });
    
                setCurrentPelanggan({ name: result.pelanggan.name });
                setCurrentNamaBarang({ nama_barang: result.barang.nama_barang });
            }
        })
        .catch(error => {
            console.log(error);
        });

        setLoadCurrentDataPesananPenjualan(false);

        if(actionModal === 'update') {
            setSuccess(!success);
            setButtonSubmitName('Update');
            setModalTitle('Update Data');
        } else if(actionModal === 'view') {
            setInfo(!info);
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
                    deleteDataPesananPenjualan(id);
                }
            });
        }
    }

    const getDataPelanggan = async () => {
        await axios.get(`${baseUrl}/user/data/pelanggan`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            setDataPelanggan(response.data.result);
        })
        .catch(error => {
            console.log(error);
        });
    }

    const getDataStokBarang = async () => {
        await axios.get(`${baseUrl}/stok-barang/data/available`, {
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

    const getSyaratPembayaran = async () => {
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

    const getDataStokBarangById = async id => {
        await axios.get(`${baseUrl}/stok-barang/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            const result = response.data.result;
            const role = currentUser.hak_akses === 'administrator' ? input.role : rolePelanggan;
            
            if(role === 'user') {
                let harga = 0;
                if(input.satuan === 'pcs' || input.satuan == null) {
                    harga = result.harga_user;
                } else {
                    if(result.total_pack === 0) {
                        harga = result.harga_user;
                    } else {
                        harga = result.harga_user * result.total_pack;
                    }
                }

                setCurrentHargaBarang(harga);
            } else if(role === 'reseller') {
                let harga = 0;
                if(input.satuan === 'pcs' || input.satuan == null) {
                    harga = result.harga_reseller;
                } else {
                    if(result.total_pack === 0) {
                        harga = result.harga_reseller;
                    } else {
                        harga = result.harga_reseller * result.total_pack;
                    }
                }

                setCurrentHargaBarang(harga);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    console.log(currentHargaBarang);
    const postDataPesananaPenjualan = async () => {
        let diskon = 0;
        let kuantitas = input.kuantitas == '' ? 1 : input.kuantitas;
        let total_harga = currentHargaBarang * kuantitas;
        if(input.diskon_langsung != '') {
            if(input.diskon_langsung.indexOf('.') !== -1 || input.diskon_langsung.indexOf(',') !== -1) {
                diskon = input.diskon_langsung.replace(/[^0-9]+/g, "");
                total_harga = (currentHargaBarang * kuantitas) - input.diskon_langsung.replace(/[^0-9]+/g, "");
            } else {
                total_harga = (currentHargaBarang * kuantitas)  - input.diskon_langsung;
            }
        }

        if(input.diskon_persen != '') {
            diskon = `${input.diskon_persen} %`;
            total_harga = (currentHargaBarang * kuantitas) - (currentHargaBarang / 100 * input.diskon_persen);
        }

        await axios.post(`${baseUrl}/pesanan-penjualan`, {
            user_id: input.user_id,
            id_barang: input.id_barang,
            kuantitas: input.kuantitas,
            satuan: input.satuan,
            diskon: diskon,
            total_harga: total_harga,
            id_penjual: currentUser.id,
            stok_cabang: input.stok_cabang,
            keterangan: input.keterangan,
            id_syarat_pembayaran: input.id_syarat_pembayaran,
        },
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            if(currentUser.hak_akses === 'administrator') {
                getDataPesananPenjualan(`${baseUrl}/pesanan-penjualan`);
            } else {
                getDataPesananPenjualan(`${baseUrl}/pesanan-penjualan/user/${currentUser.id}`);
            }

            Swal.fire(
                'Berhasil',
                'Data berhasil ditambahkan',
                'success'
            );
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

    const postDataPengirimanPesanan = async payload => {
        await axios.post(`${baseUrl}/pengiriman-pesanan`, {
            id_pesanan_penjualan: payload.id,
            user_id: payload.user_id,
            id_marketing: currentUser.id,
            id_cabang: currentUser.cabang.id,
        }, 
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            if(currentUser.hak_akses === 'administrator') {
                getDataPesananPenjualan(`${baseUrl}/pesanan-penjualan`);
            } else {
                getDataPesananPenjualan(`${baseUrl}/pesanan-penjualan/user/${currentUser.id}`);
            }

            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });
    }

    const postDataFakturPenjualan = async payload => {
        await axios.post(`${baseUrl}/faktur-penjualan`, {
            id_pesanan_penjualan: payload.id,
            id_marketing: currentUser.id,
            user_id: payload.user_id,
        },
        {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            } 
        })
        .then(response => {
            if(currentUser.hak_akses === 'administrator') {
                getDataPesananPenjualan(`${baseUrl}/pesanan-penjualan`);
            } else {
                getDataPesananPenjualan(`${baseUrl}/pesanan-penjualan/user/${currentUser.id}`);
            }    

            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });
    }

    const updateStokBarang = async (id_barang, cabang, jumlah) => {
        let message = '';
        if(input.user_id == '') message = 'Nama pelanggan harus diisi!';
        else if(input.id_barang == '') message = 'Nama barang harus diisi!';
        else if(input.kuantitas == '') message = 'Jumlah harus diisi!';
        else if(input.satuan == '') message = 'Satuan harus dipilih salah satu!';
        else if(input.stok_cabang == '') message = 'Cabang harus dipilih salah satu!';
        else if(input.id_syarat_pembayaran == '') message = 'Syarat pembayaran harus dipilih salah satu!';

        if(message != '') {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            await axios.put(`${baseUrl}/stok-barang/pesanan-penjualan/${id_barang}`, {
                jumlah: jumlah,
                cabang: cabang
            },
            {
                headers: {
                    'Accept': 'Application/json',
                    'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
                }
            })
            .then(response => {
                postDataPesananaPenjualan();
            })
            .catch(error => {
                Swal.fire(
                    'Gagal',
                    error.message,
                    'error'
                );
            });
        }
    }

    const updateDataPesananPenjualan = async id => {
        let message = '';
        if(input.user_id == '') message = 'Nama pelanggan harus diisi!';
        else if(input.id_barang == '') message = 'Nama barang harus diisi!';
        else if(input.kuantitas == '') message = 'Jumlah harus diisi!';
        else if(input.satuan == '') message = 'Satuan harus dipilih salah satu!';
        else if(input.stok_cabang == '') message = 'Cabang harus dipilih salah satu!';
        else if(input.id_syarat_pembayaran == '') message = 'Syarat pembayaran harus dipilih salah satu!';

        if(message != '') {
            Swal.fire(
                'Gagal',
                message,
                'error'
            );
        } else {
            let diskon = 0;
            let kuantitas = 1;
            let total_harga = currentHargaBarang;
    
            if(input.diskon_langsung != '') {
                if(input.diskon_langsung.indexOf('.') !== -1 || input.diskon_langsung.indexOf(',') !== -1) {
                    diskon = input.diskon_langsung.replace(/[^0-9]+/g, "");
                    kuantitas = input.kuantitas == '' ? 1 : input.kuantitas;
                    total_harga = (currentHargaBarang * kuantitas) - input.diskon_langsung.replace(/[^0-9]+/g, "");
                } else {
                    kuantitas = input.kuantitas == '' ? 1 : input.kuantitas;
                    total_harga = (currentHargaBarang * kuantitas)  - input.diskon_langsung;
                }
            }
    
            if(input.diskon_persen != '') {
                diskon = `${input.diskon_persen} %`;
                kuantitas = input.kuantitas == '' ? 1 : input.kuantitas;
                total_harga = (currentHargaBarang * kuantitas) - (currentHargaBarang / 100 * input.diskon_persen);
            }
    
            await axios.put(`${baseUrl}/pesanan-penjualan/${id}`, {
                user_id: input.user_id,
                id_barang: input.id_barang,
                kuantitas: input.kuantitas,
                satuan: input.satuan,
                diskon: diskon,
                total_harga: total_harga,
                id_penjual: currentUser.id,
                stok_cabang: input.stok_cabang,
                keterangan: input.keterangan,
                id_syarat_pembayaran: input.syarat_pembayaran,
            },
            {
                headers: {
                    'Accept': 'Application/json',
                    'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
                }
            })
            .then(response => {
                if(currentUser.hak_akses === 'administrator') {
                    getDataPesananPenjualan(`${baseUrl}/pesanan-penjualan`);
                } else {
                    getDataPesananPenjualan(`${baseUrl}/pesanan-penjualan/user/${currentUser.id}`);
                }
    
                Swal.fire(
                    'Berhasil',
                    response.data.message,
                    'success'
                );
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
    }

    const deleteDataPesananPenjualan = async id => {
        await axios.delete(`${baseUrl}/pesanan-penjualan/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            if(currentPesananPenjualan.pengiriman_pesanan != null) {
                deletePengirimanPesanan(id);
            } else if(currentPesananPenjualan.faktur_penjualan != null) {
                deleteDataFakturPenjualan(id);
            } else {
                Swal.fire(
                    'Berhasil',
                    response.data.message,
                    'success'
                );
            }

            if(currentUser.hak_akses === 'administrator') {
                getDataPesananPenjualan(`${baseUrl}/pesanan-penjualan`);
            } else {
                getDataPesananPenjualan(`${baseUrl}/pesanan-penjualan/user/${currentUser.id}`);
            }
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });
    }

    const deletePengirimanPesanan = async id => {
        await axios.delete(`${baseUrl}/pengiriman-pesanan/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            if(currentUser.hak_akses === 'administrator') {
                getDataPesananPenjualan(`${baseUrl}/pesanan-penjualan`);
            } else {
                getDataPesananPenjualan(`${baseUrl}/pesanan-penjualan/user/${currentUser.id}`);
            }

            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });
    }

    const deleteDataFakturPenjualan = async id => {
        await axios.delete(`${baseUrl}/faktur-penjualan/${id}`, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            if(currentUser.hak_akses === 'administrator') {
                getDataPesananPenjualan(`${baseUrl}/pesanan-penjualan`);
            } else {
                getDataPesananPenjualan(`${baseUrl}/pesanan-penjualan/user/${currentUser.id}`);
            }

            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            );
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
        info, setInfo,
        currentUser,
        dataPesananPenjualan,
        loadDataPesananPenjualan,
        currentPesananPenjualan,
        loadCurrentDataPesananPenjualan,
        dataCabang,
        loadDataCabang,
        dataPelanggan,
        currentPelanggan, setCurrentPelanggan,
        input, setInput,
        currentNamaBarang, setCurrentNamaBarang,
        dataBarang,
        currentHargaBarang, 
        dataSyaratPembayaran,
        loadDataSyaratPembayaran,
        diskonLangsungVisibility,
        diskonPersenVisibility,
        buttonSubmitName,
        modalTitle,
        details,
        rolePelanggan, setRolePelanggan,
        toggleDetails,
        closeModalHandler,
        changeHandler,
        submitHandler,
        getCurrentUser,
        getDataPesananPenjualanById,
        getDataStokBarang,
        getDataStokBarangById,
        getDataCabang,
        getDataPelanggan,
        postDataPengirimanPesanan,
        postDataFakturPenjualan,
        getSyaratPembayaran,
        deletePengirimanPesanan,
        deleteDataFakturPenjualan
    }
}

export default PesananPenjualanHelper;