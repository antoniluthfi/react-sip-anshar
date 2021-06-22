import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

const AuthHelper = () => {
    const dispatch = useDispatch();
    const baseurl = process.env.REACT_APP_LARAVEL_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [routeLocation, setRouteLocation] = useState('/login');
    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const changeHandler = event => {
        setInput({
            ...input, [event.target.name]: event.target.value
        });
    }

    const login = () => {
        axios.post(`${baseurl}/login`, {
            email: input.email,
            password: input.password
        })
        .then(response => {
            const result = response.data.success;
            localStorage.setItem('sip-token', result.token);

            dispatch({
                type: 'LOGIN',
                payload: result.user
            });

            if(result.user.hak_akses === 'administrator') {
                setRouteLocation('/dashboard-administrator');
            } else if(result.user.hak_akses === 'admin gudang') {
                setRouteLocation('/dashboard-admin-gudang');
            } else if(result.user.hak_akses === 'marketing') {
                setRouteLocation('/dashboard-marketing');
            }

            Swal.fire(
                'Berhasil',
                response.data.message,
                'success'
            )
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            )
        });

        setIsLoggedIn(true);
    }

    const logout = async () => {
        await axios.post(`${baseurl}/logout`, {}, {
            headers: {
                'Accept': 'Application/json',
                'Authorization': `Bearer ${localStorage.getItem('sip-token')}`
            }
        })
        .then(response => {
            localStorage.clear();
            window.location.reload(true);
        })
        .catch(error => {
            Swal.fire(
                'Gagal',
                error.message,
                'error'
            );
        });
    }

    return {
        isLoggedIn,
        routeLocation,
        input,
        changeHandler,
        login,
        logout
    }
}

export default AuthHelper;