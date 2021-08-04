import React from "react";
import { CCardBody, CDataTable, CButton, CCollapse } from "@coreui/react";

const Table = (props) => {
  const {
    fields,
    dataPenerimaan,
    loadDataPenerimaan,
    getDataPenerimaanById,
    details,
    toggleDetails,
  } = props;

  return (
    <CDataTable
      items={dataPenerimaan}
      fields={fields}
      striped
      sorter
      hover
      tableFilter
      noItemsView={
        loadDataPenerimaan
          ? { noItems: "Get data" }
          : { noResults: "Not found", noItems: "Empty" }
      }
      loading={loadDataPenerimaan}
      itemsPerPageSelect
      itemsPerPage={5}
      pagination
      scopedSlots={{
        no_service: (item, i) => (
          <td className="text-center">{item.no_service}</td>
        ),
        jenis_penerimaan: (item) => (
          <td className="text-center">{item.jenis_penerimaan}</td>
        ),
        id_customer: (item) => (
          <td className="text-center">{item.customer.name}</td>
        ),
        id_cabang: (item) => (
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
                  onClick={() => getDataPenerimaanById(item.no_service, "view")}
                >
                  View Details
                </CButton>
                <CButton
                  size="sm"
                  color="success"
                  className="ml-1"
                  onClick={() =>
                    getDataPenerimaanById(item.no_service, "update")
                  }
                >
                  Update
                </CButton>
                <CButton
                  size="sm"
                  color="danger"
                  className="ml-1"
                  onClick={() =>
                    getDataPenerimaanById(item.no_service, "delete")
                  }
                >
                  Delete
                </CButton>
                <a
                  href={`${process.env.REACT_APP_LARAVEL_PUBLIC}/tanda-terima-service/${item.no_service}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <CButton size="sm" color="warning" className="ml-1">
                    Cetak Tanda Terima
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
