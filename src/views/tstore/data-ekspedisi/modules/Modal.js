import React from 'react';
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
        closeModalHandler,
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
                        <CCol xs="12" md="12">
                            <CFormGroup>
                                <CLabel htmlFor="nama">Nama Ekspedisi</CLabel>
                                <CInput type="text" name="nama_ekspedisi" id="nama" value={input.nama_ekspedisi} onChange={changeHandler} placeholder="Masukkan Nama Ekspedisi" disabled={formDisabled} />
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