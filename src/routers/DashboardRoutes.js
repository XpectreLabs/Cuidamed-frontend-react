import React from "react";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";

import HistorialMedico from "../pages/historial-medico";
import Enfermedades from "../pages/enfermedades-comunes";
import Sistemas from "../pages/sistemas";
import ListaEnfermedades from "../pages/lista-enfermedades";
import InfoBasic from "../pages/info-basic";
import Antecedentes from "../pages/antecedentes";
import Ginecologia from "../pages/ginecologia";
import MedicalContact from "../pages/contacto-medico";
import MedicalInsurance from "../pages/seguro-medico";
import Contact from "../pages/contacto";
import Treatment from "../pages/tratamiento";
import ResumenDashboard from '../pages/resumenDashboard';

export const DashboardRoutes = () => {
  const history = useHistory();
  localStorage.setItem("last_path", history.location.pathname);
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
        <Route exact component={Antecedentes} path="/dashboard/antecedentes" />
        <Route exact component={Ginecologia} path="/dashboard/ginecologia" />
        <Route
          exact
          component={MedicalContact}
          path="/dashboard/contacto-medico"
        />
        <Route
          exact
          component={MedicalInsurance}
          path="/dashboard/seguro-medico"
        />
        <Route exact component={Contact} path="/dashboard/contacto" />
        <Route exact component={Treatment} path="/dashboard/tratamiento" />

        <Route exact component={InfoBasic} path="/dashboard/info-basic" />
        <Route exact component={ResumenDashboard} path="/dashboard/resumen" />
        <Redirect to="/dashboard/info-basic" />
      </Switch>
    </>
  );
};
