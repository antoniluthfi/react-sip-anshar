import React, { useEffect } from "react";
import ModalPengembalian from "./modules/Modal";
import TablePengembalian from "./modules/TablePengembalian";
import PengembalianBarangHelper from "./modules/PengembalianBarangHelper";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

const PengembalianBarang = () => {
  const {
    currentUser,
    fields,
    success,
    setSuccess,
    view,
    color,
    dataPengembalian,
    setDataPengembalian,
    isLoading,
    setIsLoading,
    dataSandi,
    setDataSandi,
    buttonSubmitName,
    buttonVisibility,
    formDisabled,
    modalTitle,
    input,
    setInput,
    details,
    toggleDetails,
    changeHandler,
    closeModalHandler,
    submitHandler,
    getDataPengembalian,
    getDataPengembalianById,
    getSandiTransaksi
  } = PengembalianBarangHelper();

  useEffect(() => {
    getDataPengembalian();
    getSandiTransaksi();

    return () => {
      setDataPengembalian([]);
      setIsLoading(true);
      setDataSandi([]);
    };
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Data Pengembalian</CCardHeader>
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
    </>
  );
};

export default PengembalianBarang;
