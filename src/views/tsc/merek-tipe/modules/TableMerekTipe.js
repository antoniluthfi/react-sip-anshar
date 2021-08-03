import React from "react";
import { CCardBody, CDataTable, CButton, CCollapse } from "@coreui/react";

const TableMerek = (props) => {
  const {
    dataMerekTipe,
    fields,
    loadDataMerekTipe,
    details,
    toggleDetails,
    getDataTipeById,
  } = props;

  return (
    <CDataTable
      items={dataMerekTipe}
      fields={fields}
      striped
      sorter
      hover
      tableFilter
      noItemsView={
        loadDataMerekTipe
          ? { noItems: "Get data" }
          : { noResults: "Not found", noItems: "Empty" }
      }
      loading={loadDataMerekTipe}
      itemsPerPageSelect
      itemsPerPage={5}
      pagination
      scopedSlots={{
        id: (item, i) => <td className="text-center">{i + 1}</td>,
        nama: (item) => <td className="text-center">{item.nama}</td>,
        kategori: (item) => (
          <td className="text-center">{item.barang_jasa.nama}</td>
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
                  onClick={() => getDataTipeById(item.id, "view")}
                >
                  View Details
                </CButton>
                <CButton
                  size="sm"
                  color="success"
                  className="ml-1"
                  onClick={() => getDataTipeById(item.id, "update")}
                >
                  Update
                </CButton>
                <CButton
                  size="sm"
                  color="danger"
                  className="ml-1"
                  onClick={() => getDataTipeById(item.id, "delete")}
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

export default TableMerek;
