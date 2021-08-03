import React from 'react';
import {
    CDataTable,
    CCardBody,
    CCollapse,
    CButton,
} from '@coreui/react';

const Table = (props) => {
    const {
        fields,
        dataEkspedisi,
        loadDataEkspedisi,
        details,
        toggleDetails,
        getDataEkspedisiById
    } = props;

    return (
        <CDataTable
            items={dataEkspedisi}
            fields={fields}
            striped
            sorter
            hover
            tableFilter
            noItemsView={loadDataEkspedisi ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
            loading={loadDataEkspedisi}    
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
            scopedSlots = {{
                'id':
                ((item, i) => <td className="text-center">{i + 1}</td>),
                'nama_ekspedisi':
                (item => <td className="text-center">{item.nama_ekspedisi}</td>),
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
                            <CButton size="sm" color="info" onClick={() => getDataEkspedisiById(item.id, 'view')}>
                                View Details
                            </CButton>
                            <CButton size="sm" color="success" className="ml-1" onClick={() => getDataEkspedisiById(item.id, 'update')}>
                                Update
                            </CButton>
                            <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataEkspedisiById(item.id, 'delete')}>
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