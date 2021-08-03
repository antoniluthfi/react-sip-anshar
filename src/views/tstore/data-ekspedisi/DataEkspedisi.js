import React, { useEffect } from 'react';
import DataEkspedisiHelper from './modules/DataEkspedisiHelper';
import TableEkspedisi from './modules/Table';
import ModalEkspedisi from './modules/Modal';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
} from '@coreui/react';  

const DataEkspedisi = () => {
    const {
        fields,
        success, setSuccess, 
        dataEkspedisi, setDataEkspedisi,
        loadDataEkspedisi, setLoadDataEkspedisi,
        modalTitle,
        buttonSubmitName,
        formDisabled,
        color,
        input,
        details,
        toggleDetails,
        changeHandler,
        submitHandler,
        closeModalHandler,
        getDataEkspedisi,
        getDataEkspedisiById
    } = DataEkspedisiHelper();

    useEffect(() => {
        getDataEkspedisi();

        return () => {
            setDataEkspedisi([]);
            setLoadDataEkspedisi(true);
        }
    }, [])

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Ekspedisi</CCardHeader>
                        <CRow>
                            <CCol xs="6" lg="6">
                                <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                            </CCol>
                        </CRow>
                        <CCardBody>
                            <TableEkspedisi 
                                fields={fields}
                                dataEkspedisi={dataEkspedisi}
                                loadDataEkspedisi={loadDataEkspedisi}
                                details={details}
                                toggleDetails={toggleDetails}
                                getDataEkspedisiById={getDataEkspedisiById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* add, edit data */}
            <ModalEkspedisi 
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

export default DataEkspedisi;