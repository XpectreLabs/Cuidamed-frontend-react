import Swal from 'sweetalert2';
import { CONECTION } from '../../conection';
import { types } from '../types';
export const createUser = (pInfo) => {
  return async (dispatch) => {
    try {
      dispatch({ type: types.loading });
      let request = await fetch(`${CONECTION}api/register`, {
        method: 'POST',
        body: JSON.stringify(pInfo),
        headers: {
          'Content-type': 'application/json',
        },
      });
      let resp = await request.json();
      if (resp.err) {
        Swal.fire('Error', resp.err.message, 'error');
        dispatch({
          type: types.createUser,
          payload: { created: false, email: null },
        });
      } else {
        localStorage.setItem('email', pInfo.email);
        Swal.fire({
          title: 'Informacion guardada correctamente',
          icon: 'success',
        });
        dispatch({
          type: types.createUser,
          payload: { created: true, email: pInfo.email },
        });
      }
    } catch (e) {
      Swal.fire('Error', 'No se pudo crear el usuario', 'error');
      dispatch({
        type: types.createUser,
        payload: { created: false, email: null },
      });
    }
  };
};

export const verifyCode = (pInfo) => {
  return async (dispatch, getState) => {
    const { emailRegistered } = getState().user;

    try {
      dispatch({ type: types.loading });
      let request = await fetch(`${CONECTION}api/verify`, {
        method: 'POST',
        body: JSON.stringify({ ...pInfo, email: emailRegistered }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      let resp = await request.json();
      localStorage.removeItem('email');
      Swal.fire({
        title: 'Usuario verificado',
        icon: 'success',
      });
      dispatch({
        type: types.verifyUser,
      });
    } catch (e) {
      Swal.fire('Error', 'No se pudo verificar el usuario', 'error');
      dispatch({
        type: types.createUser,
        payload: { created: false, email: null },
      });
    }
  };
};
