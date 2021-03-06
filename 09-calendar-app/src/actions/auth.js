import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import { eventLogout } from "./events";


export const startLogin = (email, password) => {
    return async (dispatch) => {

        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            // agrega al state en mi storage de mi reducer el uid y name
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

export const startRegister = (email, password, name) => {
    return async (dispatch) => {

        const resp = await fetchSinToken('auth/new', { email, password, name }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            // agrega al state en mi storage de mi reducer el uid y name
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}
// renovar token
export const startChecking = () => {
    return async (dispatch) => {

        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            // agrega al state en mi storage de mi reducer el uid y name
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {

            dispatch(checkingFinish());
        }

    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = (user) => ({
    type: types.authLogin,
    payload: user
});

export const startLogout = () => {
    // retorno una tarea asincrona
    return (dispatch) => {

        // limpio todo del localStorage
        localStorage.clear();
        // eliminar del state en redux los eventos
        dispatch(eventLogout());
        // despacho y limpio el state de mi redux
        dispatch(logout());
    }
}

const logout = () => ({ type: types.authLogout })