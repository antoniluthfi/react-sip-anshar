import React from "react";
import { CCardBody, CDataTable, CButton, CCollapse } from "@coreui/react";

const TableArusKas = (props) => {
  const {
    fields,
    dataArusKas,
    isLoading,
    getArusKasById,
    details,
    toggleDetails,
  } = props;

  return (
    <CDataTable
      items={dataArusKas}
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
        id: (item, i) => <td className="text-center">{item.id}</td>,
        id_admin: (item) => <td className="text-center">{item.admin.name}</td>,
        id_cabang: (item) => (
          <td className="text-center">{item.cabang.nama_cabang}</td>
        ),
        nominal: (item) => (
          <td className="text-right">
            Rp. {new Intl.NumberFormat(["ban", "id"]).format(item.nominal)}
          </td>
        ),
        total_biaya: (item) => (
          <td className="text-right">
            Rp. {new Intl.NumberFormat(["ban", "id"]).format(item.total_biaya)}
          </td>
        ),
        masuk: (item) => (
          <td className="text-center">{item.masuk ? "Masuk" : "Keluar"}</td>
        ),
        status_pembayaran: (item) => (
          <td className="text-center">
            {item.status_pembayaran ? "Lunas" : "Belum Lunas"}
          </td>
        ),
        keterangan: (item) => <td>{item.keterangan}</td>,
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
                  onClick={() => getArusKasById(item.id, "view")}
                >
                  View Details
                </CButton>
                <CButton
                  size="sm"
                  color="success"
                  className="ml-1"
                  onClick={() => getArusKasById(item.id, "update")}
                >
                  Update
                </CButton>
                <CButton
                  size="sm"
                  color="danger"
                  className="ml-1"
                  onClick={() => getArusKasById(item.id, "delete")}
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

export default TableArusKas;
