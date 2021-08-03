import React from 'react';
import CurrencyFormat from 'react-currency-format';
import {
    CCol,
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
    CSelect
} from '@coreui/react';  


const Modal = (props) => {
    const {
        success, 
        dataBank,
        loadDataBank,
        currentDataFaktur,
        loadCurrentDataFaktur,
        bankVisibility,
        terhutangVisibility,
        nominalVisibility,
        buttonSubmitName,
        input, 
        changeHandler,
        closeModalHandler,
        submitHandler,
    } = props;

    return (
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
    )
}

export default Modal;