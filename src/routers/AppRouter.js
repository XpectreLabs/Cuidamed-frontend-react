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

const AppRouter = React.memo(() => {
  const { isLogged } = useSelector((state) => state.login);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact component={Landing} path="/landing" />
          <Route exact component={Band} path="/pulsera" />
          <Route exact component={Plate} path="/personalizar-placa" />          
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
