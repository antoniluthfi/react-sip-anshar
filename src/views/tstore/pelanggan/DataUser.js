import React, { useEffect } from "react";
import DataUserHelper from "./modules/DataUserHelper";
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
} from "@coreui/react";

const DataUser = () => {
  const {
    currentUser,
    fields,
    success,
    setSuccess,
    color,
    buttonSubmitName,
    buttonVisibility,
    modalTitle,
    dataUser,
    loadDataUser,
    dataCabang,
    loadDataCabang,
    formDisabled,
    input,
    details,
    toggleDetails,
    closeModalHandler,
    changeHandler,
    submitHandler,
    getDataUser,
    getDataUserById,
  } = DataUserHelper();

  useEffect(() => {
    getDataUser();
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Data Pelanggan (User)</CCardHeader>
            <CRow>
              <CCol xs="6" lg="6">
                <CButton
                  color="success"
                  onClick={() => setSuccess(!success)}
                  className="ml-3 mt-2"
                >
                  Tambah Data
                </CButton>

                <a
                  href={`${process.env.REACT_APP_LARAVEL_PUBLIC}/laporan/pelanggan/data-pelanggan/role/user/user/${currentUser.name}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <CButton color="warning" className="ml-1 mt-2">
                    Cetak Laporan
                  </CButton>
                </a>
              </CCol>
            </CRow>
            <CCardBody>
              <CDataTable
                items={dataUser}
                fields={fields}
                striped
                sorter
                hover
                tableFilter
                noItemsView={
                  loadDataUser
                    ? { noItems: "Get data" }
                    : { noResults: "Not found", noItems: "Empty" }
                }
                loading={loadDataUser}
                itemsPerPageSelect
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  id: (item, i) => <td className="text-center">{i + 1}</td>,
                  nama_cabang: (item) => (
                    <td className="text-center">{item.cabang.nama_cabang}</td>
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
                            onClick={() => getDataUserById(item.id, "view")}
                          >
                            View Details
                          </CButton>
                          <CButton
                            size="sm"
                            color="success"
                            className="ml-1"
                            onClick={() => getDataUserById(item.id, "update")}
                          >
                            Update
                          </CButton>
                          <CButton
                            size="sm"
                            color="danger"
                            className="ml-1"
                            onClick={() => getDataUserById(item.id, "delete")}
                          >
                            Delete
                          </CButton>
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
        onClose={closeModalHandler}
        color={color}
        closeOnBackdrop={false}
      >
        <CModalHeader closeButton>
          <CModalTitle>{modalTitle}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm action="" method="post">
            <CRow>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="name">Nama</CLabel>
                  <CInput
                    type="text"
                    id="name"
                    name="name"
                    value={input.name}
                    onChange={changeHandler}
                    placeholder="Masukkan Nama"
                    disabled={formDisabled}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="alamat">Alamat</CLabel>
                  <CInput
                    type="text"
                    id="alamat"
                    name="alamat"
                    value={input.alamat}
                    onChange={changeHandler}
                    placeholder="Masukkan Alamat"
                    disabled={formDisabled}
                  />
                </CFormGroup>
              </CCol>
            </CRow>

            <CRow>
              <CCol xs="12" lg="6">
                <CFormGroup>
                  <CLabel htmlFor="email">Email</CLabel>
                  <CInput
                    type="email"
                    id="email"
                    name="email"
                    value={input.email}
                    onChange={changeHandler}
                    placeholder="Masukkan Email"
                    disabled={formDisabled}
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" lg="6">
                <CFormGroup>
                  <CLabel htmlFor="nomorhp">Nomor HP</CLabel>
                  <CInput
                    type="text"
                    id="nomorhp"
                    name="nomorhp"
                    value={input.nomorhp}
                    onChange={changeHandler}
                    placeholder="Masukkan Nomor HP"
                    disabled={formDisabled}
                  />
                </CFormGroup>
              </CCol>
            </CRow>

            <CRow>
              <CCol xs="12" lg="6">
                <CFormGroup>
                  <CLabel htmlFor="cab-penempatan">Cabang Penempatan</CLabel>
                  <CSelect
                    custom
                    name="id_cabang"
                    id="cab-penempatan"
                    value={input.id_cabang}
                    onChange={changeHandler}
                    disabled={formDisabled}
                  >
                    {loadDataCabang ? (
                      <option value="">Pilih Salah Satu</option>
                    ) : (
                      <>
                        <option value="">Pilih Salah Satu</option>
                        {dataCabang.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.nama_cabang}
                          </option>
                        ))}
                      </>
                    )}
                  </CSelect>
                </CFormGroup>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="success"
            className={buttonVisibility}
            onClick={() => submitHandler(buttonSubmitName.toLocaleLowerCase())}
          >
            {buttonSubmitName}
          </CButton>{" "}
          <CButton
            color="secondary"
            className={buttonVisibility}
            onClick={closeModalHandler}
          >
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default DataUser;
