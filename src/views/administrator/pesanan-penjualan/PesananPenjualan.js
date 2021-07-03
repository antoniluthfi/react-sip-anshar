import React, { useEffect } from 'react';
import DataPesananPenjualanHelper from './modules/PesananPenjualanHelper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CurrencyFormat from 'react-currency-format';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CModalFooter,
    CCollapse,
    CSelect,
    CTextarea,
} from '@coreui/react';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faMinus,
    faPlus,
    faTrash
} from '@fortawesome/free-solid-svg-icons'


const PesananPenjualan = () => {
    const {
        fields,
        success, setSuccess,
        info,
        dataPesananPenjualan,
        loadDataPesananPenjualan,
        currentPesananPenjualan,
        loadCurrentDataPesananPenjualan,
        dataCabang,
        loadDataCabang,
        dataPelanggan,
        currentPelanggan, setCurrentPelanggan,
        input, setInput,
        inputBarang, setInputBarang,
        dataBarang, setDataBarang,
        dataSyaratPembayaran,
        loadDataSyaratPembayaran,
        buttonSubmitName,
        modalTitle,
        details,
        toggleDetails,
        closeModalHandler,
        changeHandler,
        submitHandler,
        getCurrentUser,
        getDataPesananPenjualanById,
        getDataStokBarang,
        getDataCabang,
        getDataPelanggan,
        postDataPengirimanPesanan,
        postDataFakturPenjualan,
        getSyaratPembayaran,
        deletePengirimanPesanan,
        deleteDataFakturPenjualan,
        addInput,
        removeInput
    } = DataPesananPenjualanHelper();

    useEffect(() => {
        getCurrentUser();
        getDataCabang();
        getDataPelanggan();
        getSyaratPembayaran();

        return () => {
            setDataBarang([]);
        }
    }, [])

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Pesanan Penjualan</CCardHeader>
                        <CRow>
                            <CCol xs="6" lg="6">
                                <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                            </CCol>
                        </CRow>
                        <CCardBody>
                            <CDataTable
                                items={dataPesananPenjualan}
                                fields={fields}
                                striped
                                sorter
                                hover
                                tableFilter
                                noItemsView={loadDataPesananPenjualan ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
                                loading={loadDataPesananPenjualan}    
                                itemsPerPageSelect
                                itemsPerPage={5}
                                pagination
                                scopedSlots = {{
                                    'id':
                                    ((item, i) => <td className="text-center">{i + 1}</td>),
                                    'kode_pesanan':
                                    ((item, i) => <td className="text-center">{item.kode_pesanan}</td>),
                                    'name':
                                    (item => <td className="text-center">{item.pelanggan.name}</td>),
                                    'email':
                                    (item => <td className="text-center">{item.pelanggan.email}</td>),
                                    'syarat_pembayaran':
                                    (item => <td className="text-center">{item.syarat_pembayaran.nama}</td>),
                                    'cabang':
                                    (item => <td className="text-center">{item.cabang.nama_cabang}</td>),
                                    'show_details':
                                    (item, index)=>{
                                        return (
                                        <td className="py-2">
                                            <CButton
                                                color="primary"
                                                variant="outline"
                                                shape="square"
                                                size="sm"
                                                onClick={()=>{toggleDetails(index)}}
                                            >
                                                {details.includes(index) ? 'Hide' : 'Show'}
                                            </CButton>
                                        </td>
                                        )
                                    },
                                    'details':
                                        (item, index) => {
                                        return (
                                        <CCollapse show={details.includes(index)}>
                                            <CCardBody>
                                                <CButton size="sm" color="info" onClick={() => getDataPesananPenjualanById(item.kode_pesanan, 'view')}>
                                                    View Details
                                                </CButton>
                                                <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPesananPenjualanById(item.kode_pesanan, 'update')}>
                                                    Update
                                                </CButton>
                                                {!item.faktur_penjualan ? 
                                                    !item.pengiriman_pesanan ? 
                                                    <CButton size="sm" color="warning" className="ml-1" onClick={() => postDataPengirimanPesanan(item)}>
                                                        Proses Ke Pengiriman Pesanan
                                                    </CButton> :
                                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => deletePengirimanPesanan(item.pengiriman_pesanan.kode_pesanan)}>
                                                        Hapus Pengiriman Pesanan
                                                    </CButton>
                                                : null}
                                                
                                                {!item.pengiriman_pesanan ?
                                                    !item.faktur_penjualan ?
                                                    <CButton size="sm" color="warning" className="ml-1" onClick={() => postDataFakturPenjualan(item)}>
                                                        Buat Faktur Penjualan
                                                    </CButton> :
                                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => deleteDataFakturPenjualan(item.faktur_penjualan.no_faktur)}>
                                                        Hapus Faktur Penjualan
                                                    </CButton>
                                                : null}
                                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataPesananPenjualanById(item.kode_pesanan, 'delete')}>
                                                    Delete
                                                </CButton>  
                                                <a href={`${process.env.REACT_APP_LARAVEL_PUBLIC}/laporan/transaksi/pesanan-penjualan/id/${item.kode_pesanan}`} target="_blank" rel="noreferrer">
                                                    <CButton size="sm" color="warning" className="ml-1">
                                                        Cetak Laporan
                                                    </CButton>
                                                </a>
                                            </CCardBody>
                                        </CCollapse>
                                        )
                                    }
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* add, edit data */}
            <CModal 
                show={success} 
                onClose={() => closeModalHandler(buttonSubmitName.toLowerCase())}
                color="success"
                closeOnBackdrop={false}
                size="lg"
            >
                <CModalHeader closeButton>
                    <CModalTitle>{modalTitle}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="input-pelanggan">Nama Pelanggan</CLabel>
                                    <Autocomplete
                                        id="input-pelanggan"
                                        clearOnEscape={true}
                                        options={dataPelanggan}
                                        getOptionSelected={(option, value) => option.id === value.id}
                                        getOptionLabel={option => option.name}
                                        value={{ name: currentPelanggan.name }}
                                        onChange={(event, values) => {
                                            if(values !== null) {
                                                console.log(values);
                                                setCurrentPelanggan({
                                                    ...currentPelanggan, 
                                                    name: values.name,
                                                    hak_akses: values.hak_akses
                                                });

                                                setInput({
                                                    ...input, user_id: values.id
                                                });

                                                if(input.id_cabang) {
                                                    getDataStokBarang(input.id_cabang);
                                                }
                                            } else {
                                                setCurrentPelanggan({
                                                    ...currentPelanggan, name: '', hak_akses: ''
                                                });

                                                setInput({
                                                    ...input, user_id: ''
                                                });
                                            }                
                                        }}
                                        renderInput={(params) => 
                                            <TextField {...params} />
                                        }
                                    />                                
                                </CFormGroup>
                            </CCol>

                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="id_cabang">Pilih Cabang</CLabel>
                                    <CSelect 
                                        custom 
                                        name="id_cabang" 
                                        id="id_cabang" 
                                        value={input.id_cabang} 
                                        onChange={(e) => {
                                            changeHandler(e);
                                            
                                            if(currentPelanggan.hak_akses) {
                                                getDataStokBarang(e.target.value);
                                            }
                                        }} 
                                    >
                                        {
                                            loadDataCabang ? <option value="">Pilih Salah Satu</option> :
                                            <>
                                                <option value="">Pilih Salah Satu</option>
                                                {dataCabang.map(item => (
                                                    <option key={item.id} value={item.id}>{item.nama_cabang}</option>
                                                ))}
                                            </>
                                        }
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <table className="table table-bordered table-sm">
                            <thead>
                                <tr className="text-center">
                                    <th width="5%">No</th>
                                    <th>Nama Barang</th>
                                    <th width="10%">Stok</th>
                                    <th width="10%">Jumlah</th>
                                    <th width="15%">Satuan</th>
                                    <th width="15%">
                                        <CButton color="info" size="sm" onClick={addInput}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </CButton>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {inputBarang.map((item, i) => (
                                    <tr>
                                        <td className="text-center">{i + 1}</td>
                                        <td>
                                            <CFormGroup>
                                                <Autocomplete
                                                    id="input-barang"
                                                    clearOnEscape={true}
                                                    options={dataBarang}
                                                    getOptionSelected={(option, value) => option.id === value.id}
                                                    getOptionLabel={option => option.nama_barang}
                                                    value={{ nama_barang: item.nama_barang }}
                                                    onChange={(event, values) => {
                                                        if(values) {
                                                            const stok_dapat_dijual = values.detail.filter((stok) => stok.id_cabang == input.id_cabang);
                                                            const val = [...inputBarang];
                                                            val[i].id_barang = values.id;
                                                            val[i].nama_barang = values.nama_barang;
                                                            val[i].harga_user = values.harga_user;
                                                            val[i].harga_reseller = values.harga_reseller;
                                                            val[i].stok_dapat_dijual = stok_dapat_dijual.length > 0 ? stok_dapat_dijual[0].stok_dapat_dijual : 0;
                                                            val[i].harga_total = currentPelanggan.hak_akses === 'user' ? inputBarang[i].harga_user : inputBarang[i].harga_reseller;
                                                            setInputBarang(val);
                                                        } else {
                                                            const val = [...inputBarang];
                                                            val[i].id_barang = '';
                                                            val[i].nama_barang = '';
                                                            val[i].harga_user = '';
                                                            val[i].harga_reseller = '';
                                                            val[i].stok_dapat_dijual = '';
                                                            val[i].kuantitas = 1;
                                                            val[i].harga_total = 0;
                                                            setInputBarang(val);
                                                        }                
                                                    }}
                                                    renderInput={(params) => 
                                                        <TextField {...params} />
                                                    }
                                                />                                
                                            </CFormGroup>
                                        </td>
                                        <td className="text-center">{inputBarang[i].stok_dapat_dijual}</td>
                                        <td className="text-center">{inputBarang[i].kuantitas}</td>
                                        <td className="text-right">Rp. {new Intl.NumberFormat(['ban', 'id']).format(inputBarang[i].harga_total)}</td>
                                        <td className="text-center">
                                            <CButton className="mr-1" color="success" size="sm" onClick={() => {
                                                const val = [...inputBarang];
                                                
                                                if(val[i].kuantitas < inputBarang[i].stok_dapat_dijual) {
                                                    const harga = currentPelanggan.hak_akses === 'user' ? val[i].harga_user : val[i].harga_reseller;

                                                    val[i].kuantitas += 1;
                                                    val[i].harga_total += parseInt(harga);
                                                    setInputBarang(val);
                                                }
                                            }}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </CButton>
                                            <CButton className="mr-1" color="danger" size="sm" onClick={() => {
                                                const val = [...inputBarang];
                                                
                                                if(val[i].kuantitas > 1) {
                                                    const harga = currentPelanggan.hak_akses === 'user' ? val[i].harga_user : val[i].harga_reseller;

                                                    val[i].kuantitas -= 1;
                                                    val[i].harga_total -= parseInt(harga);
                                                    setInputBarang(val);
                                                } else {
                                                    removeInput(i);
                                                }
                                            }}>
                                                <FontAwesomeIcon icon={faMinus} />
                                            </CButton>
                                            <CButton color="danger" size="sm" onClick={() => removeInput(i)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </CButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="syarat-pembayaran">Syarat Pembayaran</CLabel>
                                    <CSelect custom name="id_syarat_pembayaran" id="syarat-pembayaran" value={input.id_syarat_pembayaran} onChange={changeHandler} >
                                        {loadDataSyaratPembayaran ? <option value="">Pilih Salah Satu</option> :
                                            <>
                                                <option value="">Pilih Salah Satu</option>
                                                {dataSyaratPembayaran.map(item => (
                                                    <option key={item.id} value={item.id}>{item.nama}</option>
                                                ))}
                                            </>
                                        }
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="diskon-persen">Diskon Persen</CLabel>
                                    <CInput type="number" min="0" max="100" id="diskon-persen" name="diskon_persen" value={input.diskon_persen} onChange={changeHandler} placeholder="Masukkan Diskon" />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="diskon-langsung">Diskon Langsung</CLabel>
                                    <CurrencyFormat min="0" thousandSeparator={true} prefix={'Rp.'} customInput={CInput} name="diskon_langsung" value={input.diskon_langsung} onChange={changeHandler} placeholder="Masukkan Diskon" />
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="12">
                                <CFormGroup>
                                    <CLabel htmlFor="keterangan">Keterangan</CLabel>
                                    <CTextarea id="keterangan" name="keterangan" value={input.keterangan} onChange={changeHandler} placeholder="Masukkan Keterangan"></CTextarea>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={() => submitHandler(buttonSubmitName.toLocaleLowerCase())}>{buttonSubmitName}</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler(buttonSubmitName.toLowerCase())}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* view data */}
            <CModal 
                show={info} 
                onClose={() => closeModalHandler('view')}
                color="info"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Data Pesanan Penjualan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {loadCurrentDataPesananPenjualan ? null : 
                        <>
                            <CRow>
                                <CCol xs="12" md="12" className="table-responsive">
                                    <table className="table table-sm table-bordered">
                                        <thead>
                                            <tr className="text-center">
                                                <th>NO</th>
                                                <th>Nama Barang</th>
                                                <th>Jumlah</th>    
                                                <th>Harga</th>
                                            </tr>    
                                        </thead>  
                                        <tbody>
                                            {currentPesananPenjualan.detail_pesanan_penjualan.map((detail, i) => (
                                                <tr>
                                                    <td className="text-center">{i + 1}</td>
                                                    <td>{detail.barang.nama_barang}</td>
                                                    <td className="text-center">{detail.kuantitas}</td>
                                                    <td className="text-right">Rp. {new Intl.NumberFormat(['ban', 'id']).format(detail.total_harga)}</td>
                                                </tr>
                                            ))}    
                                        </tbody>  
                                    </table>                                    
                                </CCol>
                            </CRow>

                            <CRow className="mt-2">
                                <CCol xs="12" md="6">
                                    <CLabel htmlFor="diskon">Diskon</CLabel>
                                    <CInput type="text" id="diskon" name="diskon" value={currentPesananPenjualan.diskon} placeholder="Diskon" disabled={true} />
                                </CCol>
                                <CCol xs="12" md="6">
                                    <CLabel htmlFor="total_harga">Total Harga</CLabel>
                                    <CInput type="text" id="total_harga" name="total_harga" value={`Rp. ${new Intl.NumberFormat(['ban', 'id']).format(currentPesananPenjualan.total_harga)}`} placeholder="Total Harga" disabled={true} />
                                </CCol>
                            </CRow>

                            <CRow className="mt-2">
                                <CCol xs="12" md="6">
                                    <CLabel htmlFor="penjual">Penjual</CLabel>
                                    <CInput type="text" id="penjual" name="penjual" value={currentPesananPenjualan.penjual.name} placeholder="Nama Barang" disabled={true} />
                                </CCol>
                            </CRow>  

                            <CRow className="mt-2">
                                <CCol xs="12" md="12">
                                    <CFormGroup>
                                        <CLabel htmlFor="keterangan">Keterangan</CLabel>
                                        <CTextarea id="keterangan" value={currentPesananPenjualan.keterangan} placeholder="Keterangan" disabled={true} ></CTextarea>
                                    </CFormGroup>
                                </CCol>
                            </CRow>                      
                        </>
                    }
                </CModalBody>
                <CModalFooter></CModalFooter>
            </CModal>
        </>
    )
}

export default PesananPenjualan;