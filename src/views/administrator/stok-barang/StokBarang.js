import React, { useEffect } from 'react';
import StokBarangHelper from './modules/StokBarangHelper';
import CurrencyFormat from 'react-currency-format';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
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
    CSelect
} from '@coreui/react';  

const StokBarang = () => {
    const {
        fields,
        success, setSuccess,
        info,
        openModalPaket,
        dataBarang,
        loadDataBarang,
        currentUser,
        dataKategoriBarang,
        loadDataKategoriBarang,
        dataBarangNonPaket,
        input,
        inputPaket, setInputPaket,
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
        addPaketHandler,
        removePaketHandler,
        getCurrentUser,
        getStokBarangById,
        getDataKategoriBarang,
        getDataBarangNonPaket
    } = StokBarangHelper();

    useEffect(() => {
        getCurrentUser();
        getDataKategoriBarang();
        getDataBarangNonPaket();
    }, []);

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Stok Barang</CCardHeader>
                        <CRow>
                            <CCol xs="6" md="6">
                                {currentUser.hak_akses === 'administrator' || currentUser.hak_akses === 'admin gudang' ?
                                    <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                                    : null
                                }
                                <a href={`${process.env.REACT_APP_LARAVEL_PUBLIC}/laporan/barang/stok-barang`} target="_blank" rel="noreferrer">
                                    <CButton color="warning" className={currentUser.hak_akses === 'administrator' ? 'ml-1 mt-2' : 'ml-3 mt-2'}>
                                        Cetak Laporan
                                    </CButton>
                                </a>
                            </CCol> 
                        </CRow>                      
                        <CCardBody>
                            <CDataTable
                                items={dataBarang}
                                fields={fields}
                                striped
                                sorter
                                hover
                                tableFilter
                                noItemsView={loadDataBarang ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
                                loading={loadDataBarang}    
                                itemsPerPageSelect
                                itemsPerPage={5}
                                pagination
                                scopedSlots = {{
                                    'id':
                                    ((item, i) => (
                                        <td className="text-center">{i + 1}</td>
                                    )),
                                    'harga_user':
                                    (item => (
                                        <td className="text-right">
                                            Rp. {new Intl.NumberFormat(['ban', 'id']).format(item.harga_user)}
                                        </td>
                                    )),
                                    'harga_reseller':
                                    (item => (
                                        <td className="text-right">
                                            Rp. {new Intl.NumberFormat(['ban', 'id']).format(item.harga_reseller)}
                                        </td>
                                    )),
                                    'bjb':
                                    (item => <td className="text-center">{item.bjb}</td>),
                                    'lnu':
                                    (item => <td className="text-center">{item.lnu}</td>),
                                    'bjm':
                                    (item => <td className="text-center">{item.bjm}</td>),
                                    'tdc':
                                    (item => <td className="text-center">{item.tdc}</td>),
                                    'total_pack':
                                    (item => <td className="text-center">{item.total_pack}</td>),
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
                                        (item, index)=>{
                                        return (
                                        <CCollapse show={details.includes(index)}>
                                            <CCardBody>
                                                <CButton size="sm" color="info" onClick={() => getStokBarangById(item.id, 'view')}>
                                                    View Details
                                                </CButton>
                                                {currentUser.hak_akses === 'administrator' || currentUser.hak_akses === 'admin gudang' ?
                                                    <>
                                                        <CButton size="sm" color="success" className="ml-1" onClick={() => getStokBarangById(item.id, 'update')}>
                                                            Update
                                                        </CButton>
                                                        {item.paket == 0 ? null : 
                                                            item.paket_barang == null ? 
                                                            <CButton size="sm" color="warning" className="ml-1" onClick={() => getStokBarangById(item.id, 'paket')}>
                                                                Buat Paket
                                                            </CButton> : 
                                                            <CButton size="sm" color="warning" className="ml-1" onClick={() => getStokBarangById(item.id, 'deletePaket')}>
                                                                Delete Paket
                                                            </CButton>                                                   
                                                        }
                                                        <CButton size="sm" color="danger" className="ml-1" onClick={() => getStokBarangById(item.id, 'delete')}>
                                                            Delete
                                                        </CButton>      
                                                    </> : null                                
                                                }
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
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="nama-barang">Nama Barang</CLabel>
                                    <CInput type="text" id="nama-barang" name="nama_barang" value={input.nama_barang} onChange={changeHandler} placeholder="Masukkan Nama Barang" />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="kategori">Kategori</CLabel>
                                    <CSelect custom name="kategori" id="kategori" value={input.kategori} onChange={changeHandler} >
                                        {
                                            loadDataKategoriBarang ? <option value="">Pilih Salah Satu</option> :
                                            <>
                                            <option value="">Pilih Salah Satu</option>
                                            {dataKategoriBarang.map(item => (
                                                <option key={item.id} value={item.nama_kategori}>{item.nama_kategori}</option>
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
                                    <CLabel htmlFor="harga_user">Harga User</CLabel>
                                    <CurrencyFormat type="text" name="harga_user" id="harga_user" value={input.harga_user} onChange={changeHandler} thousandSeparator={true} prefix={'Rp. '} customInput={CInput} placeholder="Masukkan Harga User" />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="harga_reseller">Harga Reseller</CLabel>
                                    <CurrencyFormat type="text" name="harga_reseller" id="harga_reseller" value={input.harga_reseller} onChange={changeHandler} thousandSeparator={true} prefix={'Rp. '} customInput={CInput} placeholder="Masukkan Harga Reseller" />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="bjb">Stok Banjarbaru</CLabel>
                                    <CInput type="number" id="bjb" name="bjb" min="0" value={input.bjb} onChange={changeHandler} placeholder="Masukkan Stok Banjarbaru" />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="bjm">Stok Banjarmasin</CLabel>
                                    <CInput type="number" id="bjm" name="bjm" min="0" value={input.bjm} onChange={changeHandler} placeholder="Masukkan Stok Banjarmasin" />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="lnu">Stok Landasan Ulin</CLabel>
                                    <CInput type="number" id="lnu" name="lnu" min="0" value={input.lnu} onChange={changeHandler} placeholder="Masukkan Stok Landasan Ulin" />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="tdc">Stok TDC</CLabel>
                                    <CInput type="number" id="tdc" name="tdc" min="0" value={input.tdc} onChange={changeHandler} placeholder="Masukkan Stok TDC" />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="total_pack">Total PCS Dalam 1 Pack</CLabel>
                                    <CInput type="number" id="total_pack" min="0" name="total_pack" value={input.total_pack} onChange={changeHandler} placeholder="Masukkan Total PCS Dalam 1 Pack" />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="paket">Paket</CLabel>
                                    <CSelect custom name="paket" id="paket" value={input.paket} onChange={changeHandler} >
                                        <option value="">Pilih Salah Satu</option>
                                        <option value="0">Tidak</option>
                                        <option value="1">Ya</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={() => submitHandler(buttonSubmitName.toLowerCase())}>{buttonSubmitName}</CButton>{' '}
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
                    <CModalTitle>{modalTitle}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {loadCurrentStokBarang ? null :
                        <>
                            <CRow>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="nama-barang">Nama Barang</CLabel>
                                        <CInput type="text" id="nama-barang" name="nama_barang" value={currentStokBarang.nama_barang} onChange={changeHandler} placeholder="Masukkan Nama Barang" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="12" md="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="kategori">Kategori</CLabel>
                                        <CInput type="text" id="kategori" name="kategori" value={currentStokBarang.kategori} onChange={changeHandler} placeholder="Masukkan Kategori" disabled={true} />
                                    </CFormGroup>                                
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol xs="12" lg="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="harga_user">Harga User</CLabel>
                                        <CurrencyFormat type="text" name="harga_user" value={currentStokBarang.harga_user} thousandSeparator={true} prefix={'Rp. '} customInput={CInput} placeholder="Masukkan Harga User" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                                <CCol xs="12" lg="6">
                                    <CFormGroup>
                                        <CLabel htmlFor="harga_reseller">Harga Reseller</CLabel>
                                        <CurrencyFormat type="text" name="harga_reseller" value={currentStokBarang.harga_reseller} thousandSeparator={true} prefix={'Rp. '} customInput={CInput} placeholder="Masukkan Harga Reseller" disabled={true} />
                                    </CFormGroup>
                                </CCol>
                            </CRow>

                            <CRow>
                                <CCol xs="12" md="12">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="text-center">Stok</th>
                                                <th className="text-center">Jumlah</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Banjarbaru</td>
                                                <td className="text-center">{currentStokBarang.bjb}</td>
                                            </tr>
                                            <tr>
                                                <td>Banjarmasin</td>
                                                <td className="text-center">{currentStokBarang.bjm}</td>
                                            </tr>
                                            <tr>
                                                <td>Landasan Ulin</td>
                                                <td className="text-center">{currentStokBarang.lnu}</td>
                                            </tr>
                                            <tr>
                                                <td>Twincom Distribution Center</td>
                                                <td className="text-center">{currentStokBarang.tdc}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </CCol>
                            </CRow>

                            {currentStokBarang.paket === 0 ? null : 
                                <>
                                <CLabel>Satu paket dengan : </CLabel>
                                <CRow>
                                    <CCol xs="12" md="12">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">No</th>
                                                    <th className="text-center">Nama Barang</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentStokBarang.paket_barang.length == 0 ? 
                                                    <tr>
                                                        <td className="text-center" colSpan="2">Belum ada data</td>
                                                    </tr> :
                                                    currentStokBarang.paket_barang.map((item, i) => (
                                                        <tr>
                                                            <td className="text-center">{i + 1}</td>
                                                            <td className="text-center">{item.paket.nama_barang}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </CCol>
                                </CRow>  
                                </>                          
                            }
                        </>
                    }
                </CModalBody>
                <CModalFooter></CModalFooter>
            </CModal>

            {/* buat paket */}
            <CModal 
                show={openModalPaket} 
                onClose={() => closeModalHandler('paket')}
                color="warning"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Buat Paket</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CRow>
                        <CCol xs="12" md="12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <td className="text-center" style={{ width: '10%' }}>No</td>
                                        <td className="text-center">Nama Barang</td>
                                        <td className="text-center" style={{ width: '15%' }}>
                                            <CButton color="warning" onClick={addPaketHandler}>
                                                <FontAwesomeIcon icon={faPlusCircle} />
                                            </CButton>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inputPaket.map((item, i) => (
                                        <tr key={i}>
                                            <td className="text-center">{i + 1}</td>
                                            <td>
                                                <Autocomplete
                                                    id={`input-barang${i}`}
                                                    clearOnEscape={true}
                                                    options={dataBarangNonPaket}
                                                    getOptionSelected={(option, value) => option.id === value.id}
                                                    getOptionLabel={option => option.nama_barang}
                                                    value={{ nama_barang: currentPaket[i].nama_barang }}
                                                    onChange={(event, values) => {
                                                        if(values !== null) {
                                                            let a = [...currentPaket];
                                                            a[i].nama_barang = values.nama_barang;
                                                            setCurrentPaket(a);

                                                            let paket = [...inputPaket];
                                                            paket[i].id_paket = currentStokBarang.id;
                                                            paket[i].id_barang = values.id;
                                                            setInputPaket(paket);
                                                        } else {
                                                            let a = [...currentPaket];
                                                            a[i].nama_barang = '';
                                                            setCurrentPaket(a);

                                                            let paket = [...inputPaket];
                                                            paket[i].id_paket = '';
                                                            paket[i].id_barang = '';
                                                            setInputPaket(paket);
                                                        }                
                                                    }}
                                                    renderInput={(params) => 
                                                        <TextField {...params} />
                                                    }
                                                />                                
                                            </td>
                                            <td className="text-center">
                                                <CButton color="danger" onClick={() => removePaketHandler(i)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </CButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </CCol>
                    </CRow>
                </CModalBody>
                <CModalFooter>
                    <CButton color="warning" onClick={() => submitHandler('paket')}>Submit</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('paket')}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default StokBarang;