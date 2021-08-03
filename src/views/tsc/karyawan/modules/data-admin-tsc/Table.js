import React from 'react';
import {
    CCardBody,
    CDataTable,
    CButton,
    CCollapse,
} from '@coreui/react';

const Table = (props) => {
    const {
        fields,
        dataUser,
        loadDataUser,
        details,
        toggleDetails,
        getDataUserById,
    } = props;

    return (
        <CDataTable
            items={dataUser}
            fields={fields}
            striped
            sorter
            hover
            tableFilter
            noItemsView={loadDataUser ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
            loading={loadDataUser}    
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
            scopedSlots = {{
                'id': 
                ((item, i) => (
                    <td className="text-center">{i + 1}</td>
                )),
                'nama_cabang':
                (item => <td className="text-center">{item.cabang.nama_cabang}</td>),
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
                            <CButton size="sm" color="info" onClick={() => getDataUserById(item.id, 'view')}>
                                View Details
                            </CButton>
                            <CButton size="sm" color="success" className="ml-1" onClick={() => getDataUserById(item.id, 'update')}>
                                Update
                            </CButton>
                            <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataUserById(item.id, 'delete')}>
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