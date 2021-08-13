import React from "react";
import { CCardBody, CDataTable, CButton, CCollapse } from "@coreui/react";

const Table = (props) => {
  const {
    fields,
    dataPesananPenjualan,
    loadDataPesananPenjualan,
    details,
    toggleDetails,
    getDataPesananPenjualanById,
    postDataPengirimanPesanan,
    postDataFakturPenjualan,
    deletePengirimanPesanan,
    deleteDataFakturPenjualan,
  } = props;

  return (
    <CDataTable
      items={dataPesananPenjualan}
      fields={fields}
      striped
      sorter
      hover
      tableFilter
      noItemsView={
        loadDataPesananPenjualan
          ? { noItems: "Get data" }
          : { noResults: "Not found", noItems: "Empty" }
      }
      loading={loadDataPesananPenjualan}
      itemsPerPageSelect
      itemsPerPage={5}
      pagination
      scopedSlots={{
        id: (item, i) => <td className="text-center">{i + 1}</td>,
        kode_pesanan: (item, i) => (
          <td className="text-center">{item.kode_pesanan}</td>
        ),
        name: (item) => <td className="text-center">{item.pelanggan.name}</td>,
        email: (item) => (
          <td className="text-center">{item.pelanggan.email}</td>
        ),
        syarat_pembayaran: (item) => (
          <td className="text-center">{item.syarat_pembayaran.nama}</td>
        ),
        cabang: (item) => (
          <td className="text-center">{item.cabang.nama_cabang}</td>
        ),
        show_details: (item, index) => {
          return (
            <td className="py-2">
              <CButton
                color="primary"
                variant="outline"
                shape="square"
                size="sm"
                onClick={() => {
                  toggleDetails(index);
                }}
              >
                {details.includes(index) ? "Hide" : "Show"}
              </CButton>
            </td>
          );
        },
        details: (item, index) => {
          return (
            <CCollapse show={details.includes(index)}>
              <CCardBody>
                <CButton
                  size="sm"
                  color="info"
                  onClick={() =>
                    getDataPesananPenjualanById(item.kode_pesanan, "view")
                  }
                >
                  View Details
                </CButton>
                <CButton
                  size="sm"
                  color="success"
                  className="ml-1"
                  onClick={() =>
                    getDataPesananPenjualanById(item.kode_pesanan, "update")
                  }
                >
                  Update
                </CButton>
                {!item.faktur_penjualan ? (
                  !item.pengiriman_pesanan ? (
                    <CButton
                      size="sm"
                      color="warning"
                      className="ml-1"
                      onClick={() => postDataPengirimanPesanan(item)}
                    >
                      Proses Ke Pengiriman Pesanan
                    </CButton>
                  ) : (
                    <CButton
                      size="sm"
                      color="danger"
                      className="ml-1"
                      onClick={() =>
                        deletePengirimanPesanan(
                          item.pengiriman_pesanan.kode_pesanan
                        )
                      }
                    >
                      Hapus Pengiriman Pesanan
                    </CButton>
                  )
                ) : null}

                {!item.pengiriman_pesanan ? (
                  !item.faktur_penjualan ? (
                    <CButton
                      size="sm"
                      color="warning"
                      className="ml-1"
                      onClick={() => postDataFakturPenjualan(item)}
                    >
                      Buat Faktur Penjualan
                    </CButton>
                  ) : (
                    <CButton
                      size="sm"
                      color="danger"
                      className="ml-1"
                      onClick={() =>
                        deleteDataFakturPenjualan(
                          item.faktur_penjualan.no_faktur
                        )
                      }
                    >
                      Hapus Faktur Penjualan
                    </CButton>
                  )
                ) : null}
                <CButton
                  size="sm"
                  color="danger"
                  className="ml-1"
                  onClick={() =>
                    getDataPesananPenjualanById(item.kode_pesanan, "delete")
                  }
                >
                  Delete
                </CButton>
                <a
                  href={`${process.env.REACT_APP_LARAVEL_PUBLIC}/laporan/transaksi/pesanan-penjualan/id/${item.kode_pesanan}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <CButton size="sm" color="warning" className="ml-1">
                    Cetak Laporan
                  </CButton>
                </a>
              </CCardBody>
            </CCollapse>
          );
        },
      }}
    />
  );
};

export default Table;
