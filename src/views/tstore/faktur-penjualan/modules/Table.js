import React from 'react';
import {
    CCardBody,
    CDataTable,
    CButton,
    CCollapse,
} from '@coreui/react';  
import moment from 'moment';

const Table = (props) => {
    const {
        fields,
        dataFaktur, 
        loadDataFaktur,
        details,
        toggleDetails,
        getDataFakturPenjualanById,
    } = props;

    return (
        <CDataTable
            items={dataFaktur}
            fields={fields}
            striped
            sorter
            hover
            tableFilter
            noItemsView={loadDataFaktur ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
            loading={loadDataFaktur}    
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
            scopedSlots = {{
                'id':
                ((item, i) => <td className="text-center">{i + 1}</td>),
                'name': 
                (item => (
                    <td className="text-center">
                        {item.user.name}
                    </td>
                )),
                'kode_pesanan':
                (item => (
                    <td className="text-center">
                        {item.kode_pesanan}
                    </td>
                )),
                'created_at':
                (item => (
                    <td className="text-center">
                        {moment(item.created_at).format('L')}
                    </td>
                )),
                'metode_pembayaran':
                (item => (
                    <td className="text-center">
                        {item.metode_pembayaran}
                    </td>
                )),
                'bank':
                (item => (
                    <td className="text-center">
                        {item.id_bank == null ? null : item.bank.nama_bank}
                    </td>
                )),
                'nominal': 
                (item => (
                    <td className="text-right">
                        {item.nominal == null ? '' : `Rp. ${new Intl.NumberFormat(['ban', 'id']).format(item.nominal)}`}
                    </td>
                )),
                'terhutang': 
                (item => (
                    <td className="text-right">
                        {item.terhutang == null ? '' : `Rp. ${new Intl.NumberFormat(['ban', 'id']).format(item.terhutang)}`}
                    </td>
                )),
                'total_biaya': 
                (item => (
                    <td className="text-right">
                        Rp. {new Intl.NumberFormat(['ban', 'id']).format(item.pesanan_penjualan.total_harga)}
                    </td>
                )),
                'status':
                (item => (
                    <td className="text-center">
                        {item.nominal < item.pesanan_penjualan.total_harga ? 'Belum Lunas' : 'Lunas'}
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
                    (item, index) => {
                    return (
                    <CCollapse show={details.includes(index)}>
                        <CCardBody>
                            <CButton size="sm" color="info" onClick={() => getDataFakturPenjualanById(item.no_faktur, 'view')}>
                                View Details
                            </CButton>
                            {!item.nominal ?
                                <CButton size="sm" color="success" className="ml-1" onClick={() => getDataFakturPenjualanById(item.no_faktur, 'update')}>
                                    Update
                                </CButton> : item.terhutang !== 0 ?
                                <CButton size="sm" color="warning" className="ml-1" onClick={() => getDataFakturPenjualanById(item.no_faktur, 'lunasi')}>
                                    Bayar Sisa
                                </CButton>                                                
                                : null                                               
                            }
                            <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataFakturPenjualanById(item.no_faktur, 'delete')}>
                                Delete
                            </CButton>   
                            {!item.nominal ? null :
                                <a href={`${process.env.REACT_APP_LARAVEL_PUBLIC}/laporan/transaksi/faktur-penjualan/id/${item.no_faktur}`} target="_blank" rel="noreferrer">
                                    <CButton size="sm" color="warning" className="ml-1">
                                        Cetak Laporan
                                    </CButton>
                                </a>                                                          
                            }        
                        </CCardBody>
                    </CCollapse>
                    )
                }
            }}
        />
    )
}

export default Table;