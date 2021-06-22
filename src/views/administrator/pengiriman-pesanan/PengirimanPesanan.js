import React, { useEffect } from 'react';
import PengirimanPesananHelper from './modules/PengirimanPesananHelper';
import CurrencyFormat from 'react-currency-format';
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
    CSelect,
    CTextarea
} from '@coreui/react';  

const PengirimanPesanan = () => {
    const {
        fields,
        success,
        info,
        dataPengirimanPesanan,
        loadDataPengirimanPesanan,
        currentDataPengirimanPesanan,
        loadCurrentDataPengirimanPesanan,
        dataEkspedisi,
        loadDataEkspedisi,
        input,
        details,
        toggleDetails,
        changeHandler,
        submitHandler,
        closeModalHandler,
        getDataPengirimanPesanan,
        getDataPengirimanPesananById,
        getDataEkspedisi,
        postDataFakturPenjualan,
        deleteDataFakturPenjualan
    } = PengirimanPesananHelper();

    useEffect(() => {
        getDataPengirimanPesanan();
        getDataEkspedisi();
    }, []);

    return (
        <>
            <CRow>
                <CCol xs="12" lg="12">
                    <CCard>
                        <CCardHeader>Pengiriman Pesanan</CCardHeader>
                        <CCardBody>
                            <CDataTable
                                items={dataPengirimanPesanan}
                                fields={fields}
                                striped
                                sorter
                                hover
                                tableFilter
                                noItemsView={loadDataPengirimanPesanan ? {noItems: 'Get data'} : {noResults: 'Not found', noItems: 'Empty'}}
                                loading={loadDataPengirimanPesanan}    
                                itemsPerPageSelect
                                itemsPerPage={5}
                                pagination
                                scopedSlots = {{
                                    'id': 
                                    ((item, i) => <td className="text-center">{i + 1}</td>),
                                    'name': 
                                    (item => <td>{item.user.name}</td>),
                                    'nomorhp': 
                                    (item => <td className="text-center">{item.user.nomorhp}</td>),
                                    'alamat': 
                                    (item => <td>{item.user.alamat}</td>),
                                    'nama_cabang': 
                                    (item => <td className="text-center">{item.cabang.nama_cabang}</td>),
                                    'ekspedisi':
                                    (item => <td className="text-center">{item.ekspedisi == null ? '-' : item.ekspedisi.nama_ekspedisi}</td>),
                                    'ongkir':
                                    (item => <td className="text-right">Rp. {new Intl.NumberFormat(['ban', 'id']).format(item.ongkir)}</td>),
                                    'keterangan':
                                    (item => <td className="text-center">{item.keterangan}</td>),
                                    'tanggal_pengiriman':
                                    (item => <td className="text-center">{item.tanggal_pengiriman}</td>), 
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
                                                <CButton size="sm" color="info" onClick={() => getDataPengirimanPesananById(item.id_pesanan_penjualan, 'view')}>
                                                    View Details
                                                </CButton>
                                                <CButton size="sm" color="success" className="ml-1" onClick={() => getDataPengirimanPesananById(item.id_pesanan_penjualan, 'update')}>
                                                    Update
                                                </CButton>
                                                {item.faktur_penjualan == null ? 
                                                    <CButton size="sm" color="warning" className="ml-1" onClick={() => postDataFakturPenjualan(item)}>
                                                        Buat Faktur Penjualan
                                                    </CButton>
                                                    : 
                                                    <CButton size="sm" color="danger" className="ml-1" onClick={() => deleteDataFakturPenjualan(item.faktur_penjualan.no_bukti)}>
                                                        Hapus Faktur Penjualan
                                                    </CButton>                                                                                       
                                                }
                                                <CButton size="sm" color="danger" className="ml-1" onClick={() => getDataPengirimanPesananById(item.id_pesanan_penjualan, 'delete')}>
                                                    Delete
                                                </CButton>    
                                                {item.id_ekspedisi == null ? null :
                                                    <a href={`${process.env.REACT_APP_LARAVEL_PUBLIC}/laporan/transaksi/pengiriman-pesanan/id/${item.id_pesanan_penjualan}`} target="_blank">
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
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/* add, edit data */}
            <CModal 
                show={success} 
                onClose={() => closeModalHandler('update')}
                color="success"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Update Data</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm action="" method="post">
                        <CRow>
                            <CCol xs="12" md="6">
                                <CLabel htmlFor="tanggal-pengiriman">Tanggal Pengiriman</CLabel>
                                <CInput type="date" name="tanggal_pengiriman" id="tanggal-pengiriman" value={input.tanggal_pengiriman} onChange={changeHandler} placeholder="Pilih Tanggal Pengiriman" />
                            </CCol>
                            <CCol xs="12" md="6">
                                <CLabel htmlFor="ekspedisi">Pilih Ekspedisi</CLabel>
                                <CSelect custom name="id_ekspedisi" id="ekspedisi" value={input.id_ekspedisi} onChange={changeHandler}>
                                    {loadDataEkspedisi ? <option value="">Pilih Salah Satu</option> :
                                        <>
                                            <option value="">Pilih Salah Satu</option>
                                            {dataEkspedisi.map(item => (
                                                <option value={item.id}>{item.nama_ekspedisi}</option>
                                            ))}
                                        </>
                                    }
                                </CSelect>
                            </CCol>
                        </CRow>

                        <CRow className="mt-2">
                            <CCol xs="12" md="6">
                                <CLabel htmlFor="ongkir">Biaya ongkos kirim</CLabel>
                                <CurrencyFormat min="0" thousandSeparator={true} prefix={'Rp.'} customInput={CInput} name="ongkir" value={input.ongkir} onChange={changeHandler} placeholder="Masukkan Biaya Ongkos Kirim" />
                            </CCol>
                        </CRow>

                        <CRow className="mt-2">
                            <CCol xs="12" lg="6">
                                <CFormGroup>
                                    <CLabel htmlFor="alamat">Alamat</CLabel>
                                    <CTextarea name="alamat" id="alamat" value={input.alamat} onChange={changeHandler} placeholder="Masukkan Alamat"></CTextarea>
                                </CFormGroup>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CFormGroup>
                                    <CLabel htmlFor="keterangan">Keterangan</CLabel>
                                    <CTextarea name="keterangan" id="keterangan" value={input.keterangan} onChange={changeHandler} placeholder="Masukkan Keterangan"></CTextarea>
                                </CFormGroup>
                            </CCol>
                        </CRow>
                    </CForm>
                </CModalBody>
                <CModalFooter>
                    <CButton color="success" onClick={() => submitHandler('update')}>Update</CButton>{' '}
                    <CButton color="secondary" onClick={() => closeModalHandler('update')}>Cancel</CButton>
                </CModalFooter>
            </CModal>

            {/* view data */}
            <CModal 
                show={info} 
                onClose={() => closeModalHandler('view')}
                color="info"
                closeOnBackdrop={false}
            >
                <CModalHeader closeButton>
                    <CModalTitle>Data Pesanan Penjualan</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    {loadCurrentDataPengirimanPesanan ? null : 
                        <>
                        <CRow>
                            <CCol xs="12" md="6">
                                <CLabel htmlFor="nama-pelanggan">Nama Pelanggan</CLabel>
                                <CInput type="text" name="nama_pelanggan" id="nama-pelanggan" value={currentDataPengirimanPesanan.user.name} disabled={true}/>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CLabel htmlFor="tanggal-pengiriman">Tanggal Pangiriman</CLabel>
                                <CInput type="text" name="tanggal_pengiriman" id="tanggal-pengiriman" value={currentDataPengirimanPesanan.tanggal_pengiriman} disabled={true} />
                            </CCol>
                        </CRow>

                        <CRow className="mt-2">
                            <CCol xs="12" md="6">
                                <CLabel htmlFor="cabang">Cabang</CLabel>
                                <CInput type="text" name="cabang" id="cabang" value={currentDataPengirimanPesanan.cabang.nama_cabang} disabled={true} />
                            </CCol>
                            <CCol xs="12" md="6">
                                <CLabel htmlFor="ongkir">Biaya Ongkos Kirim</CLabel>
                                <CInput type="text" name="ongkir" id="ongkir" value={`Rp. ${new Intl.NumberFormat(['ban', 'id']).format(currentDataPengirimanPesanan.ongkir)}`} disabled={true} />
                            </CCol>
                        </CRow>

                        <CRow className="mt-2">
                            <CCol xs="12" md="6">
                                <CLabel htmlFor="ekspedisi">Ekspedisi</CLabel>
                                <CInput type="text" name="ekspedisi" id="ekspedisi" value={currentDataPengirimanPesanan.ekspedisi == null ? null : currentDataPengirimanPesanan.ekspedisi.nama_ekspedisi} disabled={true} />
                            </CCol>
                            <CCol xs="12" md="6">
                                <CLabel htmlFor="syarat-pembayaran">Syarat Pembayaran</CLabel>
                                <CInput type="text" name="syarat_pembayaran" id="syarat-pembayaran" value={currentDataPengirimanPesanan.pesanan_penjualan.syarat_pembayaran.nama} disabled={true} />
                            </CCol>
                        </CRow>

                        <CRow className="mt-2">
                            <CCol xs="12" md="6">
                                <CLabel htmlFor="alamat">Alamat</CLabel>
                                <CTextarea name="alamat" id="alamat" value={currentDataPengirimanPesanan.alamat} placeholder="Masukkan Alamat" disabled={true} ></CTextarea>
                            </CCol>
                            <CCol xs="12" md="6">
                                <CLabel htmlFor="keterangan">Keterangan</CLabel>
                                <CTextarea name="keterangan" id="keterangan" value={currentDataPengirimanPesanan.keterangan} placeholder="Masukkan Keterangan"disabled={true} ></CTextarea>
                            </CCol>
                        </CRow>
                        </>
                    }
                </CModalBody>
                <CModalFooter></CModalFooter>
            </CModal>
        </>
    )
}

export default PengirimanPesanan;