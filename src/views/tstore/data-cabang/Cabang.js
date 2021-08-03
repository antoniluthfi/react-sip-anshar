import React, { useEffect } from 'react';
import CabangHelper from './modules/CabangHelper';
import TableCabang from './modules/Table';
import ModalCabang from './modules/Modal';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
} from '@coreui/react';  

const Cabang = () => {
    const {
        fields,
        success, setSuccess,
        dataCabang, setDataCabang,
        loadDataCabang, setLoadDataCabang,
        details,
        input,
        modalTitle,
        buttonSubmitName,
        buttonVisibility,
        formDisabled,
        color,
        toggleDetails,
        changeHandler,
        closeModalHandler,
        submitHandler,
        getDataCabang,
        getDataCabangById
    } = CabangHelper();

    useEffect(() => {
        getDataCabang();

        return () => {
            setDataCabang([]);
            setLoadDataCabang(true);
        }
    }, [])

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Cabang</CCardHeader>
                        <CRow>
                            <CCol xs="6" lg="6">
                                <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                            </CCol>
                        </CRow>
                        <CCardBody>
                            <TableCabang 
                                fields={fields}
                                dataCabang={dataCabang}
                                loadDataCabang={loadDataCabang}
                                details={details}
                                toggleDetails={toggleDetails}
                                getDataCabangById={getDataCabangById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* add, edit data */}
            <ModalCabang 
                success={success}
                input={input}
                modalTitle={modalTitle}
                buttonSubmitName={buttonSubmitName}
                buttonVisibility={buttonVisibility}
                formDisabled={formDisabled}
                color={color}
                changeHandler={changeHandler}
                closeModalHandler={closeModalHandler}
                submitHandler={submitHandler}
            />
        </>
    )
}

export default Cabang;