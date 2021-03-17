import { types } from '../types';
const initState = {
    load: false
};
export const LoadingReducer = (state = initState, action) => {
  switch (action.type) {
    case types.loading:
      return {
          load:true
      };
    case types.loaded:
      return {
        load:false
      };  
    default:
      return state;
  }
};
