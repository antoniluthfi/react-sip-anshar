import React from "react";
import {
  CRow,
  CCol,
  CSelect,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CInputCheckbox,
  CFormGroup,
  CLabel,
  CInput,
  CModalFooter,
} from "@coreui/react";

const ModalCetakLaporan = (props) => {
  let {
    warning,
    setWarning,
    cetakLaporanHandler,
    cetakLaporan,
    filterLebihDariSatuHari,
    filterCabang,
    dataCabang,
    submitHandler,
  } = props;

  return (
    <CModal
      show={warning}
      onClose={() => setWarning(!warning)}
      color="warning"
      closeOnBackdrop={false}
    >
      <CModalHeader closeButton>
        <CModalTitle>Cetak Laporan</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol xs="12" md="6" className="mb-2">
            <CFormGroup variant="custom-checkbox" inline>
              <CInputCheckbox
                custom
                id="filter-lebih-dari-satuhari"
                name="filter_lebih_dari_satuhari"
                defaultChecked={false}
                onChange={cetakLaporanHandler}
              />
              <CLabel
                variant="custom-checkbox"
                htmlFor="filter-lebih-dari-satuhari"
              >
                Filter lebih dari 1 hari
              </CLabel>
            </CFormGroup>
          </CCol>
          <CCol xs="12" md="6">
            <CFormGroup variant="custom-checkbox" inline>
              <CInputCheckbox
                custom
                id="filter-cabang"
                name="filter_cabang"
                defaultChecked={false}
                onChange={cetakLaporanHandler}
              />
              <CLabel variant="custom-checkbox" htmlFor="filter-cabang">
                Filter Cabang
              </CLabel>
            </CFormGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs="12" md="6">
            <CFormGroup>
              <CLabel htmlFor="dari">Dari</CLabel>
              <CInput
                type="date"
                id="dari"
                name="dari"
                value={cetakLaporan.dari}
                onChange={cetakLaporanHandler}
                placeholder="dd/mm/yy"
              />
            </CFormGroup>
          </CCol>

          <CCol xs="12" md="6">
            <CFormGroup className={filterLebihDariSatuHari}>
              <CLabel htmlFor="sampai">Sampai</CLabel>
              <CInput
                type="date"
                id="sampai"
                name="sampai"
                value={cetakLaporan.sampai}
                onChange={cetakLaporanHandler}
                placeholder="dd/mm/yy"
              />
            </CFormGroup>
          </CCol>
        </CRow>

        <CRow>
          <CCol xs="12" md="6">
            <CFormGroup className={filterCabang}>
              <CLabel htmlFor="cabang">Cabang</CLabel>
              <CSelect
                custom
                name="cabang"
                id="cabang"
                value={cetakLaporan.cabang}
                onChange={cetakLaporanHandler}
              >
                <option key="sdnjns" value="">
                  Pilih Salah Satu
                </option>
                {dataCabang.length > 0
                  ? dataCabang.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.nama_cabang}
                      </option>
                    ))
                  : null}
              </CSelect>
            </CFormGroup>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="warning" onClick={() => submitHandler("CetakLaporan")}>
          Cetak Laporan
        </CButton>{" "}
        <CButton color="secondary" onClick={() => setWarning(!warning)}>
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalCetakLaporan;
