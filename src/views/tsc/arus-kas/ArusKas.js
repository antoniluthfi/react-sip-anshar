import React, { useEffect } from "react";
import ArusKasHelper from "./modules/ArusKasHelper";
import TableArusKas from "./modules/TableArusKas";
import ModalArusKas from "./modules/Modal";
import ModalCetakLaporan from "./modules/ModalCetakLaporan";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";

const ArusKas = () => {
  const {
    fields,
    success,
    setSuccess,
    view,
    color,
    warning,
    setWarning,
    dataArusKas,
    setDataArusKas,
    isLoading,
    setIsLoading,
    sandiTransaksi,
    setSandiTransaksi,
    dataCabang,
    setDataCabang,
    buttonSubmitName,
    buttonVisibility,
    formDisabled,
    modalTitle,
    input,
    cetakLaporan,
    details,
    filterLebihDariSatuHari,
    filterCabang,
    filterShift,
    toggleDetails,
    changeHandler,
    closeModalHandler,
    getArusKas,
    getArusKasById,
    submitHandler,
    getSandiTransaksi,
    getDataCabang,
    cetakLaporanHandler,
  } = ArusKasHelper();

  useEffect(() => {
    getArusKas();
    getSandiTransaksi();
    getDataCabang();

    return () => {
      setDataArusKas([]);
      setIsLoading(true);
      setSandiTransaksi([]);
      setDataCabang([]);
    };
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Data Arus Kas</CCardHeader>
            <CRow>
              <CCol xs="6" lg="6">
                <CButton
                  color="success"
                  onClick={() => setSuccess(!success)}
                  className="ml-3 mt-2"
                >
                  Tambah Data
                </CButton>
                <CButton
                  color="warning"
                  onClick={() => setWarning(!warning)}
                  className="mt-2 ml-2"
                >
                  Cetak Laporan
                </CButton>
              </CCol>
            </CRow>
            <CCardBody>
              <TableArusKas
                fields={fields}
                dataArusKas={dataArusKas}
                isLoading={isLoading}
                getArusKasById={getArusKasById}
                details={details}
                toggleDetails={toggleDetails}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <ModalArusKas
        success={success}
        color={color}
        buttonSubmitName={buttonSubmitName}
        buttonVisibility={buttonVisibility}
        modalTitle={modalTitle}
        formDisabled={formDisabled}
        input={input}
        closeModalHandler={closeModalHandler}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        view={view}
        sandiTransaksi={sandiTransaksi}
      />

      <ModalCetakLaporan
        warning={warning}
        setWarning={setWarning}
        cetakLaporanHandler={cetakLaporanHandler}
        cetakLaporan={cetakLaporan}
        filterLebihDariSatuHari={filterLebihDariSatuHari}
        filterCabang={filterCabang}
        filterShift={filterShift}
        dataCabang={dataCabang}
        submitHandler={submitHandler}
      />
    </>
  );
};

export default ArusKas;
