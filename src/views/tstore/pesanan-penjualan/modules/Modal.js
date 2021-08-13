import React from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CSelect,
  CTextarea,
} from "@coreui/react";
import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import CurrencyFormat from "react-currency-format";

const Modal = (props) => {
  const {
    success,
    closeModalHandler,
    buttonSubmitName,
    modalTitle,
    dataPelanggan,
    currentPelanggan,
    setCurrentPelanggan,
    input,
    setInput,
    getDataStokBarang,
    changeHandler,
    dataCabang,
    loadDataCabang,
    addInput,
    inputBarang,
    setInputBarang,
    dataBarang,
    dataSyaratPembayaran,
    loadDataSyaratPembayaran,
    removeInput,
    submitHandler,
  } = props;

  return (
    <CModal
      show={success}
      onClose={() => closeModalHandler(buttonSubmitName.toLowerCase())}
      color="success"
      closeOnBackdrop={false}
      size="lg"
    >
      <CModalHeader closeButton>
        <CModalTitle>{modalTitle}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm action="" method="post">
          <CRow>
            <CCol xs="12" md="6">
              <CFormGroup>
                <CLabel htmlFor="input-pelanggan">Nama Pelanggan</CLabel>
                <Autocomplete
                  id="input-pelanggan"
                  clearOnEscape={true}
                  options={dataPelanggan}
                  getOptionSelected={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option.name}
                  value={{ name: currentPelanggan.name }}
                  onChange={(event, values) => {
                    if (values) {
                      setCurrentPelanggan({
                        ...currentPelanggan,
                        name: values.name,
                        hak_akses: values.hak_akses,
                      });

                      setInput({
                        ...input,
                        user_id: values.id,
                      });

                      if (input.id_cabang) {
                        getDataStokBarang(input.id_cabang);
                      }
                    } else {
                      setCurrentPelanggan({
                        ...currentPelanggan,
                        name: "",
                        hak_akses: "",
                      });

                      setInput({
                        ...input,
                        user_id: "",
                      });
                    }
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </CFormGroup>
            </CCol>

            <CCol xs="12" md="6">
              <CFormGroup>
                <CLabel htmlFor="id_cabang">Pilih Cabang</CLabel>
                <CSelect
                  custom
                  name="id_cabang"
                  id="id_cabang"
                  value={input.id_cabang}
                  onChange={(e) => {
                    changeHandler(e);

                    if (currentPelanggan.hak_akses) {
                      getDataStokBarang(e.target.value);
                    }
                  }}
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

          <table className="table table-bordered table-sm">
            <thead>
              <tr className="text-center">
                <th width="5%">No</th>
                <th>Nama Barang</th>
                <th width="10%">Stok</th>
                <th width="10%">Jumlah</th>
                <th width="15%">Satuan</th>
                <th width="15%">
                  <CButton color="info" size="sm" onClick={addInput}>
                    <FontAwesomeIcon icon={faPlus} />
                  </CButton>
                </th>
              </tr>
            </thead>
            <tbody>
              {inputBarang.map((item, i) => (
                <tr>
                  <td className="text-center">{i + 1}</td>
                  <td>
                    <CFormGroup>
                      <Autocomplete
                        id="input-barang"
                        clearOnEscape={true}
                        options={dataBarang}
                        getOptionSelected={(option, value) =>
                          option.id === value.id
                        }
                        getOptionLabel={(option) => option.nama_barang}
                        value={{ nama_barang: item.nama_barang }}
                        onChange={(event, values) => {
                          if (values) {
                            const stok_dapat_dijual = values.detail.filter(
                              (stok) => stok.id_cabang == input.id_cabang
                            );
                            const val = [...inputBarang];
                            val[i].id_barang = values.id;
                            val[i].nama_barang = values.nama_barang;
                            val[i].harga_user = values.harga_user;
                            val[i].harga_reseller = values.harga_reseller;
                            val[i].stok_dapat_dijual =
                              stok_dapat_dijual.length > 0
                                ? stok_dapat_dijual[0].stok_dapat_dijual
                                : 0;
                            val[i].harga_total =
                              currentPelanggan.hak_akses === "user"
                                ? inputBarang[i].harga_user
                                : inputBarang[i].harga_reseller;
                            val[i].kuantitas = 1;
                            val[i].berat = values.berat;
                            setInputBarang(val);
                          } else {
                            const val = [...inputBarang];
                            val[i].id_barang = "";
                            val[i].nama_barang = "";
                            val[i].harga_user = "";
                            val[i].harga_reseller = "";
                            val[i].stok_dapat_dijual = "";
                            val[i].kuantitas = 1;
                            val[i].harga_total = 0;
                            val[i].kuantitas = 0;
                            val[i].berat = 0;
                            setInputBarang(val);
                          }
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </CFormGroup>
                  </td>
                  <td className="text-center">
                    {inputBarang[i].stok_dapat_dijual}
                  </td>
                  <td className="text-center">{inputBarang[i].kuantitas}</td>
                  <td className="text-right">
                    Rp.{" "}
                    {new Intl.NumberFormat(["ban", "id"]).format(
                      inputBarang[i].harga_total
                    )}
                  </td>
                  <td className="text-center">
                    <CButton
                      className="mr-1"
                      color="success"
                      size="sm"
                      onClick={() => {
                        const val = [...inputBarang];

                        if (
                          val[i].kuantitas < inputBarang[i].stok_dapat_dijual
                        ) {
                          const harga =
                            currentPelanggan.hak_akses === "user"
                              ? val[i].harga_user
                              : val[i].harga_reseller;

                          val[i].kuantitas += 1;
                          val[i].harga_total += parseInt(harga);
                          val[i].berat += parseInt(val[i].berat);
                          setInputBarang(val);
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </CButton>
                    <CButton
                      className="mr-1"
                      color="danger"
                      size="sm"
                      onClick={() => {
                        const val = [...inputBarang];

                        if (val[i].kuantitas > 1) {
                          const harga =
                            currentPelanggan.hak_akses === "user"
                              ? val[i].harga_user
                              : val[i].harga_reseller;

                          val[i].kuantitas -= 1;
                          val[i].harga_total -= parseInt(harga);
                          val[i].berat -= parseInt(val[i].berat);
                          setInputBarang(val);
                        } else {
                          removeInput(i);
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </CButton>
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

          <CRow>
            <CCol xs="12" md="6">
              <CFormGroup>
                <CLabel htmlFor="syarat-pembayaran">Syarat Pembayaran</CLabel>
                <CSelect
                  custom
                  name="id_syarat_pembayaran"
                  id="syarat-pembayaran"
                  value={input.id_syarat_pembayaran}
                  onChange={changeHandler}
                >
                  {loadDataSyaratPembayaran ? (
                    <option value="">Pilih Salah Satu</option>
                  ) : (
                    <>
                      <option value="">Pilih Salah Satu</option>
                      {dataSyaratPembayaran.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.nama}
                        </option>
                      ))}
                    </>
                  )}
                </CSelect>
              </CFormGroup>
            </CCol>
            <CCol xs="12" lg="6">
              <CFormGroup>
                <CLabel htmlFor="diskon-persen">Diskon Persen</CLabel>
                <CInput
                  type="number"
                  min="0"
                  max="100"
                  id="diskon-persen"
                  name="diskon_persen"
                  value={input.diskon_persen}
                  onChange={changeHandler}
                  placeholder="Masukkan Diskon"
                />
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="12" md="6">
              <CFormGroup>
                <CLabel htmlFor="diskon-langsung">Diskon Langsung</CLabel>
                <CurrencyFormat
                  min="0"
                  thousandSeparator={true}
                  prefix={"Rp."}
                  customInput={CInput}
                  name="diskon_langsung"
                  value={input.diskon_langsung}
                  onChange={changeHandler}
                  placeholder="Masukkan Diskon"
                />
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="12" md="12">
              <CFormGroup>
                <CLabel htmlFor="keterangan">Keterangan</CLabel>
                <CTextarea
                  id="keterangan"
                  name="keterangan"
                  value={input.keterangan}
                  onChange={changeHandler}
                  placeholder="Masukkan Keterangan"
                ></CTextarea>
              </CFormGroup>
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="success"
          onClick={() => submitHandler(buttonSubmitName.toLocaleLowerCase())}
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
  );
};

export default Modal;
