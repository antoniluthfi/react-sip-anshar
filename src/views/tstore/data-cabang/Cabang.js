import React, { useEffect } from 'react';
import CabangHelper from './modules/CabangHelper';
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
    CCollapse
} from '@coreui/react';  

const Cabang = () => {
    const {
        fields,
        success, setSuccess,
        dataCabang,
        loadDataCabang,
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
                            <CDataTable
                                items={dataCabang}
                                fields={fields}
                                striped
                                sorter
                                hover
                                tableFilter
                                noItemsView={loadDataCabang ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
                                loading={loadDataCabang}    
                                itemsPerPageSelect
                                itemsPerPage={5}
                                pagination
                                scopedSlots = {{
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
                                                <CButton size="sm" color="info" onClick={() => getDataCabangById(item.id, 'view')}>
                                                    View Details
                                                </CButton>
                                                <CButton size="sm" color="success" className="ml-1" onClick={() => getDataCabangById(item.id, 'update')}>
                                                    Update
                                                </CButton>
                                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataCabangById(item.id, 'delete')}>
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
                onClose={() => closeModalHandler(buttonSubmitName.toLowerCase())}
                color={color}
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>{modalTitle}</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CRow>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="nama-cabang">Nama Cabang</CLabel>
                                    <CInput type="text" id="nama-cabang" name="nama_cabang" value={input.nama_cabang} onChange={changeHandler} placeholder="Masukkan Nama Cabang" disabled={formDisabled} />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="singkatan">Singkatan</CLabel>
                                    <CInput type="text" id="singkatan" name="singkatan" value={input.singkatan} onChange={changeHandler} placeholder="Masukkan Singkatan Nama" disabled={formDisabled} />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="email">Email</CLabel>
                                    <CInput type="email" id="email" name="email" value={input.email} onChange={changeHandler} placeholder="Masukkan Email" disabled={formDisabled} />
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="nomorhp">Nomor HP</CLabel>
                                    <CInput type="text" id="nomorhp" name="nomorhp" value={input.nomorhp} onChange={changeHandler} placeholder="Masukkan Nomor HP" disabled={formDisabled} />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol xs="12" md="12">
                                <CFormGroup>
                                    <CLabel htmlFor="alamat">Alamat</CLabel>
                                    <CInput type="text" id="alamat" name="alamat" value={input.alamat} onChange={changeHandler} placeholder="Masukkan Alamat" disabled={formDisabled} />
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" className={buttonVisibility} onClick={() => submitHandler(buttonSubmitName.toLocaleLowerCase())}>{buttonSubmitName}</CButton>{' '}
                    <CButton color="secondary" className={buttonVisibility} onClick={() => closeModalHandler(buttonSubmitName.toLowerCase())}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default Cabang;