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
  CTextarea,
} from "@coreui/react";

const Modal = (props) => {
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
    view,
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
          {view ? (
            <>
              <CRow>
                <CCol xs="12" md="6">
                  <CFormGroup>
                    <CLabel htmlFor="no_pengerjaan">No Pengerjaan</CLabel>
                    <CInput
                      type="text"
                      id="no_pengerjaan"
                      name="no_pengerjaan"
                      value={input.no_pengerjaan}
                      placeholder="Nomor Pengerjaan"
                      disabled
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" md="6">
                  <CFormGroup>
                    <CLabel htmlFor="no_serivice">No Service</CLabel>
                    <CInput
                      type="text"
                      id="no_serivice"
                      name="no_serivice"
                      value={input.no_service}
                      placeholder="Nomor Service"
                      disabled
                    />
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12" md="6">
                  <CFormGroup>
                    <CLabel htmlFor="customer">Nama Pelanggan</CLabel>
                    <CInput
                      type="text"
                      id="customer"
                      name="customer"
                      value={input.customer}
                      placeholder="Nama Pelanggan"
                      disabled
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" md="6">
                  <CFormGroup>
                    <CLabel htmlFor="barang_jasa">Barang Jasa</CLabel>
                    <CInput
                      type="text"
                      id="barang_jasa"
                      name="barang_jasa"
                      value={input.barang_jasa}
                      placeholder="Barang Jasa"
                      disabled
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
            </>
          ) : null}

          <CRow>
            <CCol xs="12" md="6">
              <CFormGroup>
                <CLabel htmlFor="progress">Progress %</CLabel>
                <CInput
                  type="number"
                  min="0"
                  max="100"
                  id="progress"
                  name="progress"
                  value={input.progress}
                  onChange={changeHandler}
                  placeholder="Masukkan Progres Pengerjaan"
                  disabled={formDisabled}
                />
              </CFormGroup>
            </CCol>

            <CCol xs="12" md="6">
              <CFormGroup>
                <CLabel htmlFor="nominal">Biaya Servis</CLabel>
                <CInput
                  type="number"
                  min="0"
                  id="nominal"
                  name="nominal"
                  value={input.nominal}
                  onChange={changeHandler}
                  placeholder="Masukkan Biaya Servis"
                  disabled={formDisabled}
                />
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="12" md="12">
              <CFormGroup>
                <CLabel htmlFor="keterangan">Keterangan</CLabel>
                <CTextarea
                  type="text"
                  id="keterangan"
                  name="keterangan"
                  value={input.keterangan}
                  onChange={changeHandler}
                  placeholder="Masukkan Keterangan"
                  disabled={formDisabled}
                ></CTextarea>
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
