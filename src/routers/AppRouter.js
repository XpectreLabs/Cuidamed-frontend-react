import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { useSelector } from "react-redux";
import { PublicRoute } from "./PublicRoute";
import { AuthRouter } from "./AuthRouter";

import Landing from "../pages/landing";
import Band from "../pages/pulsera";
import Plate from "../pages/placa";
// import Antecedentes from "../pages/antecedentes";
// import InfoBasic from "../pages/info-basic";
// import Treatment from "../pages/tratamiento";
// import Contact from "../pages/contacto";
// import MedicalContact from "../pages/contacto-medico";
// import MedicalInsurance from "../pages/seguro-medico";
// import Ginecologia from "../pages/ginecologia";

const AppRouter = React.memo(() => {
  const { isLogged } = useSelector((state) => state.login);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact component={Landing} path="/landing" />
          <Route exact component={Band} path="/pulsera" />
          <Route exact component={Plate} path="/personalizar-placa" />
          {/* <Route exact component={Antecedentes} path="/antecedentes" />
          <Route exact component={InfoBasic} path="/info-basic" />
          <Route exact component={Treatment} path="/tratamiento" />
          <Route exact component={Contact} path="/contacto" />
          <Route exact component={MedicalContact} path="/contacto-medico" />
          <Route exact component={MedicalInsurance} path="/seguro-medico" />
          <Route exact component={Ginecologia} path="/ginecologia" /> */}
          <PrivateRoute
            isAuthenticated={isLogged}
            component={DashboardRoutes}
            path="/dashboard"
          />
          <PublicRoute
            isAuthenticated={isLogged}
            component={AuthRouter}
            path="/"
          />
        </Switch>
      </div>
    </Router>
  );
});

export default AppRouter;
