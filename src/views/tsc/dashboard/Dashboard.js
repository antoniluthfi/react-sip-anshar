import React, { useEffect, useState } from "react";
import { CCol, CRow, CWidgetDropdown } from "@coreui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import ChartLineSimple from "src/views/charts/ChartLineSimple";

const Dashboard = () => {
  const baseUrl = process.env.REACT_APP_LARAVEL_URL;
  const currentUser = useSelector((state) => state.currentUser);
  const [data, setData] = useState({
    selesai: 0,
    belum_selesai: 0,
  });

  const getTotalPendingan = async () => {
    await axios
      .get(`${baseUrl}/pengerjaan/total/pendingan/${currentUser.id}`, {
        headers: {
          Accept: "Application/json",
          Authorization: `Bearer ${localStorage.getItem("sip-token")}`,
        },
      })
      .then((response) => {
        const result = response.data.result;

        setData({
          selesai: result.selesai,
          belum_selesai: result.belum_selesai,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTotalPendingan();
  }, []);

  return (
    <>
      <h3>Selamat Datang {currentUser.name}</h3>
      <CRow>
        <CCol xs="12" md="6">
          <CWidgetDropdown
            color="gradient-success"
            header={data.selesai}
            text={`Pendingan Selesai ${currentUser.name}`}
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
            header={data.belum_selesai}
            text={`Pendingan Belum Selesai ${currentUser.name}`}
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
    </>
  );
};

export default Dashboard;
