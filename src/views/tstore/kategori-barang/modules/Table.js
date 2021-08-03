import React from 'react';
import {
    CCardBody,
    CDataTable,
    CButton,
    CCollapse
} from '@coreui/react';  

const Table = (props) => {
    const {
        fields,
        dataKategori,
        loadDataKategori,
        details,
        toggleDetails,
        getDataKategoriById,
    } = props;

    return (
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
    )
}

export default Table;