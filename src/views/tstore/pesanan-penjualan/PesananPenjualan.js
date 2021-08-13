import React, { useEffect } from "react";
import DataPesananPenjualanHelper from "./modules/PesananPenjualanHelper";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";
import TablePesananPenjualan from "./modules/Table";
import ModalPesananPenjualan from "./modules/Modal";
import ModalViewPesananPenjualan from "./modules/ModalView";
import ModalCetakLaporan from "./modules/ModalCetakLaporan";

const PesananPenjualan = () => {
  const {
    fields,
    success,
    setSuccess,
    info,
    warning,
    setWarning,
    dataPesananPenjualan,
    loadDataPesananPenjualan,
    currentPesananPenjualan,
    loadCurrentDataPesananPenjualan,
    dataCabang,
    loadDataCabang,
    dataPelanggan,
    currentPelanggan,
    setCurrentPelanggan,
    input,
    setInput,
    inputBarang,
    setInputBarang,
    cetakLaporan,
    filterLebihDariSatuHari,
    filterCabang,
    dataBarang,
    setDataBarang,
    dataSyaratPembayaran,
    loadDataSyaratPembayaran,
    buttonSubmitName,
    modalTitle,
    details,
    toggleDetails,
    closeModalHandler,
    changeHandler,
    submitHandler,
    getCurrentUser,
    getDataPesananPenjualanById,
    getDataStokBarang,
    getDataCabang,
    getDataPelanggan,
    postDataPengirimanPesanan,
    postDataFakturPenjualan,
    getSyaratPembayaran,
    deletePengirimanPesanan,
    deleteDataFakturPenjualan,
    addInput,
    removeInput,
    cetakLaporanHandler,
  } = DataPesananPenjualanHelper();

  useEffect(() => {
    getCurrentUser();
    getDataCabang();
    getDataPelanggan();
    getSyaratPembayaran();

    return () => {
      setDataBarang([]);
    };
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Pesanan Penjualan</CCardHeader>
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
                  className="ml-2 mt-2"
                >
                  Cetak Laporan
                </CButton>
              </CCol>
            </CRow>
            <CCardBody>
              <TablePesananPenjualan
                fields={fields}
                dataPesananPenjualan={dataPesananPenjualan}
                loadDataPesananPenjualan={loadDataPesananPenjualan}
                details={details}
                toggleDetails={toggleDetails}
                getDataPesananPenjualanById={getDataPesananPenjualanById}
                postDataPengirimanPesanan={postDataPengirimanPesanan}
                postDataFakturPenjualan={postDataFakturPenjualan}
                deletePengirimanPesanan={deletePengirimanPesanan}
                deleteDataFakturPenjualan={deleteDataFakturPenjualan}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <ModalPesananPenjualan
        success={success}
        closeModalHandler={closeModalHandler}
        buttonSubmitName={buttonSubmitName}
        modalTitle={modalTitle}
        dataPelanggan={dataPelanggan}
        currentPelanggan={currentPelanggan}
        setCurrentPelanggan={setCurrentPelanggan}
        input={input}
        setInput={setInput}
        getDataStokBarang={getDataStokBarang}
        changeHandler={changeHandler}
        dataCabang={dataCabang}
        loadDataCabang={loadDataCabang}
        addInput={addInput}
        inputBarang={inputBarang}
        setInputBarang={setInputBarang}
        dataBarang={dataBarang}
        dataSyaratPembayaran={dataSyaratPembayaran}
        loadDataSyaratPembayaran={loadDataSyaratPembayaran}
        removeInput={removeInput}
        submitHandler={submitHandler}
      />

      {/* view data */}
      <ModalViewPesananPenjualan
        info={info}
        currentPesananPenjualan={currentPesananPenjualan}
        loadCurrentDataPesananPenjualan={loadCurrentDataPesananPenjualan}
        closeModalHandler={closeModalHandler}
      />

      {/* cetak laporan */}
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

export default PesananPenjualan;
