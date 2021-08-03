import React from "react";
import { CCardBody, CDataTable, CButton, CCollapse } from "@coreui/react";

const TableSandiTransaksi = (props) => {
  const {
    dataSandiTransaksi,
    fields,
    loadDataSandiTransaksi,
    details,
    toggleDetails,
    getDataSandiTransaksiById,
  } = props;

  return (
    <CDataTable
      items={dataSandiTransaksi}
      fields={fields}
      striped
      sorter
      hover
      tableFilter
      noItemsView={
        loadDataSandiTransaksi
          ? { noItems: "Get data" }
          : { noResults: "Not found", noItems: "Empty" }
      }
      loading={loadDataSandiTransaksi}
      itemsPerPageSelect
      itemsPerPage={5}
      pagination
      scopedSlots={{
        id: (item, i) => <td className="text-center">{i + 1}</td>,
        nama_transaksi: (item) => (
          <td className="text-center">{item.nama_transaksi}</td>
        ),
        jenis_transaksi: (item) => (
          <td className="text-center">
            {item.jenis_transaksi ? "Masuk" : "Keluar"}
          </td>
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
                  onClick={() => getDataSandiTransaksiById(item.id, "view")}
                >
                  View Details
                </CButton>
                <CButton
                  size="sm"
                  color="success"
                  className="ml-1"
                  onClick={() => getDataSandiTransaksiById(item.id, "update")}
                >
                  Update
                </CButton>
                <CButton
                  size="sm"
                  color="danger"
                  className="ml-1"
                  onClick={() => getDataSandiTransaksiById(item.id, "delete")}
                >
                  Delete
                </CButton>
              </CCardBody>
            </CCollapse>
          );
        },
      }}
    />
  );
};

export default TableSandiTransaksi;
