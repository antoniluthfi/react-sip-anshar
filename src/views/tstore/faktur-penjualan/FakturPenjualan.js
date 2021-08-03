import React, { useEffect } from 'react';
import FakturPenjualanHelper from './modules/FakturPenjualanHelper';
import TableFakturPenjualan from './modules/Table';
import ModalCreateAndUpdate from './modules/Modal';
import ModalView from './modules/ModalView';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react';  

const FakturPenjualan = () => {
    const {
        fields,
        success, 
        info,
        dataFaktur, setDataFaktur,
        loadDataFaktur, setLoadDataFaktur,
        dataBank, setDataBank,
        loadDataBank, setLoadDataBank,
        currentDataFaktur,
        loadCurrentDataFaktur,
        bankVisibility,
        terhutangVisibility,
        nominalVisibility,
        buttonSubmitName,
        input, 
        details,
        toggleDetails,
        changeHandler,
        closeModalHandler,
        submitHandler,
        getCurrentUser,
        getDataFakturPenjualanById,
        getDataBank,
    } = FakturPenjualanHelper();

    useEffect(() => {
        getCurrentUser();
        getDataBank();

        return () => {
            setDataFaktur([]);
            setLoadDataFaktur(true);
            setDataBank([]);
            setLoadDataBank(true);
        }
    }, [])

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Faktur Penjualan</CCardHeader>
                        <CCardBody>
                            <TableFakturPenjualan 
                                fields={fields}
                                dataFaktur={dataFaktur}
                                loadDataFaktur={loadDataFaktur}
                                details={details}
                                toggleDetails={toggleDetails}
                                getDataFakturPenjualanById={getDataFakturPenjualanById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* add, edit data */}
            <ModalCreateAndUpdate 
                success={success}
                dataBank={dataBank}
                loadDataBank={loadDataBank}
                currentDataFaktur={currentDataFaktur}
                loadCurrentDataFaktur={loadCurrentDataFaktur}
                bankVisibility={bankVisibility}
                terhutangVisibility={terhutangVisibility}
                nominalVisibility={nominalVisibility}
                buttonSubmitName={buttonSubmitName}
                input={input}
                changeHandler={changeHandler}
                closeModalHandler={closeModalHandler}
                submitHandler={submitHandler}
            />

            {/* view data */}
            <ModalView 
                info={info}
                currentDataFaktur={currentDataFaktur}
                loadCurrentDataFaktur={loadCurrentDataFaktur}
                closeModalHandler={closeModalHandler}
            />
        </>
    )
}

export default FakturPenjualan;