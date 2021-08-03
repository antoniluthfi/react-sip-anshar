import React, { useEffect } from "react";
import PengerjaanHelper from "./modules/PengerjaanHelper";
import TablePengerjaan from "./modules/TablePengerjaan";
import ModalPengerjaan from "./modules/Modal";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

const Pengerjaan = () => {
  const {
    fields,
    success,
    view,
    color,
    dataPengerjaan,
    setDataPengerjaan,
    isLoading,
    setIsLoading,
    buttonSubmitName,
    buttonVisibility,
    formDisabled,
    modalTitle,
    input,
    details,
    toggleDetails,
    closeModalHandler,
    changeHandler,
    getDataPengerjaan,
    getDataPengerjaanById,
    submitHandler,
  } = PengerjaanHelper();

  useEffect(() => {
    getDataPengerjaan();

    return () => {
      setIsLoading(true);
      setDataPengerjaan([]);
    };
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Data Pengerjaan</CCardHeader>
            <CCardBody>
              <TablePengerjaan
                fields={fields}
                dataPengerjaan={dataPengerjaan}
                isLoading={isLoading}
                getDataPengerjaanById={getDataPengerjaanById}
                details={details}
                toggleDetails={toggleDetails}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <ModalPengerjaan
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
      />
    </>
  );
};

export default Pengerjaan;
