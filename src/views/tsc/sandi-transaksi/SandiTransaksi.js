import React, { useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";
import SandiTransaksiHelper from "./modules/SandiTransaksiHelper";
import TableSandiTransaksi from "./modules/TableSandiTransaksi";
import ModalSandiTransaksi from "./modules/ModalSandiTransaksi";

const SandiTransaksi = () => {
  const {
    fields,
    success,
    setSuccess,
    dataSandiTransaksi,
    setDataSandiTransaksi,
    loadDataSandiTransaksi,
    setLoadDataSandiTransaksi,
    input,
    setInput,
    details,
    color,
    buttonSubmitName,
    buttonVisibility,
    formDisabled,
    modalTitle,
    toggleDetails,
    changeHandler,
    submitHandler,
    closeModalHandler,
    getSandiTransaksi,
    getDataSandiTransaksiById,
  } = SandiTransaksiHelper();

  useEffect(() => {
    getSandiTransaksi();

    return () => {
      setDataSandiTransaksi([]);
      setLoadDataSandiTransaksi(true);
    };
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Data Sandi Transaksi</CCardHeader>
            <CRow>
              <CCol xs="6" lg="6">
                <CButton
                  color="success"
                  onClick={() => setSuccess(!success)}
                  className="ml-3 mt-2"
                >
                  Tambah Data
                </CButton>
              </CCol>
            </CRow>
            <CCardBody>
              <TableSandiTransaksi
                dataSandiTransaksi={dataSandiTransaksi}
                fields={fields}
                loadDataSandiTransaksi={loadDataSandiTransaksi}
                details={details}
                toggleDetails={toggleDetails}
                getDataSandiTransaksiById={getDataSandiTransaksiById}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* add, edit data */}
      <ModalSandiTransaksi
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
      />
    </>
  );
};

export default SandiTransaksi;
