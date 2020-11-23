import { types } from '../types';

const initialState = {
  loading: false,
  createdUser: false,
};
export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.createUser:
      return { ...state, loading: false, createdUser: action.payload };
    case types.loading:
      return { ...state, loading: true };
    case types.setUserCreated:
      return { ...state, createdUser: false };
    default:
      return state;
  }
};
