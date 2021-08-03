import React, { useEffect } from "react";
import ArusKasHelper from "./modules/ArusKasHelper";
import TableArusKas from "./modules/TableArusKas";
import ModalArusKas from "./modules/Modal";
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
    dataArusKas,
    setDataArusKas,
    isLoading,
    setIsLoading,
    sandiTransaksi,
    setSandiTransaksi,
    buttonSubmitName,
    buttonVisibility,
    formDisabled,
    modalTitle,
    input,
    details,
    toggleDetails,
    changeHandler,
    closeModalHandler,
    getArusKas,
    getArusKasById,
    submitHandler,
    getSandiTransaksi,
  } = ArusKasHelper();

  useEffect(() => {
    getArusKas();
    getSandiTransaksi();

    return () => {
      setDataArusKas([]);
      setIsLoading(true);
      setSandiTransaksi([]);
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
    </>
  );
};

export default ArusKas;
