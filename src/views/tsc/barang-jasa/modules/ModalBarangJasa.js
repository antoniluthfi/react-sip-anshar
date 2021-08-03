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

const ModalBarangJasa = (props) => {
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
                <CLabel htmlFor="nama">Nama Barang Jasa</CLabel>
                <CInput
                  type="text"
                  id="nama"
                  name="nama"
                  value={input.nama}
                  onChange={changeHandler}
                  placeholder="Masukkan Nama Barang Jasa"
                  disabled={formDisabled}
                />
              </CFormGroup>
            </CCol>

            <CCol xs="12" lg="6">
              <CFormGroup>
                <CLabel htmlFor="jenis">Jenis Barang Jasa</CLabel>
                <CSelect
                  custom
                  name="jenis"
                  id="jenis"
                  value={input.jenis}
                  onChange={changeHandler}
                  disabled={formDisabled}
                >
                  <option value="">Pilih Salah Satu</option>
                  <option value="Barang">Barang</option>
                  <option value="Jasa">Jasa</option>
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

export default ModalBarangJasa;
