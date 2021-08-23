import React, { useEffect } from "react";
import StokBarangHelper from "./modules/StokBarangHelper";
import CurrencyFormat from "react-currency-format";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
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

const StokBarang = () => {
  const {
    fields,
    success,
    setSuccess,
    info,
    openModalPaket,
    dataBarang,
    setDataBarang,
    dataCabang,
    setDataCabang,
    setMaxInputCabang,
    loadDataBarang,
    currentUser,
    dataKategoriBarang,
    setDataKategoriBarang,
    loadDataKategoriBarang,
    dataBarangNonPaket,
    setDataBarangNonPaket,
    input,
    inputPaket,
    setInputPaket,
    inputCabang,
    setInputCabang,
    currentPaket,
    setCurrentPaket,
    details,
    currentStokBarang,
    loadCurrentStokBarang,
    modalTitle,
    buttonSubmitName,
    toggleDetails,
    changeHandler,
    closeModalHandler,
    submitHandler,
    addPaketHandler,
    removePaketHandler,
    getCurrentUser,
    getStokBarangById,
    getDataKategoriBarang,
    getDataBarangNonPaket,
    addInput,
    removeInput,
    getDataCabang,
  } = StokBarangHelper();

  useEffect(() => {
    getCurrentUser();
    getDataKategoriBarang();
    getDataBarangNonPaket();
    getDataCabang();

    return () => {
      setDataBarang([]);
      setDataCabang([]);
      setDataKategoriBarang([]);
      setDataBarangNonPaket([]);
      setMaxInputCabang(0);
    };
  }, []);

  return (
    <>
      <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>Data Stok Barang</CCardHeader>
            <CRow>
              <CCol xs="6" md="6">
                {currentUser.hak_akses === "admin gudang" ? (
                  <CButton
                    color="success"
                    onClick={() => setSuccess(!success)}
                    className="ml-3 mt-2"
                  >
                    Tambah Data
                  </CButton>
                ) : null}
                <a
                  href={`${process.env.REACT_APP_LARAVEL_PUBLIC}/laporan/barang/stok-barang/user/${currentUser.name}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <CButton color="warning" className="ml-3 mt-2">
                    Cetak Laporan
                  </CButton>
                </a>
              </CCol>
            </CRow>
            <CCardBody>
              <CDataTable
                items={dataBarang}
                fields={fields}
                striped
                sorter
                hover
                tableFilter
                noItemsView={
                  loadDataBarang
                    ? { noItems: "Get data" }
                    : { noResults: "Not found", noItems: "Empty" }
                }
                loading={loadDataBarang}
                itemsPerPageSelect
                itemsPerPage={5}
                pagination
                scopedSlots={{
                  id: (item, i) => <td className="text-center">{i + 1}</td>,
                  kategori: (item, i) => (
                    <td className="text-center">
                      {item.kategori.nama_kategori}
                    </td>
                  ),
                  berat: (item, i) => (
                    <td className="text-center">{item.berat}</td>
                  ),
                  harga_user: (item) => (
                    <td className="text-right">
                      Rp.{" "}
                      {new Intl.NumberFormat(["ban", "id"]).format(
                        item.harga_user
                      )}
                    </td>
                  ),
                  harga_reseller: (item) => (
                    <td className="text-right">
                      Rp.{" "}
                      {new Intl.NumberFormat(["ban", "id"]).format(
                        item.harga_reseller
                      )}
                    </td>
                  ),
                  total_pack: (item) => (
                    <td className="text-center">{item.total_pack}</td>
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
                            onClick={() => getStokBarangById(item.id, "view")}
                          >
                            View Details
                          </CButton>
                          {currentUser.hak_akses === "admin gudang" ? (
                            <>
                              <CButton
                                size="sm"
                                color="success"
                                className="ml-1"
                                onClick={() =>
                                  getStokBarangById(item.id, "update")
                                }
                              >
                                Update
                              </CButton>
                              {item.paket == 0 ? null : item.paket_barang ==
                                null ? (
                                <CButton
                                  size="sm"
                                  color="warning"
                                  className="ml-1"
                                  onClick={() =>
                                    getStokBarangById(item.id, "paket")
                                  }
                                >
                                  Buat Paket
                                </CButton>
                              ) : (
                                <CButton
                                  size="sm"
                                  color="warning"
                                  className="ml-1"
                                  onClick={() =>
                                    getStokBarangById(item.id, "deletePaket")
                                  }
                                >
                                  Delete Paket
                                </CButton>
                              )}
                              <CButton
                                size="sm"
                                color="danger"
                                className="ml-1"
                                onClick={() =>
                                  getStokBarangById(item.id, "delete")
                                }
                              >
                                Delete
                              </CButton>
                            </>
                          ) : null}
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
        onClose={() => closeModalHandler(buttonSubmitName.toLowerCase())}
        color="success"
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
                  <CLabel htmlFor="nama-barang">Nama Barang</CLabel>
                  <CInput
                    type="text"
                    id="nama-barang"
                    name="nama_barang"
                    value={input.nama_barang}
                    onChange={changeHandler}
                    placeholder="Masukkan Nama Barang"
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="kategori">Kategori</CLabel>
                  <CSelect
                    custom
                    name="kategori"
                    id="kategori"
                    value={input.kategori}
                    onChange={changeHandler}
                  >
                    {loadDataKategoriBarang ? (
                      <option value="">Pilih Salah Satu</option>
                    ) : (
                      <>
                        <option value="">Pilih Salah Satu</option>
                        {dataKategoriBarang.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.nama_kategori}
                          </option>
                        ))}
                      </>
                    )}
                  </CSelect>
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" lg="6">
                <CFormGroup>
                  <CLabel htmlFor="harga_user">Harga User</CLabel>
                  <CurrencyFormat
                    type="text"
                    name="harga_user"
                    id="harga_user"
                    value={input.harga_user}
                    onChange={changeHandler}
                    thousandSeparator={true}
                    prefix={"Rp. "}
                    customInput={CInput}
                    placeholder="Masukkan Harga User"
                  />
                </CFormGroup>
              </CCol>
              <CCol xs="12" lg="6">
                <CFormGroup>
                  <CLabel htmlFor="harga_reseller">Harga Reseller</CLabel>
                  <CurrencyFormat
                    type="text"
                    name="harga_reseller"
                    id="harga_reseller"
                    value={input.harga_reseller}
                    onChange={changeHandler}
                    thousandSeparator={true}
                    prefix={"Rp. "}
                    customInput={CInput}
                    placeholder="Masukkan Harga Reseller"
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="paket">Paket</CLabel>
                  <CSelect
                    custom
                    name="paket"
                    id="paket"
                    value={input.paket}
                    onChange={changeHandler}
                  >
                    <option value="">Pilih Salah Satu</option>
                    <option value="0">Tidak</option>
                    <option value="1">Ya</option>
                  </CSelect>
                </CFormGroup>
              </CCol>
              <CCol xs="12" md="6">
                <CFormGroup>
                  <CLabel htmlFor="berat">Berat (gram)</CLabel>
                  <CInput
                    type="number"
                    id="berat"
                    name="berat"
                    value={input.berat}
                    onChange={changeHandler}
                    placeholder="Masukkan Berat Barang"
                  />
                </CFormGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CLabel htmlFor="set_stok">Set Stok</CLabel>
                <table className="table table-sm table-bordered">
                  <thead>
                    <tr className="text-center">
                      <th>No</th>
                      <th>Nama Cabang</th>
                      <th>Tersedia</th>
                      <th>Dapat Dijual</th>
                      <th width="5%">
                        <CButton color="info" size="sm" onClick={addInput}>
                          <FontAwesomeIcon icon={faPlusCircle} />
                        </CButton>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {inputCabang.map((item, i) => (
                      <tr>
                        <td className="text-center">{i + 1}</td>
                        <td>
                          <FormControl
                            style={{
                              minWidth: 120,
                              maxWidth: 140,
                            }}
                          >
                            <Select
                              labelId="cabang"
                              id="cabang"
                              name="cabang"
                              value={inputCabang[i].id_cabang}
                              onChange={(e) => {
                                const val = [...inputCabang];
                                val[i].id_cabang = e.target.value;
                                setInputCabang(val);
                              }}
                            >
                              {dataCabang.map((cabang) => (
                                <MenuItem value={cabang.id}>
                                  {cabang.nama_cabang}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </td>
                        <td>
                          <TextField
                            id="stok-tersedia"
                            name="stok_tersedia"
                            type="number"
                            value={inputCabang[i].stok_tersedia}
                            onChange={(e) => {
                              const val = [...inputCabang];
                              val[i].stok_tersedia = e.target.value;
                              setInputCabang(val);
                            }}
                          />
                        </td>
                        <td>
                          <TextField
                            id="stok-dapat-dijual"
                            name="stok_dapat_dijual"
                            type="number"
                            value={inputCabang[i].stok_dapat_dijual}
                            onChange={(e) => {
                              const val = [...inputCabang];
                              val[i].stok_dapat_dijual = e.target.value;
                              setInputCabang(val);
                            }}
                          />
                        </td>
                        <td className="text-center">
                          <CButton
                            color="danger"
                            size="sm"
                            onClick={() => removeInput(i)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </CButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton
            color="success"
            onClick={() => submitHandler(buttonSubmitName.toLowerCase())}
          >
            {buttonSubmitName}
          </CButton>{" "}
          <CButton
            color="secondary"
            onClick={() => closeModalHandler(buttonSubmitName.toLowerCase())}
          >
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>

      {/* view data */}
      <CModal
        show={info}
        onClose={() => closeModalHandler("view")}
        color="info"
        closeOnBackdrop={false}
      >
        <CModalHeader closeButton>
          <CModalTitle>{modalTitle}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {loadCurrentStokBarang ? null : (
            <>
              <CRow>
                <CCol xs="12" md="6">
                  <CFormGroup>
                    <CLabel htmlFor="nama-barang">Nama Barang</CLabel>
                    <CInput
                      type="text"
                      id="nama-barang"
                      name="nama_barang"
                      value={currentStokBarang.nama_barang}
                      onChange={changeHandler}
                      placeholder="Masukkan Nama Barang"
                      disabled={true}
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" md="6">
                  <CFormGroup>
                    <CLabel htmlFor="kategori">Kategori</CLabel>
                    <CInput
                      type="text"
                      id="kategori"
                      name="kategori"
                      value={currentStokBarang.kategori.nama_kategori}
                      onChange={changeHandler}
                      placeholder="Masukkan Kategori"
                      disabled={true}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs="12" lg="6">
                  <CFormGroup>
                    <CLabel htmlFor="harga_user">Harga User</CLabel>
                    <CurrencyFormat
                      type="text"
                      name="harga_user"
                      value={currentStokBarang.harga_user}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                      customInput={CInput}
                      placeholder="Masukkan Harga User"
                      disabled={true}
                    />
                  </CFormGroup>
                </CCol>
                <CCol xs="12" lg="6">
                  <CFormGroup>
                    <CLabel htmlFor="harga_reseller">Harga Reseller</CLabel>
                    <CurrencyFormat
                      type="text"
                      name="harga_reseller"
                      value={currentStokBarang.harga_reseller}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                      customInput={CInput}
                      placeholder="Masukkan Harga Reseller"
                      disabled={true}
                    />
                  </CFormGroup>
                </CCol>
              </CRow>

              <CRow>
                <CCol xs="12" md="12">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th className="text-center">Cabang</th>
                        <th className="text-center">Stok tersedia</th>
                        <th className="text-center">Stok dapat dijual</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentStokBarang.detail_stok_barang.length > 0 ? (
                        currentStokBarang.detail_stok_barang.map((barang) => (
                          <tr>
                            <td>{barang.cabang.nama_cabang}</td>
                            <td className="text-center">
                              {barang.stok_tersedia}
                            </td>
                            <td className="text-center">
                              {barang.stok_dapat_dijual}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="text-center">
                            <strong>Tidak ada detail stok</strong>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </CCol>
              </CRow>

              {currentStokBarang.paket === 0 ? null : (
                <>
                  <CLabel>Satu paket dengan : </CLabel>
                  <CRow>
                    <CCol xs="12" md="12">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th className="text-center">No</th>
                            <th className="text-center">Nama Barang</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentStokBarang.paket_barang.length == 0 ? (
                            <tr>
                              <td className="text-center" colSpan="2">
                                Belum ada data
                              </td>
                            </tr>
                          ) : (
                            currentStokBarang.paket_barang.map((item, i) => (
                              <tr>
                                <td className="text-center">{i + 1}</td>
                                <td className="text-center">
                                  {item.paket.nama_barang}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </CCol>
                  </CRow>
                </>
              )}
            </>
          )}
        </CModalBody>
        <CModalFooter></CModalFooter>
      </CModal>

      {/* buat paket */}
      <CModal
        show={openModalPaket}
        onClose={() => closeModalHandler("paket")}
        color="warning"
        closeOnBackdrop={false}
      >
        <CModalHeader closeButton>
          <CModalTitle>Buat Paket</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CRow>
            <CCol xs="12" md="12">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <td className="text-center" style={{ width: "10%" }}>
                      No
                    </td>
                    <td className="text-center">Nama Barang</td>
                    <td className="text-center" style={{ width: "15%" }}>
                      <CButton color="warning" onClick={addPaketHandler}>
                        <FontAwesomeIcon icon={faPlusCircle} />
                      </CButton>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  {inputPaket.map((item, i) => (
                    <tr key={i}>
                      <td className="text-center">{i + 1}</td>
                      <td>
                        <Autocomplete
                          id={`input-barang${i}`}
                          clearOnEscape={true}
                          options={dataBarangNonPaket}
                          getOptionSelected={(option, value) =>
                            option.id === value.id
                          }
                          getOptionLabel={(option) => option.nama_barang}
                          value={{ nama_barang: currentPaket[i].nama_barang }}
                          onChange={(event, values) => {
                            if (values !== null) {
                              let a = [...currentPaket];
                              a[i].nama_barang = values.nama_barang;
                              setCurrentPaket(a);

                              let paket = [...inputPaket];
                              paket[i].id_paket = currentStokBarang.id;
                              paket[i].id_barang = values.id;
                              setInputPaket(paket);
                            } else {
                              let a = [...currentPaket];
                              a[i].nama_barang = "";
                              setCurrentPaket(a);

                              let paket = [...inputPaket];
                              paket[i].id_paket = "";
                              paket[i].id_barang = "";
                              setInputPaket(paket);
                            }
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </td>
                      <td className="text-center">
                        <CButton
                          color="danger"
                          onClick={() => removePaketHandler(i)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </CButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CCol>
          </CRow>
        </CModalBody>
        <CModalFooter>
          <CButton color="warning" onClick={() => submitHandler("paket")}>
            Submit
          </CButton>{" "}
          <CButton color="secondary" onClick={() => closeModalHandler("paket")}>
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default StokBarang;
