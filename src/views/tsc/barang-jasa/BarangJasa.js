import React, { useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from "@coreui/react";
import MerekTipeHelper from "./modules/BarangJasaHelper";
import TableMerekTipe from "./modules/TableBarangJasa";
import ModalMerekTipe from "./modules/ModalBarangJasa";

const BarangJasa = () => {
  const {
    fields,
    success,
    setSuccess,
    dataBarangJasa,
    setDataBarangJasa,
    loadDataBarangJasa,
    setLoadDataBarangJasa,
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
    getDataBarangJasaById,
  } = MerekTipeHelper();

  useEffect(() => {
    getBarangJasa();

    return () => {
      setDataBarangJasa([]);
      setLoadDataBarangJasa(true);
    };
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Data Barang & Jasa</CCardHeader>
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
                dataMerekTipe={dataBarangJasa}
                fields={fields}
                loadDataMerekTipe={loadDataBarangJasa}
                details={details}
                toggleDetails={toggleDetails}
                getDataBarangJasaById={getDataBarangJasaById}
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
      />
    </>
  );
};

export default BarangJasa;
