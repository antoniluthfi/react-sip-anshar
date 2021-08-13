import React from "react";
import { CCardBody, CDataTable, CButton, CCollapse } from "@coreui/react";

const Table = (props) => {
  const {
    fields,
    dataPengirimanPesanan,
    loadDataPengirimanPesanan,
    details,
    toggleDetails,
    getDataPengirimanPesananById,
    postDataFakturPenjualan,
    deleteDataFakturPenjualan,
  } = props;

  return (
    <CDataTable
      items={dataPengirimanPesanan}
      fields={fields}
      striped
      sorter
      hover
      tableFilter
      noItemsView={
        loadDataPengirimanPesanan
          ? { noItems: "Get data" }
          : { noResults: "Not found", noItems: "Empty" }
      }
      loading={loadDataPengirimanPesanan}
      itemsPerPageSelect
      itemsPerPage={5}
      pagination
      scopedSlots={{
        id: (item, i) => <td className="text-center">{i + 1}</td>,
        name: (item) => <td>{item.user.name}</td>,
        nomorhp: (item) => <td className="text-center">{item.user.nomorhp}</td>,
        alamat: (item) => <td>{item.user.alamat}</td>,
        nama_cabang: (item) => (
          <td className="text-center">{item.cabang.nama_cabang}</td>
        ),
        ekspedisi: (item) => (
          <td className="text-center">
            {item.ekspedisi == null ? "-" : item.ekspedisi.nama_ekspedisi}
          </td>
        ),
        ongkir: (item) => (
          <td className="text-right">
            Rp. {new Intl.NumberFormat(["ban", "id"]).format(item.ongkir)}
          </td>
        ),
        keterangan: (item) => (
          <td className="text-center">{item.keterangan}</td>
        ),
        tanggal_pengiriman: (item) => (
          <td className="text-center">{item.tanggal_pengiriman}</td>
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
                    getDataPengirimanPesananById(item.kode_pengiriman, "view")
                  }
                >
                  View Details
                </CButton>
                <CButton
                  size="sm"
                  color="success"
                  className="ml-1"
                  onClick={() =>
                    getDataPengirimanPesananById(item.kode_pengiriman, "update")
                  }
                >
                  Update
                </CButton>
                {item.faktur_penjualan == null ? (
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
                      deleteDataFakturPenjualan(item.faktur_penjualan.no_faktur)
                    }
                  >
                    Hapus Faktur Penjualan
                  </CButton>
                )}
                <CButton
                  size="sm"
                  color="danger"
                  className="ml-1"
                  onClick={() =>
                    getDataPengirimanPesananById(item.kode_pengiriman, "delete")
                  }
                >
                  Delete
                </CButton>
                {item.id_ekspedisi == null ? null : (
                  <a
                    href={`${process.env.REACT_APP_LARAVEL_PUBLIC}/laporan/transaksi/pengiriman-pesanan/id/${item.kode_pengiriman}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <CButton size="sm" color="warning" className="ml-1">
                      Cetak Laporan
                    </CButton>
                  </a>
                )}
              </CCardBody>
            </CCollapse>
          );
        },
      }}
    />
  );
};

export default Table;
