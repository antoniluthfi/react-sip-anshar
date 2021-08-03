import React from "react";
import CurrencyFormat from "react-currency-format";
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
    sandiTransaksi,
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
                <CLabel htmlFor="nominal">Nominal</CLabel>
                <CurrencyFormat
                  type="text"
                  id="nominal"
                  name="nominal"
                  value={input.nominal}
                  thousandSeparator={true}
                  prefix={"Rp. "}
                  onChange={changeHandler}
                  customInput={CInput}
                  placeholder="Masukkan Nominal"
                  disabled={formDisabled}
                />
              </CFormGroup>
            </CCol>

            <CCol xs="12" md="6">
              <CFormGroup>
                <CLabel htmlFor="total_biaya">Total Biaya</CLabel>
                <CurrencyFormat
                  type="text"
                  id="total_biaya"
                  name="total_biaya"
                  value={input.total_biaya}
                  thousandSeparator={true}
                  prefix={"Rp. "}
                  onChange={changeHandler}
                  customInput={CInput}
                  placeholder="Masukkan Total Biaya"
                  disabled={formDisabled}
                />
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="12" md="12">
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
                  {sandiTransaksi.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nama_transaksi}
                    </option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="12" md="12">
              <CFormGroup>
                <CLabel htmlFor="keterangan">Keterangan</CLabel>
                <CTextarea
                  name="keterangan"
                  id="keterangan"
                  value={input.keterangan}
                  onChange={changeHandler}
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
