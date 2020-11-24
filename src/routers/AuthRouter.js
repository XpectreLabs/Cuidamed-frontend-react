import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../pages/login';
import VerifyCode from '../pages/verify-code';
import Register from '../pages/register';
import Error404 from '../pages/404';

export const AuthRouter = () => {
  return (
    <>
      <Switch>
        <Route exact component={Login} path="/login" />
        <Route exact component={Register} path="/register" />
        <Route exact component={VerifyCode} path="/verify-code" />

        <Route component={Error404} path="/404" exact />
        <Redirect to="/404" />
      </Switch>
    </>
  );
};
