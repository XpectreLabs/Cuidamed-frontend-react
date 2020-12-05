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

export const updateInfoBasic = (pInfo, history) => {
  return async (dispatch) => {
    dispatch({ type: types.loading });
    try {
      if (localStorage.getItem('user') || localStorage.getItem('user') != '') {
        const { id } = JSON.parse(localStorage.getItem('user'));
        const request = await fetch(`${CONECTION}api/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'x-auth-token': localStorage.getItem('refreshToken'),
          },
          body: JSON.stringify(pInfo),
        });
        const response = await request.json();

        if (response.message) {
          Swal.fire({
            title: 'Usuario Actualizado',
            icon: 'success',
          });
          dispatch({ type: types.saveAndContinue });
          history.push('/dashboard/enfermedades-comunes');
        }
      }
    } catch (e) {}
  };
};
