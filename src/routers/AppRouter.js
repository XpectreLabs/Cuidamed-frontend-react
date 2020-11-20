import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Login from '../pages/login';
import HistorialMedico from '../pages/historial-medico';
import Enfermedades from '../pages/enfermedades-comunes';
import Sistemas from '../pages/sistemas';
import ListaEnfermedades from '../pages/lista-enfermedades';
import VerifyCode from '../pages/verify-code';
import InfoBasic from '../pages/info-basic';
import Register from '../pages/register';
import Error404 from '../pages/404';
const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact component={Login} path="/login" />
          <Route exact component={HistorialMedico} path="/historial-medico" />
          <Route exact component={Sistemas} path="/sistemas" />
          <Route component={Enfermedades} path="/enfermedades-comunes" />
          <Route exact component={ListaEnfermedades} path="/lista-enfermedades" />
          <Route exact component={InfoBasic} path="/info-basic" />
          <Route exact component={Register} path="/register" />
          <Route exact component={VerifyCode} path="/verify-code" />
          <Route exact component={Error404} path="/404" />
          <Redirect to="/404" />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
