import React from 'react';
import {
    CCol,
    CRow,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CLabel,
    CInput,
    CModalFooter,
} from '@coreui/react';  
import moment from 'moment';

const ModalView = (props) => {
    const {
        info,
        currentDataFaktur,
        loadCurrentDataFaktur,
        closeModalHandler,
    } = props;

    return (
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
    )
}

export default ModalView;