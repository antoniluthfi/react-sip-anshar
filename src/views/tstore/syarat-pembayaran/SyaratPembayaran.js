import React, { useEffect } from 'react';
import SyaratPembayaranHelper from './modules/SyaratPembayaranHelper';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm,
    CFormGroup,
    CLabel,
    CInput,
    CModalFooter,
    CCollapse,
} from '@coreui/react';  

const SyaratPembayaran = () => {
    const {
        fields,
        success, setSuccess, 
        dataSyaratPembayaran,
        loadDataSyaratPembayaran,
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
        getDataSyaratPembayaran,
        getDataSyaratPembayaranById
    } = SyaratPembayaranHelper();

    useEffect(() => {
        getDataSyaratPembayaran();
    }, [])

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Data Syarat Pembayaran</CCardHeader>
                        <CRow>
                            <CCol xs="6" lg="6">
                                <CButton color="success" onClick={() => setSuccess(!success)} className="ml-3 mt-2">Tambah Data</CButton>
                            </CCol>
                        </CRow>
                        <CCardBody>
                            <CDataTable
                                items={dataSyaratPembayaran}
                                fields={fields}
                                striped
                                sorter
                                hover
                                tableFilter
                                noItemsView={loadDataSyaratPembayaran ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
                                loading={loadDataSyaratPembayaran}    
                                itemsPerPageSelect
                                itemsPerPage={5}
                                pagination
                                scopedSlots = {{
                                    'id':
                                    ((item, i) => <td className="text-center">{i + 1}</td>),
                                    'nama':
                                    (item => <td className="text-center">{item.nama}</td>),
                                    'show_details':
                                    (item, index)=>{
                                        return (
                                        <td className="py-2">
                                            <CButton
                                                color="primary"
                                                variant="outline"
                                                shape="square"
                                                size="sm"
                                                onClick={()=>{toggleDetails(index)}}
                                            >
                                                {details.includes(index) ? 'Hide' : 'Show'}
                                            </CButton>
                                        </td>
                                        )
                                    },
                                    'details':
                                        (item, index)=>{
                                        return (
                                        <CCollapse show={details.includes(index)}>
                                            <CCardBody>
                                                <CButton size="sm" color="info" onClick={() => getDataSyaratPembayaranById(item.id, 'view')}>
                                                    View Details
                                                </CButton>
                                                <CButton size="sm" color="success" className="ml-1" onClick={() => getDataSyaratPembayaranById(item.id, 'update')}>
                                                    Update
                                                </CButton>
                                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataSyaratPembayaranById(item.id, 'delete')}>
                                                    Delete
                                                </CButton>         
                                            </CCardBody>
                                        </CCollapse>
                                        )
                                    }
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* add, edit data */}
            <CModal 
                show={success} 
                onClose={closeModalHandler}
                color={color}
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>{modalTitle}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CRow>
                            <CCol xs="12" md="12">
                                <CFormGroup>
                                    <CLabel htmlFor="nama">Nama</CLabel>
                                    <CInput type="text" name="nama" id="nama" value={input.nama} onChange={changeHandler} placeholder="Masukkan Syarat Pembayaran" disabled={formDisabled} />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={() => submitHandler(buttonSubmitName.toLowerCase())}>{buttonSubmitName}</CButton>{' '}
                    <CButton color="secondary" onClick={closeModalHandler}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default SyaratPembayaran;