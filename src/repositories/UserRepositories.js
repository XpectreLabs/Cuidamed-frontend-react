import { login,logOut } from '../cases/UserCases/UserController';
export const doLogin = (email,password) => login(email,password);
export const doLogOut = () => logOut();