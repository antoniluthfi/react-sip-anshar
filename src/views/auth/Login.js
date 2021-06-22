import React from 'react'
import { Redirect } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AuthHelper from './AuthHelper';

const Login = () => {
    const {
        isLoggedIn,
        routeLocation,
        input,
        changeHandler,
        login
    } = AuthHelper();

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            {isLoggedIn ? <Redirect to={routeLocation} /> : null}
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md="8">
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm>
                                        <h1>Masuk</h1>
                                        <p className="text-muted">Masuk ke akun anda</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-envelope-closed" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="email" name="email" placeholder="Alamat Email" autoComplete="email" value={input.email} onChange={changeHandler} />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupPrepend>
                                                <CInputGroupText>
                                                    <CIcon name="cil-lock-locked" />
                                                </CInputGroupText>
                                            </CInputGroupPrepend>
                                            <CInput type="password" name="password" placeholder="Sandi" autoComplete="current-password" value={input.password} onChange={changeHandler} />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs="6">
                                                <CButton color="success" className="px-4" onClick={login}>Masuk</CButton>
                                            </CCol>
                                            {/* <CCol xs="6" className="text-right">
                                                <CButton color="link" className="px-0">Forgot password?</CButton>
                                            </CCol> */}
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-success py-5 d-md-down-none" style={{ width: '44%' }}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>APLIKASI SISTEM PENJUALAN CV. TWINCOM GROUP</h2>
                                        <img src="https://drive.google.com/thumbnail?id=12ubasd0uZrQ3LFlQ3Hw1mG4Q8ORLZ3Ao" alt="twincom" width="30%" height="30%" />
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
