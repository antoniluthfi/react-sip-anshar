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
    CTextarea
} from '@coreui/react';  

const PesananPenjualan = () => {
    const {
        fields,
        success, setSuccess,
        info,
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
        setRolePelanggan,
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
    } = DataPesananPenjualanHelper();

    useEffect(() => {
        getCurrentUser();
        getDataStokBarang();
        getDataCabang();
        getDataPelanggan();
        getSyaratPembayaran();
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
                                    'name':
                                    (item => <td className="text-center">{item.pelanggan.name}</td>),
                                    'email':
                                    (item => <td className="text-center">{item.pelanggan.email}</td>),
                                    'nama_barang':
                                    (item => <td className="text-center">{item.barang.nama_barang}</td>),
                                    'kuantitas':
                                    (item => <td className="text-center">{item.kuantitas}</td>),
                                    'syarat_pembayaran':
                                    (item => <td className="text-center">{item.syarat_pembayaran.nama}</td>),
                                    'cabang':
                                    (item => <td className="text-center">{item.stok_cabang}</td>),
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
                                                <CButton size="sm" color="info" onClick={() => getDataPesananPenjualanById(item.id, 'view')}>
                                                    View Details
                                                </CButton>
                                                <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPesananPenjualanById(item.id, 'update')}>
                                                    Update
                                                </CButton>
                                                {item.pengiriman_pesanan == null ? 
                                                    <CButton size="sm" color="warning" className="ml-1" onClick={() => postDataPengirimanPesanan(item)}>
                                                        Proses Ke Pengiriman Pesanan
                                                    </CButton> :
                                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => deletePengirimanPesanan(item.pengiriman_pesanan.id_pesanan_penjualan)}>
                                                        Hapus Pengiriman Pesanan
                                                    </CButton>
                                                }
                                                {console.log(item.faktur_penjualan)}
                                                {item.faktur_penjualan == null ?
                                                    <CButton size="sm" color="warning" className="ml-1" onClick={() => postDataFakturPenjualan(item)}>
                                                        Buat Faktur Penjualan
                                                    </CButton> :
                                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => deleteDataFakturPenjualan(item.faktur_penjualan.no_bukti)}>
                                                        Hapus Faktur Penjualan
                                                    </CButton>                                                
                                                }
                                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataPesananPenjualanById(item.id, 'delete')}>
                                                    Delete
                                                </CButton>  
                                                <a href={`${process.env.REACT_APP_LARAVEL_PUBLIC}/laporan/transaksi/pesanan-penjualan/id/${item.id}`} target="_blank">
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
            >
                <CModalHeader closeButton>
                    <CModalTitle>{modalTitle}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CRow>
                            <CCol xs="12" md="12">
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
                                                setCurrentPelanggan({
                                                    ...currentPelanggan, name: values.name
                                                });

                                                setInput({
                                                    ...input, user_id: values.id
                                                });

                                                setRolePelanggan(values.hak_akses);
                                            } else {
                                                setCurrentPelanggan({
                                                    ...currentPelanggan, name: ''
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
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="12">
                                <CFormGroup>
                                    <CLabel htmlFor="input-barang">Nama Barang</CLabel>
                                    <Autocomplete
                                        id="input-barang"
                                        clearOnEscape={true}
                                        options={dataBarang}
                                        getOptionSelected={(option, value) => option.id === value.id}
                                        getOptionLabel={option => option.nama_barang}
                                        value={{ nama_barang: currentNamaBarang.nama_barang }}
                                        onChange={(event, values) => {
                                            if(values !== null) {
                                                setCurrentNamaBarang({
                                                    ...currentNamaBarang, nama_barang: values.nama_barang
                                                });

                                                setInput({
                                                    ...input, id_barang: values.id
                                                });

                                                if(currentUser.hak_akses !== 'administrator' && input.user_id != '') {
                                                    getDataStokBarangById(values.id);
                                                }
                                            } else {
                                                setCurrentNamaBarang({
                                                    ...currentNamaBarang, nama_barang: ''
                                                });

                                                setInput({
                                                    ...input, id_barang: ''
                                                });
                                            }                
                                        }}
                                        renderInput={(params) => 
                                            <TextField {...params} />
                                        }
                                    />                                
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="kuantitas">Jumlah</CLabel>
                                    <CInput type="number" min="1" id="kuantitas" name="kuantitas" value={input.kuantitas} onChange={changeHandler} placeholder="Masukkan Jumlah Barang" />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="satuan">Satuan</CLabel>
                                    <CSelect custom name="satuan" id="satuan" value={input.satuan} onChange={changeHandler} >
                                        <option value="pcs">PCS</option>
                                        <option value="pack">PACK</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="stok-cabang">Pilih Cabang</CLabel>
                                    <CSelect custom name="stok_cabang" id="stok-cabang" value={input.stok_cabang} onChange={changeHandler} >
                                        {
                                            loadDataCabang ? <option value="">Pilih Salah Satu</option> :
                                            <>
                                                <option value="">Pilih Salah Satu</option>
                                                {dataCabang.map(item => (
                                                    <option key={item.id} value={item.nama_cabang}>{item.nama_cabang}</option>
                                                ))}
                                            </>
                                        }
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                {currentUser.hak_akses === 'administrator' ? 
                                    <CFormGroup>
                                        <CLabel htmlFor="role">Role</CLabel>
                                        <CSelect custom name="role" id="role" value={input.role} onChange={changeHandler} >
                                            <option value="">Pilih Salah Satu</option>
                                            <option value="user">Reseller</option>
                                            <option value="reseller">User</option>
                                        </CSelect>
                                    </CFormGroup> : null                             
                                }
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="harga-barang">Harga Barang</CLabel>
                                    <CurrencyFormat thousandSeparator={true} prefix={'Rp.'} customInput={CInput} name="harga-barang" value={currentHargaBarang} placeholder="Harga Barang" disabled={true} />
                                </CFormGroup>
                            </CCol>
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
                        </CRow>

                        <CRow>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="diskon-persen">Diskon Persen</CLabel>
                                    <CInput type="number" min="0" max="100" id="diskon-persen" name="diskon_persen" value={input.diskon_persen} onChange={changeHandler} placeholder="Masukkan Diskon" />
                                    <p className={diskonPersenVisibility} style={{ fontSize: 10, color: 'green' }}>Total harga Rp. {(currentHargaBarang * input.kuantitas) - (currentHargaBarang / 100 * input.diskon_persen)}</p>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="diskon-langsung">Diskon Langsung</CLabel>
                                    <CurrencyFormat min="0" thousandSeparator={true} prefix={'Rp.'} customInput={CInput} name="diskon_langsung" value={input.diskon_langsung} onChange={changeHandler} placeholder="Masukkan Diskon" />
                                    {diskonLangsungVisibility === 'd-block' ? 
                                        <p className={diskonLangsungVisibility} style={{ fontSize: 10, color: 'green' }}>Total harga Rp. {(currentHargaBarang * input.kuantitas) - parseInt(input.diskon_langsung.replace(/[^0-9]+/g, ""))}</p>
                                        : null
                                    }
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
                                <CCol xs="12" md="6">
                                    <CLabel htmlFor="nama_barang">Nama Barang</CLabel>
                                    <CInput type="text" id="nama_barang" name="nama_barang" value={currentPesananPenjualan.barang.nama_barang} placeholder="Nama Barang" disabled={true} />
                                </CCol>
                                <CCol xs="12" md="6">
                                    <CLabel htmlFor="kuantitas">Kuantitas</CLabel>
                                    <CInput type="text" id="kuantitas" name="kuantitas" value={`${currentPesananPenjualan.kuantitas} ${currentPesananPenjualan.satuan}`} placeholder="Jumlah Barang" disabled={true} />
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