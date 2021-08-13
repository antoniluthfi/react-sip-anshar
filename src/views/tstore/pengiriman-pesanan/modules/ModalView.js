import React from "react";
import {
  CCol,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CLabel,
  CInput,
  CModalFooter,
  CTextarea,
} from "@coreui/react";

const ModalView = (props) => {
  const {
    info,
    currentDataPengirimanPesanan,
    loadCurrentDataPengirimanPesanan,
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
                <CLabel htmlFor="tanggal-pengiriman">Tanggal Pangiriman</CLabel>
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
  );
};

export default ModalView;
