import React from "react";
import GrafikPenjualan from "./modules/GrafikPenjualan";
import WidgetsDropdown from "./modules/WidgetsDropdown";
import ModalCetakLaporan from "./modules/ModalCetakLaporan";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <>
      {currentUser && currentUser.hak_akses === "marketing" ? (
        <WidgetsDropdown />
      ) : null}
      <GrafikPenjualan />

      <ModalCetakLaporan />
    </>
  );
};
export default Dashboard;
