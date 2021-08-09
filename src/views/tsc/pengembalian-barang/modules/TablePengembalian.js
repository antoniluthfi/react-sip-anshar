import React from "react";
import { CCardBody, CDataTable, CButton, CCollapse } from "@coreui/react";

const TablePengembalian = (props) => {
  const {
    fields,
    dataPengembalian,
    isLoading,
    getDataPengembalianById,
    details,
    toggleDetails,
  } = props;

  return (
    <CDataTable
      items={dataPengembalian}
      fields={fields}
      striped
      sorter
      hover
      tableFilter
      noItemsView={
        isLoading
          ? { noItems: "Get data" }
          : { noResults: "Not found", noItems: "Empty" }
      }
      loading={isLoading}
      itemsPerPageSelect
      itemsPerPage={5}
      pagination
      scopedSlots={{
        no_pengembalian: (item, i) => (
          <td className="text-center">{item.no_pengembalian}</td>
        ),
        no_service: (item) => (
          <td className="text-center">{item.no_service}</td>
        ),
        id_customer: (item) => (
          <td className="text-center">{item.penerimaan.customer.name}</td>
        ),
        status_pengembalian: (item) => (
          <td className="text-center">
            {item.status_pengembalian ? "Dikembalikan" : "Belum Dikembalikan"}
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
                  onClick={() =>
                    getDataPengembalianById(item.no_pengembalian, "view")
                  }
                >
                  View Details
                </CButton>
                {item.status_pengembalian == 0 ? (
                  <CButton
                    size="sm"
                    color="success"
                    className="ml-1"
                    onClick={() =>
                      getDataPengembalianById(item.no_pengembalian, "update")
                    }
                  >
                    Update
                  </CButton>
                ) : (
                  <CButton
                    size="sm"
                    color="danger"
                    className="ml-1"
                    onClick={() =>
                      getDataPengembalianById(item.no_pengembalian, "delete")
                    }
                  >
                    Reset
                  </CButton>
                )}
                {item.status_pengembalian ? (
                  <a
                    href={`${process.env.REACT_APP_LARAVEL_PUBLIC}/nota-service/${item.no_pengembalian}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <CButton size="sm" color="warning" className="ml-1">
                      Cetak Nota Service
                    </CButton>
                  </a>
                ) : null}
              </CCardBody>
            </CCollapse>
          );
        },
      }}
    />
  );
};

export default TablePengembalian;
