import React, { useEffect } from "react";
import FakturPenjualanHelper from "./modules/FakturPenjualanHelper";
import TableFakturPenjualan from "./modules/Table";
import ModalCreateAndUpdate from "./modules/Modal";
import ModalView from "./modules/ModalView";
import ModalCetakLaporan from "./modules/ModalCetakLaporan";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";

const FakturPenjualan = () => {
  const {
    fields,
    success,
    info,
    warning,
    setWarning,
    dataFaktur,
    setDataFaktur,
    loadDataFaktur,
    setLoadDataFaktur,
    dataBank,
    setDataBank,
    loadDataBank,
    setLoadDataBank,
    dataMarketing,
    setDataMarketing,
    currentDataFaktur,
    loadCurrentDataFaktur,
    bankVisibility,
    terhutangVisibility,
    nominalVisibility,
    buttonSubmitName,
    input,
    cetakLaporan,
    filterLebihDariSatuHari,
    filterMarketing,
    details,
    toggleDetails,
    changeHandler,
    closeModalHandler,
    submitHandler,
    getCurrentUser,
    getDataFakturPenjualanById,
    getDataBank,
    cetakLaporanHandler,
    getDataMarketing,
  } = FakturPenjualanHelper();

  useEffect(() => {
    getCurrentUser();
    getDataBank();
    getDataMarketing();

    return () => {
      setDataFaktur([]);
      setLoadDataFaktur(true);
      setDataBank([]);
      setLoadDataBank(true);
      setDataMarketing([]);
    };
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Faktur Penjualan</CCardHeader>
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
              <TableFakturPenjualan
                fields={fields}
                dataFaktur={dataFaktur}
                loadDataFaktur={loadDataFaktur}
                details={details}
                toggleDetails={toggleDetails}
                getDataFakturPenjualanById={getDataFakturPenjualanById}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* add, edit data */}
      <ModalCreateAndUpdate
        success={success}
        dataBank={dataBank}
        loadDataBank={loadDataBank}
        currentDataFaktur={currentDataFaktur}
        loadCurrentDataFaktur={loadCurrentDataFaktur}
        bankVisibility={bankVisibility}
        terhutangVisibility={terhutangVisibility}
        nominalVisibility={nominalVisibility}
        buttonSubmitName={buttonSubmitName}
        input={input}
        changeHandler={changeHandler}
        closeModalHandler={closeModalHandler}
        submitHandler={submitHandler}
      />

      {/* view data */}
      <ModalView
        info={info}
        currentDataFaktur={currentDataFaktur}
        loadCurrentDataFaktur={loadCurrentDataFaktur}
        closeModalHandler={closeModalHandler}
      />

      {/* cetak laporan */}
      <ModalCetakLaporan
        warning={warning}
        setWarning={setWarning}
        cetakLaporanHandler={cetakLaporanHandler}
        cetakLaporan={cetakLaporan}
        filterLebihDariSatuHari={filterLebihDariSatuHari}
        filterMarketing={filterMarketing}
        dataMarketing={dataMarketing}
        submitHandler={submitHandler}
      />
    </>
  );
};

export default FakturPenjualan;
