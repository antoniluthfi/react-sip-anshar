import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CButton,
  CCol,
  CFormGroup,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSelect,
} from "@coreui/react";
import DashboardHelper from "./DashboardHelper";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";

const ModalCetakLaporan = () => {
  const dispatch = useDispatch();
  const warning = useSelector((state) => state.dashboardCetakLaporan);
  const {
    cetakLaporanHandler,
    cetakLaporan,
    setCetakLaporan,
    dataOpsi,
    submitHandler,
  } = DashboardHelper();

  return (
    <CModal
      show={warning}
      onClose={() =>
        dispatch({
          type: "CLOSE_MODAL",
          payload: false,
        })
      }
      color="warning"
      closeOnBackdrop={false}
    >
      <CModalHeader closeButton>
        <CModalTitle>Cetak Laporan</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol xs="12" md="12" className="mb-2">
            <CFormGroup>
              <CLabel htmlFor="jenis-laporan">Jenis Laporan</CLabel>
              <CSelect
                custom
                name="jenis"
                id="jenis-laporan"
                value={cetakLaporan.jenis}
                onChange={cetakLaporanHandler}
              >
                <option value="">Pilih Salah Satu</option>
                <option value="stok-barang">Stok Barang</option>
                <option value="pelanggan-user">Pelanggan User</option>
                <option value="pelanggan-reseller">Pelanggan Reseller</option>
                <option value="pesanan-penjualan">Pesanan Penjualan</option>
                <option value="pengiriman-pesanan">Pengiriman Pesanan</option>
                <option value="faktur-penjualan">Faktur Penjualan</option>
              </CSelect>
            </CFormGroup>{" "}
          </CCol>
        </CRow>

        {cetakLaporan.jenis === "pesanan-penjualan" ||
        cetakLaporan.jenis === "pengiriman-pesanan" ||
        cetakLaporan.jenis === "faktur-penjualan" ? (
          <CRow>
            <CCol xs="12" md="12">
              <CLabel htmlFor="input">
                Nomor{" "}
                {cetakLaporan.jenis === "pesanan-penjualan"
                  ? "Sales Order"
                  : cetakLaporan.jenis === "pengiriman-pesanan"
                  ? "Delivery Order"
                  : cetakLaporan.jenis === "faktur-penjualan"
                  ? "Faktur Penjualan"
                  : null}
              </CLabel>
              <Autocomplete
                id="input"
                clearOnEscape={true}
                options={dataOpsi}
                getOptionSelected={(option, value) =>
                  option.kode === value.kode
                }
                getOptionLabel={(option) => option.kode}
                value={{ kode: cetakLaporan.kode }}
                onChange={(event, values) => {
                  if (values) {
                    setCetakLaporan({
                      ...cetakLaporan,
                      kode: values.kode,
                    });
                  } else {
                    setCetakLaporan({
                      ...cetakLaporan,
                      kode: "",
                    });
                  }
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </CCol>
          </CRow>
        ) : null}
      </CModalBody>
      <CModalFooter>
        <CButton
          color="warning"
          disabled={!cetakLaporan.jenis}
          onClick={() => submitHandler(cetakLaporan.jenis)}
        >
          Cetak Laporan
        </CButton>{" "}
        <CButton
          color="secondary"
          onClick={() =>
            dispatch({
              type: "CLOSE_MODAL",
              payload: false,
            })
          }
        >
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalCetakLaporan;
