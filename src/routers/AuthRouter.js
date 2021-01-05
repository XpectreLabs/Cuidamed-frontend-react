import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "../pages/login";
import VerifyCode from "../pages/verify-code";
import Register from "../pages/register";
import Error404 from "../pages/404";
import Emergency from "../pages/emergencia";
import Resume from "../pages/resumen";

export const AuthRouter = () => {
  return (
    <>
      <Switch>
        <Route exact component={Login} path="/login" />
        <Route exact component={Register} path="/register" />
        <Route exact component={VerifyCode} path="/verify-code" />
        <Route exact component={Emergency} path="/emergencia" />
        <Route exact component={Resume} path="/resumen" />

        <Route component={Error404} path="/404" exact />
        <Redirect to="/landing" />
      </Switch>
    </>
  );
};
