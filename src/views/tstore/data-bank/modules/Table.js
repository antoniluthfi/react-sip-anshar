import React from 'react';
import {
    CDataTable,
    CCollapse,
    CCardBody,
    CButton,
} from '@coreui/react';

const Table = (props) => {
    const {
        fields,
        dataBank, 
        loadDataBank,
        details,
        toggleDetails,
        getDataBankById,
    } = props;

    return (
        <CDataTable
            items={dataBank}
            fields={fields}
            striped
            sorter
            hover
            tableFilter
            noItemsView={loadDataBank ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
            loading={loadDataBank}    
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
            scopedSlots = {{
                'id': 
                ((item, i) => <td className="text-center">{i + 1}</td>),
                'nama_bank':
                (item => <td className="text-center">{item.nama_bank}</td>),
                'norekening':
                (item => <td className="text-center">{item.norekening}</td>),
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
                            <CButton size="sm" color="info" onClick={() => getDataBankById(item.id, 'view')}>
                                View Details
                            </CButton>
                            <CButton size="sm" color="success" className="ml-1" onClick={() => getDataBankById(item.id, 'update')}>
                                Update
                            </CButton>
                            <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataBankById(item.id, 'delete')}>
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