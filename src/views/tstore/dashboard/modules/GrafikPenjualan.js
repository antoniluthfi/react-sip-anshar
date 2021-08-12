import React from "react";
import {
  CBadge,
  CCallout,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CProgressBar,
  CRow,
  CTooltip,
} from "@coreui/react";

const data = [
  {
    bulan: "Desember 2019",
    pemasukan_total: 6625928238,
    detail: [
      {
        nama_cabang: "Twincom Banjarbaru",
        pemasukan: 2665659190,
        color: "info",
      },
      {
        nama_cabang: "Twincom Banjarmasin",
        pemasukan: 1040735338,
        color: "danger",
      },
      {
        nama_cabang: "Twincom Landasan Ulin",
        pemasukan: 747562100,
        color: "warning",
      },
      {
        nama_cabang: "Twincom Distribution Center",
        pemasukan: 2171971560,
        color: "success",
      },
    ],
  },
  {
    bulan: "Januari 2020",
    pemasukan_total: 5988474788,
    detail: [
      {
        nama_cabang: "Twincom Banjarbaru",
        pemasukan: 2403208469,
        color: "info",
      },
      {
        nama_cabang: "Twincom Banjarmasin",
        pemasukan: 681089839,
        color: "danger",
      },
      {
        nama_cabang: "Twincom Landasan Ulin",
        pemasukan: 879161755,
        color: "warning",
      },
      {
        nama_cabang: "Twincom Distribution Center",
        pemasukan: 2025014725,
        color: "success",
      },
    ],
  },
  {
    bulan: "Februari 2020",
    pemasukan_total: 6225813451,
    detail: [
      {
        nama_cabang: "Twincom Banjarbaru",
        pemasukan: 2471571440,
        color: "info",
      },
      {
        nama_cabang: "Twincom Banjarmasin",
        pemasukan: 723462901,
        color: "danger",
      },
      {
        nama_cabang: "Twincom Landasan Ulin",
        pemasukan: 859793180,
        color: "warning",
      },
      {
        nama_cabang: "Twincom Distribution Center",
        pemasukan: 2170985930,
        color: "success",
      },
    ],
  },
  {
    bulan: "Maret 2020",
    pemasukan_total: 6034320626,
    detail: [
      {
        nama_cabang: "Twincom Banjarbaru",
        pemasukan: 2375583370,
        color: "info",
      },
      {
        nama_cabang: "Twincom Banjarmasin",
        pemasukan: 1053412670,
        color: "danger",
      },
      {
        nama_cabang: "Twincom Landasan Ulin",
        pemasukan: 702514780,
        color: "warning",
      },
      {
        nama_cabang: "Twincom Distribution Center",
        pemasukan: 1902809806,
        color: "success",
      },
    ],
  },
  {
    bulan: "April 2020",
    pemasukan_total: 5056148038,
    detail: [
      {
        nama_cabang: "Twincom Banjarbaru",
        pemasukan: 1912567003,
        color: "info",
      },
      {
        nama_cabang: "Twincom Banjarmasin",
        pemasukan: 632266955,
        color: "danger",
      },
      {
        nama_cabang: "Twincom Landasan Ulin",
        pemasukan: 606482087,
        color: "warning",
      },
      {
        nama_cabang: "Twincom Distribution Center",
        pemasukan: 1904831983,
        color: "success",
      },
    ],
  },
  {
    bulan: "Mei 2020",
    pemasukan_total: 3389156187,
    detail: [
      {
        nama_cabang: "Twincom Banjarbaru",
        pemasukan: 1279133953,
        color: "info",
      },
      {
        nama_cabang: "Twincom Banjarmasin",
        pemasukan: 450442837,
        color: "danger",
      },
      {
        nama_cabang: "Twincom Landasan Ulin",
        pemasukan: 536608789,
        color: "warning",
      },
      {
        nama_cabang: "Twincom Distribution Center",
        pemasukan: 1122970608,
        color: "success",
      },
    ],
  },
];

const GrafikPenjualan = () => (
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
          Grafik Penjualan Sebelum dan Semasa Pandemi Covid-19 (6 Bulan)
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs="12" md="12" xl="12">
              <CRow>
                <CCol sm="3">
                  <CCallout color="info">
                    <small className="text-muted">Twincom Banjarbaru</small>
                    <br />
                    <strong className="h4">Rp. 13.107.723.425</strong>
                  </CCallout>
                </CCol>
                <CCol sm="3">
                  <CCallout color="danger">
                    <small className="text-muted">Twincom Banjarmasin</small>
                    <br />
                    <strong className="h4">Rp. 4.581.410.540</strong>
                  </CCallout>
                </CCol>

                <CCol sm="3">
                  <CCallout color="warning">
                    <small className="text-muted">Twincom Landasan Ulin</small>
                    <br />
                    <strong className="h4">Rp. 4.332.122.691</strong>
                  </CCallout>
                </CCol>
                <CCol sm="3">
                  <CCallout color="success">
                    <small className="text-muted">
                      Twincom Distribution Center
                    </small>
                    <br />
                    <strong className="h4">Rp. 11.298.584.612</strong>
                  </CCallout>
                </CCol>
              </CRow>

              <hr className="mt-0" />

              {data.map((item, i) => (
                <div key={i} className="progress-group mb-4">
                  <div className="progress-group-prepend">
                    <span className="progress-group-text">
                      {item.bulan}
                      <br />
                      {new Intl.NumberFormat(["ban", "id"]).format(
                        item.pemasukan_total
                      )}
                    </span>
                  </div>
                  <div className="progress-group-bars">
                    {item.detail.map((detail, i) => (
                      <CProgress key={i}>
                        <CTooltip
                          content={`${
                            detail.nama_cabang
                          } ${new Intl.NumberFormat(["ban", "id"]).format(
                            detail.pemasukan
                          )}`}
                          placement="top"
                        >
                          <CProgressBar
                            value={detail.pemasukan}
                            color={detail.color}
                            max={item.pemasukan_total}
                            showPercentage={true}
                          >
                            {new Intl.NumberFormat(["ban", "id"]).format(
                              detail.pemasukan
                            )}
                          </CProgressBar>
                        </CTooltip>
                      </CProgress>
                    ))}
                  </div>
                </div>
              ))}

              <div className="legend text-center">
                <small>
                  {data[0].detail.map((item, i) => (
                    <>
                      <sup key={i} className="px-1">
                        <CBadge shape="pill" color={item.color}>
                          &nbsp;
                        </CBadge>
                      </sup>
                      {item.nama_cabang} &nbsp;
                    </>
                  ))}
                </small>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
);

export default GrafikPenjualan;
