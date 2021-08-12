import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { sidebarReducer as sidebarShow } from "./sidebarReducer";
import { dashboardCetakLaporanReducer as dashboardCetakLaporan } from "./dashboardCetakLaporanReducer";

const rootReducer = combineReducers({
  currentUser: userReducer,
  sidebarShow,
  dashboardCetakLaporan,
});

export default rootReducer;
