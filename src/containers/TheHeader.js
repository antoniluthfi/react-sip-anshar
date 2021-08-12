import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

// routes config
import routes from "../routes/marketingRoutes";

import { TheHeaderDropdown } from "./index";
import { useLocation } from "react-router-dom";

const TheHeader = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow.sidebarShow);
  const currentUser = useSelector((state) => state.currentUser);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <span>
          {currentUser == null
            ? null
            : `${currentUser.name} as ${currentUser.hak_akses}`}
        </span>
        <br />
        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        {location.pathname === "/dashboard" ? (
          <div className="d-md-down-none mfe-2 c-subheader-nav">
            <CButton
              color="warning"
              onClick={() => {
                dispatch({
                  type: "OPEN_MODAL",
                  payload: true,
                });
              }}
            >
              <CIcon name="cil-print" alt="Dashboard" />
              &nbsp;Cetak Laporan
            </CButton>
          </div>
        ) : null}
      </CSubheader>
    </CHeader>
  );
};

export default TheHeader;
