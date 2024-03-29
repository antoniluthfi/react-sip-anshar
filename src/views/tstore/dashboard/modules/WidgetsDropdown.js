import React, { useEffect } from "react";
import { CWidgetDropdown, CRow, CCol } from "@coreui/react";
import ChartLineSimple from "../../../charts/ChartLineSimple";
import DashboardHelper from "./DashboardHelper";

const WidgetsDropdown = () => {
  const {
    currentUser,
    pemasukanHarian,
    setPemasukanHarian,
    loadPemasukanHarian,
    setLoadPemasukanHarian,
    pemasukanBulanan,
    setPemasukanBulanan,
    loadPemasukanBulanan,
    setLoadPemasukanBulanan,
    penjualanAksesoris,
    setPenjualanAksesoris,
    penjualanLaptop,
    setPenjualanLaptop,
    penjualanCctv,
    setPenjualanCctv,
    penjualanNetworking,
    setPenjualanNetworking,
    penjualanPc,
    setPenjualanPc,
    penjualanPrinter,
    setPenjualanPrinter,
    loadPenjualanBarang,
    setLoadPenjualanBarang,
    getCurrentUser,
  } = DashboardHelper();

  useEffect(() => {
    getCurrentUser();

    return () => {
      setPemasukanHarian(0);
      setLoadPemasukanHarian(true);
      setPemasukanBulanan(0);
      setLoadPemasukanBulanan(false);
      setPenjualanAksesoris(0);
      setPenjualanLaptop(0);
      setPenjualanCctv(0);
      setPenjualanNetworking(0);
      setPenjualanPc(0);
      setPenjualanPrinter(0);
      setLoadPenjualanBarang(0);
    };
  }, []);

  return (
    <>
      <h3>Selamat Datang {currentUser.name}</h3>
      <CRow>
        <CCol xs="12" md="6">
          <CWidgetDropdown
            color="gradient-success"
            header={
              loadPemasukanBulanan
                ? "0"
                : `Rp. ${new Intl.NumberFormat(["ban", "id"]).format(
                    pemasukanBulanan
                  )}`
            }
            text={`Pemasukan bulanan ${currentUser.name}`}
            footerSlot={
              <ChartLineSimple
                pointed
                className="c-chart-wrapper mt-3 mx-3"
                style={{ height: "70px" }}
                // dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                pointHoverBackgroundColor="primary"
                label="Members"
                labels="months"
              />
            }
          ></CWidgetDropdown>
        </CCol>

        <CCol xs="12" md="6">
          <CWidgetDropdown
            color="gradient-success"
            header={
              loadPemasukanHarian
                ? "0"
                : `Rp. ${new Intl.NumberFormat(["ban", "id"]).format(
                    pemasukanHarian
                  )}`
            }
            text={`Pemasukan hari ini ${currentUser.name}`}
            footerSlot={
              <ChartLineSimple
                pointed
                className="c-chart-wrapper mt-3 mx-3"
                style={{ height: "70px" }}
                // dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                pointHoverBackgroundColor="primary"
                label="Members"
                labels="months"
              />
            }
          ></CWidgetDropdown>
        </CCol>
      </CRow>

      <CRow>
        <CCol sm="6" lg="2">
          <CWidgetDropdown
            color="gradient-info"
            header={loadPenjualanBarang ? "0" : penjualanLaptop}
            text="Penjualan Laptop"
            footerSlot={
              <ChartLineSimple
                pointed
                className="c-chart-wrapper mt-3 mx-3"
                style={{ height: "70px" }}
                // dataPoints={[65, 59, 84, 84, 51, 55, 40]}
                pointHoverBackgroundColor="primary"
                label="Members"
                labels="months"
              />
            }
          ></CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="2">
          <CWidgetDropdown
            color="gradient-info"
            header={loadPenjualanBarang ? "0" : penjualanAksesoris}
            text="Penjualan Aksesoris"
            footerSlot={
              <ChartLineSimple
                pointed
                className="mt-3 mx-3"
                style={{ height: "70px" }}
                // dataPoints={[1, 18, 9, 17, 34, 22, 11]}
                pointHoverBackgroundColor="info"
                options={{ elements: { line: { tension: 0.00001 } } }}
                label="Members"
                labels="months"
              />
            }
          ></CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="2">
          <CWidgetDropdown
            color="gradient-info"
            header={loadPenjualanBarang ? "0" : penjualanNetworking}
            text="Penjualan Networking"
            footerSlot={
              <ChartLineSimple
                className="mt-3"
                style={{ height: "70px" }}
                backgroundColor="rgba(255,255,255,.2)"
                // dataPoints={[78, 81, 80, 45, 34, 12, 40]}
                options={{ elements: { line: { borderWidth: 2.5 } } }}
                pointHoverBackgroundColor="warning"
                label="Members"
                labels="months"
              />
            }
          ></CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="2">
          <CWidgetDropdown
            color="gradient-info"
            header={loadPenjualanBarang ? "0" : penjualanCctv}
            text="Penjualan CCTV"
            footerSlot={
              <ChartLineSimple
                className="mt-3"
                style={{ height: "70px" }}
                backgroundColor="rgba(255,255,255,.2)"
                // dataPoints={[78, 81, 80, 45, 34, 12, 40]}
                options={{ elements: { line: { borderWidth: 2.5 } } }}
                pointHoverBackgroundColor="warning"
                label="Members"
                labels="months"
              />
            }
          ></CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="2">
          <CWidgetDropdown
            color="gradient-info"
            header={loadPenjualanBarang ? "0" : penjualanPc}
            text="Penjualan PC"
            footerSlot={
              <ChartLineSimple
                className="mt-3"
                style={{ height: "70px" }}
                backgroundColor="rgba(255,255,255,.2)"
                // dataPoints={[78, 81, 80, 45, 34, 12, 40]}
                options={{ elements: { line: { borderWidth: 2.5 } } }}
                pointHoverBackgroundColor="warning"
                label="Members"
                labels="months"
              />
            }
          ></CWidgetDropdown>
        </CCol>

        <CCol sm="6" lg="2">
          <CWidgetDropdown
            color="gradient-info"
            header={loadPenjualanBarang ? "0" : penjualanPrinter}
            text="Penjualan Printer"
            footerSlot={
              <ChartLineSimple
                className="mt-3"
                style={{ height: "70px" }}
                backgroundColor="rgba(255,255,255,.2)"
                // dataPoints={[78, 81, 80, 45, 34, 12, 40]}
                options={{ elements: { line: { borderWidth: 2.5 } } }}
                pointHoverBackgroundColor="warning"
                label="Members"
                labels="months"
              />
            }
          ></CWidgetDropdown>
        </CCol>
      </CRow>
    </>
  );
};

export default WidgetsDropdown;
