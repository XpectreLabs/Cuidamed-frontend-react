import { types } from '../types';

const initialState = {
  loading: false,
  createdUser: localStorage.getItem('email') ? true : false,
  emailRegistered: localStorage.getItem('email')
    ? localStorage.getItem('email')
    : null,
};
export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.createUser:
      return {
        ...state,
        loading: false,
        createdUser: action.payload.created,
        emailRegistered: action.payload.email,
      };
    case types.loading:
      return { ...state, loading: true };
    case types.setUserCreated:
      return { ...state, createdUser: false };
    case types.verifyUser:
      return {
        ...state,
        loading: false,
        createdUser: false,
        emailRegistered: null,
      };
    case types.updateInfoBasic:
      return { ...state, loading: false };
    case types.saveAndContinue:
      return { ...state, loading: false };
    default:
      return state;
  }
};
