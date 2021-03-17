import { types } from '../types';
import { doLogin, doLogOut } from '../../repositories/UserRepositories';

export const login = (email, password) => {
  return async (dispatch) => {
    let { success, data } = await doLogin(email, password);
    if(success) dispatch({ type: types.login, payload: { ...data } });
  };
};

export const logout = () => {
  return (dispatch) => {
    doLogOut();
    dispatch({ type: types.logout });
  };
};
