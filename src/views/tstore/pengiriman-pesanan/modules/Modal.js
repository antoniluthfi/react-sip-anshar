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
  CTextarea,
} from "@coreui/react";

const Modal = (props) => {
  const {
    success,
    dataEkspedisi,
    dataProvinsi,
    dataKota,
    dataOngkir,
    input,
    changeHandler,
    submitHandler,
    closeModalHandler,
    getDataKota,
    getDataOngkir,
  } = props;

  return (
    <CModal
      show={success}
      onClose={() => closeModalHandler("update")}
      color="success"
      closeOnBackdrop={false}
    >
      <CModalHeader closeButton>
        <CModalTitle>Update Data</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm action="" method="post">
          <CRow>
            <CCol xs="12" md="6">
              <CLabel htmlFor="tanggal-pengiriman">Tanggal Pengiriman</CLabel>
              <CInput
                type="date"
                name="tanggal_pengiriman"
                id="tanggal-pengiriman"
                value={input.tanggal_pengiriman}
                onChange={changeHandler}
                placeholder="Pilih Tanggal Pengiriman"
              />
            </CCol>
            <CCol xs="12" md="6">
              <CLabel htmlFor="provinsi">Provinsi Tujuan</CLabel>
              <CSelect
                custom
                name="provinsi"
                id="provinsi"
                value={input.provinsi}
                onChange={(e) => {
                  changeHandler(e);
                  getDataKota(e.target.value);

                  if (e.target.value && input.kota && input.ekspedisi) {
                    getDataOngkir();
                  }
                }}
              >
                {dataProvinsi.length === 0 ? (
                  <option value="">Pilih Salah Satu</option>
                ) : (
                  <>
                    <option value="">Pilih Salah Satu</option>
                    {dataProvinsi.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nama_provinsi}
                      </option>
                    ))}
                  </>
                )}
              </CSelect>
            </CCol>
          </CRow>

          <CRow className="mt-2">
            <CCol xs="12" md="6">
              <CLabel htmlFor="kota">Kota Tujuan</CLabel>
              <CSelect
                custom
                name="kota"
                id="kota"
                value={input.kota}
                onChange={changeHandler}
              >
                {dataKota.length === 0 ? (
                  <option value="">Pilih Salah Satu</option>
                ) : (
                  <>
                    <option value="">Pilih Salah Satu</option>
                    {dataKota.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nama_kota}
                      </option>
                    ))}
                  </>
                )}
              </CSelect>
            </CCol>
            <CCol xs="12" md="6">
              <CLabel htmlFor="ekspedisi">Ekspedisi</CLabel>
              <CSelect
                custom
                name="ekspedisi"
                id="ekspedisi"
                value={input.ekspedisi}
                onChange={changeHandler}
              >
                <option value="">Pilih Salah Satu</option>
                {dataEkspedisi.length === 0
                  ? null
                  : dataEkspedisi.map((item) => (
                      <option
                        key={item.id}
                        value={item.nama_ekspedisi.toLowerCase()}
                      >
                        {item.nama_ekspedisi}
                      </option>
                    ))}
              </CSelect>
            </CCol>
          </CRow>

          <CRow className="mt-2">
            <CCol xs="12" md="12">
              <CLabel htmlFor="ongkir">Ongkos Kirim</CLabel>
              <CSelect
                custom
                name="ongkir"
                id="ongkir"
                value={input.ongkir}
                onChange={changeHandler}
              >
                {dataOngkir.length === 0 ? (
                  <option value="">Pilih Salah Satu</option>
                ) : (
                  <>
                    <option value="">Pilih Salah Satu</option>
                    {dataOngkir.map((item, i) => (
                      <option key={i} value={item.cost[0].value}>
                        {item.service} - Rp.{" "}
                        {new Intl.NumberFormat(["ban", "id"]).format(
                          item.cost[0].value
                        )}{" "}
                        - ({item.cost[0].etd} Hari)
                      </option>
                    ))}
                  </>
                )}
              </CSelect>
            </CCol>
          </CRow>

          <CRow className="mt-2">
            <CCol xs="12" lg="6">
              <CFormGroup>
                <CLabel htmlFor="alamat">Alamat</CLabel>
                <CTextarea
                  name="alamat"
                  id="alamat"
                  value={input.alamat}
                  onChange={changeHandler}
                  placeholder="Masukkan Alamat"
                ></CTextarea>
              </CFormGroup>
            </CCol>
            <CCol xs="12" md="6">
              <CFormGroup>
                <CLabel htmlFor="keterangan">Keterangan</CLabel>
                <CTextarea
                  name="keterangan"
                  id="keterangan"
                  value={input.keterangan}
                  onChange={changeHandler}
                  placeholder="Masukkan Keterangan"
                ></CTextarea>
              </CFormGroup>
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="success" onClick={() => submitHandler("update")}>
          Update
        </CButton>{" "}
        <CButton color="secondary" onClick={() => closeModalHandler("update")}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default Modal;
