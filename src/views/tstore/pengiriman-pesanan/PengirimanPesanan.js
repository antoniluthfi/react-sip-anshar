import React, { useEffect } from "react";
import PengirimanPesananHelper from "./modules/PengirimanPesananHelper";
import CurrencyFormat from "react-currency-format";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CModalFooter,
  CCollapse,
  CSelect,
  CTextarea,
} from "@coreui/react";

const PengirimanPesanan = () => {
  const {
    fields,
    success,
    info,
    dataPengirimanPesanan,
    setDataPengirimanPesanan,
    loadDataPengirimanPesanan,
    setLoadDatapengirimanPesanan,
    currentDataPengirimanPesanan,
    setCurrentDataPengirimanPesanan,
    loadCurrentDataPengirimanPesanan,
    setLoadCurrentDataPengirimanPesanan,
    dataEkspedisi,
    setDataEkspedisi,
    loadDataEkspedisi,
    setLoadDataEkspedisi,
    dataProvinsi,
    setDataProvinsi,
    dataKota,
    setDataKota,
    dataOngkir,
    setDataOngkir,
    input,
    details,
    toggleDetails,
    changeHandler,
    submitHandler,
    closeModalHandler,
    getDataPengirimanPesanan,
    getDataPengirimanPesananById,
    getDataEkspedisi,
    postDataFakturPenjualan,
    deleteDataFakturPenjualan,
    getDataProvinsi,
    getDataKota,
    getDataOngkir,
  } = PengirimanPesananHelper();

  useEffect(() => {
    getDataPengirimanPesanan();
    getDataEkspedisi();
    getDataProvinsi();

    return () => {
      setDataPengirimanPesanan([]);
      setLoadDatapengirimanPesanan(true);
      setCurrentDataPengirimanPesanan({});
      setLoadCurrentDataPengirimanPesanan(true);
      setDataEkspedisi([]);
      setLoadDataEkspedisi(true);
      setDataProvinsi([]);
      setDataKota([]);
      setDataOngkir([]);
    };
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Pengiriman Pesanan</CCardHeader>
            <CCardBody>
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
                  nomorhp: (item) => (
                    <td className="text-center">{item.user.nomorhp}</td>
                  ),
                  alamat: (item) => <td>{item.user.alamat}</td>,
                  nama_cabang: (item) => (
                    <td className="text-center">{item.cabang.nama_cabang}</td>
                  ),
                  ekspedisi: (item) => (
                    <td className="text-center">
                      {item.ekspedisi == null
                        ? "-"
                        : item.ekspedisi.nama_ekspedisi}
                    </td>
                  ),
                  ongkir: (item) => (
                    <td className="text-right">
                      Rp.{" "}
                      {new Intl.NumberFormat(["ban", "id"]).format(item.ongkir)}
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
                              getDataPengirimanPesananById(
                                item.kode_pengiriman,
                                "view"
                              )
                            }
                          >
                            View Details
                          </CButton>
                          <CButton
                            size="sm"
                            color="success"
                            className="ml-1"
                            onClick={() =>
                              getDataPengirimanPesananById(
                                item.kode_pengiriman,
                                "update"
                              )
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
                                deleteDataFakturPenjualan(
                                  item.faktur_penjualan.no_faktur
                                )
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
                              getDataPengirimanPesananById(
                                item.kode_pengiriman,
                                "delete"
                              )
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
                              <CButton
                                size="sm"
                                color="warning"
                                className="ml-1"
                              >
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
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* add, edit data */}
      <CModal
        show={success}
        onClose={() => closeModalHandler("update")}
        color="success"
        closeOnBackdrop={false}
      >
        <CModalHeader closeButton>
          <CModalTitle>Update Data</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm action="" method="post">
            <CRow>
              <CCol xs="12" md="6">
                <CLabel htmlFor="tanggal-pengiriman">Tanggal Pengiriman</CLabel>
                <CInput
                  type="date"
                  name="tanggal_pengiriman"
                  id="tanggal-pengiriman"
                  value={input.tanggal_pengiriman}
                  onChange={changeHandler}
                  placeholder="Pilih Tanggal Pengiriman"
                />
              </CCol>
              <CCol xs="12" md="6">
                <CLabel htmlFor="provinsi">Provinsi Tujuan</CLabel>
                <CSelect
                  custom
                  name="provinsi"
                  id="provinsi"
                  value={input.provinsi}
                  onChange={(e) => {
                    changeHandler(e);
                    getDataKota(e.target.value);

                    if (e.target.value && input.kota && input.ekspedisi) {
                      getDataOngkir();
                    }
                  }}
                >
                  {dataProvinsi.length === 0 ? (
                    <option value="">Pilih Salah Satu</option>
                  ) : (
                    <>
                      <option value="">Pilih Salah Satu</option>
                      {dataProvinsi.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.nama_provinsi}
                        </option>
                      ))}
                    </>
                  )}
                </CSelect>
              </CCol>
            </CRow>

            <CRow className="mt-2">
              <CCol xs="12" md="6">
                <CLabel htmlFor="kota">Kota Tujuan</CLabel>
                <CSelect
                  custom
                  name="kota"
                  id="kota"
                  value={input.kota}
                  onChange={changeHandler}
                >
                  {dataKota.length === 0 ? (
                    <option value="">Pilih Salah Satu</option>
                  ) : (
                    <>
                      <option value="">Pilih Salah Satu</option>
                      {dataKota.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.nama_kota}
                        </option>
                      ))}
                    </>
                  )}
                </CSelect>
              </CCol>
              <CCol xs="12" md="6">
                <CLabel htmlFor="ekspedisi">Ekspedisi</CLabel>
                <CSelect
                  custom
                  name="ekspedisi"
                  id="ekspedisi"
                  value={input.ekspedisi}
                  onChange={changeHandler}
                >
                  <option value="">Pilih Salah Satu</option>
                  {dataEkspedisi.length === 0
                    ? null
                    : dataEkspedisi.map((item) => (
                        <option
                          key={item.id}
                          value={item.nama_ekspedisi.toLowerCase()}
                        >
                          {item.nama_ekspedisi}
                        </option>
                      ))}
                </CSelect>
              </CCol>
            </CRow>

            <CRow className="mt-2">
              <CCol xs="12" md="12">
                <CLabel htmlFor="ongkir">Ongkos Kirim</CLabel>
                <CSelect
                  custom
                  name="ongkir"
                  id="ongkir"
                  value={input.ongkir}
                  onChange={changeHandler}
                >
                  {dataOngkir.length === 0 ? (
                    <option value="">Pilih Salah Satu</option>
                  ) : (
                    <>
                      <option value="">Pilih Salah Satu</option>
                      {dataOngkir.map((item, i) => (
                        <option key={i} value={item.cost[0].value}>
                          {item.service} - Rp.{" "}
                          {new Intl.NumberFormat(["ban", "id"]).format(
                            item.cost[0].value
                          )}{" "}
                          - ({item.cost[0].etd} Hari)
                        </option>
                      ))}
                    </>
                  )}
                </CSelect>
              </CCol>
            </CRow>

            <CRow className="mt-2">
              <CCol xs="12" lg="6">
                <CFormGroup>
                  <CLabel htmlFor="alamat">Alamat</CLabel>
                  <CTextarea
                    name="alamat"
                    id="alamat"
                    value={input.alamat}
                    onChange={changeHandler}
                    placeholder="Masukkan Alamat"
                  ></CTextarea>
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="keterangan">Keterangan</CLabel>
                  <CTextarea
                    name="keterangan"
                    id="keterangan"
                    value={input.keterangan}
                    onChange={changeHandler}
                    placeholder="Masukkan Keterangan"
                  ></CTextarea>
                </CFormGroup>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={() => submitHandler("update")}>
            Update
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => closeModalHandler("update")}
          >
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>

      {/* view data */}
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
          {loadCurrentDataPengirimanPesanan ? null : (
            <>
              <CRow>
                <CCol xs="12" md="6">
                  <CLabel htmlFor="nama-pelanggan">Nama Pelanggan</CLabel>
                  <CInput
                    type="text"
                    name="nama_pelanggan"
                    id="nama-pelanggan"
                    value={currentDataPengirimanPesanan.user.name}
                    disabled={true}
                  />
                </CCol>
                <CCol xs="12" md="6">
                  <CLabel htmlFor="tanggal-pengiriman">
                    Tanggal Pangiriman
                  </CLabel>
                  <CInput
                    type="text"
                    name="tanggal_pengiriman"
                    id="tanggal-pengiriman"
                    value={currentDataPengirimanPesanan.tanggal_pengiriman}
                    disabled={true}
                  />
                </CCol>
              </CRow>

              <CRow className="mt-2">
                <CCol xs="12" md="6">
                  <CLabel htmlFor="cabang">Cabang</CLabel>
                  <CInput
                    type="text"
                    name="cabang"
                    id="cabang"
                    value={currentDataPengirimanPesanan.cabang.nama_cabang}
                    disabled={true}
                  />
                </CCol>
                <CCol xs="12" md="6">
                  <CLabel htmlFor="ongkir">Biaya Ongkos Kirim</CLabel>
                  <CInput
                    type="text"
                    name="ongkir"
                    id="ongkir"
                    value={`Rp. ${new Intl.NumberFormat(["ban", "id"]).format(
                      currentDataPengirimanPesanan.ongkir
                    )}`}
                    disabled={true}
                  />
                </CCol>
              </CRow>

              <CRow className="mt-2">
                <CCol xs="12" md="6">
                  <CLabel htmlFor="ekspedisi">Ekspedisi</CLabel>
                  <CInput
                    type="text"
                    name="ekspedisi"
                    id="ekspedisi"
                    value={
                      currentDataPengirimanPesanan.ekspedisi == null
                        ? null
                        : currentDataPengirimanPesanan.ekspedisi.nama_ekspedisi
                    }
                    disabled={true}
                  />
                </CCol>
                <CCol xs="12" md="6">
                  <CLabel htmlFor="syarat-pembayaran">Syarat Pembayaran</CLabel>
                  <CInput
                    type="text"
                    name="syarat_pembayaran"
                    id="syarat-pembayaran"
                    value={
                      currentDataPengirimanPesanan.pesanan_penjualan
                        .syarat_pembayaran.nama
                    }
                    disabled={true}
                  />
                </CCol>
              </CRow>

              <CRow className="mt-2">
                <CCol xs="12" md="6">
                  <CLabel htmlFor="alamat">Alamat</CLabel>
                  <CTextarea
                    name="alamat"
                    id="alamat"
                    value={currentDataPengirimanPesanan.alamat}
                    placeholder="Masukkan Alamat"
                    disabled={true}
                  ></CTextarea>
                </CCol>
                <CCol xs="12" md="6">
                  <CLabel htmlFor="keterangan">Keterangan</CLabel>
                  <CTextarea
                    name="keterangan"
                    id="keterangan"
                    value={currentDataPengirimanPesanan.keterangan}
                    placeholder="Masukkan Keterangan"
                    disabled={true}
                  ></CTextarea>
                </CCol>
              </CRow>
            </>
          )}
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>
    </>
  );
};

export default PengirimanPesanan;
