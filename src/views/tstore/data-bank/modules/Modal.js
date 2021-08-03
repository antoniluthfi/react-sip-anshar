import React from 'react';
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CModalFooter,
    CButton,
    CCol,
    CRow,
} from '@coreui/react';

const Modal = (props) => {
    const {
        success,
        modalTitle,
        buttonSubmitName,
        formDisabled,
        color,
        input,      
        changeHandler,
        submitHandler,
        closeModalHandler     
    } = props;

    return (
        <CModal 
            show={success} 
            onClose={closeModalHandler}
            color={color}
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
                                <CLabel htmlFor="nama-bank">Nama Bank</CLabel>
                                <CInput type="text" name="nama_bank" id="nama-bank" value={input.nama_bank} onChange={changeHandler} placeholder="Masukkan Nama Bank" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>
                        <CCol xs="12" md="6">
                            <CFormGroup>
                                <CLabel htmlFor="norekening">Nomor Rekening</CLabel>
                                <CInput type="text" name="norekening" id="norekening" value={input.norekening} onChange={changeHandler} placeholder="Masukkan Nomor Rekening" disabled={formDisabled} />
                            </CFormGroup>
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="success" onClick={() => submitHandler(buttonSubmitName.toLowerCase())}>{buttonSubmitName}</CButton>{' '}
                <CButton color="secondary" onClick={closeModalHandler}>Cancel</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default Modal;