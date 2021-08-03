import React, { useEffect } from 'react';
import KategoriBarangHelper from './modules/KategoriBarangHelper';
import TableKategoriBarang from './modules/Table';
import ModalKategoriBarang from './modules/Modal';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
} from '@coreui/react';  

const KategoriBarang = () => {
    const {
        fields,
        success, setSuccess,
        dataKategori, setDataKategori,
        loadDataKategori, setLoadDataKategori,
        details,
        input, 
        modalTitle,
        buttonSubmitName,
        buttonVisibility,
        color,
        toggleDetails,
        changeHandler,
        closeModalHandler,
        submitHandler,
        getDataKategori,
        getDataKategoriById,
        getPurchasing
    } = KategoriBarangHelper();

    useEffect(() => {
        getDataKategori();
        getPurchasing();

        return () => {
            setDataKategori([]);
            setLoadDataKategori(true);
        }
    }, [])

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Kategori Barang</CCardHeader>
                        <CRow>
                            <CCol xs="6" lg="6">
                                <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                            </CCol>
                        </CRow>
                        <CCardBody>
                            <TableKategoriBarang 
                                fields={fields}
                                dataKategori={dataKategori}
                                loadDataKategori={loadDataKategori}
                                details={details}
                                toggleDetails={toggleDetails}
                                getDataKategoriById={getDataKategoriById}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* add, edit data */}
            <ModalKategoriBarang 
                success={success}
                input={input}
                modalTitle={modalTitle}
                buttonSubmitName={buttonSubmitName}
                buttonVisibility={buttonVisibility}
                color={color}
                changeHandler={changeHandler}
                closeModalHandler={closeModalHandler}
                submitHandler={submitHandler}
            />
        </>
    )
}

export default KategoriBarang;