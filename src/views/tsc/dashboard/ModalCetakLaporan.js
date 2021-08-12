import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CButton,
  CCol,
  CFormGroup,
  CInput,
  CInputCheckbox,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSelect,
} from "@coreui/react";
import DashboardHelper from "./DashboardHelper";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

const ModalCetakLaporan = () => {
  const dispatch = useDispatch();
  const warning = useSelector((state) => state.dashboardCetakLaporan);

  const {
    dataCabang,
    dataOpsi,
    setDataCabang,
    filterLebihDariSatuHari,
    filterCabang,
    filterShift,
    cetakLaporan,
    setCetakLaporan,
    getDataCabang,
    cetakLaporanHandler,
    submitHandler,
  } = DashboardHelper();

  useEffect(() => {
    getDataCabang();

    return () => {
      setDataCabang([]);
    };
  }, []);

  return (
    <CModal
      show={warning}
      onClose={() => dispatch({ type: "CLOSE_MODAL", payload: false })}
      color="warning"
      closeOnBackdrop={false}
    >
      <CModalHeader closeButton>
        <CModalTitle>Cetak Laporan</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol xs="12" md="12" className="mb-2">
            <CFormGroup>
              <CLabel htmlFor="jenis-laporan">Jenis Laporan</CLabel>
              <CSelect
                custom
                name="jenis"
                id="jenis-laporan"
                value={cetakLaporan.jenis}
                onChange={cetakLaporanHandler}
              >
                <option value="">Pilih Salah Satu</option>
                <option value="pelanggan">Pelanggan</option>
                <option value="tts">Tanda Terima Servis</option>
                <option value="nota-servis">Nota Servis</option>
                <option value="arus-kas">Arus Kas</option>
              </CSelect>
            </CFormGroup>{" "}
          </CCol>
        </CRow>

        {cetakLaporan.jenis === "arus-kas" ? (
          <>
            <CRow>
              <CCol xs="12" md="4" className="mb-2">
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
              <CCol xs="12" md="4">
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
              <CCol xs="12" md="4">
                <CFormGroup variant="custom-checkbox" inline>
                  <CInputCheckbox
                    custom
                    id="filter-shift"
                    name="filter_shift"
                    defaultChecked={false}
                    onChange={cetakLaporanHandler}
                  />
                  <CLabel variant="custom-checkbox" htmlFor="filter-shift">
                    Filter Shift
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

              <CCol xs="12" md="6">
                <CFormGroup className={filterShift}>
                  <CLabel htmlFor="shift">Shift</CLabel>
                  <CSelect
                    custom
                    name="shift"
                    id="shift"
                    value={cetakLaporan.shift}
                    onChange={cetakLaporanHandler}
                  >
                    <option value="">Pilih Salah Satu</option>
                    <option value="0">Shift 1</option>
                    <option value="1">Shift 2</option>
                  </CSelect>
                </CFormGroup>
              </CCol>
            </CRow>
          </>
        ) : null}

        {cetakLaporan.jenis === "tts" ||
        cetakLaporan.jenis === "nota-servis" ? (
          <CRow>
            <CCol xs="12" md="12">
              <CLabel htmlFor="input">
                Nomor{" "}
                {cetakLaporan.jenis === "tts" ||
                cetakLaporan.jenis === "nota-servis"
                  ? "Servis"
                  : null}
              </CLabel>
              <Autocomplete
                id="input"
                clearOnEscape={true}
                options={dataOpsi}
                getOptionSelected={(option, value) =>
                  option.kode === value.kode
                }
                getOptionLabel={(option) => option.kode}
                value={{ kode: cetakLaporan.kode }}
                onChange={(event, values) => {
                  if (values) {
                    setCetakLaporan({
                      ...cetakLaporan,
                      kode: values.kode,
                    });
                  } else {
                    setCetakLaporan({
                      ...cetakLaporan,
                      kode: "",
                    });
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </CCol>
          </CRow>
        ) : null}
      </CModalBody>
      <CModalFooter>
        <CButton
          color="warning"
          disabled={!cetakLaporan.jenis}
          onClick={() => submitHandler(cetakLaporan.jenis)}
        >
          Cetak Laporan
        </CButton>{" "}
        <CButton
          color="secondary"
          onClick={() => dispatch({ type: "CLOSE_MODAL", payload: false })}
        >
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalCetakLaporan;
