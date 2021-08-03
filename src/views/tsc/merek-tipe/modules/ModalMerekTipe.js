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

const ModalMerekTipe = (props) => {
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
    barangJasa,
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
                <CLabel htmlFor="nama">Nama</CLabel>
                <CInput
                  type="text"
                  id="nama"
                  name="nama"
                  value={input.nama}
                  onChange={changeHandler}
                  placeholder="Masukkan Nama"
                  disabled={formDisabled}
                />
              </CFormGroup>
            </CCol>

            <CCol xs="12" lg="6">
              <CFormGroup>
                <CLabel htmlFor="kategori">Kategori</CLabel>
                <CSelect
                  custom
                  name="id_barang_jasa"
                  id="kategori"
                  value={input.id_barang_jasa}
                  onChange={changeHandler}
                  disabled={formDisabled}
                >
                  {barangJasa.length === 0 ? (
                    <option value="">Pilih Salah Satu</option>
                  ) : (
                    <>
                      <option value="">Pilih Salah Satu</option>
                      {barangJasa.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.nama}
                        </option>
                      ))}
                    </>
                  )}
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

export default ModalMerekTipe;
