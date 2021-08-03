import React, { useEffect } from 'react';
import MarketingHelper from './modules/data-marketing/MarketingHelper';
import TableMarketing from './modules/data-marketing/Table';
import ModalMarketing from './modules/data-marketing/Modal';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
} from '@coreui/react';  

const Marketing = () => {
    const {
        fields,
        success, setSuccess,
        color, 
        buttonSubmitName,
        buttonVisibility,
        modalTitle,
        dataUser, setDataUser,
        loadDataUser, setLoadDataUser,
        dataCabang, setDataCabang,
        loadDataCabang, setLoadDataCabang,
        formDisabled,
        input,
        details,
        toggleDetails,
        closeModalHandler, 
        changeHandler,
        submitHandler,
        getDataUser,
        getDataUserById,
    } = MarketingHelper();

    useEffect(() => {
        getDataUser();

        return () => {
            setDataUser([]);
            setLoadDataUser(true);
            setDataCabang([]);
            setLoadDataCabang(true);
        }
    }, [])

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Marketing</CCardHeader>
                        <CRow>
                            <CCol xs="6" lg="6">
                                <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                            </CCol>
                        </CRow>
                        <CCardBody>
                            <TableMarketing 
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
            <ModalMarketing 
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
    )
}

export default Marketing;