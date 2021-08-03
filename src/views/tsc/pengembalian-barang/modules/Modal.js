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
    formDisabled,
    input,
    closeModalHandler,
    changeHandler,
    submitHandler,
    view,
    dataSandi,
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
                    <CLabel htmlFor="no_pengembalian">No Pengembalian</CLabel>
                    <CInput
                      type="text"
                      id="no_pengembalian"
                      name="no_pengembalian"
                      value={input.no_pengembalian}
                      placeholder="Nomor Pengembalian"
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
                <CLabel htmlFor="status_pengembalian">
                  Status Pengembalian
                </CLabel>
                <CSelect
                  custom
                  name="status_pengembalian"
                  id="status_pengembalian"
                  value={input.status_pengembalian}
                  onChange={changeHandler}
                  disabled={formDisabled}
                >
                  <option value="">Pilih Salah Satu</option>
                  <option value="1">Dikembalikan</option>
                  <option value="0">Belum Dikembalikan</option>
                </CSelect>
              </CFormGroup>
            </CCol>

            <CCol xs="12" md="6">
              <CFormGroup>
                <CLabel htmlFor="id_sandi_transaksi">Sandi Transaksi</CLabel>
                <CSelect
                  custom
                  name="id_sandi_transaksi"
                  id="id_sandi_transaksi"
                  value={input.id_sandi_transaksi}
                  onChange={changeHandler}
                  disabled={formDisabled}
                >
                  <option value="">Pilih Salah Satu</option>
                  {dataSandi.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nama_transaksi}
                    </option>
                  ))}
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

export default Modal;
