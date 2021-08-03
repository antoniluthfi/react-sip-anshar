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
        dataCabang,
        loadDataCabang,
        details,
        toggleDetails,
        getDataCabangById
    } = props;

    return (
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
    )
}

export default Table;