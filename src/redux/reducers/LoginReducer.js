import { types } from '../types';
const initState = { isLogged: localStorage.getItem('token') ? true : false };
export const LoginReducer = (state = initState, action) => {
  switch (action.type) {
    case types.login:
      return {
        isLogged: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        user: { ...action.payload.user },
      };

    case types.logout:
      return { isLogged: false };
    default:
      return state;
  }
};
