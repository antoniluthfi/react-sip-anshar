import React, { useEffect } from 'react';
import KategoriBarangHelper from './modules/KategoriBarangHelper';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
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

const KategoriBarang = () => {
    const {
        fields,
        success, setSuccess,
        dataKategori,
        loadDataKategori,
        details,
        input, setInput,
        modalTitle,
        buttonSubmitName,
        buttonVisibility,
        formDisabled,
        color,
        purchasingOptions,
        currentPurchasing, setCurrentPurchasing,
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
                            <CDataTable
                                items={dataKategori}
                                fields={fields}
                                striped
                                sorter
                                hover
                                tableFilter
                                noItemsView={loadDataKategori ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
                                loading={loadDataKategori}    
                                itemsPerPageSelect
                                itemsPerPage={5}
                                pagination
                                scopedSlots = {{
                                    'id': 
                                    ((item, index) => (
                                        <td className="text-center">
                                            {index + 1}
                                        </td>
                                    )), 
                                    'nama_kategori':
                                    (item => (
                                        <td className="text-center">
                                            {item.nama_kategori}
                                        </td>
                                    )),
                                    'id_purchasing':
                                    (item => (
                                        <td className="text-center">
                                            {item.purchasing.name}
                                        </td>
                                    )),
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
                                                <CButton size="sm" color="info" onClick={() => getDataKategoriById(item.id, 'view')}>
                                                    View Details
                                                </CButton>
                                                <CButton size="sm" color="success" className="ml-1" onClick={() => getDataKategoriById(item.id, 'update')}>
                                                    Update
                                                </CButton>
                                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataKategoriById(item.id, 'delete')}>
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
                            <CCol xs="12" md="12">
                                <CFormGroup>
                                    <CLabel htmlFor="input-pur">Pilih Purchasing</CLabel>
                                    <Autocomplete
                                        id="input-pur"
                                        clearOnEscape={true}
                                        options={purchasingOptions}
                                        getOptionSelected={(option, value) => option.name === value.name}
                                        getOptionLabel={option => option.name}
                                        value={{ name: currentPurchasing.name }}
                                        onChange={(event, values) => {
                                            if(values !== null) {
                                                setCurrentPurchasing({
                                                    ...currentPurchasing, name: values.name
                                                });

                                                setInput({
                                                    ...input, id_purchasing: values.id
                                                });
                                            } else {
                                                setCurrentPurchasing({
                                                    ...currentPurchasing, name: ''
                                                });

                                                setInput({
                                                    ...input, id_purchasing: ''
                                                });
                                            }                
                                        }}
                                        renderInput={(params) => 
                                            <TextField {...params} />
                                        }
                                    />                                
                                </CFormGroup>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol xs="12" md="12">
                                <CLabel htmlFor="kategori">Kategori</CLabel>
                                <CInput type="text" name="nama_kategori" id="kategori" value={input.nama_kategori} onChange={changeHandler} placeholder="Masukkan Kategori" />
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" className={buttonVisibility} onClick={() => submitHandler(buttonSubmitName.toLocaleLowerCase())}>{buttonSubmitName}</CButton>{' '}
                    <CButton color="secondary" className={buttonVisibility} onClick={() => closeModalHandler(buttonSubmitName.toLocaleLowerCase())}>Cancel</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default KategoriBarang;