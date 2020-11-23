import { CONECTION } from '../../conection';
export const login = (email, password) => {
  return async (dispatch) => {
    //let request = fetch(`${CONECTION}`)
    console.log(email, password);
  };
};

export const logout = (email, password) => {
  return (dispatch) => {};
};
