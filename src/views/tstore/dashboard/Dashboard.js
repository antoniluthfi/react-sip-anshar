import React, { lazy } from "react";
import GrafikPenjualan from "./GrafikPenjualan.js";
import { useSelector } from "react-redux";

const WidgetsDropdown = lazy(() => import("./WidgetsDropdown.js"));

const Dashboard = () => {
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <>
      {currentUser && currentUser.hak_akses === "marketing" ? (
        <WidgetsDropdown />
      ) : null}
      <GrafikPenjualan />
    </>
  );
};
export default Dashboard;
