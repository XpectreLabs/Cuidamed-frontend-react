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
      dispatch({ type: types.createUser, payload: true });
      Swal.fire({
        title: 'Informacion guardada correctamente',
        icon: 'success',
      });
    } catch (e) {
      dispatch({ type: types.createUser, payload: false });
    }
  };
};

export const verifyCode = () => {
  return async (dispatch) => {};
};
