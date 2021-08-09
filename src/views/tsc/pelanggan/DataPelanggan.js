import React, { useEffect } from "react";
import DataUserHelper from "./modules/DataPelangganHelper";
import TablePelanggan from "./modules/Table";
import ModalPelanggan from "./modules/Modal";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";

const DataUser = () => {
  const {
    fields,
    success,
    setSuccess,
    color,
    buttonSubmitName,
    buttonVisibility,
    modalTitle,
    dataUser,
    loadDataUser,
    dataCabang,
    loadDataCabang,
    formDisabled,
    input,
    details,
    toggleDetails,
    closeModalHandler,
    changeHandler,
    submitHandler,
    getDataUser,
    getDataUserById,
  } = DataUserHelper();

  useEffect(() => {
    getDataUser();
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Data Pelanggan</CCardHeader>
            <CRow>
              <CCol xs="6" lg="6">
                <CButton
                  color="success"
                  onClick={() => setSuccess(!success)}
                  className="ml-3 mt-2"
                >
                  Tambah Data
                </CButton>

                <a
                  href={`${process.env.REACT_APP_LARAVEL_PUBLIC}/laporan/pelanggan/data-pelanggan2`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <CButton color="warning" className="ml-1 mt-2">
                    Cetak Laporan
                  </CButton>
                </a>
              </CCol>
            </CRow>
            <CCardBody>
              <TablePelanggan
                fields={fields}
                dataUser={dataUser}
                loadDataUser={loadDataUser}
                details={details}
                toggleDetails={toggleDetails}
                getDataUserById={getDataUserById}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* add, edit data */}
      <ModalPelanggan
        success={success}
        color={color}
        buttonSubmitName={buttonSubmitName}
        buttonVisibility={buttonVisibility}
        modalTitle={modalTitle}
        dataCabang={dataCabang}
        loadDataCabang={loadDataCabang}
        formDisabled={formDisabled}
        input={input}
        closeModalHandler={closeModalHandler}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />
    </>
  );
};

export default DataUser;
