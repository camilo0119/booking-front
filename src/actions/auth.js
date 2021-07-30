import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const response = await fetchWithoutToken("auth/login",{ 
          email,
          password
      },
      "POST"
    );

    const body = await response.json()

    if (body?.ok) {
        
        localStorage.setItem('token', body?.token);
        localStorage.setItem('token-init-date', new Date().getTime());

        dispatch(login({
            uid: body.uid,
            name: body.name
        }))
    } else {
        Swal.fire('Error', body.message, 'error')
    }
  };
};

export const startRegister = (email, password, name) => {
    return async (dispatch) => {
        const response = await fetchWithoutToken('auth/new', {
            email,
            password,
            name
        },
        'POST');

        const body = await response.json()

        if (body.ok) {
            Swal.fire('Usuario Registrado!', 'El usuario ha sido registrado exitosamente.', 'success')
            
            localStorage.setItem('token', body?.token);
            localStorage.setItem('token-init-date', new Date().getTime());
    
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
            
        } else {
            Swal.fire('Error', body.message, 'error')
        }
    }

}

export const startCheckin = () => {
    return async (dispatch) => {
        const response = await fetchWithToken('auth/renew');

        const body = await response.json()

        if (body.ok) {            
            localStorage.setItem('token', body?.token);
            localStorage.setItem('token-init-date', new Date().getTime());
    
            dispatch(login({
                uid: body.uid,
                name: body.name
            }))
        } else {
            dispatch(checkingFinish())
        }
    }
}

export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear()
        dispatch(logout())
    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})

const login = (userData) => ({
    type: types.authLogin,
    payload: userData
})

const logout = () => ({
    type: types.authLogout
})