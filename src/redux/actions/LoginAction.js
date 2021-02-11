import { CONECTION } from '../../conection';
import Swal from 'sweetalert2';
import { types } from '../types';
export const login = (email, password) => {
  return async (dispatch) => {
    //dispatch({ type: types.loading });
    try {
      let request = await fetch(`${CONECTION}api/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      let resp = await request.json();
      if (resp.err) Swal.fire('Error', resp.err.message, 'error');
      else {
        if (resp.token) {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('refreshToken', resp.refreshToken);
          localStorage.setItem('user', JSON.stringify(resp.data));
          dispatch({ type: types.login, payload: { ...resp } });
        } else {
          Swal.fire('Error', 'Se produjo error al generar  el token', 'error');
        }
      }
    } catch (e) {}
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    dispatch({ type: types.logout });
  };
};
