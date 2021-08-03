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
  CLabel,
  CInput,
  CModalFooter,
} from "@coreui/react";

const Modal = (props) => {
  const {
    success,
    input,
    modalTitle,
    buttonSubmitName,
    buttonVisibility,
    color,
    changeHandler,
    closeModalHandler,
    submitHandler,
  } = props;

  return (
    <CModal
      show={success}
      onClose={() => closeModalHandler(buttonSubmitName.toLowerCase())}
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
              <CLabel htmlFor="kategori">Kategori</CLabel>
              <CInput
                type="text"
                name="nama_kategori"
                id="kategori"
                value={input.nama_kategori}
                onChange={changeHandler}
                placeholder="Masukkan Kategori"
              />
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
          onClick={() =>
            closeModalHandler(buttonSubmitName.toLocaleLowerCase())
          }
        >
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default Modal;
