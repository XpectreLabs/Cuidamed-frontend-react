import { types } from '../types';
import { doLogin, doLogOut } from '../../repositories/UserRepositories';

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch({type:types.loading})
    let { success, data } = await doLogin(email, password);
    if(success) dispatch({ type: types.login, payload: { ...data } });
    
    dispatch({type:types.loaded})
  };
};

export const logout = () => {
  return (dispatch) => {
    doLogOut();
    dispatch({ type: types.logout });
  };
};
