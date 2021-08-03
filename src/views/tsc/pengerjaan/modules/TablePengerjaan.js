import React from "react";
import { CCardBody, CDataTable, CButton, CCollapse } from "@coreui/react";

const TablePengerjaan = (props) => {
  const {
    fields,
    dataPengerjaan,
    isLoading,
    getDataPengerjaanById,
    details,
    toggleDetails,
  } = props;

  return (
    <CDataTable
      items={dataPengerjaan}
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
        no_pengerjaan: (item, i) => (
          <td className="text-center">{item.no_pengerjaan}</td>
        ),
        no_service: (item) => (
          <td className="text-center">{item.penerimaan.no_service}</td>
        ),
        id_customer: (item) => (
          <td className="text-center">{item.penerimaan.customer.name}</td>
        ),
        id_barang_jasa: (item) => (
          <td className="text-center">{item.penerimaan.barang_jasa.nama}</td>
        ),
        progress: (item) => (
          <td className="text-center">{item.pengerjaan.progress} %</td>
        ),
        nominal: (item) => (
          <td className="text-right">
            Rp.{" "}
            {new Intl.NumberFormat(["ban", "id"]).format(
              item.pengerjaan.nominal
            )}
          </td>
        ),
        status_pengerjaan: (item) => (
          <td className="text-center">
            {item.pengerjaan.status_pengerjaan ? "Selesai" : "Belum Selesai"}
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
                    getDataPengerjaanById(item.no_pengerjaan, "view")
                  }
                >
                  View Details
                </CButton>
                {item.pengerjaan.status_pengerjaan == 0 ? (
                  <CButton
                    size="sm"
                    color="success"
                    className="ml-1"
                    onClick={() =>
                      getDataPengerjaanById(item.no_pengerjaan, "update")
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
                      getDataPengerjaanById(item.no_pengerjaan, "delete")
                    }
                  >
                    Reset
                  </CButton>
                )}
              </CCardBody>
            </CCollapse>
          );
        },
      }}
    />
  );
};

export default TablePengerjaan;
