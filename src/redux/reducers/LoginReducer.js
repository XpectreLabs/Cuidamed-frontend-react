import { types } from '../types';

export const LoginReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        token: action.payload.token,
        user: { ...action.payload.user },
      };

    case types.logout:
      return {};
    default:
      return {};
  }
};
