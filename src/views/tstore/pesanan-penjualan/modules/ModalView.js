import React from "react";
import {
  CCol,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CFormGroup,
  CLabel,
  CInput,
  CModalFooter,
  CTextarea,
} from "@coreui/react";

const ModalView = (props) => {
  const {
    info,
    currentPesananPenjualan,
    loadCurrentDataPesananPenjualan,
    closeModalHandler,
  } = props;

  return (
    <CModal
      show={info}
      onClose={() => closeModalHandler("view")}
      color="info"
      closeOnBackdrop={false}
    >
      <CModalHeader closeButton>
        <CModalTitle>Data Pesanan Penjualan</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {loadCurrentDataPesananPenjualan ? null : (
          <>
            <CRow>
              <CCol xs="12" md="12" className="table-responsive">
                <table className="table table-sm table-bordered">
                  <thead>
                    <tr className="text-center">
                      <th>NO</th>
                      <th>Nama Barang</th>
                      <th>Jumlah</th>
                      <th>Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPesananPenjualan.detail_pesanan_penjualan.map(
                      (detail, i) => (
                        <tr>
                          <td className="text-center">{i + 1}</td>
                          <td>{detail.barang.nama_barang}</td>
                          <td className="text-center">{detail.kuantitas}</td>
                          <td className="text-right">
                            Rp.{" "}
                            {new Intl.NumberFormat(["ban", "id"]).format(
                              detail.total_harga
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </CCol>
            </CRow>

            <CRow className="mt-2">
              <CCol xs="12" md="6">
                <CLabel htmlFor="diskon">Diskon</CLabel>
                <CInput
                  type="text"
                  id="diskon"
                  name="diskon"
                  value={currentPesananPenjualan.diskon}
                  placeholder="Diskon"
                  disabled={true}
                />
              </CCol>
              <CCol xs="12" md="6">
                <CLabel htmlFor="total_harga">Total Harga</CLabel>
                <CInput
                  type="text"
                  id="total_harga"
                  name="total_harga"
                  value={`Rp. ${new Intl.NumberFormat(["ban", "id"]).format(
                    currentPesananPenjualan.total_harga
                  )}`}
                  placeholder="Total Harga"
                  disabled={true}
                />
              </CCol>
            </CRow>

            <CRow className="mt-2">
              <CCol xs="12" md="6">
                <CLabel htmlFor="penjual">Penjual</CLabel>
                <CInput
                  type="text"
                  id="penjual"
                  name="penjual"
                  value={currentPesananPenjualan.penjual.name}
                  placeholder="Nama Barang"
                  disabled={true}
                />
              </CCol>
            </CRow>

            <CRow className="mt-2">
              <CCol xs="12" md="12">
                <CFormGroup>
                  <CLabel htmlFor="keterangan">Keterangan</CLabel>
                  <CTextarea
                    id="keterangan"
                    value={currentPesananPenjualan.keterangan}
                    placeholder="Keterangan"
                    disabled={true}
                  ></CTextarea>
                </CFormGroup>
              </CCol>
            </CRow>
          </>
        )}
      </CModalBody>
      <CModalFooter></CModalFooter>
    </CModal>
  );
};

export default ModalView;
