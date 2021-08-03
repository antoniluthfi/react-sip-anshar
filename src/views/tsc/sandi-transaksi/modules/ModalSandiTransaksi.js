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

const ModalSandiTransaksi = (props) => {
  const {
    success,
    color,
    buttonSubmitName,
    buttonVisibility,
    modalTitle,
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
                <CLabel htmlFor="nama_transaksi">Nama Sandi Transaksi</CLabel>
                <CInput
                  type="text"
                  id="nama_transaksi"
                  name="nama_transaksi"
                  value={input.nama_transaksi}
                  onChange={changeHandler}
                  placeholder="Masukkan Nama Sandi Transaksi"
                  disabled={formDisabled}
                />
              </CFormGroup>
            </CCol>

            <CCol xs="12" lg="6">
              <CFormGroup>
                <CLabel htmlFor="jenis">Jenis Transaksi</CLabel>
                <CSelect
                  custom
                  name="jenis_transaksi"
                  id="jenis_transaksi"
                  value={input.jenis_transaksi}
                  onChange={changeHandler}
                  disabled={formDisabled}
                >
                  <option value="">Pilih Salah Satu</option>
                  <option value="0">Keluar</option>
                  <option value="1">Masuk</option>
                </CSelect>
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

export default ModalSandiTransaksi;
