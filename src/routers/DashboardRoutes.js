import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HistorialMedico from '../pages/historial-medico';
import Enfermedades from '../pages/enfermedades-comunes';
import Sistemas from '../pages/sistemas';
import ListaEnfermedades from '../pages/lista-enfermedades';
import InfoBasic from '../pages/info-basic';

export const DashboardRoutes = () => {
  return (
    <>
      <Switch>
        <Route
          exact
          component={HistorialMedico}
          path="/dashboard/historial-medico"
        />
        <Route exact component={Sistemas} path="/dashboard/sistemas" />
        <Route
          exact
          component={Enfermedades}
          path="/dashboard/enfermedades-comunes"
        />
        <Route
          exact
          component={ListaEnfermedades}
          path="/dashboard/lista-enfermedades"
        />
        <Route exact component={InfoBasic} path="/dashboard/info-basic" />
        <Redirect to="/404" />
      </Switch>
    </>
  );
};
