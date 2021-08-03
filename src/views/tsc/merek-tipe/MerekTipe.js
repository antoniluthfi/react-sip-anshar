import React, { useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";
import MerekTipeHelper from "./modules/MerekTipeHelper";
import TableMerekTipe from "./modules/TableMerekTipe";
import ModalMerekTipe from "./modules/ModalMerekTipe";

const MerekTipe = () => {
  const {
    fields,
    success,
    setSuccess,
    dataMerekTipe,
    setDataMerekTipe,
    loadDataMerekTipe,
    setLoadDataMerekTipe,
    currentMerekTipe,
    setCurrentMerekTipe,
    loadCurrentMerekTipe,
    setLoadCurrentMerekTipe,
    barangJasa,
    setBarangJasa,
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
    getBarangJasa,
    getMerekTipe,
    getDataMerekTipeById,
  } = MerekTipeHelper();

  useEffect(() => {
    getMerekTipe();
    getBarangJasa();

    return () => {
      setDataMerekTipe([]);
      setLoadDataMerekTipe(true);
      setBarangJasa([]);
    };
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Data Tipe</CCardHeader>
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
              <TableMerekTipe
                dataMerekTipe={dataMerekTipe}
                fields={fields}
                loadDataMerekTipe={loadDataMerekTipe}
                details={details}
                toggleDetails={toggleDetails}
                getDataTipeById={getDataMerekTipeById}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* add, edit data */}
      <ModalMerekTipe
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
        barangJasa={barangJasa}
      />
    </>
  );
};

export default MerekTipe;
