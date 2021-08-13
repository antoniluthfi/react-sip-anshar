import React, { useEffect } from "react";
import ModalPengembalian from "./modules/Modal";
import TablePengembalian from "./modules/TablePengembalian";
import PengembalianBarangHelper from "./modules/PengembalianBarangHelper";
import ModalCetakLaporan from "./modules/ModalCetakLaporan";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";

const PengembalianBarang = () => {
  const {
    fields,
    success,
    warning,
    setWarning,
    view,
    color,
    dataPengembalian,
    setDataPengembalian,
    isLoading,
    dataSandi,
    setDataSandi,
    setIsLoading,
    dataCabang,
    setDataCabang,
    buttonSubmitName,
    buttonVisibility,
    formDisabled,
    modalTitle,
    input,
    cetakLaporan,
    filterLebihDariSatuHari,
    filterCabang,
    details,
    toggleDetails,
    changeHandler,
    closeModalHandler,
    submitHandler,
    getDataPengembalian,
    getDataPengembalianById,
    getSandiTransaksi,
    cetakLaporanHandler,
    getDataCabang,
  } = PengembalianBarangHelper();

  useEffect(() => {
    getDataPengembalian();
    getSandiTransaksi();
    getDataCabang();

    return () => {
      setDataPengembalian([]);
      setIsLoading(true);
      setDataSandi([]);
      setDataCabang([]);
    };
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Data Pengembalian</CCardHeader>
            <CRow>
              <CCol xs="12" lg="6">
                <CButton
                  color="warning"
                  onClick={() => setWarning(!warning)}
                  className="ml-4 mt-1"
                >
                  Cetak Laporan
                </CButton>
              </CCol>
            </CRow>

            <CCardBody>
              <TablePengembalian
                fields={fields}
                dataPengembalian={dataPengembalian}
                isLoading={isLoading}
                getDataPengembalianById={getDataPengembalianById}
                details={details}
                toggleDetails={toggleDetails}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <ModalPengembalian
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
        dataSandi={dataSandi}
      />

      <ModalCetakLaporan
        warning={warning}
        setWarning={setWarning}
        cetakLaporanHandler={cetakLaporanHandler}
        cetakLaporan={cetakLaporan}
        filterLebihDariSatuHari={filterLebihDariSatuHari}
        filterCabang={filterCabang}
        dataCabang={dataCabang}
        submitHandler={submitHandler}
      />
    </>
  );
};

export default PengembalianBarang;
