import React, { useEffect } from "react";
import PengirimanPesananHelper from "./modules/PengirimanPesananHelper";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";
import TablePengirimanPesanan from "./modules/Table";
import ModalPengirimanPesanan from "./modules/Modal";
import ModalViewPengirimanPesanan from "./modules/ModalView";
import ModalCetakLaporan from "./modules/ModalCetakLaporan";

const PengirimanPesanan = () => {
  const {
    fields,
    success,
    info,
    warning,
    setWarning,
    dataPengirimanPesanan,
    setDataPengirimanPesanan,
    loadDataPengirimanPesanan,
    setLoadDatapengirimanPesanan,
    currentDataPengirimanPesanan,
    setCurrentDataPengirimanPesanan,
    loadCurrentDataPengirimanPesanan,
    setLoadCurrentDataPengirimanPesanan,
    dataEkspedisi,
    setDataEkspedisi,
    setLoadDataEkspedisi,
    dataProvinsi,
    setDataProvinsi,
    dataKota,
    setDataKota,
    dataOngkir,
    setDataOngkir,
    dataCabang,
    setDataCabang,
    input,
    cetakLaporan,
    filterLebihDariSatuHari,
    filterCabang,
    details,
    toggleDetails,
    changeHandler,
    submitHandler,
    closeModalHandler,
    getDataPengirimanPesanan,
    getDataPengirimanPesananById,
    getDataEkspedisi,
    postDataFakturPenjualan,
    deleteDataFakturPenjualan,
    getDataProvinsi,
    getDataKota,
    getDataOngkir,
    cetakLaporanHandler,
    getDataCabang,
  } = PengirimanPesananHelper();

  useEffect(() => {
    getDataPengirimanPesanan();
    getDataEkspedisi();
    getDataProvinsi();
    getDataCabang();

    return () => {
      setDataPengirimanPesanan([]);
      setLoadDatapengirimanPesanan(true);
      setCurrentDataPengirimanPesanan({});
      setLoadCurrentDataPengirimanPesanan(true);
      setDataEkspedisi([]);
      setLoadDataEkspedisi(true);
      setDataProvinsi([]);
      setDataKota([]);
      setDataOngkir([]);
      setDataCabang([]);
    };
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Pengiriman Pesanan</CCardHeader>
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
              <TablePengirimanPesanan
                fields={fields}
                dataPengirimanPesanan={dataPengirimanPesanan}
                loadDataPengirimanPesanan={loadDataPengirimanPesanan}
                details={details}
                toggleDetails={toggleDetails}
                getDataPengirimanPesananById={getDataPengirimanPesananById}
                postDataFakturPenjualan={postDataFakturPenjualan}
                deleteDataFakturPenjualan={deleteDataFakturPenjualan}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* add, edit data */}
      <ModalPengirimanPesanan
        success={success}
        dataEkspedisi={dataEkspedisi}
        dataProvinsi={dataProvinsi}
        dataKota={dataKota}
        dataOngkir={dataOngkir}
        input={input}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        closeModalHandler={closeModalHandler}
        getDataKota={getDataKota}
        getDataOngkir={getDataOngkir}
      />

      {/* view data */}
      <ModalViewPengirimanPesanan
        info={info}
        currentDataPengirimanPesanan={currentDataPengirimanPesanan}
        loadCurrentDataPengirimanPesanan={loadCurrentDataPengirimanPesanan}
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

export default PengirimanPesanan;
