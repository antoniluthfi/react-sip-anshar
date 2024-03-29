import React, { useEffect } from "react";
import PenerimaanBarangHelper from "./modules/PenerimaanBarangHelper";
import TablePenerimaanBarang from "./modules/Table";
import ModalPenerimaanBarangService from "./modules/ModalPenerimaanBarangService";
import ModalPersiapanBarangBaru from "./modules/ModalPersiapanBarangBaru";
import ModalJasaLainlain from "./modules/ModalJasaLainlain";
import ModalCetakLaporan from "./modules/ModalCetakLaporan";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CButton,
} from "@coreui/react";

const PenerimaanBarang = () => {
  const {
    fields,
    success,
    setSuccess,
    warning,
    setWarning,
    persiapanBarangBaru,
    setPersiapanBarangBaru,
    jasaLainlain,
    setJasaLainlain,
    dataPenerimaan,
    setDataPenerimaan,
    loadDataPenerimaan,
    setLoadDataPenerimaan,
    dataPelanggan,
    setDataPelanggan,
    dataTipe,
    dataCabang,
    setDataCabang,
    currentTipe,
    setCurrentTipe,
    currentPelanggan,
    setCurrentPelanggan,
    dataBarangJasa,
    setDataBarangJasa,
    currentBarangJasa,
    setCurrentBarangJasa,
    dataTeknisi,
    setDataTeknisi,
    currentTeknisi,
    setCurrentTeknisi,
    input,
    setInput,
    cetakLaporan,
    filterLebihDariSatuHari,
    filterCabang,
    color,
    details,
    buttonSubmitName,
    buttonVisibility,
    formDisabled,
    modalTitle,
    toggleDetails,
    getDataPenerimaan,
    getDataPenerimaanById,
    submitHandler,
    changeHandler,
    getDataPelanggan,
    closeModalHandler,
    getDataTipe,
    getDataBarangJasa,
    getDataTeknisi,
    cetakLaporanHandler,
    getDataCabang,
  } = PenerimaanBarangHelper();

  useEffect(() => {
    getDataPenerimaan();
    getDataPelanggan();
    getDataTeknisi();
    getDataCabang();

    return () => {
      setDataPenerimaan([]);
      setLoadDataPenerimaan(true);
      setDataPelanggan([]);
      setDataBarangJasa([]);
      setDataTeknisi([]);
      setDataCabang();
    };
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Data Penerimaan Barang</CCardHeader>
            <CRow>
              <CCol xs="6" lg="6">
                <CDropdown className="ml-4 mt-2 d-inline-block">
                  <CDropdownToggle color="secondary">
                    Tambah Data
                  </CDropdownToggle>
                  <CDropdownMenu placement="right">
                    <CDropdownItem
                      onClick={() => {
                        setSuccess(!success);
                        setInput({
                          ...input,
                          jenis_penerimaan: "Penerimaan Barang Service",
                        });
                        getDataBarangJasa("Barang");
                      }}
                    >
                      Penerimaan Barang Service
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => {
                        setPersiapanBarangBaru(!persiapanBarangBaru);
                        setInput({
                          ...input,
                          jenis_penerimaan: "Persiapan Barang Baru",
                        });
                        getDataBarangJasa("Barang");
                      }}
                    >
                      Persiapan Barang Baru
                    </CDropdownItem>
                    <CDropdownItem
                      onClick={() => {
                        setJasaLainlain(!jasaLainlain);
                        setInput({
                          ...input,
                          jenis_penerimaan: "Jasa Lain-lain",
                        });
                        getDataBarangJasa("Jasa");
                      }}
                    >
                      Jasa Lain-lain
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>

                <CButton
                  color="warning"
                  onClick={() => setWarning(!warning)}
                  className="ml-2"
                >
                  Cetak Laporan
                </CButton>
              </CCol>
            </CRow>
            <CCardBody>
              <TablePenerimaanBarang
                fields={fields}
                dataPenerimaan={dataPenerimaan}
                loadDataPenerimaan={loadDataPenerimaan}
                getDataPenerimaanById={getDataPenerimaanById}
                details={details}
                toggleDetails={toggleDetails}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <ModalPenerimaanBarangService
        success={success}
        color={color}
        buttonSubmitName={buttonSubmitName}
        buttonVisibility={buttonVisibility}
        modalTitle={modalTitle}
        formDisabled={formDisabled}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        input={input}
        setInput={setInput}
        closeModalHandler={closeModalHandler}
        dataPelanggan={dataPelanggan}
        dataTipe={dataTipe}
        currentPelanggan={currentPelanggan}
        setCurrentPelanggan={setCurrentPelanggan}
        currentTipe={currentTipe}
        setCurrentTipe={setCurrentTipe}
        dataBarangJasa={dataBarangJasa}
        currentBarangJasa={currentBarangJasa}
        setCurrentBarangJasa={setCurrentBarangJasa}
        getDataTipe={getDataTipe}
        dataTeknisi={dataTeknisi}
        currentTeknisi={currentTeknisi}
        setCurrentTeknisi={setCurrentTeknisi}
      />

      <ModalPersiapanBarangBaru
        persiapanBarangBaru={persiapanBarangBaru}
        closeModalHandler={closeModalHandler}
        color={color}
        modalTitle={modalTitle}
        buttonSubmitName={buttonSubmitName}
        buttonVisibility={buttonVisibility}
        formDisabled={formDisabled}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        input={input}
        setInput={setInput}
        dataPelanggan={dataPelanggan}
        dataTipe={dataTipe}
        currentPelanggan={currentPelanggan}
        setCurrentPelanggan={setCurrentTipe}
        currentTipe={currentTipe}
        setCurrentTipe={setCurrentTipe}
        dataBarangJasa={dataBarangJasa}
        currentBarangJasa={currentBarangJasa}
        setCurrentBarangJasa={setCurrentBarangJasa}
        getDataTipe={getDataTipe}
        dataTeknisi={dataTeknisi}
        currentTeknisi={currentTeknisi}
        setCurrentTeknisi={setCurrentTeknisi}
      />

      <ModalJasaLainlain
        jasaLainlain={jasaLainlain}
        closeModalHandler={closeModalHandler}
        color={color}
        modalTitle={modalTitle}
        buttonSubmitName={buttonSubmitName}
        buttonVisibility={buttonVisibility}
        formDisabled={formDisabled}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
        input={input}
        setInput={setInput}
        dataPelanggan={dataPelanggan}
        dataTipe={dataTipe}
        currentPelanggan={currentPelanggan}
        setCurrentPelanggan={setCurrentTipe}
        currentTipe={currentTipe}
        setCurrentTipe={setCurrentTipe}
        dataBarangJasa={dataBarangJasa}
        currentBarangJasa={currentBarangJasa}
        setCurrentBarangJasa={setCurrentBarangJasa}
        getDataTipe={getDataTipe}
        dataTeknisi={dataTeknisi}
        currentTeknisi={currentTeknisi}
        setCurrentTeknisi={setCurrentTeknisi}
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

export default PenerimaanBarang;
