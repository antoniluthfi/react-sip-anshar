import React, { useEffect } from 'react';
import DataBankHelper from './modules/DataBankHelper';
import TableBank from './modules/Table';
import ModalBank from './modules/Modal';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
} from '@coreui/react';  

const DataBank = () => {
    const {
        success, setSuccess,
        fields,
        dataBank, setDataBank,
        loadDataBank, setLoadDataBank,
        details,
        toggleDetails,
        getDataBankById,
        modalTitle,
        buttonSubmitName,
        formDisabled,
        color,
        input,
        changeHandler,
        submitHandler,
        closeModalHandler,
        getDataBank,
    } = DataBankHelper();

    useEffect(() => {
        getDataBank();

        return () => {
            setDataBank([]);
            setLoadDataBank(true);
        }
    }, [])

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Bank</CCardHeader>
                        <CRow>
                            <CCol xs="6" lg="6">
                                <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                            </CCol>
                        </CRow>
                        <CCardBody>
                            <TableBank
                                fields={fields}
                                dataBank={dataBank}
                                loadDataBank={loadDataBank}
                                details={details}
                                toggleDetails={toggleDetails}
                                getDataBankById={getDataBankById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* add, edit data */}
            <ModalBank
                success={success}
                modalTitle={modalTitle}
                buttonSubmitName={buttonSubmitName}
                formDisabled={formDisabled}
                color={color}
                input={input}          
                changeHandler={changeHandler}
                submitHandler={submitHandler}
                closeModalHandler={closeModalHandler}        
            />
        </>
    )
}

export default DataBank;