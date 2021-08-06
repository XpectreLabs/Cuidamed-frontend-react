import { types } from '../types';
const initState = {
  isLogged: localStorage.getItem('token') ? true : false,
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  emailLoad: false
};
export const LoginReducer = (state = initState, action) => {
  switch (action.type) {
    case types.login:
      return {
        isLogged: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        user: { ...action.payload.data },
      };

    case types.login:
      return {
        isLogged: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        user: { ...action.payload.data },
      };
    case types.updateUser:
      return {
        ...state,
        user: action.payload,
      };
    case types.loadingEmail:
      return {...state, emailLoad: !state.emailLoad}  
    case types.logout:
      return { isLogged: false };
    default:
      return state;
  }
};
