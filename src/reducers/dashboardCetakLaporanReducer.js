export const dashboardCetakLaporanReducer = (state = false, action) => {
  switch (action.type) {
    case "OPEN_MODAL":
    case "CLOSE_MODAL":
      return action.payload;
    default:
      return state;
  }
};
