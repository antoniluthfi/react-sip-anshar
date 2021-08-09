import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  CCol,
  CRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CFormGroup,
  CLabel,
  CTextarea,
  CModalFooter,
  CInput,
} from "@coreui/react";

const ModalPersiapanBarangBaru = (props) => {
  const {
    persiapanBarangBaru,
    color,
    buttonSubmitName,
    buttonVisibility,
    modalTitle,
    formDisabled,
    changeHandler,
    submitHandler,
    input,
    setInput,
    closeModalHandler,
    dataPelanggan,
    dataTipe,
    currentTipe,
    setCurrentTipe,
    dataBarangJasa,
    currentBarangJasa,
    setCurrentBarangJasa,
    dataTeknisi,
    currentTeknisi,
    setCurrentTeknisi,
    getDataTipe,
  } = props;

  const [currentPelanggan, setCurrentPelanggan] = React.useState({
    id: "",
    name: "",
  });

  return (
    <CModal
      show={persiapanBarangBaru}
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
            <CCol xs="12" md="12">
              <CFormGroup>
                <CLabel htmlFor="input-pelanggan">Nama Pelanggan</CLabel>
                <Autocomplete
                  id="input-pelanggan"
                  options={dataPelanggan}
                  disabled={formDisabled}
                  autoHighlight
                  getOptionLabel={(option) => option.name}
                  value={{ name: currentPelanggan.name }}
                  renderOption={(option) => (
                    <span
                      onClick={() => {
                        if (option) {
                          setCurrentPelanggan({
                            id: option.id,
                            name: option.name,
                          });
                          setInput({
                            ...input,
                            id_customer: option.id,
                          });
                        } else {
                          setCurrentPelanggan({
                            id: "",
                            name: "",
                          });
                          setInput({
                            ...input,
                            id_customer: "",
                          });
                        }
                      }}
                    >
                      {option.name} / {option.nomorhp}
                    </span>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="12" md="6">
              <CFormGroup>
                <CLabel htmlFor="barang-jasa">Barang Jasa</CLabel>
                <Autocomplete
                  id="barang-jasa"
                  clearOnEscape={true}
                  disabled={formDisabled}
                  options={dataBarangJasa}
                  getOptionSelected={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option.nama}
                  value={{ nama: currentBarangJasa.nama }}
                  onChange={(event, values) => {
                    if (values) {
                      setCurrentBarangJasa({
                        id: values.id,
                        nama: values.nama,
                      });

                      getDataTipe(values.id);

                      // reset tipe barang
                      setCurrentTipe({
                        ...currentTipe,
                        id: "",
                        nama: "",
                      });

                      setInput({
                        ...input,
                        id_barang: "",
                      });
                    } else {
                      setCurrentBarangJasa({
                        id: "",
                        nama: "",
                      });

                      // setInput({
                      //   ...input,
                      //   id_barang_jasa: "",
                      // });
                    }
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </CFormGroup>
            </CCol>

            <CCol xs="12" md="6">
              <CFormGroup>
                <CLabel htmlFor="input-barang">Tipe Barang</CLabel>
                <Autocomplete
                  id="input-barang"
                  clearOnEscape={true}
                  disabled={formDisabled}
                  options={dataTipe}
                  getOptionSelected={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option.nama}
                  value={{ nama: currentTipe.nama }}
                  onChange={(event, values) => {
                    if (values) {
                      setCurrentTipe({
                        id: values.id,
                        nama: values.nama,
                      });

                      setInput({
                        ...input,
                        id_barang: values.id,
                      });
                    } else {
                      setCurrentTipe({
                        id: "",
                        nama: "",
                      });

                      setInput({
                        ...input,
                        id_barang: "",
                      });
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="12" lg="12">
              <CFormGroup>
                <CLabel htmlFor="sn">Serial Number</CLabel>
                <CInput
                  type="text"
                  id="sn"
                  name="sn"
                  value={input.sn}
                  onChange={changeHandler}
                  placeholder="Masukkan Serial Number"
                  disabled={formDisabled}
                />
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="12" md="12">
              <CFormGroup>
                <CLabel htmlFor="teknisi">Teknisi PJ</CLabel>
                <Autocomplete
                  id="teknisi"
                  clearOnEscape={true}
                  disabled={formDisabled}
                  options={dataTeknisi}
                  multiple
                  getOptionSelected={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option.name}
                  value={
                    currentTeknisi[0] && currentTeknisi[0].id
                      ? currentTeknisi
                      : []
                  }
                  onChange={(event, values) => {
                    if (values) {
                      const data = [];
                      values.map((item) =>
                        data.push({
                          id: item.id,
                          name: item.name,
                        })
                      );

                      setCurrentTeknisi(data);
                    } else {
                      setCurrentTeknisi([
                        {
                          id: "",
                          name: "",
                        },
                      ]);
                    }
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </CFormGroup>
            </CCol>
          </CRow>

          <CRow>
            <CCol xs="12" md="12">
              <CFormGroup>
                <CLabel htmlFor="request">Request</CLabel>
                <CTextarea
                  name="request"
                  id="request"
                  value={input.request}
                  onChange={changeHandler}
                  disabled={formDisabled}
                />
              </CFormGroup>
            </CCol>
          </CRow>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="success"
          className={buttonVisibility}
          onClick={() => {
            submitHandler(buttonSubmitName.toLocaleLowerCase());
            setCurrentPelanggan({
              id: "",
              name: "",
            });
          }}
        >
          {buttonSubmitName}
        </CButton>{" "}
        <CButton
          color="secondary"
          className={buttonVisibility}
          onClick={() => {
            closeModalHandler();
            setCurrentPelanggan({
              id: "",
              name: "",
            });
          }}
        >
          Cancel
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ModalPersiapanBarangBaru;
