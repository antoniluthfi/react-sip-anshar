import React, { useEffect } from 'react';
import FakturPenjualanHelper from './modules/FakturPenjualanHelper';
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
    CSelect
} from '@coreui/react';  
import moment from 'moment';

const FakturPenjualan = () => {
    const {
        fields,
        success, 
        info,
        dataFaktur, 
        loadDataFaktur,
        dataBank,
        loadDataBank,
        currentDataFaktur,
        loadCurrentDataFaktur,
        bankVisibility,
        terhutangVisibility,
        nominalVisibility,
        buttonSubmitName,
        input, 
        details,
        toggleDetails,
        changeHandler,
        closeModalHandler,
        submitHandler,
        getCurrentUser,
        getDataFakturPenjualanById,
        getDataBank,
    } = FakturPenjualanHelper();

    useEffect(() => {
        getCurrentUser();
        getDataBank();
    }, [])

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Faktur Penjualan</CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={dataFaktur}
                                fields={fields}
                                striped
                                sorter
                                hover
                                tableFilter
                                noItemsView={loadDataFaktur ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
                                loading={loadDataFaktur}    
                                itemsPerPageSelect
                                itemsPerPage={5}
                                pagination
                                scopedSlots = {{
                                    'id':
                                    ((item, i) => <td className="text-center">{i + 1}</td>),
                                    'name': 
                                    (item => (
                                        <td className="text-center">
                                            {item.user.name}
                                        </td>
                                    )),
                                    'kode_pesanan':
                                    (item => (
                                        <td className="text-center">
                                            {item.kode_pesanan}
                                        </td>
                                    )),
                                    'created_at':
                                    (item => (
                                        <td className="text-center">
                                            {moment(item.created_at).format('L')}
                                        </td>
                                    )),
                                    'metode_pembayaran':
                                    (item => (
                                        <td className="text-center">
                                            {item.metode_pembayaran}
                                        </td>
                                    )),
                                    'bank':
                                    (item => (
                                        <td className="text-center">
                                            {item.id_bank == null ? null : item.bank.nama_bank}
                                        </td>
                                    )),
                                    'nominal': 
                                    (item => (
                                        <td className="text-right">
                                            {item.nominal == null ? '' : `Rp. ${new Intl.NumberFormat(['ban', 'id']).format(item.nominal)}`}
                                        </td>
                                    )),
                                    'terhutang': 
                                    (item => (
                                        <td className="text-right">
                                            {item.terhutang == null ? '' : `Rp. ${new Intl.NumberFormat(['ban', 'id']).format(item.terhutang)}`}
                                        </td>
                                    )),
                                    'total_biaya': 
                                    (item => (
                                        <td className="text-right">
                                            Rp. {new Intl.NumberFormat(['ban', 'id']).format(item.pesanan_penjualan.total_harga)}
                                        </td>
                                    )),
                                    'status':
                                    (item => (
                                        <td className="text-center">
                                            {item.nominal < item.pesanan_penjualan.total_harga ? 'Belum Lunas' : 'Lunas'}
                                        </td>
                                    )),
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
                                                <CButton size="sm" color="info" onClick={() => getDataFakturPenjualanById(item.no_faktur, 'view')}>
                                                    View Details
                                                </CButton>
                                                {!item.nominal ?
                                                    <CButton size="sm" color="success" className="ml-1" onClick={() => getDataFakturPenjualanById(item.no_faktur, 'update')}>
                                                        Update
                                                    </CButton> : item.terhutang !== 0 ?
                                                    <CButton size="sm" color="warning" className="ml-1" onClick={() => getDataFakturPenjualanById(item.no_faktur, 'lunasi')}>
                                                        Bayar Sisa
                                                    </CButton>                                                
                                                    : null                                               
                                                }
                                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataFakturPenjualanById(item.no_faktur, 'delete')}>
                                                    Delete
                                                </CButton>   
                                                {!item.nominal ? null :
                                                    <a href={`${process.env.REACT_APP_LARAVEL_PUBLIC}/laporan/transaksi/faktur-penjualan/id/${item.no_faktur}`} target="_blank" rel="noreferrer">
                                                        <CButton size="sm" color="warning" className="ml-1">
                                                            Cetak Laporan
                                                        </CButton>
                                                    </a>                                                          
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
                onClose={() => closeModalHandler('update')}
                color="success"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Update Data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="metode-pembayaran">Pilih Metode Pembayaran</CLabel>
                                    <CSelect custom name="metode_pembayaran" id="metode-pembayaran" value={input.metode_pembayaran} onChange={changeHandler} >
                                        <option value="">Pilih Salah Satu</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Transfer">Transfer</option>
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup className={bankVisibility}>
                                    <CLabel htmlFor="bank">Pilih Bank</CLabel>
                                    <CSelect custom name="id_bank" id="bank" value={input.id_bank} onChange={changeHandler} >
                                        {
                                            loadDataBank ? <option value="">Pilih Salah Satu</option> :
                                            <>
                                                <option value="">Pilih Salah Satu</option>
                                                {dataBank.map(item => (
                                                    <option key={item.id} value={item.id}>{item.nama_bank}</option>
                                                ))}
                                            </>
                                        }
                                    </CSelect>
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="6">
                                <CLabel htmlFor="dp">Pilih Metode Pelunasan</CLabel>
                                <CSelect custom name="dp" id="dp" value={input.dp} onChange={changeHandler} >
                                    <option value="">Pilih Salah Satu</option>
                                    <option value="JT">JT</option>
                                    <option value="Lunas">Lunas</option>
                                </CSelect>
                            </CCol>
                        </CRow>

                        <CRow className="mt-3">
                            <CCol xs="12" md="12" className={nominalVisibility}>
                                <CLabel htmlFor="nominal">Nominal</CLabel>
                                <CurrencyFormat type="text" name="nominal" value={input.nominal} thousandSeparator={true} prefix={'Rp. '} onChange={changeHandler} customInput={CInput} placeholder="Masukkan Nominal" />
                                {buttonSubmitName === 'update' ? 
                                    <p className={terhutangVisibility} style={{ fontSize: 10, color: 'green' }}>{loadCurrentDataFaktur ? null : `Terhutang Rp. ${parseInt(currentDataFaktur.pesanan_penjualan.total_harga) - parseInt(input.nominal.replace(/[^0-9]+/g, ""))}`}</p>
                                    : <p className={terhutangVisibility} style={{ fontSize: 10, color: 'green' }}>{loadCurrentDataFaktur ? null : `Terhutang Rp. ${parseInt(currentDataFaktur.terhutang) - parseInt(input.nominal.replace(/[^0-9]+/g, ""))}`}</p>
                                }
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={() => submitHandler('update')}>Update</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('update')}>Cancel</CButton>
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
                    <CModalTitle>Data Faktur Penjualan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {loadCurrentDataFaktur ? null : 
                        <>
                            <CRow>
                                <CCol xs="12" md="6">
                                    <CLabel htmlFor="no-bukti">Nomor Faktur</CLabel>
                                    <CInput type="text" name="no_bukti" id="no-bukti" value={currentDataFaktur.no_faktur} placeholder="Nomor Faktur" disabled={true} />
                                </CCol>
                                <CCol xs="12" md="6">
                                    <CLabel htmlFor="tgl-bayar">Tanggal Bayar</CLabel>
                                    <CInput type="text" name="tgl_bayar" id="tgl-bayar" value={moment(currentDataFaktur.created_at).format('L')} placeholder="Tanggal Bayar" disabled={true} />
                                </CCol>
                            </CRow>

                            <CRow className="mt-2">
                                <CCol xs="12" md="6">
                                    <CLabel htmlFor="nama_pelanggan">Nama Pelanggan</CLabel>
                                    <CInput type="text" id="nama_pelanggan" name="nama_pelanggan" value={currentDataFaktur.user.name} placeholder="Nama Pelanggan" disabled={true} />
                                </CCol>
                                <CCol xs="12" md="6">
                                    <CLabel htmlFor="bank">Bank</CLabel>
                                    <CInput type="text" id="bank" name="bank" value={!currentDataFaktur.bank ? '-' : currentDataFaktur.bank.nama_bank} placeholder="Bank" disabled={true} />
                                </CCol>
                            </CRow>

                            <CRow className="mt-2">
                                <CCol xs="12" md="6">
                                    <CLabel htmlFor="total_faktur">Total Faktur</CLabel>
                                    <CInput type="text" name="total_faktur" id="total_faktur" value={!currentDataFaktur.nominal ? null : `Rp. ${new Intl.NumberFormat(['ban', 'id']).format(currentDataFaktur.nominal)}`} placeholder="Total Faktur" disabled={true} />
                                </CCol>
                                <CCol xs="12" md="6">
                                    <CLabel htmlFor="terhutang">Terhutang</CLabel>
                                    <CInput type="text" name="terhutang" id="terhutang" value={!currentDataFaktur.terhutang ? null : `Rp. ${new Intl.NumberFormat(['ban', 'id']).format(currentDataFaktur.terhutang)}`} placeholder="Terhutang" disabled={true} />
                                </CCol>
                            </CRow>

                            <CRow className="mt-2">
                                <CCol xs="12" md="6">
                                    <CLabel htmlFor="total_harga">Total Harga</CLabel>
                                    <CInput type="text" name="total_harga" id="total_harga" value={`Rp. ${new Intl.NumberFormat(['ban', 'id']).format(currentDataFaktur.pesanan_penjualan.total_harga)}`} placeholder="Total Harga" disabled={true} />
                                </CCol>
                                <CCol xs="12" md="6">
                                    <CLabel htmlFor="penjual">Penjual</CLabel>
                                    <CInput type="text" id="penjual" name="penjual" value={currentDataFaktur.marketing.name} placeholder="Nama Penjual" disabled={true} />
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

export default FakturPenjualan;