import { types } from '../types';
import { doLogin, doLogOut } from '../../repositories/UserRepositories';
import customFetch from '../../utils/customFetch';
import Swal from 'sweetalert2';

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({type:types.loading})
    let { success, data } = await doLogin(email, password);
    if(success) dispatch({ type: types.login, payload: { ...data } });
    
    dispatch({type:types.loaded})
  };
};

export const recoverPassword = (email) => {
  return async (dispatch) => {
    // dispatch({type:types.loadingEmail})
    try {
      const resp = await customFetch('api/forgot','POST', {email}, false)
      
      Swal.fire({
        icon: 'success',
        title: 'Correo enviado correctamente'
      })
    //   dispatch({type:types.loadingEmail})
    } catch (e) {
      Swal.fire({
        icon: 'error',
        title: 'Error al mandar correo, intente mas tarde'
      })
      // dispatch({type:types.loadingEmail})
    }
    
  }
}

export const logout = () => {
  return (dispatch) => {
    doLogOut();
    dispatch({ type: types.logout });
  };
};
