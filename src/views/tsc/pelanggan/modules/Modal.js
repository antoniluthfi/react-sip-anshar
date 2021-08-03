import React from "react";
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
  CSelect,
} from "@coreui/react";

const Modal = (props) => {
  const {
    success,
    color,
    buttonSubmitName,
    buttonVisibility,
    modalTitle,
    dataCabang,
    loadDataCabang,
    formDisabled,
    input,
    closeModalHandler,
    changeHandler,
    submitHandler,
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
                <CLabel htmlFor="name">Nama</CLabel>
                <CInput
                  type="text"
                  id="name"
                  name="name"
                  value={input.name}
                  onChange={changeHandler}
                  placeholder="Masukkan Nama"
                  disabled={formDisabled}
                />
              </CFormGroup>
            </CCol>
            <CCol xs="12" md="6">
              <CFormGroup>
                <CLabel htmlFor="alamat">Alamat</CLabel>
                <CInput
                  type="text"
                  id="alamat"
                  name="alamat"
                  value={input.alamat}
                  onChange={changeHandler}
                  placeholder="Masukkan Alamat"
                  disabled={formDisabled}
                />
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="12" lg="6">
              <CFormGroup>
                <CLabel htmlFor="email">Email</CLabel>
                <CInput
                  type="email"
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={changeHandler}
                  placeholder="Masukkan Email"
                  disabled={formDisabled}
                />
              </CFormGroup>
            </CCol>
            <CCol xs="12" lg="6">
              <CFormGroup>
                <CLabel htmlFor="nomorhp">Nomor HP</CLabel>
                <CInput
                  type="text"
                  id="nomorhp"
                  name="nomorhp"
                  value={input.nomorhp}
                  onChange={changeHandler}
                  placeholder="Masukkan Nomor HP"
                  disabled={formDisabled}
                />
              </CFormGroup>
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="success"
          className={buttonVisibility}
          onClick={() => submitHandler(buttonSubmitName.toLocaleLowerCase())}
        >
          {buttonSubmitName}
        </CButton>{" "}
        <CButton
          color="secondary"
          className={buttonVisibility}
          onClick={closeModalHandler}
        >
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default Modal;
